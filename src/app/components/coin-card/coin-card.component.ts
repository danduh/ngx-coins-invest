import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ChartsService } from "../../services/charts/charts.service";
import { CoinModel } from "../../models/common";

@Component({
    selector: 'app-coin-card',
    templateUrl: './coin-card.component.html',
    styleUrls: ['./coin-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoinCardComponent implements OnInit {
    @Input('coin') coin: CoinModel;

    constructor(private chartService: ChartsService) {
    }

    ngOnInit() {
    }

}
