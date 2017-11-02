import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {CoinModel} from "../models/common";

import * as io from 'socket.io-client';
import {CCC} from './utils/market-ticker.utils';
import {resolveSoa} from "dns";

@Injectable()
export class MarketTickerService {
    private marketTickerUrl = environment['marketTickerUrl'];
    private allCoinsUrl = 'https://api.coinmarketcap.com/v1/ticker/';
    private wsUrl = 'https://streamer.cryptocompare.com/';
    private socket;
    private defExchange = 'polo'

    constructor(private http: HttpClient) {
        this.socket = io(this.wsUrl);
    }

    public getMultiSymbols(curr = 'USD', symbols: string[]) {
        let params = new HttpParams();
        params = params.append('fsyms', symbols.toString());
        params = params.append('tsym', curr.toString());

        return this.http.get(`${this.marketTickerUrl}pricemulti`, {params});
    }

    public subscribeToTicker(curr, symbols: string[]) {
        return Observable.create((observer) => {
            let subscription = symbols.map((s) => {
                return `5~CCCAGG~${s}~${curr}`;
            });
            console.log(subscription);
            // let subscription = ['5~CCCAGG~BTC~USD', '5~CCCAGG~ETH~USD'];
            this.socket.emit('SubAdd', {subs: subscription});
            this.socket.on("m", function (message) {
                let messageType = message.substring(0, message.indexOf("~"));
                let res = <any>{};
                if (messageType === CCC.STATIC.TYPE.CURRENTAGG) {
                    res = CCC.CURRENT.unpack(message);
                    if (!!res.PRICE) {
                        observer.next(res);
                    }
                }

            });
            // setTimeout(() => {
            //     this.socket.close()
            // }, 15000)
        });

    }

}
