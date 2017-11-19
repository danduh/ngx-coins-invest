import { Component, OnDestroy, OnInit } from '@angular/core';
import { PortfolioModel } from "../services/portfolio.service";
import { Observable } from "rxjs/Observable";
import { InvestedCoinModel, InvestTotalsModel } from "../models/common";
import { DataSource } from "@angular/cdk/collections";
import { ActivatedRoute } from "@angular/router";
import { InvestmentsFacade } from '../store/investments/investments.facade';
import { Platform } from "@angular/cdk/platform";

const COLUMNS = {
    desktop: ['logo', 'amount', 'openPrice', 'currentPrice', 'valueChange', 'valuePctChange', 'openValue', 'currentValue', 'delete'],
    mobile: ['logo', 'currentPrice', 'valueChange', 'valuePctChange', 'currentValue']
};

@Component({
    selector: 'app-portfolio-investments',
    templateUrl: './portfolio-investments.component.html',
    styleUrls: ['./portfolio-investments.component.scss']
})
export class PortfolioInvestmentsComponent implements OnInit, OnDestroy {
    private portfolioId: number;
    private investmentsListDatabase = new InvestmentsListDatabase();
    private investmentsListDataSource: InvestmentsListDataSource | null;

    public portfolio: PortfolioModel;
    public displayedColumns: string[];
    public totals: Observable<InvestTotalsModel>;
    public isMobile = false;

    constructor(private investmentsFacade: InvestmentsFacade,
                private platform: Platform,
                private route: ActivatedRoute) {
        this.isMobile = ((this.platform.ANDROID || this.platform.IOS) && this.platform.isBrowser);
        this.displayedColumns = this.isMobile ? COLUMNS.mobile : COLUMNS.desktop;
        this.route.params.subscribe(params => {
            this.portfolioId = params['portfolioId'];
            // this.investmentsFacade.load(this.portfolioId);
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

    hideTable() {
        return this.investmentsFacade.isEmpty();
    }

    ngOnDestroy() {
        this.investmentsFacade.clearState();
        this.investmentsFacade.subscription.unsubscribe();
        this.investmentsFacade.destroyed$.next();
        this.investmentsFacade.destroyed$.complete();
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
