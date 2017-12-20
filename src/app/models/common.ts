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
    low_24h?: number;
    high_24h?: number;

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
    coinId: string; // BTC
    investId?: string; // id sequelized
    createdAt?: number; // sequelized
    updatedAt?: number; // sequelized
    description?: string;
    amount: number; // how many was bought
    metaData: CoinModel;
    openPrice?: number; // price was bought
    openCurrency?: string; // USD ETH EUR
    changeInOpenCurrency?: number; // (counted)
    changePct?: number; // change in % (counted)
    currentPrice? = 0;
    openValue?: number;
    low_24h?: number;
    high_24h?: number;

    get currentValue(): number {
        return this.amount * (this.currentPrice || 0);
    }

    get valuePctChange(): number {
        return ((this.openValue - this.currentValue) / this.openValue) * -1;
    }

    get valueChange(): number {
        return this.currentValue - this.openValue;
    }

    constructor(coin: InvestedCoinModel) {
        super(coin);

        const keys = Object.keys(coin);
        let _l = keys.length;

        while (_l--) {
            let key = keys[_l];
            this[key] = coin[key];
        }
        this.metaData = !!coin.metaData ? new CoinModel(coin.metaData) : new CoinModel(coin);

    }
}

export class InvestTotalsModel {
    open: number;
    profit?: number;
    profitPct?: number;
    current: number;
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
