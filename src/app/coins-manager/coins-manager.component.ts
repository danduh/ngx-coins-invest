import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoinModel, InvestedCoinModel } from '../models/common';
import { CoinsService } from '../services/coins.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { PortfolioModel, PortfolioService } from "../services/portfolio.service";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'app-coins-manager',
    templateUrl: './coins-manager.component.html',
    styleUrls: ['./coins-manager.component.scss']
})
export class CoinsManagerComponent implements OnInit, OnDestroy {
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
    public portfolios: PortfolioModel[];
    public selectedPortfolio: PortfolioModel;
    $portfolios: Subscription;

    constructor(private coinService: CoinsService,
                private portfolioService: PortfolioService,
                private route: ActivatedRoute,
                private router: Router) {

        this.paramsSubs = this.route.params.subscribe(params => {
            this.coinId = params['coinId'];
            this.baseCurrency = params['baseCurrency'];
        });

    }

    ngOnInit() {
        this.getCoinData();
        this.$portfolios = this.portfolioService.getAllPortfolios()
            .subscribe((resp) => {
                this.portfolios = resp;
            });
    }

    ngOnDestroy() {
        if (!!this.$portfolios)
            this.$portfolios.unsubscribe()
    }

    getCoinData() {
        if (!!this.coinDataSubs) {
            this.coinDataSubs.unsubscribe();
        }

        this.coinDataSubs = this.coinService.getOneCoin(this.coinId)
            .subscribe((coin) => {
                if (!coin) {
                    return;
                }
                this.coin = new InvestedCoinModel(<InvestedCoinModel>coin);
                this.coinToBuy = new InvestedCoinModel(<InvestedCoinModel>coin);
                this.coinDataSubs.unsubscribe();
            });

        this.coinGraphSubs = this.coinService.getCoinGraph(this.coinId, this.baseCurrency)
            .subscribe((graphData) => {
                this.lineChartData = graphData.parsedData;
                this.lineChartLabels = graphData.xAxisLabels;
                this.coinGraphSubs.unsubscribe();
            });
    }

    submit() {
        this.coinToBuy.coinId = this.coinId;
        // this.coinToBuy.amount = this.coinToBuy.openPrice * this.coinToBuy.quantity;
        this.portfolioService.createInvestment(this.coinToBuy, this.selectedPortfolio.id)
            .subscribe((portfolio) => {
                this.router.navigate(['app/portfolio', portfolio.id]);
            });

    }

    updateValue(ev) {
        console.log(ev.target.innerText);
    }
}
