import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
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
