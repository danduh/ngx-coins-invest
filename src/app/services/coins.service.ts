import { Injectable } from '@angular/core';
import { CoinModel, InvestedCoinModel } from '../models/common';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from "../../environments/environment";
import { MdSnackBar, MdSnackBarRef, SimpleSnackBar } from "@angular/material";
import { CognitoUtil } from "./cognito-utility.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { DatePipe } from "@angular/common";

@Injectable()
export class CoinsService {
    baseUrl = environment['baseApiUrl'];

    private _datePipe = new DatePipe('en');
    private cachedList: CoinModel[];
    private authSnackBar: MdSnackBarRef<SimpleSnackBar>;


    // private getAuthHeader(shouldAuth?: boolean): any {
    //     let headerObject = {'Content-Type': 'application/json'};
    //     // headerObject['Authorization'] = this.cognitoUtil.getAuthToken();
    //     return {headers: new Headers(headerObject)};
    // }

    constructor(private router: Router,
                public cognitoUtil: CognitoUtil,
                private snackBar: MdSnackBar,
                private http: HttpClient) {
    }

    public getList(curr = 'USD'): Observable<CoinModel[]> {
        let params: HttpParams = new HttpParams()
            .set('baseCurrency', curr).set('dataType', 'pricemultifull');

        return this.http.get<CoinModel[]>(`${this.baseUrl}coins`, {params}).share();
    }

    public getOneCoin(coinId, curr = 'USD') {
        let params: HttpParams = new HttpParams()
            .set('baseCurrency', curr).set('dataType', 'pricemultifull');

        return this.http.get(`${this.baseUrl}coins/${coinId}`, {params})
            .map((coins) => coins[0]);
    }

    public getCoinGraph(curr, coinId, timeRange = 'week') {
        let params: HttpParams = new HttpParams()
            .set('baseCurrency', curr)
            .set('timeRange', timeRange)
            .set('dataType', 'histoday');

        return this.http.get(`${this.baseUrl}coins/${coinId}`, {params})
            .map((response) => {
                let data = response['Data'];
                let parsedData = [
                    // {label: 'Open', data: []},
                    {label: 'Close', data: []},
                    {label: 'Low', data: []},
                    {label: 'High', data: []},
                ];
                let xAxisLabels = [];

                let _len = response['Data'].length;

                while (_len--) {
                    let point = response['Data'][_len];
                    // parsedData[0].data[_len] = point['open'];
                    parsedData[0].data[_len] = point['close'];
                    parsedData[1].data[_len] = point['low'];
                    parsedData[2].data[_len] = point['high'];

                    xAxisLabels[_len] = this._datePipe.transform(point['time'] * 1000);
                }
                return {parsedData, xAxisLabels};
            });
    }

    public addCoin(coin): Observable<CoinModel> {
        // let options = this.getAuthHeader();
        return this.http.post(`${this.baseUrl}invested/${coin.id}`, coin)
            .map(this.postRequestSuccess.bind(this));
    }

    public deleteInvest(investId): Observable<any> {
        // if (!this.auth.isUserInGroup('investors')) {
        //     this.actionNotAllowed();
        //     return Observable.throw('notAllowed');
        // }

        // let options = this.getAuthHeader();
        return this.http.delete(`${this.baseUrl}invested/${investId}`)
            .map(this.postRequestSuccess.bind(this));
    }

    public getInvestedList(): Observable<InvestedCoinModel[]> {
        return this.http.get(`${this.baseUrl}invested`)
            .map(this.postRequestSuccess.bind(this));
    }

    private postRequestSuccess(response: Response) {
        return response.json();
    }

    private postRequestFail(observer, response) {
        this.router.navigate(['/login']);
        console.log(observer, response);
    }

    private actionNotAllowed() {
        this.authSnackBar = this.snackBar.open('Sorry, you not allowed', null, {
            duration: 3000,
        });
    }
}
