export class BaseClass {
    public title = '';

    constructor(route) {
        debugger
        if (route.snapshot.data['title']) {
            this.title = route.snapshot.data['title'];
        }
    }
}
