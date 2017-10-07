import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MdSidenav } from "@angular/material";
import { WindowService } from "./services/window.service";
import { LoaderService } from "./shared/loader.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    @ViewChild('sidenav') sideNav: MdSidenav;

    public title: string;
    public sideNavMode = 'side';
    public loaderState: string = null;

    constructor(private windowService: WindowService,
                private loaderService: LoaderService) {
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

    ngAfterViewInit() {
        // this.loaderService.loaderState
        //     .subscribe((state) => {
        //         this.loaderState = state;
        //     });
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
