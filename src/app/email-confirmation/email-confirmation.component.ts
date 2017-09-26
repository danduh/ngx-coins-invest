import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserRegistrationService } from "../services/user-registration.ervice";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { DialogComponent } from "../components/dialog/dialog.component";
import { MdDialog } from "@angular/material";

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
                public dialog: MdDialog,
                public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.email = params['username'];

        });

        this.emailConfirmForm = new FormGroup({
            'email': new FormControl(this.email),
            'confirmationCode': new FormControl()
        });

        this.errorMessage = null;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onConfirmRegistration() {
        this.errorMessage = null;
        this.regService.confirmRegistration(this.emailConfirmForm.value.email, this.emailConfirmForm.value.confirmationCode, this);
    }

    cognitoCallback(message: string, result: any) {
        if (message != null) { //
            // error
            this.errorMessage = message;
            console.log('message: ' + this.errorMessage);
            this.showErrorMsg(message);
        } else {
            // success
            // move to the next step

            console.log('Moving to securehome');
            // this.configs.curUser = result.user;
            this.router.navigate(['/securehome']);
        }
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
