import { Store } from '@ngrx/store';
import { InvestmentsActions } from './investments.actions';
import { Injectable } from '@angular/core';
import { InvestedCoinModel, InvestTotalsModel } from '../../models/common';
import { Observable } from 'rxjs/Observable';
import { MarketTickerService } from "../../services/market-ticker.service";
import { Subject } from "rxjs/Subject";

export const getInvestmentsState = (state) => {
    return state['investmentsStore'];
};


@Injectable()
export class InvestmentsFacade {
    public $investmentsState: Store<any>;
    public destroyed$ = new Subject();
    public subscription;

    _$totals = new Subject<InvestTotalsModel>();

    get $totals(): Observable<InvestTotalsModel> {
        return this._$totals.asObservable();
    }

    constructor(private store: Store<any>,
                private marketTickerService: MarketTickerService) {
        this.$investmentsState = store.select(getInvestmentsState);
    }

    public clearState() {
        this.store.dispatch({type: '@ngrx/store/init'});
    }

    public isEmpty() {
        return this.getCoinIds().length === 0;
    }

    public load(portfolioId) {
        this.store.dispatch({type: InvestmentsActions.LOAD_INVESTMENT, requestValues: portfolioId});
    }

    public removeInvestment(portfolioId, investId) {
        this.store.dispatch({type: InvestmentsActions.DELETE_INVESTMENT, requestValues: [portfolioId, investId]});
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
            return this.$investmentsState
                .subscribe((investments) => {
                    if (Array.isArray(investments) && investments.length > 0) {
                        observer.next(investments);
                        observer.complete();
                    }
                });
        });
    }

    public startTicker(curr) {
        let _T1 = this.marketTickerService.firstTick(curr, this.getCoinIds()).takeUntil(this.destroyed$);
        let _T2 = this.marketTickerService.subscribeToTicker(curr, this.getCoinIds()).takeUntil(this.destroyed$);

        this.subscription = Observable.concat(_T1, _T2)
            .takeUntil(this.destroyed$)
            .map((data) => {
                return data;
            })
            .subscribe(this.processTicker.bind(this));
    }

    // TODO <> Multiple request HAVE to be fixed
    public getTotalsOnly(curr, portfolioId) {
        return this.$investmentsState
            .filter((investments) => (Array.isArray(investments) && investments.length > 0))
            .take(1)
            .mergeMap((investments) => {
                console.log('dd')
                return this.marketTickerService.firstTick(curr, this.getCoinIds())
                    .map((ticker) => {
                        const coins = this.mergeCoinWithTicker(ticker, investments);
                        return this.calculateTotals(coins, true);
                    });
            });
    }

    private processTicker(ticker) {
        this.$investmentsState.take(1)
            .map(this.mergeCoinWithTicker.bind(this, ticker))
            .map(this.calculateTotals.bind(this))
            .subscribe((coins: InvestedCoinModel[]) => {
                this.store.dispatch({type: InvestmentsActions.PORTFOLIO_TICKER_TICK, payload: [...coins]});
            }).unsubscribe();

    }

    private mergeCoinWithTicker(ticker, coins) {
        if (Array.isArray(ticker)) {
            ticker.forEach((t) => {
                coins.forEach((c) => {
                    if (c.coinId === t.FROMSYMBOL) {
                        c.currentPrice = t.PRICE;
                    }
                });
            });
        } else {
            coins.forEach((c) => {
                if (c.coinId === ticker.FROMSYMBOL) {
                    c.currentPrice = ticker.PRICE;
                }
            });
        }
        return coins;
    }

    private calculateTotals(coins: InvestedCoinModel[], returnTotals = false) {
        const total: InvestTotalsModel = {
            open: 0,
            current: 0
        };

        coins.forEach((c) => {
            total.open += c.openValue;
            total.current += c.currentValue;
        });
        total.profit = total.current - total.open;
        total.profitPct = total.profit / total.open;
        this._$totals.next(total);

        return returnTotals ? total : coins;
    }
}
