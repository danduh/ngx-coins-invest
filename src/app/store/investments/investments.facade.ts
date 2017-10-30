import { Store } from '@ngrx/store';
import { InvestmentsActions } from './investments.actions';
import { Injectable } from '@angular/core';


export const getInvestmentsState = (state) => {
    console.log(state);
    return state['investmentsStore'];
};


@Injectable()
export class InvestmentsFacade {
    $investmentsState;

    constructor(private store: Store<any>) {
        this.$investmentsState = store.select(getInvestmentsState);
    }

    public load(portfolioId) {
        this.store.dispatch({type: InvestmentsActions.LOAD_INVESTMENT, requestValues: portfolioId});
    }

    public getTick(baseCurrency, coinIds) {
        this.store.dispatch({type: InvestmentsActions.PORTFOLIO_TICKER_TICK, requestValues: {baseCurrency, coinIds}});
    }
}
