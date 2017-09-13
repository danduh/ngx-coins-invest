import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable()
export class MarketTickerService {
    private marketTickerUrl = environment['marketTickerUrl'];

    constructor(private http: HttpClient) {
    }

    public getMultiSymbols(symbols: string[], curr = 'USD') {
        let params = new HttpParams();
        params = params.append('fsyms', symbols.toString());
        params = params.append('tsyms', curr.toString());

        return this.http.get(`${this.marketTickerUrl}pricemulti`,  {params})
    }
}
