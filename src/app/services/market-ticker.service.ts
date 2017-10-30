import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { CoinModel } from "../models/common";

@Injectable()
export class MarketTickerService {
    private marketTickerUrl = environment['marketTickerUrl'];
    private allCoinsUrl = 'https://api.coinmarketcap.com/v1/ticker/';

    constructor(private http: HttpClient) {
    }

    public getMultiSymbols(curr = 'USD', symbols: string[]) {
        let params = new HttpParams();
        params = params.append('fsyms', symbols.toString());
        params = params.append('tsyms', curr.toString());

        return this.http.get(`${this.marketTickerUrl}pricemulti`, {params});
    }
}
