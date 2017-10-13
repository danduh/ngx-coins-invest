import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, LogoutComponent } from './login/login.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HeaderComponent } from './components/header/header.component';
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
import { RegistrationComponent } from './registration/registration.component';
import { AccountService } from "./services/account.service";
import { UserRegistrationService } from "./services/user-registration.ervice";
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { CognitoUtil } from "./services/cognito-utility.service";
import { UserLoginService } from "./services/user-login.service";
import { PortfoliosComponent } from './portfolios/portfolios.component';
import { PortfolioService } from "app/services/portfolio.service";
import { CognitoAuthInterceptor } from "./services/utils";
import { PortfolioCardComponent } from './components/portfolio-card/portfolio-card.component';
import { PortfolioInvestmentsComponent } from './portfolio-invetments/portfolio-invetments.component';
import { GraphInCardComponent } from './components/graph-in-card/graph-in-card.component';
import { IconsModule } from "./shared/svg-icons/icons.module";
import { ConfigService } from "./services/config.service";
import { CurrencySelectorComponent } from './components/currency-selector/currency-selector.component';
import { LoaderService } from "./shared/loader.service";
import { PoloniexWssService } from './services/external-api/poloniex-wss.service';
import { ProfileComponent } from './account/components/profile/profile.component';
import { ChangePasswordComponent } from './account/components/change-password/change-password.component';
import { GuestComponent } from './guest/guest.component';
import { MainComponent } from './main/main.component';

export const MainRoutes: Routes = [
    {path: '', redirectTo: '/g/login', pathMatch: 'full'},
    {
        path: 'g',
        component: GuestComponent,
        children: [{path: 'login', component: LoginComponent, data: {logout: false, title: 'Login'}},
            {
                path: 'logout',
                component: LogoutComponent,
                canActivate: [OutOutletService],
                data: {logout: true, title: 'Login'}
            },
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
        ]
    },
    {
        path: 'app', component: MainComponent, children: [
        {path: 'account', loadChildren: './account/account.module#AccountModule'},
        {
            path: 'coins',
            component: CoinsListComponent,
            canActivate: [AuthGuard, OutOutletService],
            data: {title: 'Select Coin'}
        },
        {
            path: 'portfolio',
            component: PortfoliosComponent,
            canActivate: [AuthGuard, OutOutletService],
            data: {title: 'Select Portfolio'}
        },
        {
            path: 'portfolio/:portfolioId',
            component: PortfolioInvestmentsComponent,
            canActivate: [AuthGuard, OutOutletService],
            data: {title: 'Portfolio Investments'}
        },
        {
            path: 'investto/:coinId/:baseCurrency',
            component: CoinsManagerComponent,
            canActivate: [AuthGuard],
            data: {title: 'Invest To', groups: ['investors']}
        },
        {path: '', component: CoinsListComponent, canActivate: [AuthGuard], data: {title: 'Select Coin'}}
    ]
    },
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
        RegistrationComponent,
        EmailConfirmationComponent,
        PortfoliosComponent,
        PortfolioCardComponent,
        PortfolioInvestmentsComponent,
        GraphInCardComponent,
        CurrencySelectorComponent,
        GuestComponent,
        MainComponent,
    ],
    imports: [
        ChartsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        IconsModule.forRoot({basePath: 'assets/SVG'}),
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
        PoloniexWssService,
        ConfigService,
        PortfolioService,
        UserLoginService,
        CognitoUtil,
        UserRegistrationService,
        AccountService,
        ChartsService,
        AuthGuard,
        CoinsService,
        InvestedFacade,
        MarketTickerService,
        OutOutletService,
        WindowService,
        LoaderService
    ],
    bootstrap: [AppComponent],
    exports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        // PermissionsDirective
    ]
})
export class AppModule {
}
