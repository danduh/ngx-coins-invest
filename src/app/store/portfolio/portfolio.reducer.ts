import { PortfolioAction, PortfolioActions } from './portfolio.actions';
import { PortfolioModel } from "../../services/portfolio.service";

let removePortfolio = (portfolioId, state: PortfolioModel[]) => {
    return state.filter((p) => p.id !== portfolioId);
};

export function portfolioReducer(state: PortfolioModel[], action: PortfolioAction) {
    switch (action.type) {
        case PortfolioActions.CREATE_PORTFOLIO_SUCCESS:
            return [...state, action.payload];

        case PortfolioActions.LOAD_PORTFOLIO_SUCCESS:
            return [...action.payload];

        case PortfolioActions.DELETE_PORTFOLIO_SUCCESS:
            return [...removePortfolio(action.payload.id, state)];

        default:
            return state;
    }
}
