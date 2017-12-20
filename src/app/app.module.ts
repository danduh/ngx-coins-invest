import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AuthGuard } from "./services/auth-guard";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ChartsService } from "./services/charts/charts.service";
import { CoinCardComponent } from './components/coin-card/coin-card.component';
import { ViewCardModeComponent } from './components/view-card-mode/view-card-mode.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { PermissionsDirective } from "./directives/permissions.directive";
import { ListModeItemComponent } from './components/list-mode-item/list-mode-item.component';
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
import { PortfolioService } from "./services/portfolio.service";
import { CognitoAuthInterceptor } from "./services/utils";
import { PortfolioCardComponent } from './components/portfolio-card/portfolio-card.component';
import { PortfolioInvestmentsComponent } from './portfolio-invetments/portfolio-invetments.component';
import { GraphInCardComponent } from './components/graph-in-card/graph-in-card.component';
import { IconsModule } from "./shared/svg-icons/icons.module";
import { ConfigService } from "./services/config.service";
import { CurrencySelectorComponent } from './components/currency-selector/currency-selector.component';
import { LoaderService } from "./shared/loader.service";
import { PoloniexWssService } from './services/external-api/poloniex-wss.service';
import { GuestComponent } from './guest/guest.component';
import { MainComponent } from './main/main.component';
import { StoreManagementModule } from './store';
import { PortfolioResolver } from './services/resolvers/portfolio.resolver';
import { InvestmentsResolver } from './services/resolvers/investments.resolver';
import { environment } from "../environments/environment";
import { ServiceWorkerModule } from "@angular/service-worker";
import { Angulartics2Module } from "angulartics2";
import { Angulartics2GoogleAnalytics } from "angulartics2/ga";
import { PushNotificationsService } from "./services/service-workers/push-notifications";
import { NotificationsComponent } from './notifications/notifications.component';
import { ConfigResolver } from "./services/resolvers/config.resolver";
import { AlertsViewComponent } from './notifications/components/alerts-view/alerts-view.component';
import { AlertsEditComponent } from './notifications/components/alerts-edit/alerts-edit.component';


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
        path: 'app',
        component: MainComponent,
        // resolve: {
        //     portfolios: ConfigResolver
        // },
        children: [
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
                data: {title: 'Select Portfolio'},
                resolve: {
                    portfolios: PortfolioResolver,
                }
            },
            {
                path: 'portfolio/:portfolioId',
                component: PortfolioInvestmentsComponent,
                canActivate: [AuthGuard, OutOutletService],
                data: {title: 'Portfolio Investments'},
                resolve: {
                    currentPortfolio: PortfolioResolver,
                    investments: InvestmentsResolver
                }
            },
            {path: 'alerts', loadChildren: './notifications/notifications.module#NotificationsModule'},
            {
                path: 'investto/:coinId/:baseCurrency',
                component: CoinsManagerComponent,
                canActivate: [AuthGuard],
                data: {title: 'Invest To', groups: ['investors']},
                resolve: {
                    portfolios: PortfolioResolver
                }
            },
            {path: '', component: CoinsListComponent, canActivate: [AuthGuard], data: {title: 'Select Coin'}}
        ]
    },
];
console.log(environment.production, 1);

// export function loadConfig(config: ConfigService) {
//     return () => config.get().toPromise();
// }

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
        CoinCardComponent,
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
        BrowserModule,
        ServiceWorkerModule.register('./ngsw-worker.js'),
        ChartsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        IconsModule.forRoot({basePath: 'assets/SVG'}),
        RouterModule.forRoot(MainRoutes),
        AngularMaterialModule,
        StoreManagementModule,
        Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
        // environment.production ? StoreDevtoolsModule.instrument({
        //     maxAge: 25
        // }) : []

        // StoreModule.forRoot({portfolioStore: investmentsReducer}),
        // EffectsModule.forRoot([InvestmentsEffects])
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CognitoAuthInterceptor,
            multi: true
        },
        ConfigResolver,
        PushNotificationsService,
        InvestmentsResolver,
        PortfolioResolver,
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
    constructor(private applicationRef: ApplicationRef) {
        this.applicationRef.isStable.subscribe((ready) => {
            console.log(ready);
        }, (ready) => {
            console.error(ready);
        });
    }
}
