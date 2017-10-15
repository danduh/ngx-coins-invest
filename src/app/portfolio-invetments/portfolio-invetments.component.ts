import { Component, OnInit } from '@angular/core';
import { PortfolioService } from "../services/portfolio.service";
import { Observable } from "rxjs/Observable";
import { InvestedCoinModel } from "../models/common";
import { DataSource } from "@angular/cdk/collections";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-portfolio-investments',
    templateUrl: './portfolio-investments.component.html',
    styleUrls: ['./portfolio-investments.component.scss']
})
export class PortfolioInvestmentsComponent implements OnInit {
    investmentsListDatabase = new InvestmentsListDatabase();
    investmentsListDataSource: InvestmentsListDataSource | null;
    portfolioId: number;
    displayedColumns: string[] = ['logo', 'amount', 'price', 'openPrice'];

    constructor(private portfolioService: PortfolioService,
                private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.portfolioId = params['portfolioId'];
        });
    }

    ngOnInit() {
        this.investmentsListDataSource = new InvestmentsListDataSource(this.investmentsListDatabase);
        this.investmentsListDatabase.investments = this.portfolioService.getPortfolioInvestments(this.portfolioId);
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