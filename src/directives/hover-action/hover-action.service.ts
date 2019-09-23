import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HoverActionDirective } from './hover-action.directive';

@Injectable()
export class HoverActionService {

    active: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private _focused: boolean = false;
    private _hovered: boolean = false;
    private _actions: HoverActionDirective[] = [];

    register(action: HoverActionDirective): void {
        this._actions.push(action);
    }

    unregister(action: HoverActionDirective): void {
        this._actions = this._actions.filter(actn => actn !== action);
    }

    setFocusState(focus: boolean): void {
        this._focused = focus;
        this.updateVisibility();
    }

    setHoverState(hover: boolean): void {
        this._hovered = hover;
        this.updateVisibility();
    }

    updateVisibility(): void {
        this.active.next(this._focused || this._hovered || this.actionHasFocus());
    }

    private actionHasFocus(): boolean {
        return !!this.getFocusedAction();
    }

    private getFocusedAction(): HoverActionDirective {
        return this._actions.find(action => action.focused);
    }
}