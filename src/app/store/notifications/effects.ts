import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { Action } from "@ngrx/store";
import { catchError, map, mergeMap } from "rxjs/operators";
import { of } from 'rxjs/observable/of';
import * as NotificationActions from './actions';
import { NotificationActionTypes } from "./actions";
import { NotificationsService } from "../../services/notifications.service";

@Injectable()
export class NotificationsEffects {
    @Effect() createNewRecord$: Observable<NotificationActions.CreateNewRecord> = this.actions$.pipe(
        ofType(NotificationActionTypes.CREATE_NEW_RECORD),
        mergeMap((action) => {
                return this.service.createNotification(action.payload)
                    .pipe(
                        map(data => (new NotificationActions.CreateNewRecordSuccess(data))),
                        catchError(() => of(new NotificationActions.CreateNewRecordFailed()))
                    );

            }
        )
    );

    constructor(private actions$: Actions,
                private service: NotificationsService) {

    }
}
