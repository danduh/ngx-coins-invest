import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LoaderService } from "./shared/loader.service";
import { UserLoginService } from './services/user-login.service';
import { Observable } from 'rxjs/Observable';
import { Angulartics2GoogleAnalytics } from "angulartics2/ga";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    public title: string;
    public loaderState: string = null;
    public isLoggedIn: Observable<boolean>;

    constructor(private userService: UserLoginService,
                private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
                private loaderService: LoaderService) {
    }


    ngOnInit() {
        this.isLoggedIn = this.userService.rxIsAuthenticated();
    }

    ngAfterViewInit() {
        // this.loaderService.loaderState
        //     .subscribe((state) => {
        //         this.loaderState = state;
        //     });
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
