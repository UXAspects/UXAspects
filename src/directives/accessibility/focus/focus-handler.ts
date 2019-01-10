import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { Renderer2 } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { FocusHandlerOptions } from './focus-handler-options.interface';

export class FocusHandler {

    /** Apply a class when the item is focused */
    set isFocused(value: boolean) {
        value ? this._renderer.addClass(this._element, 'ux-focus-indicator') :
            this._renderer.removeClass(this._element, 'ux-focus-indicator');
    }

    /** Remove all subscriptions on destroy */
    private readonly _onDestroy = new Subject<void>();

    constructor(
        private _element: HTMLElement,
        private _focusMonitor: FocusMonitor,
        private _renderer: Renderer2,
        private _options: FocusHandlerOptions) {
        this.initialise();
    }

    /** Setup the focus monitoring */
    private initialise(): void {

        // add a class to the element to specify we are controlling the focus
        this._renderer.addClass(this._element, 'ux-focus');

        // watch for any changes to the focus state
        this._focusMonitor.monitor(this._element, this._options.checkChildren)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(this.onFocusChange.bind(this));
    }

    /** Tear down the directive */
    destroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** Monitor changes to an elements focus state */
    private onFocusChange(origin: FocusOrigin): void {

        switch (origin) {

            case 'mouse':
                this.isFocused = this._options.mouseFocusOutline;
                break;

            case 'touch':
                this.isFocused = this._options.touchFocusOutline;
                break;

            case 'keyboard':
                this.isFocused = this._options.keyboardFocusOutline;
                break;

            case 'program':
                this.isFocused = this._options.programmaticFocusOutline;
                break;

            default:
                this.isFocused = false;
        }
    }

}