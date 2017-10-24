import { Store } from '@ngrx/store';
import { PortfolioActions } from './portfolio.actions';
import { Injectable } from '@angular/core';


export const getPortfolioState = (state) => {
    console.log(state);
    return state['portfolioStore'];
};


@Injectable()
export class PortfolioFacade {
    $portfolioState;

    constructor(private store: Store<any>) {
        this.$portfolioState = store.select(getPortfolioState);
    }

    public load(portfolioId) {
        this.store.dispatch({type: PortfolioActions.LOAD_PORTFOLIO, requestValues: portfolioId});
    }
}
