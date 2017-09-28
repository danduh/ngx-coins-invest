import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { InvestedCoinModel } from "../../models/common";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { DataSource } from "@angular/cdk/table";
import { InvestedFacade } from "app/states/invested-facade";
import { CoinsService } from "../../services/coins.service";
import { WindowService } from "../../services/window.service";

@Component({
    selector: 'app-view-list-mode',
    templateUrl: './view-list-mode.component.html',
    styleUrls: ['./view-list-mode.component.scss']
})
export class ViewListModeComponent implements OnInit {
    // @Input('visibleCoins') visibleCoins: Observable<CoinModel>;
    public displayedColumns = ['investId', 'quantity', 'openPrice', 'price_usd', 'plUsd', 'plPct'];
    public investedCoinsDatabase;
    public isMobile = false;
    dataSource: InvestedCoinsDataSource | null;

    constructor(private investFacade: InvestedFacade,
                private windowService: WindowService,
                private coinService: CoinsService) {

    }

    ngOnInit() {
        this.windowService.width
            .subscribe((size) => {
                this.isMobile = size < 600;
                if (!this.isMobile && this.displayedColumns.indexOf('delete') === -1) {
                    this.displayedColumns.push('delete');
                }
            });
        this.investFacade.subscribeToState()
            .subscribe((data) => {
                this.investedCoinsDatabase = new InvestedCoinsDatabase(data);
                this.dataSource = new InvestedCoinsDataSource(this.investedCoinsDatabase);
                console.log(this.dataSource)
            });

    }

    deleteInvest(investId) {
        this.coinService.deleteInvest(investId)
            .subscribe(() => {
                this.investFacade.loadInvestedCoins();
            }, (err) => {
                console.log(err);
            });
    }

}

export class InvestedCoinsDatabase {
    /** Stream that emits whenever the data has been modified. */
        // dataChange: BehaviorSubject<InvestedCoinModel[]> = new BehaviorSubject<InvestedCoinModel[]>([]);
    dataChange;

    get data(): InvestedCoinModel[] {
        return this.dataChange.value;
    }

    constructor(data) {
        this.dataChange = new BehaviorSubject<InvestedCoinModel[]>(data);
        // for (let i = 0; i < 100; i++) { this.addUser(); }
    }

    /** Adds a new user to the database. */

    /** Builds and returns a new User. */
    private createNewUser() {
        return {logo: '', quantity: 9, name: 's', symbol: 's'};
    }
}

export class InvestedCoinsDataSource extends DataSource<any> {
    constructor(private _exampleDatabase: InvestedCoinsDatabase) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<InvestedCoinModel[]> {
        return this._exampleDatabase.dataChange;
    }

    disconnect() {
    }
}

export class SimpleCoinsDataSource extends DataSource<any> {
    coins;

    constructor(data) {
        super();
        this.coins = data;
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<InvestedCoinModel[]> {

        return this.coins;
    }

    disconnect() {
    }
}
