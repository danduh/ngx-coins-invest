import { Injectable } from '@angular/core';

export class PortfolioAction {
    type: string;
    payload?: any;
    requestValues?: any;
}


@Injectable()
export class PortfolioActions {
    static LOAD_PORTFOLIO = '[Portfolio] LOAD_PORTFOLIO_FROM_SERVER';
    static LOAD_PORTFOLIO_START = '[Portfolio] LOAD_PORTFOLIO_FROM_SERVER_START';
    static LOAD_PORTFOLIO_END = '[Portfolio] LOAD_PORTFOLIO_ITEMS_SERVER_END';
    static LOAD_PORTFOLIO_SUCCESS = '[Portfolio] LOAD_PORTFOLIO_ITEMS_SUCCESSFULL';

    static PORTFOLIO_TICKER_SUBSCRIBE = '[Portfolio] SUBSCRIBE FOR TICKER DATA';
    static PORTFOLIO_TICKER_TICK = '[Portfolio] TICK SUCCESS';
}
