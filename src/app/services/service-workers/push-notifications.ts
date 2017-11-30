import { SwPush } from "@angular/service-worker";
import { Inject, Injectable, InjectionToken, Injector } from "@angular/core";
import { AppConfig } from "../config.service";
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

    VAPID_PUBLIC_KEY = 'BL9e7DyZzS_J3oiFQ1RINZa-WqHvRw72Kp5ssH1MzK1W1wStfnK4TJFgrTTvnleSWr7l_N3Th_dMshSoJ4qRYZQ';
    // KB1uGSdObw_dy3U0xk_CD7eOB9_HaUEbGP5eLGoTfFI

    // VAPID_PUBLIC_KEY = 'AIzaSyCfDxZGtdUkLscZ05_6eiuW65YC-wRGE28';

    constructor(private swPush: SwPush,
                private http: HttpClient) {
    }

    subscribeToPush() {
        // this.swPush.unsubscribe()
        //     .then((subs) => {
        //         console.log(subs)
        //     }).catch((subs) => {
        //     console.log(subs)
        // })

        // return Observable.create((observer) => {
        this.swPush.requestSubscription({
            serverPublicKey: this.VAPID_PUBLIC_KEY
        })
            .then(pushSubscription => {

                console.log(JSON.stringify(pushSubscription));
                // Passing subscription object to our backend
            })
            .catch(err => {
                console.error(err);
            });

        // this.swPush.requestSubscription({
        //     serverPublicKey: this.VAPID_PUBLIC_KEY
        // }).then((pushSubscription) => {
        //     // this.createSubscription(PushNotificationEnum.webPush, pushSubscription)
        //     //     .subscribe((reposne) => {
        //     console.log(pushSubscription);
        //     //     observer.next(reposne);
        //     //     observer.complete();
        //     // });
        // }).catch((err) => {
        //     console.log(err);
        // });


        // });
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
