import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {InvestedCoinModel} from "../models/common";

export class InvestmentModel {

}

export class PortfolioModel {
    id: number;
    baseCurrency: string;
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

    createInvestment(invest: InvestedCoinModel, portfolioId: number) {
        return this.http.post<PortfolioModel>(`${this.baseUrl}portfolios/${portfolioId}/investments`, invest);
    }

    removeInvestment(portfolioId: number, investId: number) {
        return this.http.delete<InvestedCoinModel[]>(`${this.baseUrl}portfolios/${portfolioId}/investments/${investId}`);
    }

    getPortfolioInvestments(portfolioId) {
        return this.http.get<InvestedCoinModel[]>(`${this.baseUrl}portfolios/${portfolioId}/investments`)
            .map((coins) => coins.map((c) => new InvestedCoinModel(c)));
    }
}
