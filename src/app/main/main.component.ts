import { Component, OnInit, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { WindowService } from '../services/window.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    @ViewChild('sidenav') sideNav: MdSidenav;
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
