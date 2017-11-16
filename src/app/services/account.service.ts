import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

// TODO: Change to single profile. ..

export class AccountModel {
    public id: number = null;
    public createdAt?: string = null;

    private _fullName: string;
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    set fullName(value) {
        console.error('You should not set user\'s this.fullName');
    }

    userSub: string;
    email: string;
    firstName: string;
    lastName: string;
}


@Injectable()
export class AccountService {
    baseUrl = environment['baseApiUrl'];

    constructor(private http: HttpClient) {

    }

    createAccountUser(user): Observable<any> {
        return this.http.post(`${this.baseUrl}accounts`, user);

    }

    public getOrCreate(): Observable<AccountModel> {
        let params = new HttpParams().set('getOrCreate', 'true');
        return this.http.get<AccountModel>(`${this.baseUrl}accounts`, {params});
    }

    public getAccount(): Observable<any> {
        return this.http.get<AccountModel>(`${this.baseUrl}accounts`);
    }

    public updateAccount(profile: AccountModel) {
        return this.http.put<AccountModel>(`${this.baseUrl}accounts/${profile.id}`, profile);
    }

    private postRequestSuccess(response: Response) {
        return response.json();
    }

}
