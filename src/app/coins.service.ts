import { Injectable } from '@angular/core';
import { CoinModel } from './models/common';
import { Router } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CoinsService {
    // baseUrl = 'https://rqoxmx1q80.execute-api.us-east-1.amazonaws.com/dev/';
    baseUrl = 'http://localhost:4200/mocks/';

    private cachedList: CoinModel[];

    private getAuthHeader(shouldAuth?: boolean): any {
        let headerObject = {'Content-Type': 'application/json'};
        headerObject['Authorization'] = this.auth.getAuthToken();
        console.log(headerObject);
        let _t = new Headers(headerObject);
        return {headers: new Headers(headerObject)};
    }

    constructor(private router: Router,
                private auth: AuthService,
                private http: Http) {
    }

    public getList(): Observable<CoinModel[]> {
        const options = this.getAuthHeader();
        return this.http.get(`${this.baseUrl}coins`, options)
            .map(this.postRequestSuccess.bind(this))
    }

    public getOneCoin(coinId) {
        let options = this.getAuthHeader();
        return this.http.get(`${this.baseUrl}coins/${coinId}`, options)
            .map(this.postRequestSuccess.bind(this))
            .map((coins) => coins[0]);
    }

    public addCoin(coin): Observable<CoinModel> {
        let options = this.getAuthHeader();
        return this.http.post(`${this.baseUrl}coins/${coin.id}`, coin, options)
            .map(this.postRequestSuccess.bind(this));
    }

    private postRequestSuccess(response: Response) {
        return response.json()
    }

    private postRequestFail(observer, response) {
        this.router.navigate(['/login']);
        console.log(observer, response);
    }

}
