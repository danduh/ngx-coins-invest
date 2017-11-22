import { SwPush } from "@angular/service-worker";
import { Inject, InjectionToken } from "@angular/core";

export const SW_PUSH = new InjectionToken('SwPush');

export class PushNotificationsService {
    VAPID_PUBLIC_KEY = 'BHVNn3ZDIJ-hWRBrtxmi5-Ie_aS26uIp4GJBXFXDg72hnmn-EKPEf2lJaEcciXFGmZ5Dx9lQLmbGZyBCT4N78VE';

    constructor(
        // private swPush: SwPush
    ) {
    }

    subscribeToPush() {

        // Requesting messaging service to subscribe current client (browser)
        // this.swPush.requestSubscription({
        //     serverPublicKey: this.VAPID_PUBLIC_KEY
        // })
        //     .then(pushSubscription => {
        //
        //         console.log(JSON.stringify(pushSubscription));
        //         // Passing subscription object to our backend
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     });

    }
}
