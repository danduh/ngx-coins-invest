import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

// TODO: Change to single profile. ..

export class AccountModel {
    public id: number = null;
    public name?: string = null;
    public createdAt?: string = null;
}

export class UserModel {
    private _fullName: string;
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    set fullName(value) {
        console.error('You should not set user\'s this.fullName');
    }

    id: number;
    userSub: string;
    email: string;
    firstName: string;
    lastName: string;
}

export class ProfileModel extends AccountModel {
    accountName: string;
    user: UserModel;
}


@Injectable()
export class AccountService {
    baseUrl = environment['baseApiUrl'];

    static AccUserIntoProfile(account) {
        const profile: ProfileModel = {
            id: account.id,
            user: account['Users'][0],
            accountName: account.name
        };
        return profile;
    }

    static ProfileIntoAccountDBModel(profile: ProfileModel) {
        const account = profile;
        account['Users'] = [profile.user];
        account.name = account.accountName;
        delete account.user;
        delete account.accountName;
        return account;
    }

    constructor(private http: HttpClient) {

    }

    createAccountUser(user): Observable<any> {
        return this.http.post(`${this.baseUrl}accounts`, user);

    }

    public getOrCreate(): Observable<ProfileModel> {
        let params = new HttpParams().set('getOrCreate', 'true');
        return this.http.get<ProfileModel>(`${this.baseUrl}accounts`, {params})
            .map(AccountService.AccUserIntoProfile.bind(this));
    }

    public getAccount(): Observable<any> {
        return this.http.get<ProfileModel>(`${this.baseUrl}accounts`)
            .map(AccountService.AccUserIntoProfile.bind(this));
    }

    public updateAccount(profile: ProfileModel) {
        const account = AccountService.ProfileIntoAccountDBModel(profile);
        return this.http.put<ProfileModel>(`${this.baseUrl}accounts/${profile.id}`, profile)
            .map(AccountService.AccUserIntoProfile.bind(this));
    }

    private postRequestSuccess(response: Response) {
        return response.json();
    }

}
