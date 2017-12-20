import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
    public navTabs = [
        {path: 'view', title: 'My Alerts'},
        {path: 'edit', title: 'Add Alert'}
    ];

    constructor() {

    }

    ngOnInit() {
    }
}
