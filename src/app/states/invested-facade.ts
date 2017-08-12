import { Injectable } from "@angular/core";
import { Store, Action } from "@ngrx/store";
import { CoinsService } from "../services/coins.service";
import { MarketTickerService } from "../services/market-ticker.service";
import { Observable } from "rxjs/Observable";
import { SET_INVESTED_COINS } from "./invested-reducer";
import { InvestedCoinModel } from "../models/common";

@Injectable()
export class InvestedFacade {
    $currentInvested;

    constructor(private store: Store<any>,
                private coinsService: CoinsService,
                private tickerService: MarketTickerService) {
        this.$currentInvested = this.store.select('investedStore');
        this.tickerService.getListByLabels([]);
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

    setInvState(data) {
        let action = {
            type: SET_INVESTED_COINS,
            payload: data
        };
        this.store.dispatch(action);
        this.initTickerLoader();
    }

    initTickerLoader() {
        let labels;
        this.$currentInvested.subscribe((list) => {
            labels = list.map((c) => c.id);
        });
        this.loadTicker(labels.getUnique());
    }

    loadTicker(labels?) {
        this.tickerService.getListByLabels(labels)
            .subscribe(this.mergeInvestedTicker.bind(this));
    }

    mergeInvestedTicker(ticker) {
        let ticks = {};
        ticker.forEach((coin) => {
            ticks[coin.id] = coin;
        });

        let inv = this.getCurrentState();
        inv.forEach((coin: InvestedCoinModel) => {
            let tick = ticks[coin.id];
            coin.price_usd = tick.price_usd;
            coin.plUsd = (tick.price_usd * tick.quantity) - coin.amount;
            coin.plPct = coin.plUsd / coin.amount;
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

}
