import { Injectable } from '@angular/core';
import { CoinModel } from '../models/common';
import { Router } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { environment } from "../../environments/environment";
import { MdSnackBar, MdSnackBarRef, SimpleSnackBar } from "@angular/material";

@Injectable()
export class CoinsService {
    // baseUrl = 'https://i10kcmw72h.execute-api.us-east-1.amazonaws.com/dev/';
    //
    baseUrl = environment['baseApiUrl'];

    private cachedList: CoinModel[];
    private authSnackBar: MdSnackBarRef<SimpleSnackBar>;


    private getAuthHeader(shouldAuth?: boolean): any {
        let headerObject = {'Content-Type': 'application/json'};
        headerObject['Authorization'] = this.auth.getAuthToken();
        return {headers: new Headers(headerObject)};
    }

    constructor(private router: Router,
                private auth: AuthService,
                private snackBar: MdSnackBar,
                private http: Http) {
    }

    public getList(): Observable<CoinModel[]> {
        const options = this.getAuthHeader();
        return this.http.get(`${this.baseUrl}coins`, options)
            .map(this.postRequestSuccess.bind(this));
    }

    public getOneCoin(coinId) {
        let options = this.getAuthHeader();
        return this.http.get(`${this.baseUrl}coins/${coinId}`, options)
            .map(this.postRequestSuccess.bind(this))
            .map((coins) => coins[0]);
    }

    public addCoin(coin): Observable<CoinModel> {
        let options = this.getAuthHeader();
        return this.http.post(`${this.baseUrl}invested/${coin.id}`, coin, options)
            .map(this.postRequestSuccess.bind(this));
    }

    public deleteInvest(investId): Observable<any> {
        if (!this.auth.isUserInGroup('investors')) {
            this.actionNotAllowed();
            return Observable.throw('notAllowed');
        }

        let options = this.getAuthHeader();
        return this.http.delete(`${this.baseUrl}invested/${investId}`, options)
            .map(this.postRequestSuccess.bind(this));
    }

    public getInvestedList(): Observable<CoinModel[]> {
        let options = this.getAuthHeader();
        return this.http.get(`${this.baseUrl}invested`, options)
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
