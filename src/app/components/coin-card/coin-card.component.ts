import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-coin-card',
    templateUrl: './coin-card.component.html',
    styleUrls: ['./coin-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoinCardComponent implements OnInit {
    @Input('coin') coin;

    constructor() {
    }

    ngOnInit() {

    }

}
