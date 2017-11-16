import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserLoginService } from './user-login.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard {
    constructor(public userService: UserLoginService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean | {}> {
        return this.userService.rxIsAuthenticated()
            .catch((err) => {
                this.router.navigate(['/g/login']);
                return Observable.throw(err);
            });
    }
}
