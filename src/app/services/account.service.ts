import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { MdSnackBar } from "@angular/material";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AccountService {
    baseUrl = environment['baseApiUrl'];

    constructor(private http: HttpClient) {

    }

    createAccountUser(user): Observable<any> {
        return this.http.post(`${this.baseUrl}accounts`, user);

    }

    public getOrCreate(): Observable<any> {
        let params = new HttpParams().set('getOrCreate', 'true');
        return this.http.get(`${this.baseUrl}accounts`, {params});
    }

    private postRequestSuccess(response: Response) {
        return response.json();
    }

}
