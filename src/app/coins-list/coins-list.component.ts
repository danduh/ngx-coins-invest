import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoinsService } from '../services/coins.service';
import { CoinModel } from '../models/common';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MarketTickerService } from "../services/market-ticker.service";
import { ConfigService } from "../services/config.service";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { DataSource } from "@angular/cdk/collections";
import { LoaderService } from "../shared/loader.service";
import { Router } from "@angular/router";
import { PoloniexWssService } from '../services/external-api/poloniex-wss.service';
import { Platform } from "@angular/cdk/platform";

const COLUMNS = {
    desktop: ['logo', 'name', 'price', 'percent_change_24h', 'market_cap', 'volume_24h', 'volume_24h_to'],
    mobile: ['logo', 'name', 'price', 'percent_change_24h', 'volume_24h_to']
};

@Component({
    selector: 'app-coins-list',
    templateUrl: './coins-list.component.html',
    styleUrls: ['./coins-list.component.scss']
})
export class CoinsListComponent implements OnInit, OnDestroy {
    private subscriber: Subscription;
    public coins: Observable<CoinModel[]>;
    public inputSelector = new FormControl();
    public currencies: string[];
    public displayedColumns = ['logo', 'name', 'price', 'percent_change_24h', 'market_cap', 'volume_24h', 'volume_24h_to'];
    public isMobile = false;
    searchTerm = '';
    private searchValueSubscription: Subscription;
    private _baseCurrency = new BehaviorSubject<string>('USD');

    coinsListDatabase = new CoinsListDatabase();
    coinsListDataSource: CoinsListDataSource | null;

    set baseCurrency(value) {
        this._baseCurrency.next(value);
    }

    get baseCurrency() {
        return this._baseCurrency.getValue();
    }

    constructor(private coinsService: CoinsService,
                private router: Router,
                private platform: Platform,
                private tickerService: MarketTickerService,
                private configService: ConfigService,
                private poloniexWssService: PoloniexWssService,
                private loaderService: LoaderService) {
        this.isMobile = ((this.platform.ANDROID || this.platform.IOS) && this.platform.isBrowser);
        this.displayedColumns = this.isMobile ? COLUMNS.mobile : COLUMNS.desktop;

    }

    ngOnInit() {
        // this.poloniexWssService.tiks.next('BTC_XMR');
        this.coinsListDataSource = new CoinsListDataSource(this.coinsListDatabase);

        this.coinsListDatabase.coins = this._baseCurrency
            .switchMap((curr) => {
                return this.coinsService.getList(curr);
            });

        if (!this.searchValueSubscription) {
            this.searchValueSubscription = this.inputSelector.valueChanges
                .distinctUntilChanged()
                .subscribe((value) => {
                    this.searchTerm = value;
                });
        }
    }

    onSelect(coin: CoinModel) {
        this.router.navigate(['app/investto', coin.name, coin.baseCurrency]);
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

export class CoinsListDatabase {
    coins: Observable<CoinModel[]>;

}


export class CoinsListDataSource extends DataSource<CoinModel> {
    constructor(private database: CoinsListDatabase) {
        super();
    }

    connect(): Observable<CoinModel[]> {
        return this.database.coins;
    }

    disconnect() {

    }
}
