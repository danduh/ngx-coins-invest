import { Component, Input, OnInit } from '@angular/core';
import { InvestTotalsModel } from "../../models/common";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'app-footer-invest',
    templateUrl: './footer-invest.component.html',
    styleUrls: ['./footer-invest.component.scss']
})
export class FooterInvestComponent implements OnInit {
    @Input('totals') totals: Observable<InvestTotalsModel>;

    constructor() {
    }

    ngOnInit() {
    }

}
