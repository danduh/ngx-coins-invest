import { Component, OnInit } from '@angular/core';
import { CoinModel, InvestedCoinModel } from '../models/common';
import { CoinsService } from '../services/coins.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-coins-manager',
    templateUrl: './coins-manager.component.html',
    styleUrls: ['./coins-manager.component.scss']
})
export class CoinsManagerComponent implements OnInit {
    public coin: InvestedCoinModel;
    public coins: CoinModel[] = [];
    private paramsSubs: Subscription;
    private coinDataSubs: Subscription;

    constructor(private coinService: CoinsService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.paramsSubs = this.route.params.subscribe(params => {
            this.getCoinData(params['coinId']);
        });
    }

    getCoinData(coinId) {
        if (!!this.coinDataSubs)
            this.coinDataSubs.unsubscribe();

        this.coinDataSubs = this.coinService.getOneCoin(coinId)
            .subscribe((coin) => {
                this.coin = new InvestedCoinModel(coin);
                this.coinDataSubs.unsubscribe();
            })
    }

    submit() {
        this.coinService.addCoin(this.coin)
            .subscribe((response) => {
                this.router.navigate(['/current-status']);
            })
    }

    updateValue(ev) {
        console.log(ev.target.innerText);
    }
}
