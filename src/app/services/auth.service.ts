import { Injectable } from '@angular/core';
import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
    CognitoUserSession
} from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs/Observable';

const poolData = {
    UserPoolId: 'us-east-1_QrRslpjCt', // Your user pool id here
    ClientId: '5ld1g5pf3pj7thfkf886ggsqfd' // Your client id here
};


@Injectable()
export class AuthService {
    private authenticationDetails;
    private userData;
    private cognitoUser;
    private userPool;
    public tokens: CognitoUserSession;

    constructor() {
        this.init();
    }

    init() {
        this.userPool = new CognitoUserPool(poolData);
        this.cognitoUser = this.userPool.getCurrentUser();
        console.log(this.isLoggedIn());
    }

    public isLoggedIn(): boolean {
        const $this = this;

        if (!!this.cognitoUser) {
            return this.cognitoUser.getSession(function (err, session) {
                $this.tokens = session;
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
        let $this = this;
        return {
            onSuccess: function (result) {
                observe.next(true);
                console.log('access token + ' + result.getAccessToken().getJwtToken());
            },

            onFailure: this.errorHandler.bind(this),

            // mfaRequired: function (codeDeliveryDetails) {
            //     let verificationCode = prompt('Please input verification code', '');
            //     $this.cognitoUser.sendMFACode(verificationCode, $this.callbackObj(observe));
            // },

            newPasswordRequired: (msg) => {
                // TODO: Should to be done!!!
                console.log('newPasswordRequired', msg);
            }
        };
    }

    signin(username, password): Observable<any> {
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

    saveToken(token: string) {
        localStorage.setItem('access_token', token);
    }

    errorHandler(err) {
        console.error(err)
    }
}
