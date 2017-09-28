import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { LoginComponent, LogoutComponent } from './login/login.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoinsListComponent } from './coins-list/coins-list.component';
import { CoinsService } from './services/coins.service';
import { CoinsManagerComponent } from './coins-manager/coins-manager.component';
import { PriceFormatPipe } from './pipes/price-format.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { CurrentStatusComponent } from './current-status/current-status.component';
import { AuthGuard } from "./services/auth-guard";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ChartsService } from "./services/charts/charts.service";
import { CoinCardComponent } from './components/coin-card/coin-card.component';
import { ViewListModeComponent } from './components/view-list-mode/view-list-mode.component';
import { ViewCardModeComponent } from './components/view-card-mode/view-card-mode.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { PermissionsDirective } from "./directives/permissions.directive";
import { ListModeItemComponent } from './components/list-mode-item/list-mode-item.component';
import { StoreModule } from '@ngrx/store';
import { investedReducer } from "./states/invested-reducer";
import { InvestedFacade } from "./states/invested-facade";
import { MarketTickerService } from "./services/market-ticker.service";
import { FooterInvestComponent } from './components/footer-invest/footer-invest.component';
import { OutOutletService } from "./services/out-outler.service";
import { WindowService } from "./services/window.service";
import { AccountComponent } from './account/account.component';
import { RegistrationComponent } from './registration/registration.component';
import { AccountService } from "./services/account.service";
import { UserRegistrationService } from "./services/user-registration.ervice";
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { CognitoUtil } from "./services/cognito-utility.service";
import { UserLoginService } from "./services/user-login.service";
import { ProtfoliosComponent } from './portfolios/portfolios.component';
import { PortfolioService } from "app/services/portfolio.service";
import { CognitoAuthInterceptor } from "./services/utils";

export const MainRoutes: Routes = [
    {path: 'login', component: LoginComponent, data: {logout: false, title: 'Login'}},
    {path: 'logout', component: LogoutComponent, canActivate: [OutOutletService], data: {logout: true, title: 'Login'}},
    {
        path: 'register',
        component: RegistrationComponent,
        canActivate: [OutOutletService],
        data: {logout: true, title: 'Sign Up'},
    },
    {
        path: 'email-confirm',
        component: EmailConfirmationComponent,
        canActivate: [OutOutletService],
        data: {logout: true, title: 'Email Confirmation'},
    },
    {
        path: 'email-confirm/:username',
        component: EmailConfirmationComponent,
        canActivate: [OutOutletService],
        data: {logout: true, title: 'Email Confirmation'},
    },
    {
        path: 'account',
        component: AccountComponent,
        canActivate: [AuthGuard, OutOutletService],
        data: {title: 'Account'}
    },
    {
        path: 'coins',
        component: CoinsListComponent,
        canActivate: [AuthGuard, OutOutletService],
        data: {title: 'Select Coin'}
    },
    {
        path: 'portfolio',
        component: ProtfoliosComponent,
        canActivate: [AuthGuard, OutOutletService],
        data: {title: 'Select Portfolio'}
    },
    {
        path: 'investto/:coinId',
        component: CoinsManagerComponent,
        canActivate: [AuthGuard],
        data: {title: 'Invest To', groups: ['investors']}
    },
    {path: '', component: CoinsListComponent, canActivate: [AuthGuard], data: {title: 'Select Coin'}}
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LogoutComponent,
        HeaderComponent,
        CoinsListComponent,
        CoinsManagerComponent,
        PriceFormatPipe,
        FilterPipe,
        CurrentStatusComponent,
        CoinCardComponent,
        ViewListModeComponent,
        ViewCardModeComponent,
        SideMenuComponent,
        PermissionsDirective,
        ListModeItemComponent,
        FooterInvestComponent,
        AccountComponent,
        RegistrationComponent,
        EmailConfirmationComponent,
        ProtfoliosComponent
    ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule.forRoot(MainRoutes),
        AngularMaterialModule,
        StoreModule.forRoot({investedStore: investedReducer})
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CognitoAuthInterceptor,
            multi: true
        },
        PortfolioService,
        UserLoginService,
        CognitoUtil,
        UserRegistrationService,
        AccountService,
        ChartsService,
        AuthGuard,
        AuthService,
        CoinsService,
        InvestedFacade,
        MarketTickerService,
        OutOutletService,
        WindowService
    ],
    bootstrap: [AppComponent],
    exports: [
        RouterModule,
        FormsModule
        // PermissionsDirective
    ]
})
export class AppModule {
}
