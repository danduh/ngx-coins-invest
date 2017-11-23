import { Component, Input, OnInit } from '@angular/core';
import { PortfolioModel } from "../../services/portfolio.service";
import { Router } from "@angular/router";
import { PortfolioFacade } from "../../store/portfolio/portfolio.facade";
import { InvestmentsFacade } from "../../store/investments/investments.facade";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'app-portfolio-card',
    templateUrl: './portfolio-card.component.html',
    styleUrls: ['./portfolio-card.component.scss']
})
export class PortfolioCardComponent implements OnInit {
    @Input() portfolio: PortfolioModel;
    totals: Observable<any>;

    constructor(private router: Router,
                private investmentsFacade: InvestmentsFacade,
                private portfolioFacade: PortfolioFacade) {
    }

    ngOnInit() {
        this.investmentsFacade.load(this.portfolio.id);
        this.totals = this.investmentsFacade
            .getTotalsOnly(this.portfolio.baseCurrency, this.portfolio.id);
    }

    public goToPortfolio() {
        this.investmentsFacade.destroyed$.next(true);
        this.investmentsFacade.destroyed$.complete();
        this.router.navigate([`/app/portfolio/${this.portfolio.id}`]);
    }

    public deletePortfolio() {
        this.portfolioFacade.removePortfolio(this.portfolio.id);
    }
}
