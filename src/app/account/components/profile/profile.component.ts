import { Component, OnInit } from '@angular/core';
import { ErrorHandlerClass } from '../../../components/extendable/error-handler.class';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService, AccountModel } from '../../../services/account.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends ErrorHandlerClass implements OnInit {
    profileForm: FormGroup;
    private profile: AccountModel;
    url
    trustedUrl
    constructor(private formBuilder: FormBuilder,
                private accountService: AccountService,
                private sanitizer: DomSanitizer) {
        super();

        this.url = 'javascript:console.log("Inside DOM")';
        this.trustedUrl = sanitizer.bypassSecurityTrustUrl(this.url);
    }

    ngOnInit() {
        this.createForm();
        this.accountService.getAccount()
            .subscribe(
                this.updateForm.bind(this),
                this.errorHandler.bind(this)
            );
    }

    updateForm(_profile: AccountModel) {
        this.profile = _profile;
        this.profileForm.setValue({
            firstName: _profile.firstName,
            lastName: _profile.lastName
        });
    }

    createForm() {
        this.profileForm = this.formBuilder.group({
            firstName: '',
            lastName: ''
        });
    }

    onSave() {
        const formValue = this.profileForm.value;
        this.profile.firstName = formValue.firstName;
        this.profile.lastName = formValue.lastName;
        this.accountService.updateAccount(this.profile)
            .subscribe((profile) => {
                console.log(profile);
            }, this.errorHandler.bind(this));
    }
}
