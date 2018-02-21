import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InvestmentsEffects, investmentsReducer, InvestmentsFacade } from './investments';
import { portfolioReducer } from './portfolio/portfolio.reducer';
import { PortfolioFacade } from './portfolio/portfolio.facade';
import { PortfolioEffects } from './portfolio/portfolio.effects';
import { notificationsReducer } from "./notifications/reducer";
import { NotificationsEffects } from "./notifications/effects";
import { NotificationsService } from "../services/notifications.service";


@NgModule({
    providers: [
        PortfolioFacade,
        InvestmentsFacade,
        NotificationsService
    ],
    imports: [
        StoreModule.forRoot({
            investmentsStore: investmentsReducer,
            portfolioStore: portfolioReducer,
            notificationsStore: notificationsReducer
        }),
        EffectsModule.forRoot([PortfolioEffects, InvestmentsEffects, NotificationsEffects])
    ],
    exports: [
        StoreModule,
        EffectsModule
    ]
})
export class StoreManagementModule {
    // static forRoot(): ModuleWithProviders {
    //     return {
    //         ngModule: StoreManagementModule,
    //     };
    // }
}
