import { Injectable } from '@angular/core';

export class PortfolioAction {
    type: string;
    payload?: any;
    requestValues?: any;
}


@Injectable()
export class InvestmentsActions {
    static LOAD_INVESTMENT = '[Investments] LOAD_PORTFOLIO_FROM_SERVER';
    static LOAD_PORTFOLIO_START = '[Investments] LOAD_PORTFOLIO_FROM_SERVER_START';
    static LOAD_PORTFOLIO_END = '[Investments] LOAD_PORTFOLIO_ITEMS_SERVER_END';
    static LOAD_INVESTMENTS_SUCCESS = '[Investments] LOAD_PORTFOLIO_ITEMS_SUCCESSFULL';

    static PORTFOLIO_TICKER_SUBSCRIBE = '[Investments] SUBSCRIBE FOR TICKER DATA';
    static PORTFOLIO_TICKER_TICK = '[Investments] TICK';
    static PORTFOLIO_TICKER_SUCCESS = '[Investments] TICK SUCCESS';
}
