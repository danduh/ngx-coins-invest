import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from "../../../shared/loader.service";

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss', '../../../shared/styles/simple-forms.scss']
})
export class ChangePasswordComponent implements OnInit {
    public changePasswordForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private loaderService: LoaderService) {

        this.changePasswordForm = new FormGroup({
            currentPassword: new FormControl(null, [
                Validators.required,
                Validators.minLength(8)
            ]),
            newPassword: new FormControl(null, [
                Validators.required,
                Validators.minLength(8)
            ]),
            confirmPassword: new FormControl(null, [
                Validators.required,
                Validators.minLength(8),
            ]),
        });
    }

    passwordConfirmationValidator() {

        if (!!this.changePasswordForm.get('newPassword')) {
            if (this.changePasswordForm.get('newPassword').value !== this.changePasswordForm.get('confirmPassword').value) {
                this.changePasswordForm.controls['confirmPassword'].setErrors({
                    "notUnique": true
                });
                return;
            }
        }

    }

    onChange() {
        this.passwordConfirmationValidator();
    }

    ngOnInit() {
    }

}
