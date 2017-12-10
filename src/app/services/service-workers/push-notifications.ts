import { SwPush } from "@angular/service-worker";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

enum PushNotificationEnum {
    'email',
    'webPush',
    'appPush'
}

export interface NotificationSubscription {
    type: PushNotificationEnum;
    subscription: any;
    active: boolean;
}

@Injectable()
export class PushNotificationsService {
    private baseUrl = environment['baseApiUrl'];

    VAPID_PUBLIC_KEY = 'BK_ukYKGH0YmWHeZhCF0bXUXAeynmjSlhUswYK3d1aZYGsXOX7DKnAB5ElRxLUnaMsoVymo_MLJwl87XPrmO3CI';

    constructor(private swPush: SwPush,
                private http: HttpClient) {
    }

    subscribeToPush() {
        const subscrCall = this.swPush.requestSubscription({
            serverPublicKey: this.VAPID_PUBLIC_KEY
        });
        return Observable.fromPromise(subscrCall)
            .mergeMap((pushSubscription) => {
                return this.createSubscription(PushNotificationEnum.webPush, pushSubscription);
            });
    }

    createSubscription(type: PushNotificationEnum, pushSubscription: PushSubscription) {
        const _subscription: NotificationSubscription = {
            subscription: pushSubscription.toJSON(),
            active: true,
            type
        };

        return this.http.post(this.baseUrl + 'subscription', _subscription);
    }
}
