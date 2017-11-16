import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Subject } from 'rxjs/Subject';
import * as autobahn from 'autobahn';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { CommonTickerService } from './common-ticker.service';

@Injectable()
export class PoloniexWssService extends CommonTickerService {
    private subject: Subject<MessageEvent>;
    private wsuri = "wss://api.poloniex.com/";
    public tiks: Subject<any>;
    connection;

    constructor() {
        super();
        this.init();
    }

    setPairs(pairs) {
        this.addPairTick(pairs);
    }

    init() {
        this.connection = new autobahn.Connection({
            url: this.wsuri,
            realm: "realm1"
        });
        this.connection.onopen = function (session) {
            function marketEvent(args, kwargs) {
                // console.log(args);
            }

            function tickerEvent(args, kwargs) {
                this.emitPairTick(args);
                console.log(args);
            }

            function trollboxEvent(args, kwargs) {
                // console.log(args);
            }

            // session.subscribe('BTC_XMR', marketEvent);
            session.subscribe('ticker', tickerEvent);
            // session.subscribe('trollbox', trollboxEvent);
        };

        this.connection.onclose = function () {
            console.log("Websocket connection closed");
        };

        this.connection.open();
    }

    public connect(url): Subject<MessageEvent> {
        if (!this.subject) {
            this.subject = this.create(url);
            console.log("Successfully connected: " + url);
        }
        return this.subject;
    }

    private create(url): Subject<MessageEvent> {
        let ws = new WebSocket(url);

        let observable = Observable.create(
            (obs: Observer<MessageEvent>) => {
                ws.onmessage = obs.next.bind(obs);
                ws.onerror = obs.error.bind(obs);
                ws.onclose = obs.complete.bind(obs);
                return ws.close.bind(ws);
            });
        let observer = {
            next: (data: Object) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        }
        return Subject.create(observer, observable);
    }

    _init() {
        this.tiks = <Subject<any>>this.connect(this.wsuri)
            .map((data: MessageEvent) => {
                console.log(data);
                return data;
            });
    }

}
