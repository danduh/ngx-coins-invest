import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
    public username: string;
    public password: string;
    public error: string = null;

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
        this.auth.signIn(this.username, this.password)
            .subscribe(this.postLogin.bind(this), this.errorHandler.bind(this));
    }

    postLogin(data) {
        this.router.navigate(['/coins']);
        console.log(data)
    }

    errorHandler(error) {
        this.error = error.data.error_description;
    }

}
