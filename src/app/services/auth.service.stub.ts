import { isNullOrUndefined } from "util";
export class AuthServiceStub {
    constructor() {

    }

    isLoggedIn(expectedValue?) {
        return !isNullOrUndefined ? expectedValue : true;
    }

    getAuthToken() {
        return 'MOCKED TOKEN';
    }
}
