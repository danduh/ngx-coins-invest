import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TradeApiService {

    constructor(private $http: Http) {
    }

    getOnePair(coin, money) {
        return this.$http.get(`https://api.cryptonator.com/api/full/${coin}-${money}`)
            .map(this.postRequest.bind(this))
            .map((resp: any) => {
                return resp;
            });
    }

    getListPair(abbrs, money) {
        let calls = [];
        for (let abbr of abbrs) {
            calls.push(this.getOnePair(abbr, money))
        }
        return Observable.forkJoin(...calls)
            .map((resp) => {
                return resp;
            })

    }

    postRequest(data) {
        return data.json().ticker;
    }
}
