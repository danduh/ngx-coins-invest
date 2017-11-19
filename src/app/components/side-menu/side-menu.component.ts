import { Component, Input, OnInit } from '@angular/core';
import { MENU_LIST } from "../../constants/fixtures";
import { Route, Router } from "@angular/router";

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
    @Input('sidenav') sidenav;

    constructor(private router: Router) {
    }

    onClick(item) {
        this.router.navigate([item.link]);
        this.sidenav.close();
    }

    ngOnInit() {
        console.log(this.sidenav);
    }

}
