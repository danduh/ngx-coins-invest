import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoinsService } from '../services/coins.service';
import { CoinModel } from '../models/common';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ChartsService } from "../services/charts/charts.service";
import { InvestedFacade } from "../states/invested-facade";
import { MarketTickerService } from "../services/market-ticker.service";
import { ConfigService } from "../services/config.service";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { quadtree } from "d3-quadtree";

@Component({
    selector: 'app-coins-list',
    templateUrl: './coins-list.component.html',
    styleUrls: ['./coins-list.component.scss']
})
export class CoinsListComponent implements OnInit, OnDestroy {
    private subscriber: Subscription;
    public coins: Observable<CoinModel[]>;
    public totalValue: any;
    public inputSelector = new FormControl();
    public currencies: string[];
    searchTerm = '';
    private searchValueSubscription: Subscription;
    private _baseCurrency = new BehaviorSubject<string>('USD');

    set baseCurrency(value) {
        this._baseCurrency.next(value);
    }

    get baseCurrency() {
        return this._baseCurrency.getValue();
    }

    constructor(private coinsService: CoinsService,
                private configService: ConfigService,
                private investedFacade: InvestedFacade,
                private charts: ChartsService) {
    }

    ngOnInit() {
        this.configService.get()
            .subscribe((config) => {
                this.currencies = config.currency;
            });

        this.coins = this._baseCurrency
            .debounceTime(400)
            .distinctUntilChanged().switchMap((curr) => {
                return this.coinsService.getList(curr);
            });

        if (!this.searchValueSubscription) {
            this.searchValueSubscription = this.inputSelector.valueChanges
                .debounceTime(200)
                .distinctUntilChanged()
                .subscribe((value) => {
                    this.searchTerm = value;
                });
        }
    }

    coinName(indes, coin) {
        return coin.name;
    }

    onCurrencyChange(curr) {
        this.baseCurrency = curr;
    }

    ngOnDestroy() {
        if (!!this.subscriber) {
            this.subscriber.unsubscribe();
        }
        if (!!this.searchValueSubscription) {
            this.searchValueSubscription.unsubscribe();
        }
    }

}
