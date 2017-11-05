import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserRegistrationService } from "../services/user-registration.ervice";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DialogComponent } from "../components/dialog/dialog.component";
import { MatDialog } from "@angular/material";
import { AccountService } from "../services/account.service";
import { UserLoginService } from '../services/user-login.service';

@Component({
    selector: 'app-email-confirmation',
    templateUrl: './email-confirmation.component.html',
    styleUrls: ['./email-confirmation.component.sass']
})
export class EmailConfirmationComponent implements OnInit, OnDestroy {
    confirmationCode: string;
    email: string;
    errorMessage: string;
    private sub: any;
    emailConfirmForm: FormGroup;

    constructor(public regService: UserRegistrationService,
                public router: Router,
                public dialog: MatDialog,
                public route: ActivatedRoute,
                private userLoginService: UserLoginService,
                private accountService: AccountService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.email = params['username'];

        });

        this.emailConfirmForm = new FormGroup({
            email: new FormControl(this.email, [Validators.required]),
            password: new FormControl(null, [Validators.required]),
            confirmationCode: new FormControl(null, [Validators.required])
        });

        this.errorMessage = null;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onConfirmRegistration() {
        this.errorMessage = null;
        this.regService.rxConfirmRegistration(this.emailConfirmForm.value.email, this.emailConfirmForm.value.confirmationCode)
            .mergeMap((resp) => {
                console.log('MERGE_1');
                return this.userLoginService.rxAuthenticate(this.emailConfirmForm.value.email, this.emailConfirmForm.value.password);
            })
            .mergeMap((resp) => {
                console.log('MERGE_2');
                return this.accountService.createAccountUser(this.emailConfirmForm.value);
            })
            .subscribe((resp) => {
                console.log('MERGE_3');
                this.router.navigate(['/g/login']);
            }, (err) => {
                this.errorMessage = err.message;
                this.showErrorMsg(this.errorMessage);
            });
    }

    resendCode() {
        this.regService.rxResendCode(this.emailConfirmForm.value.email)
            .subscribe((res) => {
                console.log(res);
            }, (res) => {
                console.log(res);
            });
    }

    showErrorMsg(msg) {
        let dialogRef = this.dialog.open(DialogComponent, {
            width: 'auto',
            data: {
                input: false,
                message: msg,
                options: [
                    {
                        value: true,
                        label: 'OK'
                    }
                ]
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}
