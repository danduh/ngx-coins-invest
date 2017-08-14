import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, RouterStateSnapshot } from "@angular/router";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class OutOutletService {
    _data: BehaviorSubject<Data> = new BehaviorSubject(null);
    get data() {
        return this._data.asObservable();
    }

    set data(routData) {
        this._data.next(routData);
    }

    constructor() {
    }

    canActivate(route: ActivatedRouteSnapshot) {
        this.data = <any>route.data;
        return true;
    }

    getRoutData() {
        return this.data;
    }
}
