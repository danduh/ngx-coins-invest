import { PortfolioAction, InvestmentsActions } from './investments.actions';

export function investmentsReducer(state, action: PortfolioAction) {
    console.log(action.type, action.payload);
    switch (action.type) {
        case InvestmentsActions.LOAD_INVESTMENTS_SUCCESS:
        case InvestmentsActions.PORTFOLIO_TICKER_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
