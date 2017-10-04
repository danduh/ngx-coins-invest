import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-currency-selector',
    templateUrl: './currency-selector.component.html',
    styleUrls: ['./currency-selector.component.scss']
})
export class CurrencySelectorComponent implements OnInit {
    @Input() currencies: string[];
    @Output() onSelect = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }


}
