/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Input, NgZone, Output, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
var DragDirective = (function () {
    function DragDirective(_elementRef, _ngZone, _renderer) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        /**
         * Detemine if we should show a clone when dragging
         */
        this.clone = false;
        /**
         * Emit an event when dragging starts
         */
        this.dragstart = new EventEmitter();
        /**
         * Emit an event when the mouse moves while dragging
         */
        this.drag = new EventEmitter();
        /**
         * Emit an event when the dragging finishes
         */
        this.dragend = new EventEmitter();
        /**
         * Create an observable from the mouse down event
         */
        this._mousedown$ = fromEvent(this._elementRef.nativeElement, 'mousedown');
        /**
         * Create an observable from the mouse move event
         */
        this._mousemove$ = fromEvent(document, 'mousemove');
        /**
         * Create an observable from the mouse up event
         */
        this._mouseup$ = fromEvent(document, 'mouseup');
        /**
         * Use an observable to unsubscribe from all subscriptions
         */
        this._onDestroy = new Subject();
        this._mousedown$.pipe(takeUntil(this._onDestroy)).subscribe(this.dragStart.bind(this));
    }
    /** Emit events and create clone when drag starts */
    /**
     * Emit events and create clone when drag starts
     * @param {?} event
     * @return {?}
     */
    DragDirective.prototype.dragStart = /**
     * Emit events and create clone when drag starts
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        event.preventDefault();
        if (this.clone) {
            // clone the node
            this.cloneNode(event);
        }
        // apply a class to the element being dragged
        this._renderer.addClass(this._elementRef.nativeElement, 'ux-drag-dragging');
        // emit the drag start event
        this._ngZone.run(function () { return _this.dragstart.emit(event); });
        this._mousemove$.pipe(takeUntil(this._mouseup$), takeUntil(this._onDestroy))
            .subscribe(this.dragMove.bind(this), null, this.dragEnd.bind(this));
    };
    /** Emit event and update clone position when dragging moves */
    /**
     * Emit event and update clone position when dragging moves
     * @param {?} event
     * @return {?}
     */
    DragDirective.prototype.dragMove = /**
     * Emit event and update clone position when dragging moves
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        event.preventDefault();
        if (this._clone) {
            this.updateNodePosition(event);
        }
        // emit the drag start event
        this._ngZone.run(function () { return _this.drag.emit(event); });
    };
    /** Emit event and destroy clone when dragging ends */
    /**
     * Emit event and destroy clone when dragging ends
     * @return {?}
     */
    DragDirective.prototype.dragEnd = /**
     * Emit event and destroy clone when dragging ends
     * @return {?}
     */
    function () {
        var _this = this;
        // if there was a clone, remove it
        if (this._clone) {
            this._renderer.removeChild(document.body, this._clone);
            this._clone = null;
        }
        // remove the dragging class
        this._renderer.removeClass(this._elementRef.nativeElement, 'ux-drag-dragging');
        this._ngZone.run(function () { return _this.dragend.emit(); });
    };
    /** Create an exact clone of an element */
    /**
     * Create an exact clone of an element
     * @param {?} event
     * @return {?}
     */
    DragDirective.prototype.cloneNode = /**
     * Create an exact clone of an element
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // duplicate the node
        this._clone = this._elementRef.nativeElement.cloneNode(true);
        // store the position within the draggable element
        var _a = this._elementRef.nativeElement.getBoundingClientRect(), top = _a.top, left = _a.left;
        this._offset = { x: event.clientX - left, y: event.clientY - top };
        // inline all styles so it looks identical regardless of its position in the DOM
        this.inlineStyles(this._elementRef.nativeElement, this._clone);
        // ensure we can easily position the node an it is above all other elements
        this._renderer.setAttribute(this._clone, 'aria-hidden', 'true');
        this._renderer.setStyle(this._clone, 'position', 'absolute');
        this._renderer.setStyle(this._clone, 'z-index', '99999');
        // apply a class to allow custom styling
        this._renderer.addClass(this._clone, 'ux-drag-dragging-clone');
        // insert the cloned element
        this._renderer.appendChild(document.body, this._clone);
        // set the cloned element initial position
        this.updateNodePosition(event);
    };
    /** Position the clone relative to the mouse */
    /**
     * Position the clone relative to the mouse
     * @param {?} event
     * @return {?}
     */
    DragDirective.prototype.updateNodePosition = /**
     * Position the clone relative to the mouse
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._renderer.setStyle(this._clone, 'left', (event.pageX - this._offset.x) + 'px');
        this._renderer.setStyle(this._clone, 'top', (event.pageY - this._offset.y) + 'px');
    };
    /** Inline all styles to ensure styling is consistent regardless of its position in the dom */
    /**
     * Inline all styles to ensure styling is consistent regardless of its position in the dom
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    DragDirective.prototype.inlineStyles = /**
     * Inline all styles to ensure styling is consistent regardless of its position in the dom
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    function (source, target) {
        // get all the computed styles from the source element
        var /** @type {?} */ styles = getComputedStyle(source);
        // inline every specified style
        for (var /** @type {?} */ idx = 0; idx < styles.length; idx++) {
            var /** @type {?} */ style = styles.item(idx);
            if (style !== undefined) {
                this._renderer.setStyle(target, styles[idx], styles[style]);
            }
        }
        // ensure we dont capture any move events
        this._renderer.setStyle(target, 'pointer-events', 'none');
        // do the same for all the child elements
        for (var /** @type {?} */ idx = 0; idx < source.children.length; idx++) {
            this.inlineStyles(source.children[idx], target.children[idx]);
        }
    };
    /** Unsubscribe from all subscriptions */
    /**
     * Unsubscribe from all subscriptions
     * @return {?}
     */
    DragDirective.prototype.ngOnDestroy = /**
     * Unsubscribe from all subscriptions
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
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
        { type: Renderer2, },
    ]; };
    DragDirective.propDecorators = {
        "clone": [{ type: Input },],
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
    /**
     * Detemine if we should show a clone when dragging
     * @type {?}
     */
    DragDirective.prototype.clone;
    /**
     * Emit an event when dragging starts
     * @type {?}
     */
    DragDirective.prototype.dragstart;
    /**
     * Emit an event when the mouse moves while dragging
     * @type {?}
     */
    DragDirective.prototype.drag;
    /**
     * Emit an event when the dragging finishes
     * @type {?}
     */
    DragDirective.prototype.dragend;
    /**
     * Store the element we have cloned
     * @type {?}
     */
    DragDirective.prototype._clone;
    /**
     * Store the mouse offset for the cloned element position
     * @type {?}
     */
    DragDirective.prototype._offset;
    /**
     * Create an observable from the mouse down event
     * @type {?}
     */
    DragDirective.prototype._mousedown$;
    /**
     * Create an observable from the mouse move event
     * @type {?}
     */
    DragDirective.prototype._mousemove$;
    /**
     * Create an observable from the mouse up event
     * @type {?}
     */
    DragDirective.prototype._mouseup$;
    /**
     * Use an observable to unsubscribe from all subscriptions
     * @type {?}
     */
    DragDirective.prototype._onDestroy;
    /** @type {?} */
    DragDirective.prototype._elementRef;
    /** @type {?} */
    DragDirective.prototype._ngZone;
    /** @type {?} */
    DragDirective.prototype._renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9kcmFnL2RyYWcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBYSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQzs7SUFxQ25DLHVCQUFvQixXQUF1QixFQUFVLE9BQWUsRUFBVSxTQUFvQjtRQUE5RSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXOzs7O3FCQTdCeEUsS0FBSzs7Ozt5QkFHVCxJQUFJLFlBQVksRUFBYzs7OztvQkFHbkMsSUFBSSxZQUFZLEVBQWM7Ozs7dUJBRzNCLElBQUksWUFBWSxFQUFROzs7OzJCQVN0QixTQUFTLENBQWEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDOzs7OzJCQUdsRSxTQUFTLENBQWEsUUFBUSxFQUFFLFdBQVcsQ0FBQzs7Ozt5QkFHOUMsU0FBUyxDQUFhLFFBQVEsRUFBRSxTQUFTLENBQUM7Ozs7MEJBR3ZDLElBQUksT0FBTyxFQUFRO1FBR3RDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUMx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LEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRS9CLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQy9EO1NBQ0o7O1FBR0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDOztRQUcxRCxHQUFHLENBQUMsQ0FBQyxxQkFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO1lBQ3BELElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDakU7S0FDSjtJQUVELHlDQUF5Qzs7Ozs7SUFDekMsbUNBQVc7Ozs7SUFBWDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5Qjs7Z0JBakpKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsVUFBVTtpQkFDdkI7Ozs7Z0JBUG1CLFVBQVU7Z0JBQXVCLE1BQU07Z0JBQXFCLFNBQVM7OzswQkFXcEYsS0FBSzs4QkFHTCxNQUFNO3lCQUdOLE1BQU07NEJBR04sTUFBTTs7d0JBcEJYOztTQVFhLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE5nWm9uZSwgT25EZXN0cm95LCBPdXRwdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2Zyb21FdmVudCc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhEcmFnXSdcbn0pXG5leHBvcnQgY2xhc3MgRHJhZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICAvKiogRGV0ZW1pbmUgaWYgd2Ugc2hvdWxkIHNob3cgYSBjbG9uZSB3aGVuIGRyYWdnaW5nICovXG4gICAgQElucHV0KCkgY2xvbmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBFbWl0IGFuIGV2ZW50IHdoZW4gZHJhZ2dpbmcgc3RhcnRzICovXG4gICAgQE91dHB1dCgpIGRyYWdzdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAgIC8qKiBFbWl0IGFuIGV2ZW50IHdoZW4gdGhlIG1vdXNlIG1vdmVzIHdoaWxlIGRyYWdnaW5nICovXG4gICAgQE91dHB1dCgpIGRyYWcgPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgICAvKiogRW1pdCBhbiBldmVudCB3aGVuIHRoZSBkcmFnZ2luZyBmaW5pc2hlcyAqL1xuICAgIEBPdXRwdXQoKSBkcmFnZW5kID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIFN0b3JlIHRoZSBlbGVtZW50IHdlIGhhdmUgY2xvbmVkICovXG4gICAgcHJpdmF0ZSBfY2xvbmU6IEVsZW1lbnQ7XG5cbiAgICAvKiogU3RvcmUgdGhlIG1vdXNlIG9mZnNldCBmb3IgdGhlIGNsb25lZCBlbGVtZW50IHBvc2l0aW9uICovXG4gICAgcHJpdmF0ZSBfb2Zmc2V0OiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH07XG5cbiAgICAvKiogQ3JlYXRlIGFuIG9ic2VydmFibGUgZnJvbSB0aGUgbW91c2UgZG93biBldmVudCAqL1xuICAgIHByaXZhdGUgX21vdXNlZG93biQgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4odGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbW91c2Vkb3duJyk7XG5cbiAgICAvKiogQ3JlYXRlIGFuIG9ic2VydmFibGUgZnJvbSB0aGUgbW91c2UgbW92ZSBldmVudCAqL1xuICAgIHByaXZhdGUgX21vdXNlbW92ZSQgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4oZG9jdW1lbnQsICdtb3VzZW1vdmUnKTtcblxuICAgIC8qKiBDcmVhdGUgYW4gb2JzZXJ2YWJsZSBmcm9tIHRoZSBtb3VzZSB1cCBldmVudCAqL1xuICAgIHByaXZhdGUgX21vdXNldXAkID0gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KGRvY3VtZW50LCAnbW91c2V1cCcpO1xuXG4gICAgLyoqIFVzZSBhbiBvYnNlcnZhYmxlIHRvIHVuc3Vic2NyaWJlIGZyb20gYWxsIHN1YnNjcmlwdGlvbnMgKi9cbiAgICBwcm90ZWN0ZWQgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgICAgICB0aGlzLl9tb3VzZWRvd24kLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSh0aGlzLmRyYWdTdGFydC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICAvKiogRW1pdCBldmVudHMgYW5kIGNyZWF0ZSBjbG9uZSB3aGVuIGRyYWcgc3RhcnRzICovXG4gICAgZHJhZ1N0YXJ0KGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2xvbmUpIHtcbiAgICAgICAgICAgIC8vIGNsb25lIHRoZSBub2RlXG4gICAgICAgICAgICB0aGlzLmNsb25lTm9kZShldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhcHBseSBhIGNsYXNzIHRvIHRoZSBlbGVtZW50IGJlaW5nIGRyYWdnZWRcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndXgtZHJhZy1kcmFnZ2luZycpO1xuXG4gICAgICAgIC8vIGVtaXQgdGhlIGRyYWcgc3RhcnQgZXZlbnRcbiAgICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB0aGlzLmRyYWdzdGFydC5lbWl0KGV2ZW50KSk7XG5cbiAgICAgICAgdGhpcy5fbW91c2Vtb3ZlJC5waXBlKHRha2VVbnRpbCh0aGlzLl9tb3VzZXVwJCksIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSh0aGlzLmRyYWdNb3ZlLmJpbmQodGhpcyksIG51bGwsIHRoaXMuZHJhZ0VuZC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICAvKiogRW1pdCBldmVudCBhbmQgdXBkYXRlIGNsb25lIHBvc2l0aW9uIHdoZW4gZHJhZ2dpbmcgbW92ZXMgKi9cbiAgICBkcmFnTW92ZShldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9jbG9uZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVOb2RlUG9zaXRpb24oZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW1pdCB0aGUgZHJhZyBzdGFydCBldmVudFxuICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHRoaXMuZHJhZy5lbWl0KGV2ZW50KSk7XG4gICAgfVxuXG4gICAgLyoqIEVtaXQgZXZlbnQgYW5kIGRlc3Ryb3kgY2xvbmUgd2hlbiBkcmFnZ2luZyBlbmRzICovXG4gICAgZHJhZ0VuZCgpOiB2b2lkIHtcbiAgICAgICAgLy8gaWYgdGhlcmUgd2FzIGEgY2xvbmUsIHJlbW92ZSBpdFxuICAgICAgICBpZiAodGhpcy5fY2xvbmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNoaWxkKGRvY3VtZW50LmJvZHksIHRoaXMuX2Nsb25lKTtcbiAgICAgICAgICAgIHRoaXMuX2Nsb25lID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgZHJhZ2dpbmcgY2xhc3NcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndXgtZHJhZy1kcmFnZ2luZycpO1xuXG4gICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gdGhpcy5kcmFnZW5kLmVtaXQoKSk7XG4gICAgfVxuXG4gICAgLyoqIENyZWF0ZSBhbiBleGFjdCBjbG9uZSBvZiBhbiBlbGVtZW50ICovXG4gICAgY2xvbmVOb2RlKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gZHVwbGljYXRlIHRoZSBub2RlXG4gICAgICAgIHRoaXMuX2Nsb25lID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsb25lTm9kZSh0cnVlKTtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgcG9zaXRpb24gd2l0aGluIHRoZSBkcmFnZ2FibGUgZWxlbWVudFxuICAgICAgICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB0aGlzLl9vZmZzZXQgPSB7IHg6IGV2ZW50LmNsaWVudFggLSBsZWZ0LCB5OiBldmVudC5jbGllbnRZIC0gdG9wIH07XG5cbiAgICAgICAgLy8gaW5saW5lIGFsbCBzdHlsZXMgc28gaXQgbG9va3MgaWRlbnRpY2FsIHJlZ2FyZGxlc3Mgb2YgaXRzIHBvc2l0aW9uIGluIHRoZSBET01cbiAgICAgICAgdGhpcy5pbmxpbmVTdHlsZXModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl9jbG9uZSk7XG5cbiAgICAgICAgLy8gZW5zdXJlIHdlIGNhbiBlYXNpbHkgcG9zaXRpb24gdGhlIG5vZGUgYW4gaXQgaXMgYWJvdmUgYWxsIG90aGVyIGVsZW1lbnRzXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLl9jbG9uZSwgJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fY2xvbmUsICdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jbG9uZSwgJ3otaW5kZXgnLCAnOTk5OTknKTtcblxuICAgICAgICAvLyBhcHBseSBhIGNsYXNzIHRvIGFsbG93IGN1c3RvbSBzdHlsaW5nXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2Nsb25lLCAndXgtZHJhZy1kcmFnZ2luZy1jbG9uZScpO1xuXG4gICAgICAgIC8vIGluc2VydCB0aGUgY2xvbmVkIGVsZW1lbnRcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuYm9keSwgdGhpcy5fY2xvbmUpO1xuXG4gICAgICAgIC8vIHNldCB0aGUgY2xvbmVkIGVsZW1lbnQgaW5pdGlhbCBwb3NpdGlvblxuICAgICAgICB0aGlzLnVwZGF0ZU5vZGVQb3NpdGlvbihldmVudCk7XG4gICAgfVxuXG4gICAgLyoqIFBvc2l0aW9uIHRoZSBjbG9uZSByZWxhdGl2ZSB0byB0aGUgbW91c2UgKi9cbiAgICB1cGRhdGVOb2RlUG9zaXRpb24oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fY2xvbmUsICdsZWZ0JywgKGV2ZW50LnBhZ2VYIC0gdGhpcy5fb2Zmc2V0LngpICsgJ3B4Jyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2Nsb25lLCAndG9wJywgKGV2ZW50LnBhZ2VZIC0gdGhpcy5fb2Zmc2V0LnkpICsgJ3B4Jyk7XG4gICAgfVxuXG4gICAgLyoqIElubGluZSBhbGwgc3R5bGVzIHRvIGVuc3VyZSBzdHlsaW5nIGlzIGNvbnNpc3RlbnQgcmVnYXJkbGVzcyBvZiBpdHMgcG9zaXRpb24gaW4gdGhlIGRvbSAqL1xuICAgIGlubGluZVN0eWxlcyhzb3VyY2U6IEVsZW1lbnQsIHRhcmdldDogRWxlbWVudCk6IHZvaWQge1xuICAgICAgICAvLyBnZXQgYWxsIHRoZSBjb21wdXRlZCBzdHlsZXMgZnJvbSB0aGUgc291cmNlIGVsZW1lbnRcbiAgICAgICAgY29uc3Qgc3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShzb3VyY2UpO1xuXG4gICAgICAgIC8vIGlubGluZSBldmVyeSBzcGVjaWZpZWQgc3R5bGVcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgc3R5bGVzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gc3R5bGVzLml0ZW0oaWR4KTtcblxuICAgICAgICAgICAgaWYgKHN0eWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0YXJnZXQsIHN0eWxlc1tpZHhdLCBzdHlsZXNbc3R5bGVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVuc3VyZSB3ZSBkb250IGNhcHR1cmUgYW55IG1vdmUgZXZlbnRzXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRhcmdldCwgJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcblxuICAgICAgICAvLyBkbyB0aGUgc2FtZSBmb3IgYWxsIHRoZSBjaGlsZCBlbGVtZW50c1xuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBzb3VyY2UuY2hpbGRyZW4ubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgdGhpcy5pbmxpbmVTdHlsZXMoc291cmNlLmNoaWxkcmVuW2lkeF0sIHRhcmdldC5jaGlsZHJlbltpZHhdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBVbnN1YnNjcmliZSBmcm9tIGFsbCBzdWJzY3JpcHRpb25zICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cbn0iXX0=