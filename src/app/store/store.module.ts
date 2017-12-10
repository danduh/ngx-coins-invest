import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InvestmentsEffects, investmentsReducer, InvestmentsFacade } from './investments';
import { portfolioReducer } from './portfolio/portfolio.reducer';
import { PortfolioFacade } from './portfolio/portfolio.facade';
import { PortfolioEffects } from './portfolio/portfolio.effects';


@NgModule({
    providers: [
        PortfolioFacade,
        InvestmentsFacade
    ],
    imports: [
        StoreModule.forRoot({investmentsStore: investmentsReducer, portfolioStore: portfolioReducer}),
        EffectsModule.forRoot([PortfolioEffects, InvestmentsEffects])
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
