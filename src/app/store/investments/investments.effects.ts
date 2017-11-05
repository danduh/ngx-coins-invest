import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { PortfolioAction, InvestmentsActions } from './investments.actions';
import { PortfolioModel, PortfolioService } from '../../services/portfolio.service';
import { InvestedCoinModel } from '../../models/common';
import { Injectable } from '@angular/core';
import { MarketTickerService } from '../../services/market-ticker.service';

@Injectable()
export class InvestmentsEffects {
    constructor(private actions$: Actions,
                private marketTickerService: MarketTickerService,
                private portfolioService: PortfolioService) {

    }

    @Effect() loadPortfolio$: Observable<PortfolioAction> = this.actions$.ofType(InvestmentsActions.LOAD_INVESTMENT)
        .mergeMap((action: PortfolioAction) => {
                return this.portfolioService.getPortfolioInvestments(action.requestValues)
                    .map((data: InvestedCoinModel[]) => {
                        return {
                            type: InvestmentsActions.LOAD_INVESTMENTS_SUCCESS,
                            payload: data
                        };
                    });
            }
        );

    @Effect() deletePortfolio$: Observable<PortfolioAction> = this.actions$.ofType(InvestmentsActions.DELETE_PORTFOLIO)
        .mergeMap((action: PortfolioAction) => {
                return this.portfolioService.deletePortfolio(action.requestValues)
                    .map((data: PortfolioModel[]) => {
                        return {
                            type: InvestmentsActions.DELETE_PORTFOLIO_SUCCESS,
                            payload: data
                        };
                    });
            }
        );

    @Effect() deleteInvestment$: Observable<PortfolioAction> = this.actions$.ofType(InvestmentsActions.DELETE_INVESTMENT)
        .mergeMap((action: PortfolioAction) => {

                return this.portfolioService.removeInvestment(action.requestValues[0], action.requestValues[1])
                    .map((data: InvestedCoinModel[]) => {
                        return {
                            type: InvestmentsActions.DELETE_INVESTMENT_SUCCESS,
                            payload: data
                        };
                    });
            }
        );

    // @Effect() tickPortfolio$: Observable<PortfolioAction> = this.actions$.ofType(InvestmentsActions.PORTFOLIO_TICKER_TICK)
    //     .mergeMap((action: PortfolioAction) => {
    //             return this.marketTickerService.subscribeToTicker(action.requestValues.baseCurrency, action.requestValues.coinIds)
    //
    //             // return this.portfolioService.getPortfolioInvestments(action.requestValues)
    //                 .map((data: InvestedCoinModel[]) => {
    //                     console.log(data)
    //                     return {
    //                         type: InvestmentsActions.PORTFOLIO_TICKER_SUCCESS,
    //                         // payload: data
    //                     };
    //                 });
    //         }
    //     );
}
