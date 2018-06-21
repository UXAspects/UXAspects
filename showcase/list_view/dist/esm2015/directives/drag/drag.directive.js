/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, NgZone, Output } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { takeUntil } from 'rxjs/operators';
export class DragDirective {
    /**
     * @param {?} elementRef
     * @param {?} ngZone
     */
    constructor(elementRef, ngZone) {
        this.dragstart = new EventEmitter();
        this.drag = new EventEmitter();
        this.dragend = new EventEmitter();
        const /** @type {?} */ mousedown$ = fromEvent(elementRef.nativeElement, 'mousedown');
        const /** @type {?} */ mousemove$ = fromEvent(document, 'mousemove');
        const /** @type {?} */ mouseup$ = fromEvent(document, 'mouseup');
        this._subscription = mousedown$.subscribe(event => {
            event.preventDefault();
            // emit the drag start event
            ngZone.run(() => this.dragstart.emit(event));
            mousemove$.pipe(takeUntil(mouseup$)).subscribe(moveevent => {
                moveevent.preventDefault();
                // emit the drag start event
                ngZone.run(() => this.drag.emit(moveevent));
            }, null, () => ngZone.run(() => this.dragend.emit()));
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
DragDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxDrag]'
            },] },
];
/** @nocollapse */
DragDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: NgZone, },
];
DragDirective.propDecorators = {
    "dragstart": [{ type: Output },],
    "drag": [{ type: Output },],
    "dragend": [{ type: Output },],
};
function DragDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DragDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DragDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    DragDirective.propDecorators;
    /** @type {?} */
    DragDirective.prototype.dragstart;
    /** @type {?} */
    DragDirective.prototype.drag;
    /** @type {?} */
    DragDirective.prototype.dragend;
    /** @type {?} */
    DragDirective.prototype._subscription;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9kcmFnL2RyYWcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTTNDLE1BQU07Ozs7O0lBUUYsWUFBWSxVQUFzQixFQUFFLE1BQWM7eUJBTjVCLElBQUksWUFBWSxFQUFjO29CQUNuQyxJQUFJLFlBQVksRUFBYzt1QkFDM0IsSUFBSSxZQUFZLEVBQVE7UUFLeEMsdUJBQU0sVUFBVSxHQUFHLFNBQVMsQ0FBYSxVQUFVLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2hGLHVCQUFNLFVBQVUsR0FBRyxTQUFTLENBQWEsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2hFLHVCQUFNLFFBQVEsR0FBRyxTQUFTLENBQWEsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRTVELElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLO1lBQzNDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7WUFHdkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFN0MsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQWEsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUztnQkFDaEUsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDOztnQkFHM0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFDL0MsRUFBRSxJQUFJLEVBQ1AsTUFBTSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDaEQsQ0FBQyxDQUFDO0tBQ047Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQzs7O1lBbENKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsVUFBVTthQUN2Qjs7OztZQVBtQixVQUFVO1lBQWdCLE1BQU07OzswQkFVL0MsTUFBTTtxQkFDTixNQUFNO3dCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgTmdab25lLCBPbkRlc3Ryb3ksIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2Zyb21FdmVudCc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4RHJhZ10nXG59KVxuZXhwb3J0IGNsYXNzIERyYWdEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQE91dHB1dCgpIGRyYWdzdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgZHJhZyA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgZHJhZ2VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgbmdab25lOiBOZ1pvbmUpIHtcbiAgICAgICAgY29uc3QgbW91c2Vkb3duJCA9IGZyb21FdmVudDxNb3VzZUV2ZW50PihlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdtb3VzZWRvd24nKTtcbiAgICAgICAgY29uc3QgbW91c2Vtb3ZlJCA9IGZyb21FdmVudDxNb3VzZUV2ZW50Pihkb2N1bWVudCwgJ21vdXNlbW92ZScpO1xuICAgICAgICBjb25zdCBtb3VzZXVwJCA9IGZyb21FdmVudDxNb3VzZUV2ZW50Pihkb2N1bWVudCwgJ21vdXNldXAnKTtcblxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBtb3VzZWRvd24kLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyBlbWl0IHRoZSBkcmFnIHN0YXJ0IGV2ZW50XG4gICAgICAgICAgICBuZ1pvbmUucnVuKCgpID0+IHRoaXMuZHJhZ3N0YXJ0LmVtaXQoZXZlbnQpKTtcblxuICAgICAgICAgICAgbW91c2Vtb3ZlJC5waXBlKHRha2VVbnRpbDxNb3VzZUV2ZW50Pihtb3VzZXVwJCkpLnN1YnNjcmliZShtb3ZlZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIG1vdmVldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gZW1pdCB0aGUgZHJhZyBzdGFydCBldmVudFxuICAgICAgICAgICAgICAgIG5nWm9uZS5ydW4oKCkgPT4gdGhpcy5kcmFnLmVtaXQobW92ZWV2ZW50KSk7XG4gICAgICAgICAgICB9LCBudWxsLFxuICAgICAgICAgICAgKCkgPT4gbmdab25lLnJ1bigoKSA9PiB0aGlzLmRyYWdlbmQuZW1pdCgpKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG59Il19