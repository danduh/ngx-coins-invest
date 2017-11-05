import { Component, OnInit } from '@angular/core';
import { PortfolioModel, PortfolioService } from "../services/portfolio.service";
import { Observable } from "rxjs/Observable";
import { InvestedCoinModel, InvestTotalsModel } from "../models/common";
import { DataSource } from "@angular/cdk/collections";
import { ActivatedRoute } from "@angular/router";
import { InvestmentsFacade } from '../store/investments/investments.facade';
import { PortfolioFacade } from '../store/portfolio/portfolio.facade';
import { MarketTickerService } from '../services/market-ticker.service';

@Component({
    selector: 'app-portfolio-investments',
    templateUrl: './portfolio-investments.component.html',
    styleUrls: ['./portfolio-investments.component.scss']
})
export class PortfolioInvestmentsComponent implements OnInit {
    private portfolioId: number;
    private investmentsListDatabase = new InvestmentsListDatabase();
    private investmentsListDataSource: InvestmentsListDataSource | null;

    public portfolio: PortfolioModel;
    public displayedColumns: string[] = ['logo', 'amount', 'openPrice', 'currentPrice', 'valueChange', 'valuePctChange', 'openValue', 'currentValue', 'delete'];
    public totals: Observable<InvestTotalsModel>;

    constructor(private portfolioService: PortfolioService,
                private investmentsFacade: InvestmentsFacade,
                private portfolioFacade: PortfolioFacade,
                private marketTickerService: MarketTickerService,
                private route: ActivatedRoute) {

        this.route.params.subscribe(params => {
            this.portfolioId = params['portfolioId'];
            this.investmentsFacade.load(this.portfolioId);
        });
    }

    deleteInvest(investId) {
        this.investmentsFacade.removeInvestment(this.portfolioId, investId);
    }

    ngOnInit() {
        this.portfolio = this.route.snapshot.data['currentPortfolio'];

        this.investmentsListDataSource = new InvestmentsListDataSource(this.investmentsListDatabase);
        this.investmentsListDatabase.investments = this.investmentsFacade.$investmentsState;

        this.investmentsFacade.startTicker(this.portfolio.baseCurrency);

        this.totals = this.investmentsFacade.$totals;
    }

}


export class InvestmentsListDatabase {
    investments: Observable<InvestedCoinModel[]>;
}


export class InvestmentsListDataSource extends DataSource<InvestedCoinModel> {
    constructor(private database: InvestmentsListDatabase) {
        super();
    }

    connect(): Observable<InvestedCoinModel[]> {
        return this.database.investments;
    }

    disconnect() {

    }
}
