export class TagInputEvent {

    private _defaultPrevented = false;

    constructor(public tag: any) {}

    preventDefault() {
        this._defaultPrevented = true;
    }

    defaultPrevented(): boolean {
        return this._defaultPrevented;
    }
}