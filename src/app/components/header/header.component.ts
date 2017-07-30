import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MENU_LIST } from "../../constants/fixtures";

export interface MenuItem {
    link: string;
    label: string;
    icon: string;
    weight: number;
}

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    @Input() title: string;
    public menuItems = MENU_LIST.sort((item) => -item.weight);

    constructor() {
    }

    ngOnInit() {
    }

}
