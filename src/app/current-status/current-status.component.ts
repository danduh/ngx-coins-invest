import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoinsService } from "../services/coins.service";
import { Observable } from "rxjs/Observable";
import { InvestedCoinModel, InvestTotalsModel } from "../models/common";
import { ActivatedRoute } from "@angular/router";
import { InvestedFacade } from "../states/invested-facade";

declare type ViewType = 'list' | 'card';

@Component({
    selector: 'app-current-status',
    templateUrl: './current-status.component.html',
    styleUrls: ['./current-status.component.scss']
})
export class CurrentStatusComponent implements OnInit, OnDestroy {
    public visibleCoins: Observable<InvestedCoinModel[]>;
    public totals: Observable<InvestTotalsModel>;
    public viewType: ViewType;
    private viewTypeSubscribe;

    constructor(private coinService: CoinsService,
                private investedFacade: InvestedFacade,
                private route: ActivatedRoute) {

        this.viewTypeSubscribe = route.params.map(p => p.viewType).subscribe((val) => {
            this.viewType = !!val ? val : 'list';
        });

    }

    ngOnInit() {
        this.visibleCoins = this.coinService.getInvestedList();

        this.investedFacade.loadInvestedCoins();
        this.totals = this.investedFacade.getTotals();
    }

    ngOnDestroy() {
        if (!!this.viewTypeSubscribe) {
            this.viewTypeSubscribe.unsubscribe();
        }
    }

}
