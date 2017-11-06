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

    static CREATE_PORTFOLIO = '[Portfolio] Create';
    static CREATE_PORTFOLIO_SUCCESS = '[Portfolio] create Success';
    static CREATE_PORTFOLIO_ERROR = '[Portfolio] create failed';

    static DELETE_PORTFOLIO = '[Portfolio] Remove';
    static DELETE_PORTFOLIO_SUCCESS = '[Portfolio] Removed successful';
    static DELETE_PORTFOLIO_ERROR = '[Portfolio] Removed failed';
}
