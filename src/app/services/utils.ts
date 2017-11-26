import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CognitoUtil } from "./cognito-utility.service";
import { LoaderService } from "../shared/loader.service";

const BLACK_LIST = ['min-api.cryptocompare.com'];

@Injectable()
export class CognitoAuthInterceptor implements HttpInterceptor {
    constructor(private cognitoUtil: CognitoUtil) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req.url)
        if (BLACK_LIST.some((bl) => req.url.includes(bl))) {
            return next.handle(req);
        }

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
                        return event;
                    })
                    .catch((err: HttpErrorResponse, caught) => {
                        if (err instanceof HttpErrorResponse) {
                            console.log('ddd')
                        }
                        if (err.error instanceof Error) {
                            console.log("Client-side error occured.");
                        } else {

                            console.log("Server-side error occured.");
                        }

                        let errMsg;
                        if (err.status === 404) {
                            try {
                                errMsg = JSON.parse(err.error);
                            } catch (err) {
                                return Observable.throw(err.error);
                            }
                        }
                        if (err.status === 401) {
                            try {
                                errMsg = JSON.parse(err.error);
                            } catch (err) {
                                return Observable.throw(err.error);
                            }
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

