import { InvestedCoinModel } from "../models/common";

export const TICKER = 'TICKER';
export const SET_INVESTED_COINS = 'SET_INVESTED_COINS';

export function investedReducer(state: InvestedCoinModel[], action) {
    switch (action.type) {
        case TICKER:
            return {};

        case SET_INVESTED_COINS:
            return [...action.payload];

        default:
            return state;
    }
}