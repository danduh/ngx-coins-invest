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
    profileForm: FormGroup;
    private profile: ProfileModel;

    constructor(private formBuilder: FormBuilder,
                private accountService: AccountService) {
        super();
    }

    ngOnInit() {
        this.createForm();
        this.accountService.getAccount()
            .subscribe(
                this.updateForm.bind(this),
                this.errorHandler.bind(this)
            );
    }

    updateForm(_profile: ProfileModel) {
        this.profile = _profile;
        this.profileForm.setValue({
            accountName: _profile.accountName,
            firstName: _profile.user.firstName,
            lastName: _profile.user.lastName
        });
    }

    createForm() {
        this.profileForm = this.formBuilder.group({
            accountName: '',
            firstName: '',
            lastName: ''
        });
    }

    onSave() {
        const formValue = this.profileForm.value;
        this.profile.accountName = formValue.accountName;
        this.profile.user.firstName = formValue.firstName;
        this.profile.user.lastName = formValue.lastName;
        this.accountService.updateAccount(this.profile)
            .subscribe((profile) => {
                console.log(profile);
            }, this.errorHandler.bind(this));
    }

}
