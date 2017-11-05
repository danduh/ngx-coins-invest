import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class LoaderService {
    private _isActive: BehaviorSubject<string> = new BehaviorSubject(null);

    public get isActive() {
        return this._isActive.asObservable();
    }

    public set isActive(state: any) {
        this._isActive.next(state);
    }

    constructor() {
    }

}
