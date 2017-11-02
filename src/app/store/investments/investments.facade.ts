import {Store} from '@ngrx/store';
import {InvestmentsActions} from './investments.actions';
import {Injectable} from '@angular/core';
import {InvestedCoinModel} from '../../models/common';
import {Observable} from 'rxjs/Observable';
import {MarketTickerService} from "../../services/market-ticker.service";


export const getInvestmentsState = (state) => {
    return state['investmentsStore'];
};


@Injectable()
export class InvestmentsFacade {
    $investmentsState;

    constructor(private store: Store<any>,
                private marketTickerService: MarketTickerService) {
        this.$investmentsState = store.select(getInvestmentsState);
    }

    public load(portfolioId) {
        this.store.dispatch({type: InvestmentsActions.LOAD_INVESTMENT, requestValues: portfolioId});
    }

    public getCoinIds(): string[] {
        let coinIds;
        this.$investmentsState.subscribe((coins: InvestedCoinModel[]) => {
            if (!!coins) {
                coinIds = coins.map((c) => c.coinId);
            } else {
                coinIds = [];
            }
        });
        return coinIds;
    }

    public getInvestmentsRx(portfolioId): Observable<InvestedCoinModel[]> {
        return Observable.create((observer) => {
            this.$investmentsState.subscribe((investments) => {
                if (!!investments) {
                    observer.next(investments);
                    observer.complete();
                } else {
                    this.load(portfolioId);
                }
            });
        });
    }

    public startTicker(curr) {
        this.marketTickerService.subscribeToTicker(curr, this.getCoinIds())
            .subscribe(this.processTicker.bind(this));
    }

    private processTicker(ticker) {

        this.$investmentsState.take(1)
            .map(this.mergeCoinWithTicker.bind(this, ticker))
            .subscribe((coins: InvestedCoinModel[]) => {
                this.store.dispatch({type: InvestmentsActions.PORTFOLIO_TICKER_TICK, payload: [...coins]});
            });

    }

    private mergeCoinWithTicker(ticker, coins) {
        let coin = coins.find((c) => c.coinId === ticker.FROMSYMBOL);
        coin.currentPrice = ticker.PRICE;
        return coins;
    }
}
