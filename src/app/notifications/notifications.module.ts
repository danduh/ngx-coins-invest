import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from "./notifications.component";
import { AlertsViewComponent } from "./components/alerts-view/alerts-view.component";
import { AlertsEditComponent } from "./components/alerts-edit/alerts-edit.component";
import { RouterModule, Routes } from "@angular/router";
import { ConfigResolver } from "../services/resolvers/config.resolver";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { NotificationsService } from "../services/notifications.service";


export const AccountRoutes: Routes = [
    {
        path: '',
        component: NotificationsComponent,
        data: {
            title: 'Notifications Settings'
        },
        resolve: {
            config: ConfigResolver
        },
        children: [
            {path: '', redirectTo: 'view', pathMatch: 'full'},
            {
                path: 'view',
                component: AlertsViewComponent,
                resolve: {
                    config: ConfigResolver
                },
                data: {
                    title: 'Current Alerts'
                },
            },
            {
                path: 'edit',
                component: AlertsEditComponent,
                resolve: {
                    config: ConfigResolver
                },
                data: {
                    title: 'Current Alerts'
                },
            },
        ]
    },
];

@NgModule({
    imports: [
        ReactiveFormsModule,
        AngularMaterialModule,
        CommonModule,
        RouterModule.forChild(AccountRoutes),
    ],
    declarations: [
        NotificationsComponent,
        AlertsViewComponent,
        AlertsEditComponent,
    ]
})
export class NotificationsModule {
}
