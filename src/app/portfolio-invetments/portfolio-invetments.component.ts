import { Component, OnInit } from '@angular/core';
import { PortfolioService } from "../services/portfolio.service";
import { Observable } from "rxjs/Observable";
import { InvestedCoinModel } from "../models/common";
import { DataSource } from "@angular/cdk/collections";
import { ActivatedRoute } from "@angular/router";
import { PortfolioFacade } from '../store/portfolio/portfolio.facade';

@Component({
    selector: 'app-portfolio-investments',
    templateUrl: './portfolio-investments.component.html',
    styleUrls: ['./portfolio-investments.component.scss']
})
export class PortfolioInvestmentsComponent implements OnInit {
    investmentsListDatabase = new InvestmentsListDatabase();
    investmentsListDataSource: InvestmentsListDataSource | null;
    portfolioId: number;
    // displayedColumns: string[] = ['logo', 'amount', 'price', 'openPrice'];
    displayedColumns: string[] = ['logo', 'openCurrency', 'amount', 'openPrice', 'delete'];

    constructor(private portfolioService: PortfolioService,
                private portfolioFacade: PortfolioFacade,
                private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.portfolioId = params['portfolioId'];
            this.portfolioFacade.load(this.portfolioId);
        });
    }

    deleteInvest(investId) {
        // this.investmentsListDatabase.investments =
        this.portfolioService.removeInvestment(this.portfolioId, investId)
            .subscribe((resp) => {
                console.log(resp);
            });
    }

    ngOnInit() {
        this.investmentsListDataSource = new InvestmentsListDataSource(this.investmentsListDatabase);
        this.investmentsListDatabase.investments = this.portfolioFacade.$portfolioState;
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
