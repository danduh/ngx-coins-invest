import { Component, OnInit } from '@angular/core';
import { ErrorHandlerClass } from "../components/extendable/error-handler.class";

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent extends ErrorHandlerClass implements OnInit {
    public navTabs = [
        {path: 'profile', title: 'Profile'},
        {path: 'change-password', title: 'Change Password'}
    ];

    constructor() {
        super();
    }

    ngOnInit() {
    }


}
