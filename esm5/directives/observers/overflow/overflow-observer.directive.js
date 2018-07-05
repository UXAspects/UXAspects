/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
var OverflowDirective = (function () {
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
                },] },
    ];
    /** @nocollapse */
    OverflowDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    OverflowDirective.propDecorators = {
        "trigger": [{ type: Input },],
        "tolerance": [{ type: Input },],
        "uxOverflowObserver": [{ type: Output },],
        "uxOverflowHorizontalObserver": [{ type: Output },],
        "uxOverflowVerticalObserver": [{ type: Output },],
    };
    return OverflowDirective;
}());
export { OverflowDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmZsb3ctb2JzZXJ2ZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvb2JzZXJ2ZXJzL292ZXJmbG93L292ZXJmbG93LW9ic2VydmVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNySCxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0lBNkJ6QywyQkFBb0IsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7Ozs7eUJBakJkLENBQUM7Ozs7a0NBR0MsSUFBSSxZQUFZLEVBQVc7Ozs7NENBR2pCLElBQUksWUFBWSxFQUFXOzs7OzBDQUc3QixJQUFJLFlBQVksRUFBVzs7OztzQkFHakQsRUFBRSxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFOzs7OzBCQUdsRCxJQUFJLE9BQU8sRUFBUTtLQUVRO0lBRWhELHNDQUFzQzs7Ozs7SUFDdEMsb0NBQVE7Ozs7SUFBUjtRQUFBLGlCQUlDO1FBSEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixFQUFFLEVBQXZCLENBQXVCLENBQUMsQ0FBQztTQUN4RjtLQUNGO0lBRUQsMkNBQTJDOzs7OztJQUMzQywyQ0FBZTs7OztJQUFmO1FBQUEsaUJBRUM7UUFEQyxxQkFBcUIsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixFQUFFLEVBQXZCLENBQXVCLENBQUMsQ0FBQztLQUN0RDtJQUVELG1DQUFtQzs7Ozs7SUFDbkMsdUNBQVc7Ozs7SUFBWDtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM1QjtJQUVELGtEQUFrRDs7Ozs7SUFDbEQsNENBQWdCOzs7O0lBQWhCO1FBRUUseUNBQVEsNEJBQVcsRUFBRSw4QkFBWSxFQUFFLDRCQUFXLEVBQUUsOEJBQVksQ0FBb0M7UUFDaEcscUJBQU0sa0JBQWtCLEdBQUcsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4RSxxQkFBTSxnQkFBZ0IsR0FBRyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRXhFLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUM1RDtRQUVELEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUN4RDtRQUVELEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLElBQUksZ0JBQWdCLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDL0csSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLGtCQUFrQixJQUFJLGdCQUFnQixDQUFDLENBQUMsQ0FBQztTQUN4RTs7UUFHRCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsa0JBQWtCLG9CQUFBLEVBQUUsZ0JBQWdCLGtCQUFBLEVBQUUsQ0FBQztLQUN4RDs7Z0JBcEVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0ZBQW9GO29CQUM5RixRQUFRLEVBQUUsc0JBQXNCO2lCQUNqQzs7OztnQkFQa0MsVUFBVTs7OzRCQVcxQyxLQUFLOzhCQUdMLEtBQUs7dUNBR0wsTUFBTTtpREFHTixNQUFNOytDQUdOLE1BQU07OzRCQXZCVDs7U0FRYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3V4T3ZlcmZsb3dPYnNlcnZlcl0sIFt1eE92ZXJmbG93SG9yaXpvbnRhbE9ic2VydmVyXSwgW3V4T3ZlcmZsb3dWZXJ0aWNhbE9ic2VydmVyXScsXG4gIGV4cG9ydEFzOiAndXgtb3ZlcmZsb3ctb2JzZXJ2ZXInXG59KVxuZXhwb3J0IGNsYXNzIE92ZXJmbG93RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIC8qKiBBbGxvdyBhIG9ic2VydmFibGUgdG8gYmUgdXNlZCB0byBjaGVjayBmb3Igb3ZlcmZsb3cgKi9cbiAgQElucHV0KCkgdHJpZ2dlcjogT2JzZXJ2YWJsZTx2b2lkPjtcblxuICAvKiogQWxsb3cgb3ZlcmZsb3cgdG8gYmUgd2l0aGluIGEgcmFuZ2UgYmVmb3JlIGVtaXR0aW5nICovXG4gIEBJbnB1dCgpIHRvbGVyYW5jZTogbnVtYmVyID0gMDtcblxuICAvKiogRW1pdCB3aGVuIHRoZXJlIGlzIGEgY2hhbmdlIHRvIHRoZSBvdmVyZmxvdyBzdGF0ZSAtIGhvcml6b250YWwgb3IgdmVydGljYWwgKi9cbiAgQE91dHB1dCgpIHV4T3ZlcmZsb3dPYnNlcnZlciA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvKiogRW1pdCB3aGVuIHRoZXJlIGlzIGEgY2hhbmdlIHRvIG92ZXJmbG93IG9uIHRoZSBob3Jpem9udGFsIGF4aXMgKi9cbiAgQE91dHB1dCgpIHV4T3ZlcmZsb3dIb3Jpem9udGFsT2JzZXJ2ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLyoqIEVtaXQgd2hlbiB0aGVyZSBpcyBhIGNoYW5nZSB0byBvdmVyZmxvdyBvbiB0aGUgdmVydGljYWwgYXhpcyAqL1xuICBAT3V0cHV0KCkgdXhPdmVyZmxvd1ZlcnRpY2FsT2JzZXJ2ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLyoqIFN0b3JlIHRoZSBvdmVyZmxvdyBzdGF0ZSBvbiBib3RoIGF4aXMgKi9cbiAgcHJpdmF0ZSBfc3RhdGUgPSB7IGhvcml6b250YWxPdmVyZmxvdzogZmFsc2UsIHZlcnRpY2FsT3ZlcmZsb3c6IGZhbHNlIH07XG5cbiAgLyoqIFVuc3Vic2NyaWJlIGZyb20gYWxsIHRoZSBvYnNlcnZhYmxlcyAqL1xuICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHsgfVxuXG4gIC8qKiBTZXQgdXAgdGhlIHRyaWdnZXIgaWYgc3BlY2lmaWVkICovXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRyaWdnZXIpIHtcbiAgICAgIHRoaXMudHJpZ2dlci5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jaGVja0Zvck92ZXJmbG93KCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBQZXJmb3JtIGFuIGludGlhbCBjaGVjayBmb3Igb3ZlcmZsb3cgKi9cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmNoZWNrRm9yT3ZlcmZsb3coKSk7XG4gIH1cblxuICAvKiogVW5zdWJzY3JpYmUgZnJvbSB0aGUgdHJpZ2dlciAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqIFByb2dyYW1tYXRpY2FsbHkgdHJpZ2dlciBjaGVjayBmb3Igb3ZlcmZsb3cgKi9cbiAgY2hlY2tGb3JPdmVyZmxvdygpOiB2b2lkIHtcblxuICAgIGNvbnN0IHsgb2Zmc2V0V2lkdGgsIG9mZnNldEhlaWdodCwgc2Nyb2xsV2lkdGgsIHNjcm9sbEhlaWdodCB9ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGhvcml6b250YWxPdmVyZmxvdyA9IChzY3JvbGxXaWR0aCAtIG9mZnNldFdpZHRoKSA+IHRoaXMudG9sZXJhbmNlO1xuICAgIGNvbnN0IHZlcnRpY2FsT3ZlcmZsb3cgPSAoc2Nyb2xsSGVpZ2h0IC0gb2Zmc2V0SGVpZ2h0KSA+IHRoaXMudG9sZXJhbmNlO1xuXG4gICAgaWYgKGhvcml6b250YWxPdmVyZmxvdyAhPT0gdGhpcy5fc3RhdGUuaG9yaXpvbnRhbE92ZXJmbG93KSB7XG4gICAgICB0aGlzLnV4T3ZlcmZsb3dIb3Jpem9udGFsT2JzZXJ2ZXIuZW1pdChob3Jpem9udGFsT3ZlcmZsb3cpO1xuICAgIH1cblxuICAgIGlmICh2ZXJ0aWNhbE92ZXJmbG93ICE9PSB0aGlzLl9zdGF0ZS52ZXJ0aWNhbE92ZXJmbG93KSB7XG4gICAgICB0aGlzLnV4T3ZlcmZsb3dWZXJ0aWNhbE9ic2VydmVyLmVtaXQodmVydGljYWxPdmVyZmxvdyk7XG4gICAgfVxuXG4gICAgaWYgKGhvcml6b250YWxPdmVyZmxvdyAhPT0gdGhpcy5fc3RhdGUuaG9yaXpvbnRhbE92ZXJmbG93IHx8IHZlcnRpY2FsT3ZlcmZsb3cgIT09IHRoaXMuX3N0YXRlLnZlcnRpY2FsT3ZlcmZsb3cpIHtcbiAgICAgIHRoaXMudXhPdmVyZmxvd09ic2VydmVyLmVtaXQoKGhvcml6b250YWxPdmVyZmxvdyB8fCB2ZXJ0aWNhbE92ZXJmbG93KSk7XG4gICAgfVxuXG4gICAgLy8gc3RvcmUgdGhlIHN0YXRlXG4gICAgdGhpcy5fc3RhdGUgPSB7IGhvcml6b250YWxPdmVyZmxvdywgdmVydGljYWxPdmVyZmxvdyB9O1xuICB9XG59XG4iXX0=