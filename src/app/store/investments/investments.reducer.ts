import { PortfolioAction, InvestmentsActions } from './investments.actions';

export function investmentsReducer(state, action: PortfolioAction) {
    switch (action.type) {
        case InvestmentsActions.LOAD_INVESTMENTS_SUCCESS:
        case InvestmentsActions.PORTFOLIO_TICKER_SUCCESS:
        case InvestmentsActions.PORTFOLIO_TICKER_TICK:
            return action.payload;
        default:
            return state;
    }
}
