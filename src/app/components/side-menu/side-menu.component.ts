import { Component, OnInit } from '@angular/core';
import { MENU_LIST } from "../../constants/fixtures";

export interface MenuItem {
    link: string;
    label: string;
    icon: string;
    weight: number;
    split?: boolean;
}


@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
    public menuItems = MENU_LIST.sort((item) => -item.weight);

    constructor() {
    }

    ngOnInit() {
    }

}
