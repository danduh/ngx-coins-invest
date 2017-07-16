export class CoinModel {
    name: string;
    symbol: string;
    quantity: number;
    value?: number;
    logo: string;
    id: string;
    market_cap_usd: number;

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
    description: string;
    quantity: number;

    constructor(coin: CoinModel) {
        super(coin)

    }
}
