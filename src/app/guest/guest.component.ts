import { Component, OnInit } from '@angular/core';
import { LoaderService } from "../shared/loader.service";

@Component({
    selector: 'app-guest',
    templateUrl: './guest.component.html',
    styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {

    constructor(public loaderService: LoaderService) {
    }

    ngOnInit() {
    }

}
