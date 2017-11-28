import { Component, OnDestroy, OnInit } from '@angular/core';
import { PortfolioModel } from "../services/portfolio.service";
import { Observable } from "rxjs/Observable";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ErrorHandlerClass } from "../components/extendable/error-handler.class";
import { Router } from "@angular/router";
import { PortfolioFacade } from '../store/portfolio/portfolio.facade';
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'app-protfolios',
    templateUrl: './portfolios.component.html',
    styleUrls: ['./portfolios.component.scss']
})
export class PortfoliosComponent extends ErrorHandlerClass implements OnInit, OnDestroy {
    public portfolioForm: FormGroup;
    public portfolioNew: PortfolioModel;
    public portfolios: PortfolioModel[];
    public expanded = false;
    $portfolios: Subscription;

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
        this.$portfolios = this.portfolioFacade.$portfolioStore
            .subscribe((resp) => {
                this.portfolios = resp;
                this.expanded = this.portfolios.length === 0;
            }, (err, cou) => {
                if (!!err && err.error === 'noAccountFound') {
                    this.router.navigate(['/app/account']);
                }
                return Observable.of([]);
            });
    }

    ngOnDestroy() {
        if (this.$portfolios) {
            this.$portfolios.unsubscribe();
        }
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
