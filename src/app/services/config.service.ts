import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";


export interface AppConfig {
    mediaBaseUrl: string;
    allowedCoins: string[];
    currency: string[];
    mapCoinName: any;
}

@Injectable()
export class ConfigService {
    private baseUrl = environment['baseApiUrl'];
    config: AppConfig = null;
    error: any;

    constructor(private http: HttpClient) {
    }

    get(): Observable<AppConfig> {
        if (!!this.config) {
            return Observable.of(this.config);
        }

        return this.http.get<AppConfig>(this.baseUrl + 'config')
            .map((config) => {
                this.config = <AppConfig>config;
                return config;
            });
    }
}
