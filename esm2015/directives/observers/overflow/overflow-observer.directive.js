/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
export class OverflowDirective {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        /**
         * Allow overflow to be within a range before emitting
         */
        this.tolerance = 0;
        /**
         * Emit when there is a change to the overflow state - horizontal or vertical
         */
        this.uxOverflowObserver = new EventEmitter();
        /**
         * Emit when there is a change to overflow on the horizontal axis
         */
        this.uxOverflowHorizontalObserver = new EventEmitter();
        /**
         * Emit when there is a change to overflow on the vertical axis
         */
        this.uxOverflowVerticalObserver = new EventEmitter();
        /**
         * Store the overflow state on both axis
         */
        this._state = { horizontalOverflow: false, verticalOverflow: false };
        /**
         * Unsubscribe from all the observables
         */
        this._onDestroy = new Subject();
    }
    /**
     * Set up the trigger if specified
     * @return {?}
     */
    ngOnInit() {
        if (this.trigger) {
            this.trigger.pipe(takeUntil(this._onDestroy)).subscribe(() => this.checkForOverflow());
        }
    }
    /**
     * Perform an intial check for overflow
     * @return {?}
     */
    ngAfterViewInit() {
        requestAnimationFrame(() => this.checkForOverflow());
    }
    /**
     * Unsubscribe from the trigger
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * Programmatically trigger check for overflow
     * @return {?}
     */
    checkForOverflow() {
        const { offsetWidth, offsetHeight, scrollWidth, scrollHeight } = this._elementRef.nativeElement;
        const /** @type {?} */ horizontalOverflow = (scrollWidth - offsetWidth) > this.tolerance;
        const /** @type {?} */ verticalOverflow = (scrollHeight - offsetHeight) > this.tolerance;
        if (horizontalOverflow !== this._state.horizontalOverflow) {
            this.uxOverflowHorizontalObserver.emit(horizontalOverflow);
        }
        if (verticalOverflow !== this._state.verticalOverflow) {
            this.uxOverflowVerticalObserver.emit(verticalOverflow);
        }
        if (horizontalOverflow !== this._state.horizontalOverflow || verticalOverflow !== this._state.verticalOverflow) {
            this.uxOverflowObserver.emit((horizontalOverflow || verticalOverflow));
        }
        // store the state
        this._state = { horizontalOverflow, verticalOverflow };
    }
}
OverflowDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxOverflowObserver], [uxOverflowHorizontalObserver], [uxOverflowVerticalObserver]',
                exportAs: 'ux-overflow-observer'
            },] },
];
/** @nocollapse */
OverflowDirective.ctorParameters = () => [
    { type: ElementRef, },
];
OverflowDirective.propDecorators = {
    "trigger": [{ type: Input },],
    "tolerance": [{ type: Input },],
    "uxOverflowObserver": [{ type: Output },],
    "uxOverflowHorizontalObserver": [{ type: Output },],
    "uxOverflowVerticalObserver": [{ type: Output },],
};
function OverflowDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    OverflowDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    OverflowDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    OverflowDirective.propDecorators;
    /**
     * Allow a observable to be used to check for overflow
     * @type {?}
     */
    OverflowDirective.prototype.trigger;
    /**
     * Allow overflow to be within a range before emitting
     * @type {?}
     */
    OverflowDirective.prototype.tolerance;
    /**
     * Emit when there is a change to the overflow state - horizontal or vertical
     * @type {?}
     */
    OverflowDirective.prototype.uxOverflowObserver;
    /**
     * Emit when there is a change to overflow on the horizontal axis
     * @type {?}
     */
    OverflowDirective.prototype.uxOverflowHorizontalObserver;
    /**
     * Emit when there is a change to overflow on the vertical axis
     * @type {?}
     */
    OverflowDirective.prototype.uxOverflowVerticalObserver;
    /**
     * Store the overflow state on both axis
     * @type {?}
     */
    OverflowDirective.prototype._state;
    /**
     * Unsubscribe from all the observables
     * @type {?}
     */
    OverflowDirective.prototype._onDestroy;
    /** @type {?} */
    OverflowDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmZsb3ctb2JzZXJ2ZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvb2JzZXJ2ZXJzL292ZXJmbG93L292ZXJmbG93LW9ic2VydmVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNySCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFNdkMsTUFBTTs7OztJQXVCSixZQUFvQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTs7Ozt5QkFqQmQsQ0FBQzs7OztrQ0FHQyxJQUFJLFlBQVksRUFBVzs7Ozs0Q0FHakIsSUFBSSxZQUFZLEVBQVc7Ozs7MENBRzdCLElBQUksWUFBWSxFQUFXOzs7O3NCQUdqRCxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUU7Ozs7MEJBR2xELElBQUksT0FBTyxFQUFRO0tBRVE7Ozs7O0lBR2hELFFBQVE7UUFDTixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztTQUN4RjtLQUNGOzs7OztJQUdELGVBQWU7UUFDYixxQkFBcUIsQ0FBQyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7S0FDdEQ7Ozs7O0lBR0QsV0FBVztRQUNULElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM1Qjs7Ozs7SUFHRCxnQkFBZ0I7UUFFZCxNQUFNLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7UUFDaEcsdUJBQU0sa0JBQWtCLEdBQUcsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4RSx1QkFBTSxnQkFBZ0IsR0FBRyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRXhFLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUM1RDtRQUVELEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUN4RDtRQUVELEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLElBQUksZ0JBQWdCLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDL0csSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLGtCQUFrQixJQUFJLGdCQUFnQixDQUFDLENBQUMsQ0FBQztTQUN4RTs7UUFHRCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztLQUN4RDs7O1lBcEVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0ZBQW9GO2dCQUM5RixRQUFRLEVBQUUsc0JBQXNCO2FBQ2pDOzs7O1lBUmtDLFVBQVU7Ozt3QkFZMUMsS0FBSzswQkFHTCxLQUFLO21DQUdMLE1BQU07NkNBR04sTUFBTTsyQ0FHTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdXhPdmVyZmxvd09ic2VydmVyXSwgW3V4T3ZlcmZsb3dIb3Jpem9udGFsT2JzZXJ2ZXJdLCBbdXhPdmVyZmxvd1ZlcnRpY2FsT2JzZXJ2ZXJdJyxcbiAgZXhwb3J0QXM6ICd1eC1vdmVyZmxvdy1vYnNlcnZlcidcbn0pXG5leHBvcnQgY2xhc3MgT3ZlcmZsb3dEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgLyoqIEFsbG93IGEgb2JzZXJ2YWJsZSB0byBiZSB1c2VkIHRvIGNoZWNrIGZvciBvdmVyZmxvdyAqL1xuICBASW5wdXQoKSB0cmlnZ2VyOiBPYnNlcnZhYmxlPHZvaWQ+O1xuXG4gIC8qKiBBbGxvdyBvdmVyZmxvdyB0byBiZSB3aXRoaW4gYSByYW5nZSBiZWZvcmUgZW1pdHRpbmcgKi9cbiAgQElucHV0KCkgdG9sZXJhbmNlOiBudW1iZXIgPSAwO1xuXG4gIC8qKiBFbWl0IHdoZW4gdGhlcmUgaXMgYSBjaGFuZ2UgdG8gdGhlIG92ZXJmbG93IHN0YXRlIC0gaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCAqL1xuICBAT3V0cHV0KCkgdXhPdmVyZmxvd09ic2VydmVyID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8qKiBFbWl0IHdoZW4gdGhlcmUgaXMgYSBjaGFuZ2UgdG8gb3ZlcmZsb3cgb24gdGhlIGhvcml6b250YWwgYXhpcyAqL1xuICBAT3V0cHV0KCkgdXhPdmVyZmxvd0hvcml6b250YWxPYnNlcnZlciA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvKiogRW1pdCB3aGVuIHRoZXJlIGlzIGEgY2hhbmdlIHRvIG92ZXJmbG93IG9uIHRoZSB2ZXJ0aWNhbCBheGlzICovXG4gIEBPdXRwdXQoKSB1eE92ZXJmbG93VmVydGljYWxPYnNlcnZlciA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvKiogU3RvcmUgdGhlIG92ZXJmbG93IHN0YXRlIG9uIGJvdGggYXhpcyAqL1xuICBwcml2YXRlIF9zdGF0ZSA9IHsgaG9yaXpvbnRhbE92ZXJmbG93OiBmYWxzZSwgdmVydGljYWxPdmVyZmxvdzogZmFsc2UgfTtcblxuICAvKiogVW5zdWJzY3JpYmUgZnJvbSBhbGwgdGhlIG9ic2VydmFibGVzICovXG4gIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikgeyB9XG5cbiAgLyoqIFNldCB1cCB0aGUgdHJpZ2dlciBpZiBzcGVjaWZpZWQgKi9cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudHJpZ2dlcikge1xuICAgICAgdGhpcy50cmlnZ2VyLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNoZWNrRm9yT3ZlcmZsb3coKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFBlcmZvcm0gYW4gaW50aWFsIGNoZWNrIGZvciBvdmVyZmxvdyAqL1xuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuY2hlY2tGb3JPdmVyZmxvdygpKTtcbiAgfVxuXG4gIC8qKiBVbnN1YnNjcmliZSBmcm9tIHRoZSB0cmlnZ2VyICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKiogUHJvZ3JhbW1hdGljYWxseSB0cmlnZ2VyIGNoZWNrIGZvciBvdmVyZmxvdyAqL1xuICBjaGVja0Zvck92ZXJmbG93KCk6IHZvaWQge1xuXG4gICAgY29uc3QgeyBvZmZzZXRXaWR0aCwgb2Zmc2V0SGVpZ2h0LCBzY3JvbGxXaWR0aCwgc2Nyb2xsSGVpZ2h0IH0gPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgaG9yaXpvbnRhbE92ZXJmbG93ID0gKHNjcm9sbFdpZHRoIC0gb2Zmc2V0V2lkdGgpID4gdGhpcy50b2xlcmFuY2U7XG4gICAgY29uc3QgdmVydGljYWxPdmVyZmxvdyA9IChzY3JvbGxIZWlnaHQgLSBvZmZzZXRIZWlnaHQpID4gdGhpcy50b2xlcmFuY2U7XG5cbiAgICBpZiAoaG9yaXpvbnRhbE92ZXJmbG93ICE9PSB0aGlzLl9zdGF0ZS5ob3Jpem9udGFsT3ZlcmZsb3cpIHtcbiAgICAgIHRoaXMudXhPdmVyZmxvd0hvcml6b250YWxPYnNlcnZlci5lbWl0KGhvcml6b250YWxPdmVyZmxvdyk7XG4gICAgfVxuXG4gICAgaWYgKHZlcnRpY2FsT3ZlcmZsb3cgIT09IHRoaXMuX3N0YXRlLnZlcnRpY2FsT3ZlcmZsb3cpIHtcbiAgICAgIHRoaXMudXhPdmVyZmxvd1ZlcnRpY2FsT2JzZXJ2ZXIuZW1pdCh2ZXJ0aWNhbE92ZXJmbG93KTtcbiAgICB9XG5cbiAgICBpZiAoaG9yaXpvbnRhbE92ZXJmbG93ICE9PSB0aGlzLl9zdGF0ZS5ob3Jpem9udGFsT3ZlcmZsb3cgfHwgdmVydGljYWxPdmVyZmxvdyAhPT0gdGhpcy5fc3RhdGUudmVydGljYWxPdmVyZmxvdykge1xuICAgICAgdGhpcy51eE92ZXJmbG93T2JzZXJ2ZXIuZW1pdCgoaG9yaXpvbnRhbE92ZXJmbG93IHx8IHZlcnRpY2FsT3ZlcmZsb3cpKTtcbiAgICB9XG5cbiAgICAvLyBzdG9yZSB0aGUgc3RhdGVcbiAgICB0aGlzLl9zdGF0ZSA9IHsgaG9yaXpvbnRhbE92ZXJmbG93LCB2ZXJ0aWNhbE92ZXJmbG93IH07XG4gIH1cbn1cbiJdfQ==