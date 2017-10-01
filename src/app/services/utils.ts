import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { CognitoUtil } from "./cognito-utility.service";

@Injectable()
export class CognitoAuthInterceptor implements HttpInterceptor {
    constructor(private cognitoUtil: CognitoUtil) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.cognitoUtil.rxGetAuthToken()
            .catch((err) => {
                console.log(err);
                return next.handle(req);
            })
            .flatMap((token: string) => {
                const authReq = req.clone({
                    headers: req.headers.set('Authorization', token)
                });
                return next.handle(authReq);
            });

    }
}

export const parseJwt = (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};
