import { Component, Input, OnInit } from '@angular/core';
import { PortfolioModel } from "../../services/portfolio.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-portfolio-card',
    templateUrl: './portfolio-card.component.html',
    styleUrls: ['./portfolio-card.component.scss']
})
export class PortfolioCardComponent implements OnInit {
    @Input() portfolio: PortfolioModel;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    public goToPortfolio() {
        this.router.navigate([`/portfolio/${this.portfolio.id}`]);
    }
}
