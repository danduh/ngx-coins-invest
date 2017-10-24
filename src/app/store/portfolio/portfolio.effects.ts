import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { PortfolioAction, PortfolioActions } from './portfolio.actions';
import { PortfolioService } from '../../services/portfolio.service';
import { InvestedCoinModel } from '../../models/common';
import { Injectable } from '@angular/core';

@Injectable()
export class PortfolioEffects {
    constructor(private actions$: Actions,
                private portfolioService: PortfolioService) {

    }

    @Effect() loadPortfolio$: Observable<PortfolioAction> = this.actions$.ofType(PortfolioActions.LOAD_PORTFOLIO)
        .mergeMap((action: PortfolioAction) => {
                return this.portfolioService.getPortfolioInvestments(action.requestValues)
                    .map((data: InvestedCoinModel[]) => {
                        return {
                            type: PortfolioActions.LOAD_PORTFOLIO_SUCCESS,
                            payload: data
                        };
                    });
            }
        );
}
