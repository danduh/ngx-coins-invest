import {
    Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter,
    ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { OutOutletService } from "app/services/out-outler.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    @Output('toggleMenu') toggleMenu = new EventEmitter();

    public title: Observable<any>;

    constructor(private outletService: OutOutletService,
                private ref: ChangeDetectorRef) {
        // const _t = route.data.map((d) => {
        //     console.log(d)
        //     return d.title
        // });
    }

    ngOnInit() {
        // debugger
        // this.title = this.route.data.map((d) => d.title);
        console.log(this.title)
        this.outletService.data
            .subscribe((resp) => {
                if (!!resp && resp.title) {
                    this.title = resp.title;
                    this.ref.detectChanges();
                }
            });
    }

}
