import { Component, OnInit } from '@angular/core';
import { AppUser } from "../models/common";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "../services/account.service";
import { Router } from "@angular/router";
import { RegistrationUser, UserRegistrationService } from "../services/user-registration.ervice";
import { CognitoCallback } from "../services/cognito-utility.service";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements CognitoCallback {
    newUser: AppUser;
    fromNewUser: FormGroup;
    registrationUser: RegistrationUser;
    errorMessage: string;


    constructor(public userRegistration: UserRegistrationService,
                private router: Router,
                private accountService: AccountService) {
        this.onInit();
    }

    onInit() {
        this.fromNewUser = new FormGroup({
            'username': new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            'password': new FormControl(null, [
                Validators.required,
                Validators.minLength(8)
            ]),
            'confirmPassword': new FormControl(null, [
                Validators.required
            ])
        });
        this.registrationUser = new RegistrationUser();
        this.errorMessage = null;
    }

    onRegister() {
        this.errorMessage = null;
        if (this.fromNewUser.get('password').value !== this.fromNewUser.get('confirmPassword').value) {
            this.fromNewUser.controls['confirmPassword'].setErrors({
                "notUnique": true
            });
            return;
        }

        this.registrationUser.password = this.fromNewUser.get('password').value;
        this.registrationUser.email = this.fromNewUser.get('username').value;
        this.userRegistration.register(this.registrationUser, this);
    }

    cognitoCallback(message: string, result: any) {
        if (message != null) {
            this.errorMessage = message;
            console.log("result: " + this.errorMessage);
        } else {
            // success
            // move to the next step
            console.log("redirecting");
            this.router.navigate(['/g/email-confirm', result.user.username]);
        }
    }
}
