import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { AppUser } from "../models/common";

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    appUser: AppUser;

    constructor(private auth: AuthService) {
        this.appUser = this.auth.appUser;
    }

    ngOnInit() {
        console.log(this.appUser);
    }

}
