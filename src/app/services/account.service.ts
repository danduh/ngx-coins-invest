import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MdSnackBar } from "@angular/material";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AccountService {
    baseUrl = environment['baseApiUrl'];

    private getAuthHeader(shouldAuth?: boolean): any {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', this.auth.getAuthToken());

        return {headers: headers};
    }

    constructor(private router: Router,
                private auth: AuthService,
                private snackBar: MdSnackBar,
                private http: HttpClient) {

    }

    createAccountUser(user): Observable<any> {
        let options = this.getAuthHeader();
        return this.http.post(`${this.baseUrl}accounts`, user, options);

    }

    private postRequestSuccess(response: Response) {
        return response.json();
    }

}
