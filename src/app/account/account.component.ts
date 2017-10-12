import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AccountService, ProfileModel } from "../services/account.service";
import { ErrorHandlerClass } from "../components/extendable/error-handler.class";

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent extends ErrorHandlerClass implements OnInit {
    constructor() {
        super();
    }

    ngOnInit() {
    }


}
