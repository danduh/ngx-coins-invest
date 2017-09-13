import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpParams} from "@angular/common/http";

const PROPS_TO_PARSE = ['price_usd', 'price_btc', 'percent_change_24h',
    'percent_change_7d', 'percent_change_1h',
    'market_cap_usd', 'last_updated', '24h_volume_usd'];

export const parseValues = (coin) => {
    let l = PROPS_TO_PARSE.length;

    while (l--) {
        coin[PROPS_TO_PARSE[l]] = parseFloat(coin[PROPS_TO_PARSE[l]]);
    }
    return coin;
};


@Injectable()
export class MarketTickerService {
    private marketTickerUrl = environment['marketTickerUrl'];

    constructor(private http: HttpClient) {
    }

    public getList(): Observable<any[]> {
        return this.http.get(`${this.marketTickerUrl}`)
            .map(this.postRequestSuccess.bind(this));
    }

    public getListByLabels(labels: string[]) {
        // labels = ['BTC', 'LTC'];

        let calls = [];
        labels.forEach((label) => {
            calls.push(this.getByLabel(label));
        });

        return Observable.forkJoin(...calls)
            .map((response) => {
                return response.map((coin) => coin[0]);
            });
    }

    public getMultiSymbols(symbols: string[], curr = 'USD') {
        let params = new HttpParams();
        params = params.append('fsyms', symbols.toString());
        params = params.append('tsyms', curr.toString());

        return this.http.get(`${this.marketTickerUrl}pricemulti`,  {params})
            // .map(this.postRequestSuccess.bind(this));
    }

    public getByLabel(label: string) {
        return this.http.get(`${this.marketTickerUrl}${label}/`)
            .map(this.postRequestSuccess.bind(this));
    }

    private postRequestSuccess(response: Response) {
        debugger
        let body = response.json();

        if (Array.isArray(body)) {
            return body.map(parseValues);
        }
    }

}
