/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
var OverflowDirective = /** @class */ (function () {
    function OverflowDirective(_elementRef) {
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
    /** Set up the trigger if specified */
    /**
     * Set up the trigger if specified
     * @return {?}
     */
    OverflowDirective.prototype.ngOnInit = /**
     * Set up the trigger if specified
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.trigger) {
            this.trigger.pipe(takeUntil(this._onDestroy)).subscribe(function () { return _this.checkForOverflow(); });
        }
    };
    /** Perform an intial check for overflow */
    /**
     * Perform an intial check for overflow
     * @return {?}
     */
    OverflowDirective.prototype.ngAfterViewInit = /**
     * Perform an intial check for overflow
     * @return {?}
     */
    function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.checkForOverflow(); });
    };
    /** Unsubscribe from the trigger */
    /**
     * Unsubscribe from the trigger
     * @return {?}
     */
    OverflowDirective.prototype.ngOnDestroy = /**
     * Unsubscribe from the trigger
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /** Programmatically trigger check for overflow */
    /**
     * Programmatically trigger check for overflow
     * @return {?}
     */
    OverflowDirective.prototype.checkForOverflow = /**
     * Programmatically trigger check for overflow
     * @return {?}
     */
    function () {
        var _a = this._elementRef.nativeElement, offsetWidth = _a.offsetWidth, offsetHeight = _a.offsetHeight, scrollWidth = _a.scrollWidth, scrollHeight = _a.scrollHeight;
        var /** @type {?} */ horizontalOverflow = (scrollWidth - offsetWidth) > this.tolerance;
        var /** @type {?} */ verticalOverflow = (scrollHeight - offsetHeight) > this.tolerance;
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
        this._state = { horizontalOverflow: horizontalOverflow, verticalOverflow: verticalOverflow };
    };
    OverflowDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxOverflowObserver], [uxOverflowHorizontalObserver], [uxOverflowVerticalObserver]',
                    exportAs: 'ux-overflow-observer'
                },] }
    ];
    /** @nocollapse */
    OverflowDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    OverflowDirective.propDecorators = {
        trigger: [{ type: Input }],
        tolerance: [{ type: Input }],
        uxOverflowObserver: [{ type: Output }],
        uxOverflowHorizontalObserver: [{ type: Output }],
        uxOverflowVerticalObserver: [{ type: Output }]
    };
    return OverflowDirective;
}());
export { OverflowDirective };
function OverflowDirective_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmZsb3ctb2JzZXJ2ZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvb2JzZXJ2ZXJzL292ZXJmbG93L292ZXJmbG93LW9ic2VydmVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNySCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7O0lBNkJyQywyQkFBb0IsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7Ozs7eUJBakJkLENBQUM7Ozs7a0NBR0MsSUFBSSxZQUFZLEVBQVc7Ozs7NENBR2pCLElBQUksWUFBWSxFQUFXOzs7OzBDQUc3QixJQUFJLFlBQVksRUFBVzs7OztzQkFHakQsRUFBRSxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFOzs7OzBCQUdsRCxJQUFJLE9BQU8sRUFBUTtLQUVRO0lBRWhELHNDQUFzQzs7Ozs7SUFDdEMsb0NBQVE7Ozs7SUFBUjtRQUFBLGlCQUlDO1FBSEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixFQUFFLEVBQXZCLENBQXVCLENBQUMsQ0FBQztTQUN4RjtLQUNGO0lBRUQsMkNBQTJDOzs7OztJQUMzQywyQ0FBZTs7OztJQUFmO1FBQUEsaUJBRUM7UUFEQyxxQkFBcUIsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixFQUFFLEVBQXZCLENBQXVCLENBQUMsQ0FBQztLQUN0RDtJQUVELG1DQUFtQzs7Ozs7SUFDbkMsdUNBQVc7Ozs7SUFBWDtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM1QjtJQUVELGtEQUFrRDs7Ozs7SUFDbEQsNENBQWdCOzs7O0lBQWhCO1FBRUUseUNBQVEsNEJBQVcsRUFBRSw4QkFBWSxFQUFFLDRCQUFXLEVBQUUsOEJBQVksQ0FBb0M7UUFDaEcscUJBQU0sa0JBQWtCLEdBQUcsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4RSxxQkFBTSxnQkFBZ0IsR0FBRyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRXhFLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUM1RDtRQUVELEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUN4RDtRQUVELEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLElBQUksZ0JBQWdCLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDL0csSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLGtCQUFrQixJQUFJLGdCQUFnQixDQUFDLENBQUMsQ0FBQztTQUN4RTs7UUFHRCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsa0JBQWtCLG9CQUFBLEVBQUUsZ0JBQWdCLGtCQUFBLEVBQUUsQ0FBQztLQUN4RDs7Z0JBcEVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0ZBQW9GO29CQUM5RixRQUFRLEVBQUUsc0JBQXNCO2lCQUNqQzs7OztnQkFSa0MsVUFBVTs7OzBCQVkxQyxLQUFLOzRCQUdMLEtBQUs7cUNBR0wsTUFBTTsrQ0FHTixNQUFNOzZDQUdOLE1BQU07OzRCQXhCVDs7U0FTYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t1eE92ZXJmbG93T2JzZXJ2ZXJdLCBbdXhPdmVyZmxvd0hvcml6b250YWxPYnNlcnZlcl0sIFt1eE92ZXJmbG93VmVydGljYWxPYnNlcnZlcl0nLFxuICBleHBvcnRBczogJ3V4LW92ZXJmbG93LW9ic2VydmVyJ1xufSlcbmV4cG9ydCBjbGFzcyBPdmVyZmxvd0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAvKiogQWxsb3cgYSBvYnNlcnZhYmxlIHRvIGJlIHVzZWQgdG8gY2hlY2sgZm9yIG92ZXJmbG93ICovXG4gIEBJbnB1dCgpIHRyaWdnZXI6IE9ic2VydmFibGU8dm9pZD47XG5cbiAgLyoqIEFsbG93IG92ZXJmbG93IHRvIGJlIHdpdGhpbiBhIHJhbmdlIGJlZm9yZSBlbWl0dGluZyAqL1xuICBASW5wdXQoKSB0b2xlcmFuY2U6IG51bWJlciA9IDA7XG5cbiAgLyoqIEVtaXQgd2hlbiB0aGVyZSBpcyBhIGNoYW5nZSB0byB0aGUgb3ZlcmZsb3cgc3RhdGUgLSBob3Jpem9udGFsIG9yIHZlcnRpY2FsICovXG4gIEBPdXRwdXQoKSB1eE92ZXJmbG93T2JzZXJ2ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLyoqIEVtaXQgd2hlbiB0aGVyZSBpcyBhIGNoYW5nZSB0byBvdmVyZmxvdyBvbiB0aGUgaG9yaXpvbnRhbCBheGlzICovXG4gIEBPdXRwdXQoKSB1eE92ZXJmbG93SG9yaXpvbnRhbE9ic2VydmVyID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8qKiBFbWl0IHdoZW4gdGhlcmUgaXMgYSBjaGFuZ2UgdG8gb3ZlcmZsb3cgb24gdGhlIHZlcnRpY2FsIGF4aXMgKi9cbiAgQE91dHB1dCgpIHV4T3ZlcmZsb3dWZXJ0aWNhbE9ic2VydmVyID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8qKiBTdG9yZSB0aGUgb3ZlcmZsb3cgc3RhdGUgb24gYm90aCBheGlzICovXG4gIHByaXZhdGUgX3N0YXRlID0geyBob3Jpem9udGFsT3ZlcmZsb3c6IGZhbHNlLCB2ZXJ0aWNhbE92ZXJmbG93OiBmYWxzZSB9O1xuXG4gIC8qKiBVbnN1YnNjcmliZSBmcm9tIGFsbCB0aGUgb2JzZXJ2YWJsZXMgKi9cbiAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7IH1cblxuICAvKiogU2V0IHVwIHRoZSB0cmlnZ2VyIGlmIHNwZWNpZmllZCAqL1xuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50cmlnZ2VyKSB7XG4gICAgICB0aGlzLnRyaWdnZXIucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2hlY2tGb3JPdmVyZmxvdygpKTtcbiAgICB9XG4gIH1cblxuICAvKiogUGVyZm9ybSBhbiBpbnRpYWwgY2hlY2sgZm9yIG92ZXJmbG93ICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5jaGVja0Zvck92ZXJmbG93KCkpO1xuICB9XG5cbiAgLyoqIFVuc3Vic2NyaWJlIGZyb20gdGhlIHRyaWdnZXIgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKiBQcm9ncmFtbWF0aWNhbGx5IHRyaWdnZXIgY2hlY2sgZm9yIG92ZXJmbG93ICovXG4gIGNoZWNrRm9yT3ZlcmZsb3coKTogdm9pZCB7XG5cbiAgICBjb25zdCB7IG9mZnNldFdpZHRoLCBvZmZzZXRIZWlnaHQsIHNjcm9sbFdpZHRoLCBzY3JvbGxIZWlnaHQgfSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBob3Jpem9udGFsT3ZlcmZsb3cgPSAoc2Nyb2xsV2lkdGggLSBvZmZzZXRXaWR0aCkgPiB0aGlzLnRvbGVyYW5jZTtcbiAgICBjb25zdCB2ZXJ0aWNhbE92ZXJmbG93ID0gKHNjcm9sbEhlaWdodCAtIG9mZnNldEhlaWdodCkgPiB0aGlzLnRvbGVyYW5jZTtcblxuICAgIGlmIChob3Jpem9udGFsT3ZlcmZsb3cgIT09IHRoaXMuX3N0YXRlLmhvcml6b250YWxPdmVyZmxvdykge1xuICAgICAgdGhpcy51eE92ZXJmbG93SG9yaXpvbnRhbE9ic2VydmVyLmVtaXQoaG9yaXpvbnRhbE92ZXJmbG93KTtcbiAgICB9XG5cbiAgICBpZiAodmVydGljYWxPdmVyZmxvdyAhPT0gdGhpcy5fc3RhdGUudmVydGljYWxPdmVyZmxvdykge1xuICAgICAgdGhpcy51eE92ZXJmbG93VmVydGljYWxPYnNlcnZlci5lbWl0KHZlcnRpY2FsT3ZlcmZsb3cpO1xuICAgIH1cblxuICAgIGlmIChob3Jpem9udGFsT3ZlcmZsb3cgIT09IHRoaXMuX3N0YXRlLmhvcml6b250YWxPdmVyZmxvdyB8fCB2ZXJ0aWNhbE92ZXJmbG93ICE9PSB0aGlzLl9zdGF0ZS52ZXJ0aWNhbE92ZXJmbG93KSB7XG4gICAgICB0aGlzLnV4T3ZlcmZsb3dPYnNlcnZlci5lbWl0KChob3Jpem9udGFsT3ZlcmZsb3cgfHwgdmVydGljYWxPdmVyZmxvdykpO1xuICAgIH1cblxuICAgIC8vIHN0b3JlIHRoZSBzdGF0ZVxuICAgIHRoaXMuX3N0YXRlID0geyBob3Jpem9udGFsT3ZlcmZsb3csIHZlcnRpY2FsT3ZlcmZsb3cgfTtcbiAgfVxufVxuIl19