import { Component, OnInit } from '@angular/core';
import { PortfolioModel, PortfolioService } from "../services/portfolio.service";
import { Observable } from "rxjs/Observable";
import { InvestedCoinModel } from "../models/common";
import { DataSource } from "@angular/cdk/collections";
import { ActivatedRoute } from "@angular/router";
import { InvestmentsFacade } from '../store/investments/investments.facade';
import { PortfolioFacade } from '../store/portfolio/portfolio.facade';

@Component({
    selector: 'app-portfolio-investments',
    templateUrl: './portfolio-investments.component.html',
    styleUrls: ['./portfolio-investments.component.scss']
})
export class PortfolioInvestmentsComponent implements OnInit {
    investmentsListDatabase = new InvestmentsListDatabase();
    investmentsListDataSource: InvestmentsListDataSource | null;
    portfolio: PortfolioModel;
    portfolioId: number;
    displayedColumns: string[] = ['logo', 'amount', 'openPrice', 'price', 'delete'];


    constructor(private portfolioService: PortfolioService,
                private investmentsFacade: InvestmentsFacade,
                private portfolioFacade: PortfolioFacade,
                private route: ActivatedRoute) {

        this.route.params.subscribe(params => {
            this.portfolioId = params['portfolioId'];
            this.investmentsFacade.load(this.portfolioId);
        });
    }

    deleteInvest(investId) {
        this.portfolioService.removeInvestment(this.portfolioId, investId)
            .subscribe((resp) => {
                console.log(resp);
            });
    }

    ngOnInit() {

        this.portfolio = this.portfolioFacade.getPortfolioById(this.portfolioId);
        console.log(this.portfolio);

        this.investmentsListDataSource = new InvestmentsListDataSource(this.investmentsListDatabase);
        this.investmentsListDatabase.investments = this.investmentsFacade.$investmentsState;

        this.investmentsFacade.$investmentsState
            .subscribe(this.startTicker.bind(this));

    }

    startTicker(data) {
        if (!!data)
            console.log(data)
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
