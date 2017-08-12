import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoinsService } from '../services/coins.service';
import { CoinModel } from '../models/common';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ChartsService } from "../services/charts/charts.service";
import { InvestedFacade } from "../states/invested-facade";

@Component({
    selector: 'app-coins-list',
    templateUrl: './coins-list.component.html',
    styleUrls: ['./coins-list.component.scss']
})
export class CoinsListComponent implements OnInit, OnDestroy {
    private subscriber: Subscription;
    public coins: CoinModel[] = [];
    public visibleCoins: CoinModel[] = [];
    public totalValue: any;
    public inputSelector = new FormControl();
    public coinsToShow = 12;
    searchTerm = '';
    private searchValueSubscription: Subscription;


    constructor(private coinsService: CoinsService,
                private investedFacade: InvestedFacade,
                private charts: ChartsService) {
    }

    ngOnInit() {
        this.coinsService.getList()
            .subscribe((coins) => {
                this.coins = coins;
                this.showMoreCoins();
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

    showMoreCoins() {
        this.visibleCoins = [...this.visibleCoins, ...this.coins.slice(this.visibleCoins.length, this.visibleCoins.length + this.coinsToShow)];
        if (this.coins.length <= this.visibleCoins.length) {
            this.coinsToShow = 0;
            return;
        }
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
