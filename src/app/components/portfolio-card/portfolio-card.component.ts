import { Component, Input, OnInit } from '@angular/core';
import { PortfolioModel } from "../../services/portfolio.service";
import { Router } from "@angular/router";
import { InvestmentsFacade } from "../../store/investments/investments.facade";
import { PortfolioFacade } from "../../store/portfolio/portfolio.facade";

@Component({
    selector: 'app-portfolio-card',
    templateUrl: './portfolio-card.component.html',
    styleUrls: ['./portfolio-card.component.scss']
})
export class PortfolioCardComponent implements OnInit {
    @Input() portfolio: PortfolioModel;

    constructor(private router: Router,
                private portfolioFacade: PortfolioFacade) {
    }

    ngOnInit() {
    }

    public goToPortfolio() {
        this.router.navigate([`/app/portfolio/${this.portfolio.id}`]);
    }

    public deletePortfolio() {
        this.portfolioFacade.removePortfolio(this.portfolio.id);
    }
}
