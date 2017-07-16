import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoinsListComponent } from './coins-list/coins-list.component';
import { CoinsService } from './coins.service';
import { CoinsManagerComponent } from './coins-manager/coins-manager.component';
import { TradeApiService } from './trade-api.service';
import { PriceFormatPipe } from './price-format.pipe';
import { CommonModule } from '@angular/common';
import { AuthServiceStub } from "./services/auth.service.stub";
import { FilterPipe } from './pipes/filter.pipe';

export const MainRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'coins', component: CoinsListComponent},
    {path: 'manage', component: CoinsManagerComponent},
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
        FilterPipe
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
