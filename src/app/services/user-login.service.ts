import { Inject, Injectable } from '@angular/core';
import { CognitoCallback, CognitoUtil, LoggedInCallback } from './cognito-utility.service';

import * as AWS from 'aws-sdk/global';
import * as STS from 'aws-sdk/clients/sts';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class UserLoginService {
    _isLoggedInSubs: BehaviorSubject<boolean> = new BehaviorSubject(null);

    get isLoggedInSubs() {
        return this._isLoggedInSubs.asObservable();
    }

    set isLoggedInSubs(value: any) {
        this._isLoggedInSubs.next(value);
    }

    constructor(@Inject(CognitoUtil) public cognitoUtil: CognitoUtil) {
    }

    forgotPassword(username: string, callback: CognitoCallback) {
        let userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.forgotPassword({
            onSuccess: function () {

            },
            onFailure: function (err) {
                callback.cognitoCallback(err.message, null);
            },
            inputVerificationCode() {
                callback.cognitoCallback(null, null);
            }
        });
    }

    confirmNewPassword(email: string, verificationCode: string, password: string, callback: CognitoCallback) {
        let userData = {
            Username: email,
            Pool: this.cognitoUtil.getUserPool()
        };

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmPassword(verificationCode, password, {
            onSuccess: function () {
                callback.cognitoCallback(null, null);
            },
            onFailure: function (err) {
                callback.cognitoCallback(err.message, null);
            }
        });
    }

    logout() {
        console.log('UserLoginService: Logging out');
        this.cognitoUtil.getCurrentUser().signOut();

    }

    isAuthenticated(callback: LoggedInCallback) {
        if (callback == null) {
            throw new Error('UserLoginService: Callback in isAuthenticated() cannot be null');
        }

        let cognitoUser = this.cognitoUtil.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, session) {
                if (err) {
                    console.log('UserLoginService: Couldnt get the session: ' + err, err.stack);
                    callback.isLoggedIn(err, false);
                } else {
                    console.log('UserLoginService: Session is ' + session.isValid());
                    callback.isLoggedIn(err, session.isValid());
                }
            });
        } else {
            console.log('UserLoginService: can\'t retrieve the current user ');
            callback.isLoggedIn('Can\' t retrieve the CurrentUser ', false);
        }
    }

    rxAuthenticate(username: string, password: string) {
        return Observable.create((observer) => {

            let authenticationData = {
                Username: username,
                Password: password,
            };
            let authenticationDetails = new AuthenticationDetails(authenticationData);

            let userData = {
                Username: username,
                Pool: this.cognitoUtil.getUserPool()
            };

            let cognitoUser = new CognitoUser(userData);

            const self = this;
            cognitoUser.authenticateUser(authenticationDetails, {
                newPasswordRequired: (userAttributes, requiredAttributes) => {
                    observer.next('newPasswordRequired');
                    observer.complete();
                },
                onSuccess: (result) => {
                    let creds = self.cognitoUtil.buildCognitoCreds(result.getIdToken().getJwtToken());
                    AWS.config.credentials = creds;
                    let clientParams: any = {};
                    let sts = new STS(clientParams);
                    sts.getCallerIdentity((err, data) => {
                        observer.next('onSuccess');
                        observer.complete();
                    });
                },
                mfaRequired: () => {
                    observer.next('mfaRequired');
                    observer.complete();

                },
                customChallenge: () => {
                    observer.next('customChallenge');
                    observer.complete();

                },
                onFailure: (err) => {
                    observer.error(err);
                    observer.complete();
                }
            });
        });
    }

    rxIsAuthenticated(): Observable<boolean> {
        return Observable.create((observer) => {

            let cognitoUser = this.cognitoUtil.getCurrentUser();

            if (cognitoUser != null) {
                cognitoUser.getSession(function (err, session) {
                    if (err) {
                        observer.error(err);
                    } else {
                        session.isValid() ? observer.next(true) : observer.error(false);
                    }
                    observer.complete();
                });
            } else {
                observer.error('Can\' t retrieve the CurrentUser ');
                observer.complete();
            }
        });
    }

}
