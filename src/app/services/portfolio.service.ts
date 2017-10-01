import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

export class InvestmentModel {

}

export class PortfolioModel {
    id: number;
    name: string;
    comment: string;
    invetments?: InvestmentModel[];
}

@Injectable()
export class PortfolioService {
    private baseUrl = environment['baseApiUrl'];

    constructor(private http: HttpClient) {

    }

    getAllPortfolios(): Observable<PortfolioModel[]> {
        return this.http.get<PortfolioModel[]>(`${this.baseUrl}portfolios`);
    }

    createPortfolio(portfolio: PortfolioModel) {
        return this.http.post<PortfolioModel>(`${this.baseUrl}portfolios`, portfolio);
    }
}
