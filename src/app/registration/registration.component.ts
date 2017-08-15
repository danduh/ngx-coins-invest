import { Component, OnInit } from '@angular/core';
import { AppUser } from "../models/common";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { MdDialog, MdDialogConfig } from "@angular/material";
import { DialogComponent } from "../components/dialog/dialog.component";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
    newUser: AppUser;
    fromNewUser: FormGroup;
    pswdMain: string;
    pswdConfirm: string;

    constructor(private auth: AuthService,
                private dialog: MdDialog,) {
        this.newUser = new AppUser({}, '');
    }

    ngOnInit() {
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
    }

    register() {
        if (this.fromNewUser.get('password').value !== this.fromNewUser.get('confirmPassword').value) {
            this.fromNewUser.controls['confirmPassword'].setErrors({
                "notUnique": true
            });
            return;
        }

        this.newUser.username = this.fromNewUser.get('username').value;
        this.auth.register(this.newUser, this.fromNewUser.get('password').value)
            .subscribe((res) => {
                this.openCodeConfirmation();
            }, (resp) => {
                console.log(resp);
            });
    }

    openCodeConfirmation() {
        let dialogConf: MdDialogConfig = {
            data: {
                title: 'Email Confirmation',
                message: 'Please Insert code from email.',
                input: true
            }
        };

        let dialogRef = this.dialog.open(DialogComponent, dialogConf);
        dialogRef.afterClosed().subscribe((code) => {
            this.auth.confirmEmail(code)
                .subscribe((resp) => {
                    console.log(resp)
                }, (resp) => {
                    console.log(resp)
                })
        }, (resp) => {
            console.log(resp)
        });
    }
}
