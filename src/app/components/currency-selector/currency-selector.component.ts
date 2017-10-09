import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfigService } from "../../services/config.service";

@Component({
    selector: 'app-currency-selector',
    templateUrl: './currency-selector.component.html',
    styleUrls: ['./currency-selector.component.scss']
})
export class CurrencySelectorComponent implements OnInit {
    public currencies: string[];
    @Output() onSelect = new EventEmitter();

    constructor(private configService: ConfigService) {
    }

    ngOnInit() {
        this.configService.get()
            .subscribe((config) => {
                this.currencies = config.currency;
            });

    }


}
