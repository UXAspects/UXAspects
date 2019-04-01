import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { FocusIndicatorOptions } from './focus-indicator-options.interface';
import { FocusIndicatorOriginService } from './focus-indicator-origin/focus-indicator-origin.service';

export class FocusIndicator {

    /** Apply a class when the item is focused */
    set isFocused(isFocused: boolean) {

        // update the class on the element
        isFocused ? this._renderer.addClass(this._element, 'ux-focus-indicator-active') :
            this._renderer.removeClass(this._element, 'ux-focus-indicator-active');

        // emit the focus state
        this.isFocused$.next(isFocused);
    }

    /** Provide a convenience getter to allow access to focus state without a subscription */
    get isFocused(): boolean {
        return this.isFocused$.value;
    }

    /** An observable to monitor the focus state */
    readonly isFocused$ = new BehaviorSubject<boolean>(false);

    /** An observable to monitor the focus origin */
    readonly origin$ = new Subject<FocusOrigin>();

    /** Remove all subscriptions on destroy */
    private readonly _onDestroy = new Subject<void>();

    constructor(
        private readonly _element: HTMLElement,
        private readonly _focusMonitor: FocusMonitor,
        private readonly _renderer: Renderer2,
        private _options: FocusIndicatorOptions,
        private _focusIndicatorOrigin: FocusIndicatorOriginService) {

        // check if the element is already being monitored
        if (!_element.classList.contains('ux-focus-indicator')) {
            this.initialise();
        }
    }

    /** Setup the focus monitoring */
    private initialise(): void {

        // add a class to the element to specify we are controlling the focus
        this._renderer.addClass(this._element, 'ux-focus-indicator');

        // watch for any changes to the focus state
        this._focusMonitor.monitor(this._element, this._options.checkChildren)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(this.onFocusChange.bind(this));
    }

    /** Focus the element with a specific origin */
    focus(origin?: FocusOrigin, options?: { preventScroll?: boolean }): void {
        this._focusIndicatorOrigin.setOrigin(origin);
        this._element.focus(options);
    }

    /** Tear down the subscriptions */
    destroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
        this.isFocused$.complete();
        this._focusMonitor.stopMonitoring(this._element);
    }

    /** Allow the options to be updates */
    setOptions(options: FocusIndicatorOptions): void {
        this._options = { ...this._options, ...options };
    }

    /** Monitor changes to an elements focus state */
    private onFocusChange(origin: FocusOrigin): void {

        // if the origin is null then we blurred
        if (origin === null) {
            this.isFocused = false;
            this.origin$.next(null);
            return;
        }

        // get the origin if there is one
        const syntheticOrigin = this._focusIndicatorOrigin.getOrigin();

        // emit the origin
        this.origin$.next(syntheticOrigin || origin);

        switch (syntheticOrigin || origin) {

            case 'mouse':
                this.isFocused = this._options.mouseFocusIndicator;
                break;

            case 'touch':
                this.isFocused = this._options.touchFocusIndicator;
                break;

            case 'keyboard':
                this.isFocused = this._options.keyboardFocusIndicator;
                break;

            case 'program':
                this.isFocused = this._options.programmaticFocusIndicator;
                break;

            default:
                this.isFocused = false;
        }
    }
}