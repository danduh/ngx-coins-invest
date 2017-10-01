import { Directive, Input, ViewContainerRef, TemplateRef, OnInit } from '@angular/core';
import { UserLoginService } from "../services/user-login.service";

@Directive({
    selector: '[appHasPerms]'
})
export class PermissionsDirective implements OnInit {
    private user;
    _hasPerms: string;

    @Input()
    set appHasPerms(name: any) {
        this._hasPerms = name;
    }

    get appHasPerms() {
        return this._hasPerms;
    }

    constructor(private templateRef: TemplateRef<any>,
                private userService: UserLoginService,
                private viewContainerRef: ViewContainerRef) {
    }

    ngOnInit() {
        if (this.appHasPerms === 'isLoggedIn') {
            this.userService.isAuthenticated(this);
        } else {
            this.viewContainerRef.clear();
        }
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (isLoggedIn) {
            this.userService.isAuthenticated(this);
        } else {
            this.viewContainerRef.clear();
        }
    }
}
