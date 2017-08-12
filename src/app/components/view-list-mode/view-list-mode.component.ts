import { Component, Input, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { CoinModel, InvestedCoinModel } from "../../models/common";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { DataSource } from "@angular/cdk";

@Component({
    selector: 'app-view-list-mode',
    templateUrl: './view-list-mode.component.html',
    styleUrls: ['./view-list-mode.component.scss']
})
export class ViewListModeComponent implements OnInit {
    @Input('visibleCoins') visibleCoins: Observable<CoinModel>;
    public displayedColumns = ['investId', 'quantity', 'openPrice', 'price_usd'];
    public investedCoinsDatabase;
    dataSource: SimpleCoinsDataSource | null;

    constructor() {

    }

    ngOnInit() {
        this.investedCoinsDatabase = new InvestedCoinsDatabase(this.visibleCoins);
        // this.dataSource = new InvestedCoinsDataSource(this.investedCoinsDatabase);
        this.dataSource = new SimpleCoinsDataSource(this.visibleCoins);
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
        // Fill up the database with 100 users.
        // for (let i = 0; i < 100; i++) { this.addUser(); }
    }

    /** Adds a new user to the database. */
    setData() {
        const copiedData = this.data.slice();
        copiedData.push(this.createNewUser());
        this.dataChange.next(copiedData);
    }

    /** Builds and returns a new User. */
    private createNewUser() {
        return {logo: '', quantity: 9, name: 's', symbol: 's'}
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
    coins

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
