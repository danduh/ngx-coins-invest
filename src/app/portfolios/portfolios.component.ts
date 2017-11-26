import { Component, OnInit } from '@angular/core';
import { PortfolioModel } from "../services/portfolio.service";
import { Observable } from "rxjs/Observable";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ErrorHandlerClass } from "../components/extendable/error-handler.class";
import { Router } from "@angular/router";
import { PortfolioFacade } from '../store/portfolio/portfolio.facade';

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
                private portfolioFacade: PortfolioFacade) {
        super();

        this.portfolioForm = formBuilder.group({
            name: '',
            comment: '',
            baseCurrency: ''
        });
    }

    ngOnInit() {
        this.portfolios = this.portfolioFacade.$portfolioStore
            .catch((err, cou) => {
                if (!!err && err.error === 'noAccountFound') {
                    this.router.navigate(['/app/account']);
                }
                return Observable.of([]);
            });
    }

    onBaseCurrencySelect(curr) {
        this.portfolioForm.controls['baseCurrency'].setValue(curr);
    }

    onCreate() {
        this.portfolioNew = this.portfolioForm.value;
        this.portfolioFacade.createPortfolio(this.portfolioForm.value);
        this.expanded = false;
    }

}
