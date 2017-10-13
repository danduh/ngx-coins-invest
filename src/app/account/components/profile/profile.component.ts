import { Component, OnInit } from '@angular/core';
import { ErrorHandlerClass } from '../../../components/extendable/error-handler.class';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService, ProfileModel } from '../../../services/account.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends ErrorHandlerClass implements OnInit {
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
