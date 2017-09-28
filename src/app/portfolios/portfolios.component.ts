import { Component, OnInit } from '@angular/core';
import { PortfolioModel, PortfolioService } from "../services/portfolio.service";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'app-protfolios',
    templateUrl: './portfolios.component.html',
    styleUrls: ['./portfolios.component.css']
})
export class ProtfoliosComponent implements OnInit {
    public portfolios: Observable<PortfolioModel[]> | PortfolioModel[];

    constructor(private portfolioService: PortfolioService) {
    }

    ngOnInit() {
        this.portfolios = this.portfolioService.getAllPortfolios()
            .map((resp) => {
                console.log(resp)
                return resp
            });
    }

}
