import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
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
import { AuthServiceStub } from "./services/auth.service.stub";
import { FilterPipe } from './pipes/filter.pipe';
import { CurrentStatusComponent } from './current-status/current-status.component';

export const MainRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'coins', component: CoinsListComponent},
    {path: 'manage', component: CoinsManagerComponent},
    {path: 'current-status', component: CurrentStatusComponent},
    {path: 'investto/:coinId', component: CoinsManagerComponent},
    {path: '', component: CoinsListComponent}
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
        CurrentStatusComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule.forRoot(MainRoutes),
        AngularMaterialModule
    ],
    providers: [
        {provide: AuthService, useClass: AuthServiceStub},
        // AuthService,
        CoinsService,
        TradeApiService
    ],
    bootstrap: [AppComponent],
    exports: [RouterModule]
})
export class AppModule {
}
