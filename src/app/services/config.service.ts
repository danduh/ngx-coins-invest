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

    constructor(private http: HttpClient) {
    }

    get() {
        if (!!this.config) {
            return Observable.of(this.config);
        }

        return this.http.get<AppConfig>(this.baseUrl + 'config')
            .map((config) => {
                this.config = config;
                return config;
            });
    }
}
