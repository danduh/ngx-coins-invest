import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { MarketTickerService } from '../../services/market-ticker.service';
import { PortfolioModel, PortfolioService } from '../../services/portfolio.service';
import { Observable } from 'rxjs/Observable';
import { PortfolioAction, PortfolioActions } from './portfolio.actions';

@Injectable()
export class PortfolioEffects {
    constructor(private actions$: Actions,
                private marketTickerService: MarketTickerService,
                private portfolioService: PortfolioService) {

    }

    @Effect() loadPortfolio$: Observable<PortfolioAction> = this.actions$.ofType(PortfolioActions.LOAD_PORTFOLIOS)
        .mergeMap((action: PortfolioAction) => {
                return this.portfolioService.getAllPortfolios()
                    .map((data: PortfolioModel[]) => {
                        return {
                            type: PortfolioActions.LOAD_PORTFOLIO_SUCCESS,
                            payload: data
                        };
                    });
            }
        );

}
