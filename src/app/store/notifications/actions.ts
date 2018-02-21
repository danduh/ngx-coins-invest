export enum NotificationActionTypes {
    FETCH_DATA = '[Notification FETCH_DATA] Load data from server',
    FETCH_DATA_SUCCESS = '[Notification FETCH_DATA_SUCCESS] All Data Successfully Loaded',
    FETCH_DATA_FAILED = '[Notification FETCH_DATA_FAILED] Loading data failed',
    CREATE_NEW_RECORD = '[Notification CREATE_NEW_RECORD] Create new object in DB',
    CREATE_NEW_RECORD_SUCCESS = '[Notification CREATE_NEW_RECORD_SUCCESS] New recorded created in DB',
    CREATE_NEW_RECORD_FAILED = '[Notification CREATE_NEW_RECORD_FAILED] Failed to create new record in DB',
    INITIAL = '@ngrx/store/init',
}


export class FetchData {
    readonly type = NotificationActionTypes.FETCH_DATA;
}

export class FetchDataSuccess {
    readonly type = NotificationActionTypes.FETCH_DATA_SUCCESS;

    constructor(public payload: Notification[]) {
    }
}

export class FetchDataFailed {
    readonly type = NotificationActionTypes.FETCH_DATA_FAILED;

    constructor(public payload: any) {
    }
}

export class CreateNewRecord {
    readonly type = NotificationActionTypes.CREATE_NEW_RECORD;

    constructor(public payload: Notification) {
    }
}

export class CreateNewRecordSuccess {
    readonly type = NotificationActionTypes.CREATE_NEW_RECORD_SUCCESS;

    constructor(public payload: any) {
    }
}

export class CreateNewRecordFailed {
    readonly type = NotificationActionTypes.CREATE_NEW_RECORD_FAILED;

    constructor(public payload: any) {
    }
}

export class Initial {
    readonly type = NotificationActionTypes.INITIAL;
}

export type NotificationsActions =
    FetchData
    | FetchDataFailed
    | FetchDataSuccess
    | CreateNewRecord
    | CreateNewRecordSuccess
    | CreateNewRecordFailed
    | Initial;
