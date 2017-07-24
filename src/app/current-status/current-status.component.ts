import { Component, OnInit } from '@angular/core';
import { CoinsService } from "../services/coins.service";
import { Observable } from "rxjs/Observable";
import { InvestedCoinModel } from "../models/common";

@Component({
    selector: 'app-current-status',
    templateUrl: './current-status.component.html',
    styleUrls: ['./current-status.component.scss']
})
export class CurrentStatusComponent implements OnInit {
    public visibleCoins: Observable<InvestedCoinModel[]>;

    constructor(private coinService: CoinsService) {

    }

    ngOnInit() {
        this.visibleCoins = this.coinService.getInvestedList();
    }

}
