import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseClass } from "../classes/base.class";

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

    constructor(private auth: AuthService,
                private route: ActivatedRoute,
                private router: Router) {

    }

    ngOnInit() {
        if (this.route.snapshot.data['logout']) {
            this.auth.signOut();
        }
    }

    login() {
        this.error = null;

        if (this.changePswd) {
            if (this.password === this.newPassword) {
                this.auth.changePassword(this.password)
                    .subscribe(this.postLogin.bind(this), this.errorHandler.bind(this));
            }
        } else {
            this.auth.signIn(this.username, this.password)
                .subscribe(this.postLogin.bind(this), this.errorHandler.bind(this));
        }
    }

    postLogin(data) {
        if (data === 'changePassword') {
            this.changePswd = true;
            this.password = null;
            this.newPassword = null;
        } else {
            this.router.navigate(['/coins']);
        }

    }

    errorHandler(error) {
        this.error = error.data.error_description;
    }

}
