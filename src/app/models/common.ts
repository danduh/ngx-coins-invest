export class CoinModel {
    name: string;
    symbol: string;
    quantity: number;
    value?: number;
    logo?: string;
    id?: string;
    market_cap_usd?: number;
    price_usd: number;
    createdAt?: number;

    constructor(coin) {
        const keys = Object.keys(coin);
        let _l = keys.length;

        while (_l--) {
            let key = keys[_l];
            this[key] = coin[key];
        }
    }

}

export class InvestedCoinModel extends CoinModel {
    investId?: string;
    createdAt?: number;
    updatedAt?: number;
    description?: string;
    quantity: number;
    openPrice?: number;
    plUsd?: number;
    plPct?: number;
    amount?: number;

    constructor(coin: CoinModel) {
        super(coin);

    }
}

export class InvestTotalsModel {
    open: number;
    profit: number;
    total: number;
}

export class AppUser {
    username: string;
    email: string;
    groups: string[]; // ["investors", 'watchers']

    constructor(parsedJwt) {
        this.username = parsedJwt.username;
        this.email = parsedJwt.email;
        this.groups = !!parsedJwt['cognito:groups'] ? parsedJwt['cognito:groups'] : [];
    }
}
