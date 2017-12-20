import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ConfigService } from "../config.service";

@Injectable()
export class ConfigResolver implements Resolve<any> {
    constructor(private configService: ConfigService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.configService.get();
    }
}
