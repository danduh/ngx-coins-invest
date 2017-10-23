import { Injectable } from "@angular/core";
import { Store, Action } from "@ngrx/store";
import { CoinsService } from "../services/coins.service";
import { MarketTickerService } from "../services/market-ticker.service";
import { Observable } from "rxjs/Observable";
import { SET_INVESTED_COINS } from "./invested-reducer";
import { InvestedCoinModel, InvestTotalsModel } from "../models/common";
import { Subscription } from "rxjs/Subscription";
import { isNullOrUndefined } from "util";

@Injectable()
export class InvestedFacade {
    $currentInvested;
    ticksLoaderSubscriber: Subscription;

    constructor(private store: Store<any>,
                private coinsService: CoinsService,
                private tickerService: MarketTickerService) {
        this.$currentInvested = this.store.select('investedStore');
    }

    subscribeToState() {
        return this.$currentInvested;
    }

    loadInvestedCoins() {
        this.coinsService.getInvestedList()
            .subscribe((data) => {
                this.setInvState(data);
            });
    }

    getCurrentState() {
        let coinsList;
        this.$currentInvested.subscribe((list) => {
            coinsList = list;
        });

        return coinsList;
    }

    getSymbolsInState() {
        let labels;
        this.$currentInvested.subscribe((list) => {
            labels = list.map((c) => c.metaData.symbol);
        });
        return labels;
    }

    setInvState(data) {
        let action = {
            type: SET_INVESTED_COINS,
            payload: data
        };
        this.store.dispatch(action);
        let labels = this.getSymbolsInState();
        this.tickerService.getMultiSymbols(labels)
            .subscribe(this.mergeInvestedTicker.bind(this));

        this.initTickerLoader();
    }

    initTickerLoader() {
        let labels = this.getSymbolsInState();
        this.ticksLoaderSubscriber = Observable
            .interval(10000)
            .switchMap(() => {
                return this.tickerService.getMultiSymbols(labels);
            })
            .subscribe(this.mergeInvestedTicker.bind(this));
    }

    mergeInvestedTicker(ticker) {
        let inv = this.getCurrentState();
        inv.forEach((coin: InvestedCoinModel) => {
            let tick = ticker[coin.metaData.symbol];
            coin.price = tick.USD;
        });
        this.updateTickerState(inv);
    }

    updateTickerState(data) {
        let action = {
            type: SET_INVESTED_COINS,
            payload: data
        };
        this.store.dispatch(action);
    }

    getTotals(): Observable<InvestTotalsModel> {
        return Observable.create((observer) => {

            return this.subscribeToState()
                .subscribe((list) => {
                    if (isNullOrUndefined(list)) {
                        observer.next(null);

                    } else {
                        let open = list.map((c) => c.open_value)
                            .reduce((a, b) => a + b);

                        let profit = list.map((c) => c.changeInOpenCurrency)
                            .reduce((a, b) => a + b);
                        let total = open + profit;

                        observer.next({open, profit, total});
                    }
                    // observer.complete();
                });
        });
    }

    unsubscribe() {
        if (!!this.ticksLoaderSubscriber) {
            this.ticksLoaderSubscriber.unsubscribe();
        }
    }

}
