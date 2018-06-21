/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, NgZone, Output } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { takeUntil } from 'rxjs/operators';
var DragDirective = (function () {
    function DragDirective(elementRef, ngZone) {
        var _this = this;
        this.dragstart = new EventEmitter();
        this.drag = new EventEmitter();
        this.dragend = new EventEmitter();
        var /** @type {?} */ mousedown$ = fromEvent(elementRef.nativeElement, 'mousedown');
        var /** @type {?} */ mousemove$ = fromEvent(document, 'mousemove');
        var /** @type {?} */ mouseup$ = fromEvent(document, 'mouseup');
        this._subscription = mousedown$.subscribe(function (event) {
            event.preventDefault();
            // emit the drag start event
            ngZone.run(function () { return _this.dragstart.emit(event); });
            mousemove$.pipe(takeUntil(mouseup$)).subscribe(function (moveevent) {
                moveevent.preventDefault();
                // emit the drag start event
                ngZone.run(function () { return _this.drag.emit(moveevent); });
            }, null, function () { return ngZone.run(function () { return _this.dragend.emit(); }); });
        });
    }
    /**
     * @return {?}
     */
    DragDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    DragDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxDrag]'
                },] },
    ];
    /** @nocollapse */
    DragDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: NgZone, },
    ]; };
    DragDirective.propDecorators = {
        "dragstart": [{ type: Output },],
        "drag": [{ type: Output },],
        "dragend": [{ type: Output },],
    };
    return DragDirective;
}());
export { DragDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9kcmFnL2RyYWcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztJQWN2Qyx1QkFBWSxVQUFzQixFQUFFLE1BQWM7UUFBbEQsaUJBbUJDO3lCQXpCcUIsSUFBSSxZQUFZLEVBQWM7b0JBQ25DLElBQUksWUFBWSxFQUFjO3VCQUMzQixJQUFJLFlBQVksRUFBUTtRQUt4QyxxQkFBTSxVQUFVLEdBQUcsU0FBUyxDQUFhLFVBQVUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDaEYscUJBQU0sVUFBVSxHQUFHLFNBQVMsQ0FBYSxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDaEUscUJBQU0sUUFBUSxHQUFHLFNBQVMsQ0FBYSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFNUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUMzQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7O1lBR3ZCLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUExQixDQUEwQixDQUFDLENBQUM7WUFFN0MsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQWEsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxTQUFTO2dCQUNoRSxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7O2dCQUczQixNQUFNLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO2FBQy9DLEVBQUUsSUFBSSxFQUNQLGNBQU0sT0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFuQixDQUFtQixDQUFDLEVBQXJDLENBQXFDLENBQUMsQ0FBQztTQUNoRCxDQUFDLENBQUM7S0FDTjs7OztJQUVELG1DQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7O2dCQWxDSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFVBQVU7aUJBQ3ZCOzs7O2dCQVBtQixVQUFVO2dCQUFnQixNQUFNOzs7OEJBVS9DLE1BQU07eUJBQ04sTUFBTTs0QkFDTixNQUFNOzt3QkFaWDs7U0FRYSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE5nWm9uZSwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9mcm9tRXZlbnQnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eERyYWddJ1xufSlcbmV4cG9ydCBjbGFzcyBEcmFnRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIEBPdXRwdXQoKSBkcmFnc3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIGRyYWcgPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIGRyYWdlbmQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIG5nWm9uZTogTmdab25lKSB7XG4gICAgICAgIGNvbnN0IG1vdXNlZG93biQgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4oZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbW91c2Vkb3duJyk7XG4gICAgICAgIGNvbnN0IG1vdXNlbW92ZSQgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4oZG9jdW1lbnQsICdtb3VzZW1vdmUnKTtcbiAgICAgICAgY29uc3QgbW91c2V1cCQgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4oZG9jdW1lbnQsICdtb3VzZXVwJyk7XG5cbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gbW91c2Vkb3duJC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gZW1pdCB0aGUgZHJhZyBzdGFydCBldmVudFxuICAgICAgICAgICAgbmdab25lLnJ1bigoKSA9PiB0aGlzLmRyYWdzdGFydC5lbWl0KGV2ZW50KSk7XG5cbiAgICAgICAgICAgIG1vdXNlbW92ZSQucGlwZSh0YWtlVW50aWw8TW91c2VFdmVudD4obW91c2V1cCQpKS5zdWJzY3JpYmUobW92ZWV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBtb3ZlZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIC8vIGVtaXQgdGhlIGRyYWcgc3RhcnQgZXZlbnRcbiAgICAgICAgICAgICAgICBuZ1pvbmUucnVuKCgpID0+IHRoaXMuZHJhZy5lbWl0KG1vdmVldmVudCkpO1xuICAgICAgICAgICAgfSwgbnVsbCxcbiAgICAgICAgICAgICgpID0+IG5nWm9uZS5ydW4oKCkgPT4gdGhpcy5kcmFnZW5kLmVtaXQoKSkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxufSJdfQ==