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
    public coinToBuy: InvestedCoinModel;
    public coins: CoinModel[] = [];
    private paramsSubs: Subscription;
    private coinDataSubs: Subscription;
    private coinGraphSubs: Subscription;
    private coinId: string;
    private baseCurrency: string;

    public lineChartLegend = true;
    public lineChartType = 'line';
    public lineChartData: any[];
    public lineChartLabels: any[];


    constructor(private coinService: CoinsService,
                private route: ActivatedRoute,
                private router: Router) {

        this.paramsSubs = this.route.params.subscribe(params => {
            this.coinId = params['coinId'];
            this.baseCurrency = params['baseCurrency'];
        });

    }

    ngOnInit() {
        this.getCoinData();
    }

    getCoinData() {
        if (!!this.coinDataSubs) {
            this.coinDataSubs.unsubscribe();
        }

        this.coinDataSubs = this.coinService.getOneCoin(this.coinId)
            .subscribe((coin) => {
                this.coin = new InvestedCoinModel(coin);
                this.coinToBuy = new InvestedCoinModel(coin);
                this.coinDataSubs.unsubscribe();
            });

        this.coinGraphSubs = this.coinService.getCoinGraph(this.coinId, this.baseCurrency)
            .subscribe((graphData) => {
                this.lineChartData = graphData.parsedData;
                this.lineChartLabels = graphData.xAxisLabels;
                this.coinDataSubs.unsubscribe();
            });
    }

    submit() {
        this.coinToBuy.amount = this.coinToBuy.openPrice * this.coinToBuy.quantity;
        this.coinService.addCoin(this.coinToBuy)
            .subscribe((response) => {
                this.router.navigate(['/portfolio']);
            });
    }

    updateValue(ev) {
        console.log(ev.target.innerText);
    }
}
