import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AlertTriggerTypes, AlertTypes } from "../../cosntants";
import { ErrorHandlerClass } from "../../../components/extendable/error-handler.class";
import { Subscription } from "rxjs/Subscription";
import { CoinsService } from "../../../services/coins.service";
import { InvestedCoinModel } from "../../../models/common";
import { select, Store } from '@ngrx/store';
import { notificationsStore } from "../../../store/notifications/index";
import * as NotificationActions from './../../../store/notifications/actions';

@Component({
    selector: 'app-alerts-edit',
    templateUrl: './alerts-edit.component.html',
    styleUrls: ['./alerts-edit.component.scss', '../../../shared/styles/simple-forms.scss']
})
export class AlertsEditComponent extends ErrorHandlerClass implements OnInit {

    public alertTypes = AlertTypes;
    public alertForm: FormGroup;
    public currencies: string[];
    public coinIds: string[];
    public isReady = true;
    public alertTriggers = AlertTriggerTypes;
    public coin: InvestedCoinModel;
    public notificationsStore$;
    private tempConfig;
    private coinDataSubs: Subscription;

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private store: Store<any>,
                private coinService: CoinsService) {
        super();

        this.notificationsStore$ = store.pipe(select(notificationsStore));

        const config = route.snapshot.data['config'];
        this.currencies = config.currency;
        this.coinIds = config.allowedCoins;

        this.alertForm = fb.group({
            type: [null],
            baseCurrency: [null],
            coinId: [null],
            direction: null,
            targetPrice: null
        });
    }

    shouldUpadteCoin(alertConfig) {
        if ((alertConfig.coinId && alertConfig.baseCurrency) &&
            ((!this.coin) ||
                (this.coin.coinId !== alertConfig.coinId ||
                    this.coin.baseCurrency !== alertConfig.baseCurrency))) {
            this.loadCurrentCoinData(alertConfig.coinId, alertConfig.baseCurrency);
        }
    }

    ngOnInit() {
        this.alertForm.valueChanges.subscribe((alertConfig) => {
            this.shouldUpadteCoin(alertConfig);
        });
    }

    loadCurrentCoinData(coinId = 'BTC', baseCurrency = 'USD') {
        this.coinDataSubs = this.coinService.getOneCoin(coinId, baseCurrency)
            .take(1)
            .subscribe((coin) => {
                if (!coin) {
                    return;
                }
                this.coin = new InvestedCoinModel(<InvestedCoinModel>coin);
                console.log(this.coin);
            });
    }

    onSave() {
        let payload = this.alertForm.getRawValue();
        console.log(payload);
        this.notificationsStore$.dispatch(new NotificationActions.CreateNewRecord(payload));

    }

}
