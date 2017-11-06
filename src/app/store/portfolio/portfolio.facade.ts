import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PortfolioActions } from './portfolio.actions';
import { PortfolioModel } from '../../services/portfolio.service';
import { Observable } from 'rxjs/Observable';

export const getPortfolioState = (state) => {
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
        });
        return portfolio;
    }

    public removePortfolio(portfolioId) {
        this.store.dispatch({type: PortfolioActions.DELETE_PORTFOLIO, requestValues: portfolioId});
    }

    public createPortfolio(portfolio: PortfolioModel): void {
        this.store.dispatch({type: PortfolioActions.CREATE_PORTFOLIO, payload: portfolio});
    }

    public getPortfolioByIdRx(portfolioId): Observable<PortfolioModel> {
        return Observable.create((observer) => {
            let portfolio = this.getPortfolioById(portfolioId);
            if (!!portfolio) {
                observer.next(portfolio);
                observer.complete();
            }
            this.$portfolioStore.subscribe((resp) => {
                if (!!resp) {
                    observer.next(this.getPortfolioById(portfolioId));
                    observer.complete();
                }
            });
            this.loadAll();
        });
    }

}
