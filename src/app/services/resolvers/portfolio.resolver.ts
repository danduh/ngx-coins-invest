import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PortfolioModel, PortfolioService } from '../portfolio.service';
import { PortfolioFacade } from '../../store/portfolio/portfolio.facade';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PortfolioResolver implements Resolve<PortfolioModel> {

    constructor(private portfolioFacade: PortfolioFacade,
                private portfolioService: PortfolioService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<PortfolioModel> {
        return this.portfolioFacade.getPortfolioByIdRx(route.paramMap.get('portfolioId'))
            .map((port) => {
                console.log(port);
                return port;
            });
    }

}
