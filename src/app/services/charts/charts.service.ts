import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

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

export interface CoinChartPoint {
    date: number;
    high: number;
    low: number;
    open: number;
    close: number;
    volume: number;
    quoteVolume: number;
    weightedAverage: number;
}

@Injectable()
export class ChartsService {
    baseUrl = 'https://poloniex.com/public';

    constructor(private $http: HttpClient) {
    }

    // https://poloniex.com/public?command=returnChartData&currencyPair=BTC_XMR&start=1506888159&end=9999999999&period=300
    private setParams(coinId: string, baseCurrency: string, range) {
        let [from, to] = timeRange.get(range);
        let params: HttpParams = new HttpParams()
            .set('command', 'returnChartData')
            .set('currencyPair', 'BTC_XMR')
            .set('start', from)
            .set('end', to)
            .set('period', '300');
        return params;
    }

    loadChart(coinId: string, baseCurrency: string, range) {
        let params = this.setParams(coinId, baseCurrency, range);
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('host', 'poloniex.com')
            .set('origin', 'poloniex.com')
            .set('accept', '*/*');

        this.$http.get<CoinChartPoint[]>(`${this.baseUrl}`, {headers, params})
            .subscribe((data) => {
                console.log(data);
            });
    }

}
