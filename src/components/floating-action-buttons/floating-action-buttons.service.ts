import { Injectable, QueryList } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AnchorPlacement } from '../tooltip/index';
import { FloatingActionButtonComponent } from './floating-action-button.component';

export type FloatingActionButtonDirection = AnchorPlacement;

@Injectable()
export class FloatingActionButtonsService {

    open$ = new BehaviorSubject<boolean>(false);
    direction$ = new BehaviorSubject<FloatingActionButtonDirection>('top');

    private _buttons: QueryList<FloatingActionButtonComponent>;

    open(): void {
        this.open$.next(true);
    }

    toggle(): void {
        this.open$.next(!this.open$.getValue());
    }

    close(): void {
        this.open$.next(false);

        // make the first button tabbable again
        this.setPrimaryButtonFocusable();
    }

    isHorizontal(): boolean {
        return this.direction$.value === 'left' || this.direction$.value === 'right';
    }

    isVertical(): boolean {
        return this.direction$.value === 'top' || this.direction$.value === 'bottom';
    }

    setButtons(buttons: QueryList<FloatingActionButtonComponent>): void {
        this._buttons = buttons;

        // make the first button tabbable
        this.setPrimaryButtonFocusable();
    }

    /** Make only the first button tabbable */
    setPrimaryButtonFocusable(): void {
        this._buttons.forEach(btn => btn.tabindex$.next(btn.primary ? 0 : -1));
    }

    focusPrimaryButton(): void {
        this.focus(this._buttons.find(btn => btn.primary));
    }

    focus(button: FloatingActionButtonComponent): void {

        // if the button is not defined then do nothing
        if (!button) {
            return;
        }

        // set the button tab index
        this._buttons.forEach(btn => btn.tabindex$.next(button === btn ? 0 : -1));

        // apply the focus
        button.focus();
    }

    focusSibling(next: boolean): void {

        // if the buttons are not visible then do nothing
        if (this.open$.value === false) {
            return;
        }

        // get the current focused item
        const button = this.getFocusedButton();

        if (next && button === this._buttons.last) {
            return this.focus(this._buttons.first);
        } else if (!next && button === this._buttons.first) {
            return this.focus(this._buttons.last);
        }

        // find the sibling button
        const sibling = this._buttons.toArray()[this.getButtonIndex(button) + (next ? 1 : -1)];

        // focus the next button
        this.focus(sibling);
    }

    private getFocusedButton(): FloatingActionButtonComponent {
        return this._buttons.find(btn => btn.tabindex$.value === 0);
    }

    private getButtonIndex(button: FloatingActionButtonComponent): number {
        return this._buttons.toArray().findIndex(btn => btn === button);
    }
}
