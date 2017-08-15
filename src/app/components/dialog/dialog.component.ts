import { AfterViewInit, Component, Inject, Optional } from '@angular/core';
import { MD_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements AfterViewInit {
    response
    constructor(@Optional() @Inject(MD_DIALOG_DATA) public config: any) {

    }

    ngAfterViewInit() {
        console.log(this.config);
    }
}
