import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

const timeFunction = (range) => {
    let date = new Date();
    return [date.setTime(date.getTime() + (range * 24 * 60 * 60 * 1000)), Date.now()];
};
const timeRange = new Map()
    .set('week', timeFunction(7));

type ChartPoint = [number, number] [];

interface CurrencyChart {
    market_cap_by_available_supply: ChartPoint;
    price_btc: ChartPoint;
    price_usd: ChartPoint;
    volume_usd: ChartPoint;
}

@Injectable()
export class ChartsService {
    baseUrl = 'https://graphs.coinmarketcap.com/currencies/';

    constructor(private $http: HttpClient) {
    }

    loadChart(coinId: string, range: ChartPoint) {
        let [from, to] = timeRange.get(range);
        this.$http.get<CurrencyChart>(`${this.baseUrl}${coinId}/${from}/${to}`)
            .subscribe((data) => {
                console.log(data);
                console.log(data.market_cap_by_available_supply);
            });
    }

}
