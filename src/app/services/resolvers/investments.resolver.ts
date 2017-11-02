import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { InvestedCoinModel } from '../../models/common';
import { InvestmentsFacade } from '../../store/investments/investments.facade';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InvestmentsResolver implements Resolve<InvestedCoinModel[]> {
    constructor(private investmentsFacade: InvestmentsFacade,
                private route: ActivatedRoute) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<InvestedCoinModel[]> {
        return this.investmentsFacade.getInvestmentsRx(route.paramMap.get('portfolioId'));
    }

}
