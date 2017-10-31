import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PortfolioActions } from './portfolio.actions';
import { PortfolioModel } from '../../services/portfolio.service';

export const getPortfolioState = (state) => {
    console.log(state);
    return state['portfolioStore'];
};

@Injectable()
export class PortfolioFacade {
    $portfolioStore;

    constructor(private store: Store<any>) {
        this.$portfolioStore = store.select(getPortfolioState);
    }

    public loadAll() {
        this.store.dispatch({type: PortfolioActions.LOAD_PORTFOLIOS});
    }

    public getPortfolioById(portfolioId: number): PortfolioModel {
        portfolioId = +portfolioId;
        let portfolio: PortfolioModel;
        this.$portfolioStore.subscribe((portfolios) => {
            if (!!portfolios) {
                portfolio = portfolios.find((p) => p.id === portfolioId);
            }
            /**
             * TODO: should to find way to get portfolio by Id...  probable move call from component to resolver...
             */
        });
        return portfolio;
    }

}
