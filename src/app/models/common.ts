export class CoinModel {
    name: string;
    symbol: string;
    quantity: number;
    value?: number;
    logo?: string;
    coinId?: string;
    market_cap?: number;
    percent_change_24h?: number;
    volume_24h?: number;
    volume_24h_to?: number;
    price: number;
    createdAt?: number;
    baseCurrency?: string;

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
    coinId?: string;
    investId?: string;
    createdAt?: number;
    updatedAt?: number;
    open_value?: number;
    description?: string;
    amount: number;
    metaData: CoinModel;
    openPrice?: number;
    plUsd?: number;
    plPct?: number;

    constructor(coin: CoinModel) {
        super(coin);
        this.metaData = new CoinModel(coin);

    }
}

export class InvestTotalsModel {
    open: number;
    profit: number;
    total: number;
}

export class AppUser {
    username: string; // email
    email?: string;
    groups?: string[]; // ["investors", 'watchers']
    password?: string;
    phone_number?: string;

    constructor(parsedJwt, username) {
        this.username = username;
        this.email = parsedJwt.email;
        this.groups = !!parsedJwt['cognito:groups'] ? parsedJwt['cognito:groups'] : [];
    }

    public getDataEmail() {
        return {
            Name: 'email',
            Value: !!this.email ? this.email : this.username
        };
    }

    public getDataPhoneNumber() {
        return {
            Name: 'phone_number',
            Value: this.phone_number
        };
    }
}
