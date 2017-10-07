import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class LoaderService {
    _loaderState: BehaviorSubject<string> = new BehaviorSubject(null);

    get loaderState() {
        return this._loaderState.asObservable();
    }

    set loaderState(state: any) {
        this._loaderState.next(state);
    }

}
