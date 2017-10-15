import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CognitoUtil } from "./cognito-utility.service";
import { LoaderService } from "../shared/loader.service";

@Injectable()
export class CognitoAuthInterceptor implements HttpInterceptor {
    constructor(private cognitoUtil: CognitoUtil,
                private loaderService: LoaderService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.loaderState = 'query';
        return this.cognitoUtil.rxGetAuthToken()
            .catch((err) => {
                console.log(err);
                return next.handle(req);
            })
            .flatMap((token: string) => {
                const authReq = req.clone({
                    headers: req.headers.set('Authorization', token)
                });

                return next.handle(authReq)
                    .map((event: HttpEvent<any>) => {
                        this.loaderService.loaderState = 'indeterminate';
                        return event;
                    })
                    .catch((err: HttpErrorResponse, caught) => {
                        if (err.error instanceof Error) {
                            console.log("Client-side error occured.");
                        } else {

                            console.log("Server-side error occured.");
                        }

                        let errMsg;
                        if (err.status === 404) {
                            errMsg = JSON.parse(err.error);
                        }
                        return Observable.throw(errMsg);
                    });
            });

    }
}

export const parseJwt = (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

