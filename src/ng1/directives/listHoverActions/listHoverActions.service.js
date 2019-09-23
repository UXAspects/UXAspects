import { Subject } from 'rxjs/Subject';

export class ListHoverActionsService {

    constructor() {
        this._actions = [];
        this._focused = null;
        this.isFocused$ = new Subject();
    }

    register(action) {
        this._actions = [...this._actions, action];
    }

    unregister(action) {
        this._actions = this._actions.filter(_action => _action !== action);
    }

    onFocus(action) {
        // if we try to focus the currently focused item do nothing
        if (this._focused !== action) {
            this._focused = action;
            this.isFocused$.next(this.isFocused());
        }
    }

    onBlur(action) {
        if (this._focused === action) {
            this.onFocus(null);
        }
    }

    isFocused() {
        return !!this._focused;
    }

    focusAtIndex(index) {
        const target = this._actions[index];

        if (target) {
            target.focus();
        }
    }

    getFocusIndex() {
        return this._actions.indexOf(this._focused);
    }

}