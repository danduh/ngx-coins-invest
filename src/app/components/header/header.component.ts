import {
    Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter,
    ChangeDetectorRef
} from '@angular/core';
import { OutOutletService } from "../../services/out-outler.service";
import { isNullOrUndefined } from "util";
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    @Output('toggleMenu') toggleMenu = new EventEmitter();

    public title: Observable<any>;

    constructor(private route: ActivatedRoute) {
        const _t = route.data.map((d) => {
            console.log(d)
            return d.title
        });
    }

    ngOnInit() {

        this.title = this.route.data.map((d) => d.title);
        console.log(this.title)
        // this.outletService.data
        //     .subscribe((resp) => {
        //         if (!isNullOrUndefined(resp) && resp.title) {
        //             this.title = resp.title;
        //             this.ref.detectChanges();
        //         }
        //     });
    }

}
