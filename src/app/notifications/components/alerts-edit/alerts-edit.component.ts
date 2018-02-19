import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AlertTriggerTypes, AlertTypes } from "../../cosntants";
import { ErrorHandlerClass } from "../../../components/extendable/error-handler.class";
import { Subscription } from "rxjs/Subscription";
import { CoinsService } from "../../../services/coins.service";
import { InvestedCoinModel } from "../../../models/common";


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

    private tempConfig;
    private coinDataSubs: Subscription;

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private coinService: CoinsService) {
        super();
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
        console.log(this.alertForm.getRawValue());
    }

}
