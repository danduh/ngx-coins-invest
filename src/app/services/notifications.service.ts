import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export class NotificationsService {
    baseUrl = environment['baseApiUrl'];

    constructor(private http: HttpClient) {

    }

    createNotification(data) {
        return this.http.post(`${this.baseUrl}alerts`, data);
    }
}
