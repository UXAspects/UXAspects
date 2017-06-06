export class TagInputEvent {

    private _defaultPrevented = false;

    constructor(public tag: any) {}

    public preventDefault() {
        this._defaultPrevented = true;
    }

    public defaultPrevented(): boolean {
        return this._defaultPrevented;
    }
}