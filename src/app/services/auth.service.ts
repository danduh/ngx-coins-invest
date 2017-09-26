import { Injectable } from '@angular/core';
import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
    CognitoUserSession,
    CognitoUserAttribute
} from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogConfig } from "@angular/material";
import { DialogComponent } from "../components/dialog/dialog.component";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { isNullOrUndefined } from "util";
import { AppUser } from "../models/common";

const poolData = {
    UserPoolId: 'us-east-1_QrRslpjCt', // Your user pool id here
    ClientId: '5ld1g5pf3pj7thfkf886ggsqfd' // Your client id here
};

let WRONG_CREDENTIALS: MdDialogConfig = {
    data: {
        title: 'Authorization',
        message: 'Incorrect username or password.',
        options: [{value: true, label: 'OK'}]
    }
};

let PASSWORD_POLICY = (msg) => {
    return {
        data: {
            title: 'Password Policy',
            message: msg,
            options: [{value: true, label: 'OK'}]
        }
    };
};

export const parseJwt = (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

const defaultCB = (res) => {
    console.log(res);
};

@Injectable()
export class AuthService {
    private authenticationDetails;
    private userData;
    private cognitoUser: CognitoUser;
    private userPool;
    public appUser: AppUser;
    private parsedJwt: any;
    private userPoolRegister: any;
    private tempUser: any = {email: null, password: null};

    _isLoggedInSubs: BehaviorSubject<boolean> = new BehaviorSubject(null);

    get isLoggedInSubs() {
        return this._isLoggedInSubs.asObservable();
    }

    set isLoggedInSubs(value: any) {
        this._isLoggedInSubs.next(value);
    }

    public tokens: CognitoUserSession;


    constructor(private dialog: MdDialog) {
        this.init();
    }

    init() {
        this.userPool = new CognitoUserPool(poolData);
        this.userPoolRegister = Observable.bindCallback(this.userPool.signUp.bind(this.userPool));
        this.cognitoUser = this.userPool.getCurrentUser();
        this.isLoggedInSubs = this.isLoggedIn();
    }

    public isLoggedIn(): boolean {
        if (!!this.cognitoUser) {
            return this.cognitoUser.getSession((err, session) => {
                if (isNullOrUndefined(session)) {
                    return false;
                }
                this.tokens = session;
                this.parsedJwt = parseJwt(this.tokens.getIdToken().getJwtToken());
                this.appUser = new AppUser(this.parsedJwt, this.cognitoUser.getUsername());
                return session.isValid();
            });
        }
        return false;
    }

    public getAuthToken() {
        if (!!this.tokens && this.isLoggedIn()) {
            return this.tokens.getIdToken().getJwtToken();
        } else {
            throw new Error('Not Authorized');
        }
    }

    callbackObj(observe?) {
        return {
            mfaRequired: defaultCB,
            customChallenge: defaultCB,

            onSuccess: (result) => {
                this.isLoggedInSubs = this.isLoggedIn();
                // this.cognitoUser = result.user;
                observe.next();
                console.log('access token + ' + result.getAccessToken().getJwtToken());
                observe.complete();
            },

            onFailure: (error) => {
                this.errorHandler(this);
                observe.throw(error);
                observe.complete();

            },

            newPasswordRequired:
                (msg) => {
                    observe.next('changePassword');
                    observe.complete();
                },

            inputVerificationCode:
                () => {
                    let verificationCode = prompt('Check you email for a verification code and enter it here: ', '');
                    this.cognitoUser.verifyAttribute('email', verificationCode, this.callbackObj());
                }
        };
    }

    signIn(username, password): Observable<any> {
        let authenticationData = {
            Username: username,
            Password: password,
        };

        this.authenticationDetails = new AuthenticationDetails(authenticationData);

        this.userData = {
            Username: username,
            Pool: this.userPool
        };
        this.cognitoUser = new CognitoUser(this.userData);

        return Observable.create((observe) => {
            this.cognitoUser.authenticateUser(this.authenticationDetails, this.callbackObj(observe));
        });
    }

    changePassword(password) {
        return Observable.create((observe) => {
            this.cognitoUser.completeNewPasswordChallenge(password, null, this.callbackObj(observe));
        });
    }

    signOut() {
        if (!!this.cognitoUser) {
            this.cognitoUser.signOut();
            this.isLoggedInSubs = this.isLoggedIn();
        }
    }

    register(newUserData: AppUser, password: string) {
        let attributeList = [];
        const dataEmail = newUserData.getDataEmail();
        this.tempUser.password = password;
        this.tempUser.email = newUserData.username;

        const attributeEmail = new CognitoUserAttribute(dataEmail);
        attributeList.push(attributeEmail);
        return Observable.create((observe) => {
            this.userPool.signUp(newUserData.username, password, attributeList, null, (err, resp) => {
                if (!!resp) {
                    this.cognitoUser = resp.user;
                }
                observe.next(resp);
                observe.complete();
            });
            // return this.userPoolRegister(newUserData.username, password, attributeList, null, this.callbackObj(observe));
        });
    }

    confirmEmail(code) {
        return Observable.create((observe) => {
            return this.cognitoUser.confirmRegistration(code, null, (err, result) => {
                if (err) {
                    alert(err);
                    observe.off(err);
                    return;
                }

                this.signIn(this.tempUser.email, this.tempUser.password)
                    .subscribe((res) => {
                        observe.next(this.cognitoUser.getUsername());

                    });
            });
        })

    }

    errorHandler(err) {
        if (!!err.code) {
            switch (err.code) {
                case 'NotAuthorizedException':
                case 'UserNotFoundException':
                    this.dialog.open(DialogComponent, WRONG_CREDENTIALS);
                    break;

                case 'InvalidPasswordException':
                    this.dialog.open(DialogComponent, PASSWORD_POLICY(err.message));
                    break;

                default:
                    console.error(err);
            }
        } else {
            console.error(err);
        }
    }
}
