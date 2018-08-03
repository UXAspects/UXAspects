/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Input, NgZone, Output, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
export class DragDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _ngZone
     * @param {?} _renderer
     */
    constructor(_elementRef, _ngZone, _renderer) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        /**
         * Detemine if we should show a clone when dragging
         */
        this.clone = false;
        /**
         * Allow the dragging to be enabled/disabled
         */
        this.draggable = true;
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
        this._mousedown$.pipe(filter(() => this.draggable), takeUntil(this._onDestroy)).subscribe(this.dragStart.bind(this));
    }
    /**
     * Emit events and create clone when drag starts
     * @param {?} event
     * @return {?}
     */
    dragStart(event) {
        event.preventDefault();
        if (this.clone) {
            // clone the node
            this.cloneNode(event);
        }
        // apply a class to the element being dragged
        this._renderer.addClass(this._elementRef.nativeElement, 'ux-drag-dragging');
        // emit the drag start event
        this._ngZone.run(() => this.dragstart.emit(event));
        this._mousemove$.pipe(takeUntil(this._mouseup$), takeUntil(this._onDestroy))
            .subscribe(this.dragMove.bind(this), null, this.dragEnd.bind(this));
    }
    /**
     * Emit event and update clone position when dragging moves
     * @param {?} event
     * @return {?}
     */
    dragMove(event) {
        event.preventDefault();
        if (this._clone) {
            this.updateNodePosition(event);
        }
        // emit the drag start event
        this._ngZone.run(() => this.drag.emit(event));
    }
    /**
     * Emit event and destroy clone when dragging ends
     * @return {?}
     */
    dragEnd() {
        // if there was a clone, remove it
        if (this._clone) {
            this._renderer.removeChild(document.body, this._clone);
            this._clone = null;
        }
        // remove the dragging class
        this._renderer.removeClass(this._elementRef.nativeElement, 'ux-drag-dragging');
        this._ngZone.run(() => this.dragend.emit());
    }
    /**
     * Create an exact clone of an element
     * @param {?} event
     * @return {?}
     */
    cloneNode(event) {
        // duplicate the node
        this._clone = this._elementRef.nativeElement.cloneNode(true);
        // store the position within the draggable element
        const { top, left } = this._elementRef.nativeElement.getBoundingClientRect();
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
    }
    /**
     * Position the clone relative to the mouse
     * @param {?} event
     * @return {?}
     */
    updateNodePosition(event) {
        this._renderer.setStyle(this._clone, 'left', (event.pageX - this._offset.x) + 'px');
        this._renderer.setStyle(this._clone, 'top', (event.pageY - this._offset.y) + 'px');
    }
    /**
     * Inline all styles to ensure styling is consistent regardless of its position in the dom
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    inlineStyles(source, target) {
        // get all the computed styles from the source element
        const /** @type {?} */ styles = getComputedStyle(source);
        // inline every specified style
        for (let /** @type {?} */ idx = 0; idx < styles.length; idx++) {
            const /** @type {?} */ style = styles.item(idx);
            if (style !== undefined) {
                this._renderer.setStyle(target, styles[idx], styles[style]);
            }
        }
        // ensure we dont capture any move events
        this._renderer.setStyle(target, 'pointer-events', 'none');
        // do the same for all the child elements
        for (let /** @type {?} */ idx = 0; idx < source.children.length; idx++) {
            this.inlineStyles(source.children[idx], target.children[idx]);
        }
    }
    /**
     * Unsubscribe from all subscriptions
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
DragDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxDrag]'
            },] }
];
/** @nocollapse */
DragDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 }
];
DragDirective.propDecorators = {
    clone: [{ type: Input }],
    draggable: [{ type: Input }],
    dragstart: [{ type: Output }],
    drag: [{ type: Output }],
    dragend: [{ type: Output }]
};
function DragDirective_tsickle_Closure_declarations() {
    /**
     * Detemine if we should show a clone when dragging
     * @type {?}
     */
    DragDirective.prototype.clone;
    /**
     * Allow the dragging to be enabled/disabled
     * @type {?}
     */
    DragDirective.prototype.draggable;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9kcmFnL2RyYWcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBYSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFLdkMsTUFBTTs7Ozs7O0lBbUNGLFlBQW9CLFdBQXVCLEVBQVUsT0FBZSxFQUFVLFNBQW9CO1FBQTlFLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7Ozs7cUJBaEN4RSxLQUFLOzs7O3lCQUdELElBQUk7Ozs7eUJBR1osSUFBSSxZQUFZLEVBQWM7Ozs7b0JBR25DLElBQUksWUFBWSxFQUFjOzs7O3VCQUczQixJQUFJLFlBQVksRUFBUTs7OzsyQkFTdEIsU0FBUyxDQUFhLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQzs7OzsyQkFHbEUsU0FBUyxDQUFhLFFBQVEsRUFBRSxXQUFXLENBQUM7Ozs7eUJBRzlDLFNBQVMsQ0FBYSxRQUFRLEVBQUUsU0FBUyxDQUFDOzs7OzBCQUd2QyxJQUFJLE9BQU8sRUFBUTtRQUd0QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENB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RUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDL0Q7U0FDSjs7UUFHRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQUM7O1FBRzFELEdBQUcsQ0FBQyxDQUFDLHFCQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7WUFDcEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNqRTtLQUNKOzs7OztJQUdELFdBQVc7UUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7OztZQXBKSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFVBQVU7YUFDdkI7Ozs7WUFQbUIsVUFBVTtZQUF1QixNQUFNO1lBQXFCLFNBQVM7OztvQkFXcEYsS0FBSzt3QkFHTCxLQUFLO3dCQUdMLE1BQU07bUJBR04sTUFBTTtzQkFHTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBOZ1pvbmUsIE9uRGVzdHJveSwgT3V0cHV0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9mcm9tRXZlbnQnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhEcmFnXSdcbn0pXG5leHBvcnQgY2xhc3MgRHJhZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICAvKiogRGV0ZW1pbmUgaWYgd2Ugc2hvdWxkIHNob3cgYSBjbG9uZSB3aGVuIGRyYWdnaW5nICovXG4gICAgQElucHV0KCkgY2xvbmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBBbGxvdyB0aGUgZHJhZ2dpbmcgdG8gYmUgZW5hYmxlZC9kaXNhYmxlZCAqL1xuICAgIEBJbnB1dCgpIGRyYWdnYWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogRW1pdCBhbiBldmVudCB3aGVuIGRyYWdnaW5nIHN0YXJ0cyAqL1xuICAgIEBPdXRwdXQoKSBkcmFnc3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgICAvKiogRW1pdCBhbiBldmVudCB3aGVuIHRoZSBtb3VzZSBtb3ZlcyB3aGlsZSBkcmFnZ2luZyAqL1xuICAgIEBPdXRwdXQoKSBkcmFnID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gICAgLyoqIEVtaXQgYW4gZXZlbnQgd2hlbiB0aGUgZHJhZ2dpbmcgZmluaXNoZXMgKi9cbiAgICBAT3V0cHV0KCkgZHJhZ2VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIC8qKiBTdG9yZSB0aGUgZWxlbWVudCB3ZSBoYXZlIGNsb25lZCAqL1xuICAgIHByaXZhdGUgX2Nsb25lOiBFbGVtZW50O1xuXG4gICAgLyoqIFN0b3JlIHRoZSBtb3VzZSBvZmZzZXQgZm9yIHRoZSBjbG9uZWQgZWxlbWVudCBwb3NpdGlvbiAqL1xuICAgIHByaXZhdGUgX29mZnNldDogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9O1xuXG4gICAgLyoqIENyZWF0ZSBhbiBvYnNlcnZhYmxlIGZyb20gdGhlIG1vdXNlIGRvd24gZXZlbnQgKi9cbiAgICBwcml2YXRlIF9tb3VzZWRvd24kID0gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21vdXNlZG93bicpO1xuXG4gICAgLyoqIENyZWF0ZSBhbiBvYnNlcnZhYmxlIGZyb20gdGhlIG1vdXNlIG1vdmUgZXZlbnQgKi9cbiAgICBwcml2YXRlIF9tb3VzZW1vdmUkID0gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KGRvY3VtZW50LCAnbW91c2Vtb3ZlJyk7XG5cbiAgICAvKiogQ3JlYXRlIGFuIG9ic2VydmFibGUgZnJvbSB0aGUgbW91c2UgdXAgZXZlbnQgKi9cbiAgICBwcml2YXRlIF9tb3VzZXVwJCA9IGZyb21FdmVudDxNb3VzZUV2ZW50Pihkb2N1bWVudCwgJ21vdXNldXAnKTtcblxuICAgIC8qKiBVc2UgYW4gb2JzZXJ2YWJsZSB0byB1bnN1YnNjcmliZSBmcm9tIGFsbCBzdWJzY3JpcHRpb25zICovXG4gICAgcHJvdGVjdGVkIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICAgICAgdGhpcy5fbW91c2Vkb3duJC5waXBlKGZpbHRlcigoKSA9PiB0aGlzLmRyYWdnYWJsZSksIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUodGhpcy5kcmFnU3RhcnQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqIEVtaXQgZXZlbnRzIGFuZCBjcmVhdGUgY2xvbmUgd2hlbiBkcmFnIHN0YXJ0cyAqL1xuICAgIGRyYWdTdGFydChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmNsb25lKSB7XG4gICAgICAgICAgICAvLyBjbG9uZSB0aGUgbm9kZVxuICAgICAgICAgICAgdGhpcy5jbG9uZU5vZGUoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXBwbHkgYSBjbGFzcyB0byB0aGUgZWxlbWVudCBiZWluZyBkcmFnZ2VkXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3V4LWRyYWctZHJhZ2dpbmcnKTtcblxuICAgICAgICAvLyBlbWl0IHRoZSBkcmFnIHN0YXJ0IGV2ZW50XG4gICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gdGhpcy5kcmFnc3RhcnQuZW1pdChldmVudCkpO1xuXG4gICAgICAgIHRoaXMuX21vdXNlbW92ZSQucGlwZSh0YWtlVW50aWwodGhpcy5fbW91c2V1cCQpLCB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUodGhpcy5kcmFnTW92ZS5iaW5kKHRoaXMpLCBudWxsLCB0aGlzLmRyYWdFbmQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqIEVtaXQgZXZlbnQgYW5kIHVwZGF0ZSBjbG9uZSBwb3NpdGlvbiB3aGVuIGRyYWdnaW5nIG1vdmVzICovXG4gICAgZHJhZ01vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAodGhpcy5fY2xvbmUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTm9kZVBvc2l0aW9uKGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVtaXQgdGhlIGRyYWcgc3RhcnQgZXZlbnRcbiAgICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB0aGlzLmRyYWcuZW1pdChldmVudCkpO1xuICAgIH1cblxuICAgIC8qKiBFbWl0IGV2ZW50IGFuZCBkZXN0cm95IGNsb25lIHdoZW4gZHJhZ2dpbmcgZW5kcyAqL1xuICAgIGRyYWdFbmQoKTogdm9pZCB7XG4gICAgICAgIC8vIGlmIHRoZXJlIHdhcyBhIGNsb25lLCByZW1vdmUgaXRcbiAgICAgICAgaWYgKHRoaXMuX2Nsb25lKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDaGlsZChkb2N1bWVudC5ib2R5LCB0aGlzLl9jbG9uZSk7XG4gICAgICAgICAgICB0aGlzLl9jbG9uZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgdGhlIGRyYWdnaW5nIGNsYXNzXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3V4LWRyYWctZHJhZ2dpbmcnKTtcblxuICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHRoaXMuZHJhZ2VuZC5lbWl0KCkpO1xuICAgIH1cblxuICAgIC8qKiBDcmVhdGUgYW4gZXhhY3QgY2xvbmUgb2YgYW4gZWxlbWVudCAqL1xuICAgIGNsb25lTm9kZShldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGR1cGxpY2F0ZSB0aGUgbm9kZVxuICAgICAgICB0aGlzLl9jbG9uZSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIHBvc2l0aW9uIHdpdGhpbiB0aGUgZHJhZ2dhYmxlIGVsZW1lbnRcbiAgICAgICAgY29uc3QgeyB0b3AsIGxlZnQgfSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdGhpcy5fb2Zmc2V0ID0geyB4OiBldmVudC5jbGllbnRYIC0gbGVmdCwgeTogZXZlbnQuY2xpZW50WSAtIHRvcCB9O1xuXG4gICAgICAgIC8vIGlubGluZSBhbGwgc3R5bGVzIHNvIGl0IGxvb2tzIGlkZW50aWNhbCByZWdhcmRsZXNzIG9mIGl0cyBwb3NpdGlvbiBpbiB0aGUgRE9NXG4gICAgICAgIHRoaXMuaW5saW5lU3R5bGVzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fY2xvbmUpO1xuXG4gICAgICAgIC8vIGVuc3VyZSB3ZSBjYW4gZWFzaWx5IHBvc2l0aW9uIHRoZSBub2RlIGFuIGl0IGlzIGFib3ZlIGFsbCBvdGhlciBlbGVtZW50c1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5fY2xvbmUsICdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2Nsb25lLCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fY2xvbmUsICd6LWluZGV4JywgJzk5OTk5Jyk7XG5cbiAgICAgICAgLy8gYXBwbHkgYSBjbGFzcyB0byBhbGxvdyBjdXN0b20gc3R5bGluZ1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9jbG9uZSwgJ3V4LWRyYWctZHJhZ2dpbmctY2xvbmUnKTtcblxuICAgICAgICAvLyBpbnNlcnQgdGhlIGNsb25lZCBlbGVtZW50XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmJvZHksIHRoaXMuX2Nsb25lKTtcblxuICAgICAgICAvLyBzZXQgdGhlIGNsb25lZCBlbGVtZW50IGluaXRpYWwgcG9zaXRpb25cbiAgICAgICAgdGhpcy51cGRhdGVOb2RlUG9zaXRpb24oZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKiBQb3NpdGlvbiB0aGUgY2xvbmUgcmVsYXRpdmUgdG8gdGhlIG1vdXNlICovXG4gICAgdXBkYXRlTm9kZVBvc2l0aW9uKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2Nsb25lLCAnbGVmdCcsIChldmVudC5wYWdlWCAtIHRoaXMuX29mZnNldC54KSArICdweCcpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jbG9uZSwgJ3RvcCcsIChldmVudC5wYWdlWSAtIHRoaXMuX29mZnNldC55KSArICdweCcpO1xuICAgIH1cblxuICAgIC8qKiBJbmxpbmUgYWxsIHN0eWxlcyB0byBlbnN1cmUgc3R5bGluZyBpcyBjb25zaXN0ZW50IHJlZ2FyZGxlc3Mgb2YgaXRzIHBvc2l0aW9uIGluIHRoZSBkb20gKi9cbiAgICBpbmxpbmVTdHlsZXMoc291cmNlOiBFbGVtZW50LCB0YXJnZXQ6IEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gZ2V0IGFsbCB0aGUgY29tcHV0ZWQgc3R5bGVzIGZyb20gdGhlIHNvdXJjZSBlbGVtZW50XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoc291cmNlKTtcblxuICAgICAgICAvLyBpbmxpbmUgZXZlcnkgc3BlY2lmaWVkIHN0eWxlXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHN0eWxlcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IHN0eWxlcy5pdGVtKGlkeCk7XG5cbiAgICAgICAgICAgIGlmIChzdHlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGFyZ2V0LCBzdHlsZXNbaWR4XSwgc3R5bGVzW3N0eWxlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbnN1cmUgd2UgZG9udCBjYXB0dXJlIGFueSBtb3ZlIGV2ZW50c1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0YXJnZXQsICdwb2ludGVyLWV2ZW50cycsICdub25lJyk7XG5cbiAgICAgICAgLy8gZG8gdGhlIHNhbWUgZm9yIGFsbCB0aGUgY2hpbGQgZWxlbWVudHNcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgc291cmNlLmNoaWxkcmVuLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIHRoaXMuaW5saW5lU3R5bGVzKHNvdXJjZS5jaGlsZHJlbltpZHhdLCB0YXJnZXQuY2hpbGRyZW5baWR4XSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVW5zdWJzY3JpYmUgZnJvbSBhbGwgc3Vic2NyaXB0aW9ucyAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG59Il19