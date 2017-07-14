import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HoverActionDirective } from './hover-action.directive';
import { HoverActionContainerDirective } from './hover-action-container.directive';

@Injectable()
export class HoverActionService {

    active: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private _container: HoverActionContainerDirective;
    private _focused: boolean = false;
    private _hovered: boolean = false;
    private _actions: HoverActionDirective[] = [];

    register(action: HoverActionDirective): void {
        this._actions.push(action);
    }

    unregister(action: HoverActionDirective): void {
        this._actions = this._actions.filter(actn => actn !== action);
    }
    
    setContainer(container: HoverActionContainerDirective): void {
        this._container = container;
    }

    setFocusState(focus: boolean): void {
        this._focused = focus;
        this.updateVisibility();
    }

    setHoverState(hover: boolean): void {
        this._hovered = hover;
        this.updateVisibility();
    }

    next(): void {

        // if container has focus then focus the first hover action
        if (this.containerHasFocus()) {
            this.focusActionAtIndex(0);
            return this.updateVisibility();
        }

        // if a hover action has focus then focus the next action
        if (this.actionHasFocus()) {
            let index = this.getFocusedActionIndex() + 1;
            this.focusActionAtIndex(index);
            this.updateVisibility();
        }
    }

    previous(): void {
        // if a hover action has focus then focus the previous action
        if (this.actionHasFocus()) {
            let index = this.getFocusedActionIndex() - 1;

            if (index >= 0) {
                this.focusActionAtIndex(index);
            } else {
                this._container.focus();
            }
        }

        this.updateVisibility();
    }
    
    updateVisibility(): void {
        this.active.next(this._focused || this._hovered || this.actionHasFocus());
    }

    private focusActionAtIndex(index: number): void {
        if (index >= 0 && index < this._actions.length) {
            this._actions[index].focus();
        }
    }

    private getFocusedActionIndex(): number {
        return this._actions.findIndex(action => action === this.getFocusedAction());
    }

    private containerHasFocus(): boolean {
        return this._focused;
    }

    private actionHasFocus(): boolean {
        return !!this.getFocusedAction();
    }

    private getFocusedAction(): HoverActionDirective {
        return this._actions.find(action => action.focused);
    }
}