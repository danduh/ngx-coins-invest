import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PortfolioEffects } from './portfolio/portfolio.effects';
import { portfolioReducer } from './portfolio/portfolio.reducer';
import { PortfolioFacade } from './portfolio/portfolio.facade';

const STORE_PROVIDERS = []
// export interface AppState {
//     bagState: BagState;
// }

@NgModule({
    providers: [],
    imports: [
        StoreModule.forRoot({portfolioStore: portfolioReducer}),
        EffectsModule.forRoot([PortfolioEffects])
    ],
    exports: [
        StoreModule,
        EffectsModule
    ]
})
export class StoreManagementModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: StoreManagementModule,
            providers: [PortfolioFacade]

        };
    }
}
