import { NotificationActionTypes, NotificationsActions } from "./actions";

export function notificationsReducer(state = [], action: NotificationsActions) {
    console.log('[NOTIFICATIONS]', state, action);
    switch (action.type) {
        case NotificationActionTypes.INITIAL:
            return state;

        default:
            return state;

    }
}
