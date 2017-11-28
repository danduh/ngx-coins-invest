import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PortfolioActions } from './portfolio.actions';
import { PortfolioModel, PortfolioService } from '../../services/portfolio.service';
import { Observable } from 'rxjs/Observable';
import { MarketTickerService } from "../../services/market-ticker.service";
import { LoaderService } from "../../shared/loader.service";
import { InvestmentsFacade } from "../investments/investments.facade";

export const getPortfolioState = (state) => {
    return state['portfolioStore'];
};

@Injectable()
export class PortfolioFacade {
    $portfolioStore;

    constructor(private store: Store<any>,
                private marketTickerService: MarketTickerService,
                private loaderService: LoaderService,
                private investmentsFacade: InvestmentsFacade,
                private portfolioService: PortfolioService) {
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

    public getTotalsOnly(curr, portfolioId, valueForLoader = null) {
        return this.portfolioService.getPortfolioInvestments(portfolioId)
            .mergeMap((investments) => {
                if (investments.length === 0) {
                    return Observable.of([]);
                }
                const coinIds = investments.map((c) => c.coinId);

                return this.marketTickerService.firstTick(curr, coinIds)
                    .map((ticker) => {
                        console.log('valueForLoader', valueForLoader);
                        if (valueForLoader !== null) {
                            this.loaderService.isActive = valueForLoader;
                        }
                        const coins = InvestmentsFacade.mergeCoinWithTicker(ticker, investments);
                        return this.investmentsFacade.calculateTotals(coins, true);
                    });
            })
            // .share();
    }


}
