import { Directive, Input, ViewContainerRef, TemplateRef, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";

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
                private authService: AuthService,
                private viewContainerRef: ViewContainerRef) {
    }

    ngOnInit() {
        console.log(this.appHasPerms);
        console.log(this.authService.isLoggedIn());

        if (this.appHasPerms === 'isLoggedIn' && this.authService.isLoggedIn()) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainerRef.clear();
        }
    }
}
