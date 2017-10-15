import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog } from "@angular/material";
import { DialogComponent } from "../components/dialog/dialog.component";
import { UserLoginService } from "../services/user-login.service";
import { LoggedInCallback } from "../services/cognito-utility.service";
import { AccountService } from "../services/account.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
    public username: string;
    public password: string = null;
    public newPassword: string = null;
    public error: string = null;
    public changePswd = false;

    constructor(public dialog: MdDialog,
                private route: ActivatedRoute,
                public userService: UserLoginService,
                private accountService: AccountService,
                private router: Router) {

    }

    ngOnInit() {
        this.error = null;
        console.log("Checking if the user is already authenticated. If so, then redirect to the secure site");
        // this.userService.isAuthenticated(this);
        this.userService.rxIsAuthenticated()
            .subscribe((response) => {
                this.router.navigate(['/app/portfolio'])
                    .then(
                        function () {
                            console.log('navigate success');
                        },
                        function () {
                            console.log('navigate failure');
                        }
                    );
            }, (err) => {
                console.log(err);
            });
    }

    cognitoCallback(message: string, result: any) {
        if (message != null) { // error
            this.error = message;
            console.log("result: " + this.error);
            if (this.error === 'User is not confirmed.') {
                console.log("redirecting");
                this.router.navigate(['/home/confirmRegistration', this.username]);
            } else if (this.error === 'User needs to set password.') {
                console.log("redirecting to set new password");
                this.router.navigate(['/home/newPassword']);
            }
        } else { //  success
            this.accountService.getOrCreate()
                .subscribe((response) => {
                    this.router.navigate(['/app/portfolio'])
                        .then(
                            function () {
                                console.log('navigate success');
                            },
                            function () {
                                console.log('navigate failure');
                            }
                        );
                });
        }
    }

    authenticationCallback(message: string, result: any) {
        if (message != null) { // error
            this.error = message;
            console.log("result: " + this.error);
            if (this.error === 'User is not confirmed.') {
                console.log("redirecting");
                this.router.navigate(['/home/confirmRegistration', this.username]);
            } else if (this.error === 'User needs to set password.') {
                console.log("redirecting to set new password");
                this.router.navigate(['/home/newPassword']);
            }
        } else { //  success
            this.router.navigate(['/app/portfolio'])
                .then(
                    function () {
                        console.log('navigate success');
                    },
                    function () {
                        console.log('navigate failure');
                    }
                );
        }
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (isLoggedIn) {
            this.router.navigate(['/portfolio']);
        }
    }

    login() {
        if (this.username == null || this.password == null) {
            this.error = "All fields are required";
            return;
        }

        this.userService.rxAuthenticate(this.username, this.password)
            .subscribe(
                this.authSuccessHandler.bind(this),
                this.authErrorHandler.bind(this)
            );

        this.error = null;

    }

    authSuccessHandler(result) {
        switch (result) {
            case 'onSuccess':
                this.postLoginRedirect();
                break;
            default:
                console.log(result);
        }
    }

    authErrorHandler(err) {

        switch (err.code) {
            case 'UserNotFoundException':
                this.error = err.message;
                break;
            case 'UserNotConfirmedException':
                this.error = err.message;
                break;
            default:
                console.log('SomethingWrong');
                console.log(this.error);
                break;
        }
    }

    postLogin(data) {
        if (data === 'changePassword') {
            this.changePswd = true;
            this.password = null;
            this.newPassword = null;
        } else {
            this.postLoginRedirect();
        }

    }

    postLoginRedirect() {
        this.router.navigate(['/app/portfolio'])
            .then((resp) => console.log(resp));
    }

    errorHandler(error) {
        this.error = error.data.error_description;
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


@Component({
    selector: 'app-logout',
    template: ''
})
export class LogoutComponent implements LoggedInCallback {

    constructor(public router: Router,
                public userService: UserLoginService) {
        this.userService.isAuthenticated(this)
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (isLoggedIn) {
            this.userService.logout();
            this.router.navigate(['/g/login']);
        }

        this.router.navigate(['g//login']);
    }
}
