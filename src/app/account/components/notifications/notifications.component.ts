import { Component, OnInit } from '@angular/core';
import { PushNotificationsService } from "../../../services/service-workers/push-notifications";

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss', '../../../shared/styles/simple-forms.scss']
})
export class NotificationsComponent implements OnInit {

    constructor(private pushService: PushNotificationsService) {
    }

    ngOnInit() {
    }

    subscribe() {
        this.pushService.subscribeToPush();
            // .subscribe((response) => {
            //     console.log('SUBSCIBED!!', response);
            // }, (err) => {
            //     console.log('NOT_SUBSCIBED!!', err);
            // });
    }
}
