import { NgModule } from '@angular/core';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AccountComponent } from './account.component';
import { NotificationsComponent } from './components/notifications/notifications.component';


export const AccountRoutes: Routes = [
    {
        path: '',
        component: AccountComponent,
        data: {
            logout: false,
            title: 'Login'
        },

        children: [
            {path: '', redirectTo: 'profile', pathMatch: 'full'},
            {
                path: 'change-password',
                component: ChangePasswordComponent,
                data: {logout: true, title: 'Login'},

            },
            {
                path: 'profile',
                component: ProfileComponent,
                data: {logout: false, title: 'Login'},

            },
            {
                path: 'notifications',
                component: NotificationsComponent,
                data: {logout: false, title: 'Login'},

            },
        ]
    },
];

@NgModule({
    declarations: [
        ProfileComponent,
        ChangePasswordComponent,
        AccountComponent,
        NotificationsComponent

    ],
    imports: [
        RouterModule.forChild(AccountRoutes),
        FormsModule,
        ReactiveFormsModule,
        AngularMaterialModule
    ],
    providers: [AccountService],
    exports: [
        RouterModule
    ]
})
export class AccountModule {
}
