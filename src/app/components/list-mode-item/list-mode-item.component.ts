import { Component, Input, OnInit } from '@angular/core';
import { CoinModel } from "../../models/common";

@Component({
    selector: 'app-list-mode-item',
    templateUrl: './list-mode-item.component.html',
    styleUrls: ['./list-mode-item.component.scss']
})
export class ListModeItemComponent implements OnInit {
    @Input('coin') coin: CoinModel;

    constructor() {
    }

    ngOnInit() {
    }

}
