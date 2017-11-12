import { PortfolioAction, InvestmentsActions } from './investments.actions';

export function investmentsReducer(state, action: PortfolioAction) {
    console.log(action);
    switch (action.type) {
        case InvestmentsActions.LOAD_INVESTMENTS_SUCCESS:
        case InvestmentsActions.PORTFOLIO_TICKER_SUCCESS:
        case InvestmentsActions.PORTFOLIO_TICKER_TICK:
        case InvestmentsActions.DELETE_INVESTMENT_SUCCESS:
            return action.payload;
        case '@ngrx/store/init':
            return [];
        default:
            return state;
    }
}
