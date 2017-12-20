import { Injectable } from '@angular/core';
import { CoinModel, InvestedCoinModel } from '../models/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from "../../environments/environment";
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from "@angular/material";
import { CognitoUtil } from "./cognito-utility.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { ConfigService } from "./config.service";

@Injectable()
export class CoinsService {
    baseUrl = environment['baseApiUrl'];
    coinsApiUrl = 'https://min-api.cryptocompare.com/data/';

    private _datePipe = new DatePipe('en');
    private cachedList: CoinModel[];
    private authSnackBar: MatSnackBarRef<SimpleSnackBar>;

    constructor(private router: Router,
                private configService: ConfigService,
                public cognitoUtil: CognitoUtil,
                private snackBar: MatSnackBar,
                private http: HttpClient) {
    }

    private normalizeCoins(baseCurrency: string, dataType: string, response): CoinModel | CoinModel[] {
        if (dataType.indexOf('histo') !== -1) {
            return response;
        }

        let _coins = response.RAW;

        let symbols = Object.keys(response.RAW);
        let results: CoinModel[] = [];

        symbols.forEach((sym) => {
            if (sym === baseCurrency) {
                return;
            }

            let coin = _coins[sym][baseCurrency];
            results.push({
                name: coin.FROMSYMBOL,
                symbol: this.configService.config.mapCoinName[coin.FROMSYMBOL],
                baseCurrency: coin.TOSYMBOL,
                quantity: coin.FROMSYMBOL,
                market_cap: coin.MKTCAP,
                percent_change_24h: Number((coin.CHANGEPCT24HOUR).toFixed(4)),
                price: coin.PRICE,
                logo: this.configService.config.mediaBaseUrl + coin.FROMSYMBOL.toLowerCase() + '.png',
                volume_24h: coin.VOLUME24HOUR,
                volume_24h_to: coin.VOLUME24HOURTO,
                high_24h: coin.HIGH24HOUR,
                low_24h: coin.LOW24HOUR
            });
        });
        return results.length === 1 ? results[0] : results;
    };

    private options(baseCurrency, coinId = null): Observable<HttpParams> {
        let params: HttpParams = new HttpParams()
            .set('limit', '30')
            .set('fsym', baseCurrency)
            .set('tsyms', baseCurrency);

        if (!!coinId) {
            params.set('tsym', coinId);
        }

        return Observable.create((observer) => {
            if (!!this.configService.config) {
                params = params.set('fsyms', coinId ? coinId : this.configService.config.allowedCoins.join(','));
                observer.next(params);
                observer.complete();
            } else {
                this.configService.get()
                    .subscribe((config) => {
                        params = params.set('fsyms', coinId ? coinId : config.allowedCoins.join(','));
                        observer.next(params);
                        observer.complete();
                    });
            }
        });
    }


    public getList(curr = 'USD', dataType = 'pricemultifull'): Observable<CoinModel[]> {
        return this.options(curr).mergeMap((params) => {
            return this.http.get<CoinModel[]>(`${this.coinsApiUrl}${dataType}`, {params})
                .map(this.normalizeCoins.bind(this, curr, dataType));
        });
    }

    public getOneCoin(coinId, curr = 'USD', dataType = 'pricemultifull'): Observable<CoinModel> {
        return this.options(curr, coinId).mergeMap((params) => {
            return this.http.get<CoinModel>(`${this.coinsApiUrl}${dataType}`, {params})
                .map(this.normalizeCoins.bind(this, curr, dataType));
        });
    }

    public getCoinGraph(curr, coinId, timeRange = 'week') {
        let params: HttpParams = new HttpParams()
            .set('fsym', curr)
            .set('tsym', coinId);

        return this.http.get<CoinModel>(`${this.coinsApiUrl}histohour`, {params})
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
        return this.http.post<CoinModel>(`${this.baseUrl}invested`, coin);
    }

    public deleteInvest(investId): Observable<any> {
        // if (!this.auth.isUserInGroup('investors')) {
        //     this.actionNotAllowed();
        //     return Observable.throw('notAllowed');
        // }

        // let options = this.getAuthHeader();
        return this.http.delete(`${this.baseUrl}invested/${investId}`);
    }

    public getInvestedList(): Observable<InvestedCoinModel[]> {
        return this.http.get<InvestedCoinModel[]>(`${this.baseUrl}invested`);
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
