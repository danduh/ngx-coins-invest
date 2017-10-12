import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Subject } from 'rxjs/Subject';
import * as autobahn from 'autobahn';

@Injectable()
export class PoloniexWssService extends WebsocketService {
    private wsuri = "wss://api.poloniex.com/";
    public tiks: Subject<any>;
    connection;

    constructor() {
        super();
        this.init();
    }

    init() {
        this.connection = new autobahn.Connection({
            url: this.wsuri,
            realm: "realm1"
        });
        this.connection.onopen = function (session) {
            function marketEvent(args, kwargs) {
                console.log(args);
            }

            function tickerEvent(args, kwargs) {
                // console.log(args);
            }

            function trollboxEvent(args, kwargs) {
                console.log(args);
            }

            session.subscribe('BTC_XMR', marketEvent);
            session.subscribe('ticker', tickerEvent);
            session.subscribe('trollbox', trollboxEvent);
        }

        this.connection.onclose = function () {
            console.log("Websocket connection closed");
        }

        this.connection.open();
    }

    _init() {
        this.tiks = <Subject<any>>this.connect(this.wsuri)
            .map((data: MessageEvent) => {
                console.log(data);
                return data;
            });
    }

}
