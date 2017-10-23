import { Inject, Injectable } from "@angular/core";
import { CognitoCallback, CognitoUtil } from "./cognito-utility.service";
import { CognitoUserAttribute, AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import * as AWS from "aws-sdk";
import { Observable } from 'rxjs/Observable';

export class RegistrationUser {
    name: string;
    email: string;
    password: string;
}

export class NewPasswordUser {
    username: string;
    existingPassword: string;
    password: string;
}

@Injectable()
export class UserRegistrationService {
    constructor(@Inject(CognitoUtil) public cognitoUtil: CognitoUtil) {

    }


    rxConfirmRegistration(username: string, confirmationCode: string): Observable<any> {
        return Observable.create((observer) => {
            let userData = {
                Username: username,
                Pool: this.cognitoUtil.getUserPool()
            };
            let cognitoUser = new CognitoUser(userData);

            cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(result);
                }
                observer.complete();
            });
        });
    }

    rxNewPassword(newPasswordUser: NewPasswordUser): Observable<any> {
        return Observable.create((observer) => {
            console.log(newPasswordUser);
            // Get these details and call
            // cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
            let authenticationData = {
                Username: newPasswordUser.username,
                Password: newPasswordUser.existingPassword,
            };
            let authenticationDetails = new AuthenticationDetails(authenticationData);

            let userData = {
                Username: newPasswordUser.username,
                Pool: this.cognitoUtil.getUserPool()
            };

            console.log("UserLoginService: Params set...Authenticating the user");
            let cognitoUser = new CognitoUser(userData);
            console.log("UserLoginService: config is " + AWS.config);
            cognitoUser.authenticateUser(authenticationDetails, {
                newPasswordRequired: (userAttributes, requiredAttributes) => {
                    delete userAttributes.email_verified;
                    cognitoUser.completeNewPasswordChallenge(newPasswordUser.password, requiredAttributes, {
                        onSuccess: function (result) {
                            console.log('Password Changed');
                            observer.next(userAttributes);
                            observer.complete();
                        },
                        onFailure: function (err) {
                            observer.next(err);
                            observer.complete();
                        }
                    });
                },
                onSuccess: function (result) {
                    console.log('Password Changed');
                    observer.next(result);
                    observer.complete();
                },
                onFailure: function (err) {
                    observer.next(err);
                    observer.complete();
                }
            });
        });
    }

    rxRegister(user: RegistrationUser): Observable<any> {

        return Observable.create((observer) => {
            console.log("UserRegistrationService: user is " + user);

            let attributeList = [];

            let dataEmail = {
                Name: 'email',
                Value: user.email
            };
            let dataNickname = {
                Name: 'nickname',
                Value: user.email
            };
            attributeList.push(new CognitoUserAttribute(dataEmail));
            attributeList.push(new CognitoUserAttribute(dataNickname));

            this.cognitoUtil.getUserPool()
                .signUp(user.email, user.password, attributeList, null, function (err, result) {
                    if (err) {
                        observer.error(err);
                    } else {
                        observer.next(result);
                    }
                    observer.complete();
                });
        });
    }


    rxResendCode(username: string): Observable<any> {
        return Observable.create((observer) => {

            let userData = {
                Username: username,
                Pool: this.cognitoUtil.getUserPool()
            };

            let cognitoUser = new CognitoUser(userData);

            cognitoUser.resendConfirmationCode((err, result) => {
                if (!!err) {
                    observer.error(err);
                } else {
                    observer.next(result);
                }
                observer.complete();
            });
        });
    }

}

