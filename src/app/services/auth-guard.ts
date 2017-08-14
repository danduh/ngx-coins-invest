import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { AppUser } from "../models/common";
import { MdSnackBar, MdSnackBarRef, SimpleSnackBar } from "@angular/material";

@Injectable()
export class AuthGuard {
    appUser: AppUser;
    private authSnackBar: MdSnackBarRef<SimpleSnackBar>;

    constructor(private authService: AuthService,
                private snackBar: MdSnackBar,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isLoggedIn()) {
            if (!!route.data.groups) {
                if (!this.checkGroups(route.data.groups)) {
                    return this.restrictedArea();
                }
                return true;
            } else {
                return true;
            }
        } else {
            this.router.navigate(['login']);
        }
    }

    checkGroups(required) {
        return required.some((group) => this.authService.isUserInGroup(group));
    }

    restrictedArea() {
        this.authSnackBar = this.snackBar.open('Sorry, you not allowed', null, {
            duration: 3000,
        });
        this.router.navigate(['portfolio']);
        return false;
    }
}
