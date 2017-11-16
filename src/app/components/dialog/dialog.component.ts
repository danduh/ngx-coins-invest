import { AfterViewInit, Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
    response;

    constructor(@Optional() @Inject(MAT_DIALOG_DATA) public config: any) {
        // this.config = {};
    }

    ngOnInit() {
        console.log(this.config.input);
    }
}
