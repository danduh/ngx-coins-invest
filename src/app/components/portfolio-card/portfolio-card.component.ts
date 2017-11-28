import { Component, Input, OnInit } from '@angular/core';
import { PortfolioModel } from "../../services/portfolio.service";
import { Router } from "@angular/router";
import { PortfolioFacade } from "../../store/portfolio/portfolio.facade";
import { InvestmentsFacade } from "../../store/investments/investments.facade";
import { Observable } from "rxjs/Observable";
import { LoaderService } from "../../shared/loader.service";

@Component({
    selector: 'app-portfolio-card',
    templateUrl: './portfolio-card.component.html',
    styleUrls: ['./portfolio-card.component.scss']
})
export class PortfolioCardComponent implements OnInit {
    @Input() portfolio: PortfolioModel;
    totals: any; // TODO <Add Totals interface>
    isEmpty = false;

    constructor(private router: Router,
                private investmentsFacade: InvestmentsFacade,
                private portfolioFacade: PortfolioFacade,
                public loaderService: LoaderService) {
    }

    ngOnInit() {
        this.investmentsFacade.load(this.portfolio.id);
        this.portfolioFacade
            .getTotalsOnly(this.portfolio.baseCurrency, this.portfolio.id, false)
            .subscribe((totals) => {
                this.totals = totals;
                this.isEmpty = this.totals.length === 0;
                this.loaderService.isActive = this.isEmpty;
            });
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
