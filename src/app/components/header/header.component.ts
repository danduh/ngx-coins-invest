import {
    Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter,
    ChangeDetectorRef
} from '@angular/core';
import { OutOutletService } from "../../services/out-outler.service";
import { isNullOrUndefined } from "util";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    @Output('toggleMenu') toggleMenu = new EventEmitter();

    public title: string;

    constructor(private outletService: OutOutletService,
                private ref: ChangeDetectorRef) {

    }

    ngOnInit() {
        this.outletService.data
            .subscribe((resp) => {
                if (!isNullOrUndefined(resp) && resp.title) {
                    this.title = resp.title;
                    this.ref.detectChanges();
                }
            });
    }

}
