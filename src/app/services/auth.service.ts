import { Injectable } from '@angular/core';
import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
    CognitoUserSession
} from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogConfig } from "@angular/material";
import { DialogComponent } from "../components/dialog/dialog.component";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { isNullOrUndefined } from "util";

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


@Injectable()
export class AuthService {
    private authenticationDetails;
    private userData;
    private cognitoUser: CognitoUser;
    private userPool;
    private parsedJwt: any;

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
                console.log(this.parsedJwt);
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

    getUser() {
        const $this = this;

        this.cognitoUser = this.userPool.getCurrentUser();

        if (this.cognitoUser != null) {

            this.cognitoUser.getSession(function (err, session) {
                if (err) {
                    this.errorHandler(err);
                    return;
                }

                $this.cognitoUser.getUserAttributes(function (err, attributes) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(attributes);
                    }
                });

            });
        }
    }

    callbackObj(observe) {
        return {
            onSuccess: (result) => {
                this.isLoggedInSubs = this.isLoggedIn();
                observe.next(true);
                console.log('access token + ' + result.getAccessToken().getJwtToken());
            },

            onFailure: this.errorHandler.bind(this),

            // mfaRequired: function (codeDeliveryDetails) {
            //     let verificationCode = prompt('Please input verification code', '');
            //     $this.cognitoUser.sendMFACode(verificationCode, $this.callbackObj(observe));
            // },

            newPasswordRequired: (msg) => {
                observe.next('changePassword');
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

    saveToken(token: string) {
        localStorage.setItem('access_token', token);
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
