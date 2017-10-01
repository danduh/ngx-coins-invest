import { Component, OnInit, ViewChild } from '@angular/core';
import { MdSidenav } from "@angular/material";
import { WindowService } from "./services/window.service";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    @ViewChild('sidenav') sideNav: MdSidenav;

    public title: string;
    public sideNavMode = 'side';

    constructor(private windowService: WindowService) {
    }

    ngOnInit() {
        this.windowService.width
            .subscribe((width) => {
                if (width) {
                    if (width < 1000) {
                        this.sideNavMode = "over";
                        this.sideNav.close();
                    } else {
                        this.sideNavMode = "side";
                    }
                }
            });
    }

    toggleMenu() {
        this.sideNav.toggle();
    }
}

Array.prototype['getUnique'] = function () {
    let _obj = {};
    let _l = this.length;
    while (_l--) {
        _obj[this[_l]] = null;
    }
    return Object.keys(_obj);
};
