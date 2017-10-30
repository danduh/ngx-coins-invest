import { Injectable } from '@angular/core';

export class PortfolioAction {
    type: string;
    payload?: any;
    requestValues?: any;
}


@Injectable()
export class PortfolioActions {
    static LOAD_PORTFOLIOS = '[Portfolio] LOAD_PORTFOLIOS_FROM_SERVER';
    static LOAD_PORTFOLIO_ERROR = '[Portfolio] LOAD_PORTFOLIOS_ERROR';
    static LOAD_PORTFOLIO_SUCCESS = '[Portfolio] LOAD_PORTFOLIOS_SUCCESSFULL';
}
