import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoinsListComponent } from './coins-list/coins-list.component';
import { CoinsService } from './services/coins.service';
import { CoinsManagerComponent } from './coins-manager/coins-manager.component';
import { TradeApiService } from './services/trade-api.service';
import { PriceFormatPipe } from './pipes/price-format.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { CurrentStatusComponent } from './current-status/current-status.component';
import { AuthGuard } from "./services/auth-guard";
import { HttpClientModule } from "@angular/common/http";
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

const Titels = {}

export const MainRoutes: Routes = [
    {path: 'login', component: LoginComponent, data: {logout: false, title: 'Login'}},
    {path: 'logout', component: LoginComponent, canActivate: [OutOutletService], data: {logout: true, title: 'Login'}},
    {
        path: 'coins',
        component: CoinsListComponent,
        canActivate: [AuthGuard, OutOutletService],
        data: {title: 'Select Coin'}
    },
    {
        path: 'manage',
        component: CoinsManagerComponent,
        canActivate: [AuthGuard, OutOutletService],
        data: {title: 'Invest To'}
    },
    {
        path: 'portfolio',
        component: CurrentStatusComponent,
        canActivate: [AuthGuard, OutOutletService],
        data: {title: 'Portfolio'}
    },
    {
        path: 'portfolio/:viewType',
        component: CurrentStatusComponent,
        canActivate: [AuthGuard],
        data: {title: 'Portfolio'}
    },
    {path: 'investto/:coinId', component: CoinsManagerComponent, canActivate: [AuthGuard], data: {title: 'Invest To'}},
    {path: '', component: CoinsListComponent, canActivate: [AuthGuard], data: {title: 'Select Coin'}}
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
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
        FooterInvestComponent
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
        // {provide: AuthService, useClass: AuthServiceStub},
        ChartsService,
        AuthGuard,
        AuthService,
        CoinsService,
        TradeApiService,
        InvestedFacade,
        MarketTickerService,
        OutOutletService,
        WindowService
    ],
    bootstrap: [AppComponent],
    exports: [
        RouterModule,
        // PermissionsDirective
    ]
})
export class AppModule {
}
