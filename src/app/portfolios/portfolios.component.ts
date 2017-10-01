import { Component, OnInit } from '@angular/core';
import { PortfolioModel, PortfolioService } from "../services/portfolio.service";
import { Observable } from "rxjs/Observable";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ErrorHandlerClass } from "../components/extendable/error-handler.class";
import { Router } from "@angular/router";

@Component({
    selector: 'app-protfolios',
    templateUrl: './portfolios.component.html',
    styleUrls: ['./portfolios.component.scss']
})
export class PortfoliosComponent extends ErrorHandlerClass implements OnInit {
    public portfolioForm: FormGroup;
    public portfolioNew: PortfolioModel;
    public portfolios: Observable<PortfolioModel[]> | PortfolioModel[];
    public expanded = false;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private portfolioService: PortfolioService) {
        super();
        this.portfolioForm = formBuilder.group({
            name: '',
            comment: ''
        });
    }

    ngOnInit() {
        this.portfolios = this.portfolioService.getAllPortfolios()
            .map((resp) => {
                console.log(resp);
                return resp;
            });
    }

    onCreate() {
        this.portfolioNew = this.portfolioForm.value;
        console.log(this.portfolioNew);
        this.portfolioService.createPortfolio(this.portfolioForm.value)
            .subscribe((portfolio) => {
                this.router.navigate([`/portfolio/${portfolio.id}`]);
            }, this.errorHandler.bind(this));
        this.expanded = false;
    }

}
