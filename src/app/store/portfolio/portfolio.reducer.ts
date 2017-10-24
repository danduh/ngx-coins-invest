import { PortfolioAction, PortfolioActions } from './portfolio.actions';

export function portfolioReducer(state, action: PortfolioAction) {
    console.log(action.type, action.payload);
    switch (action.type) {
        case PortfolioActions.LOAD_PORTFOLIO_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
