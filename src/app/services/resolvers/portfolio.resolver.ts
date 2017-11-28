import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { PortfolioModel, PortfolioService } from '../portfolio.service';
import { PortfolioFacade } from '../../store/portfolio/portfolio.facade';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PortfolioResolver implements Resolve<PortfolioModel> {

    constructor(private portfolioFacade: PortfolioFacade,
                private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<PortfolioModel | any> {
        return this.portfolioFacade.getPortfolioByIdRx(route.paramMap.get('portfolioId'))
            .map((port) => {
                return port;
            });
    }

}
