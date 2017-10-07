import { Injectable } from '@angular/core';
import { CoinModel, InvestedCoinModel } from '../models/common';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from "../../environments/environment";
import { MdSnackBar, MdSnackBarRef, SimpleSnackBar } from "@angular/material";
import { CognitoUtil } from "./cognito-utility.service";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable()
export class CoinsService {
    baseUrl = environment['baseApiUrl'];

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
