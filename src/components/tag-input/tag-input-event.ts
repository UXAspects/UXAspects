export class TagInputEvent {

    private _defaultPrevented = false;

    constructor(public tag: unknown) {}

    preventDefault() {
        this._defaultPrevented = true;
    }

    defaultPrevented(): boolean {
        return this._defaultPrevented;
    }
}