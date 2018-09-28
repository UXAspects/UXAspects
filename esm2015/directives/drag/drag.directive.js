/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Input, NgZone, Output, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { DragService } from './drag.service';
export class DragDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _ngZone
     * @param {?} _renderer
     * @param {?} _drag
     */
    constructor(_elementRef, _ngZone, _renderer, _drag) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._drag = _drag;
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
        this.onDragStart = new EventEmitter();
        /**
         * Emit an event when the mouse moves while dragging
         */
        this.onDrag = new EventEmitter();
        /**
         * Emit an event when the dragging finishes
         */
        this.onDragEnd = new EventEmitter();
        /**
         * Emit when the user drops an item in a drop area
         */
        this.onDrop = new EventEmitter();
        /**
         * Emit when the user drags over a drop area
         */
        this.onDropEnter = new EventEmitter();
        /**
         * Emit when the user drags out of a drop area
         */
        this.onDropLeave = new EventEmitter();
        /**
         * Store the dragging state
         */
        this._isDragging = false;
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
        // ensure all mouse down events on the object are captured
        this._mousedown$.pipe(filter(() => this.draggable), takeUntil(this._onDestroy)).subscribe(this.dragStart.bind(this));
        // emit the outputs when drag events occur
        _drag.onDragStart.pipe(takeUntil(this._onDestroy), filter(() => this._isDragging))
            .subscribe(dragEvent => this.onDragStart.emit(dragEvent.event));
        _drag.onDrag.pipe(takeUntil(this._onDestroy), filter(() => this._isDragging))
            .subscribe(dragEvent => this.onDrag.emit(dragEvent.event));
        _drag.onDragEnd.pipe(takeUntil(this._onDestroy), filter(() => this._isDragging))
            .subscribe(() => this.onDragEnd.emit());
        _drag.onDrop.pipe(takeUntil(this._onDestroy), filter(() => this._isDragging))
            .subscribe(event => this.onDrop.emit(event));
        _drag.onDropEnter.pipe(takeUntil(this._onDestroy), filter(() => this._isDragging))
            .subscribe(() => this.onDropEnter.emit());
        _drag.onDropLeave.pipe(takeUntil(this._onDestroy), filter(() => this._isDragging))
            .subscribe(() => this.onDropLeave.emit());
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
        // store the dragging state
        this._isDragging = true;
        // emit the drag start event
        this._ngZone.run(() => this._drag.onDragStart.next({ event, group: this.group, data: this.model }));
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
        this._ngZone.run(() => this._drag.onDrag.next({ event, group: this.group, data: this.model }));
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
        // emit the on drag end output
        this._ngZone.run(() => this._drag.onDragEnd.next({ group: this.group, data: this.model }));
        // store the dragging state
        this._isDragging = false;
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
        const { top, left, width } = this._elementRef.nativeElement.getBoundingClientRect();
        this._offset = { x: event.clientX - left, y: event.clientY - top };
        // inline all styles so it looks identical regardless of its position in the DOM
        this.inlineStyles(this._elementRef.nativeElement, this._clone);
        // IE doesn't always calculate the correct width value using getComputedStyles... use bounding client value instead
        this._renderer.setStyle(this._clone, 'width', width + 'px');
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
    { type: Renderer2 },
    { type: DragService }
];
DragDirective.propDecorators = {
    clone: [{ type: Input }],
    group: [{ type: Input }],
    model: [{ type: Input }],
    draggable: [{ type: Input }],
    onDragStart: [{ type: Output }],
    onDrag: [{ type: Output }],
    onDragEnd: [{ type: Output }],
    onDrop: [{ type: Output }],
    onDropEnter: [{ type: Output }],
    onDropLeave: [{ type: Output }]
};
function DragDirective_tsickle_Closure_declarations() {
    /**
     * Detemine if we should show a clone when dragging
     * @type {?}
     */
    DragDirective.prototype.clone;
    /**
     * Define the group the drag event belongs to
     * @type {?}
     */
    DragDirective.prototype.group;
    /**
     * Associate some data with the drag event
     * @type {?}
     */
    DragDirective.prototype.model;
    /**
     * Allow the dragging to be enabled/disabled
     * @type {?}
     */
    DragDirective.prototype.draggable;
    /**
     * Emit an event when dragging starts
     * @type {?}
     */
    DragDirective.prototype.onDragStart;
    /**
     * Emit an event when the mouse moves while dragging
     * @type {?}
     */
    DragDirective.prototype.onDrag;
    /**
     * Emit an event when the dragging finishes
     * @type {?}
     */
    DragDirective.prototype.onDragEnd;
    /**
     * Emit when the user drops an item in a drop area
     * @type {?}
     */
    DragDirective.prototype.onDrop;
    /**
     * Emit when the user drags over a drop area
     * @type {?}
     */
    DragDirective.prototype.onDropEnter;
    /**
     * Emit when the user drags out of a drop area
     * @type {?}
     */
    DragDirective.prototype.onDropLeave;
    /**
     * Store the element we have cloned
     * @type {?}
     */
    DragDirective.prototype._clone;
    /**
     * Store the dragging state
     * @type {?}
     */
    DragDirective.prototype._isDragging;
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
    /** @type {?} */
    DragDirective.prototype._drag;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9kcmFnL2RyYWcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBYSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSzdDLE1BQU07Ozs7Ozs7SUFxREYsWUFBb0IsV0FBdUIsRUFBVSxPQUFlLEVBQVUsU0FBb0IsRUFBVSxLQUFrQjtRQUExRyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBYTs7OztxQkFsRHBHLEtBQUs7Ozs7eUJBU0QsSUFBSTs7OzsyQkFHVixJQUFJLFlBQVksRUFBYzs7OztzQkFHbkMsSUFBSSxZQUFZLEVBQWM7Ozs7eUJBRzNCLElBQUksWUFBWSxFQUFROzs7O3NCQUczQixJQUFJLFlBQVksRUFBTzs7OzsyQkFHbEIsSUFBSSxZQUFZLEVBQVE7Ozs7MkJBR3hCLElBQUksWUFBWSxFQUFROzs7OzJCQU1qQixLQUFLOzs7OzJCQU1kLFNBQVMsQ0FBYSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUM7Ozs7MkJBR2xFLFNBQVMsQ0FBYSxRQUFRLEVBQUUsV0FBVyxDQUFDOzs7O3lCQUc5QyxTQUFTLENBQWEsUUFBUSxFQUFFLFNBQVMsQ0FBQzs7OzswQkFHdkMsSUFBSSxPQUFPLEVBQVE7O1FBS3RDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOztRQUdySCxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDN0UsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFcEUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3hFLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRS9ELEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUMzRSxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRTVDLEtBQUssQ0FBQyxNQUFN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QUUvQixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUMvRDtTQUNKOztRQUdELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQzs7UUFHMUQsR0FBRyxDQUFDLENBQUMscUJBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztZQUNwRCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2pFO0tBQ0o7Ozs7O0lBR0QsV0FBVztRQUNQLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5Qjs7O1lBck1KLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsVUFBVTthQUN2Qjs7OztZQVJtQixVQUFVO1lBQXVCLE1BQU07WUFBcUIsU0FBUztZQUloRixXQUFXOzs7b0JBUWYsS0FBSztvQkFHTCxLQUFLO29CQUdMLEtBQUs7d0JBR0wsS0FBSzswQkFHTCxNQUFNO3FCQUdOLE1BQU07d0JBR04sTUFBTTtxQkFHTixNQUFNOzBCQUdOLE1BQU07MEJBR04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgTmdab25lLCBPbkRlc3Ryb3ksIE91dHB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzL29ic2VydmFibGUvZnJvbUV2ZW50JztcbmltcG9ydCB7IGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBEcmFnU2VydmljZSB9IGZyb20gJy4vZHJhZy5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhEcmFnXSdcbn0pXG5leHBvcnQgY2xhc3MgRHJhZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICAvKiogRGV0ZW1pbmUgaWYgd2Ugc2hvdWxkIHNob3cgYSBjbG9uZSB3aGVuIGRyYWdnaW5nICovXG4gICAgQElucHV0KCkgY2xvbmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBEZWZpbmUgdGhlIGdyb3VwIHRoZSBkcmFnIGV2ZW50IGJlbG9uZ3MgdG8gKi9cbiAgICBASW5wdXQoKSBncm91cDogc3RyaW5nO1xuXG4gICAgLyoqIEFzc29jaWF0ZSBzb21lIGRhdGEgd2l0aCB0aGUgZHJhZyBldmVudCAqL1xuICAgIEBJbnB1dCgpIG1vZGVsOiBhbnk7XG5cbiAgICAvKiogQWxsb3cgdGhlIGRyYWdnaW5nIHRvIGJlIGVuYWJsZWQvZGlzYWJsZWQgKi9cbiAgICBASW5wdXQoKSBkcmFnZ2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEVtaXQgYW4gZXZlbnQgd2hlbiBkcmFnZ2luZyBzdGFydHMgKi9cbiAgICBAT3V0cHV0KCkgb25EcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgICAvKiogRW1pdCBhbiBldmVudCB3aGVuIHRoZSBtb3VzZSBtb3ZlcyB3aGlsZSBkcmFnZ2luZyAqL1xuICAgIEBPdXRwdXQoKSBvbkRyYWcgPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgICAvKiogRW1pdCBhbiBldmVudCB3aGVuIHRoZSBkcmFnZ2luZyBmaW5pc2hlcyAqL1xuICAgIEBPdXRwdXQoKSBvbkRyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKiogRW1pdCB3aGVuIHRoZSB1c2VyIGRyb3BzIGFuIGl0ZW0gaW4gYSBkcm9wIGFyZWEgKi9cbiAgICBAT3V0cHV0KCkgb25Ecm9wID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICAvKiogRW1pdCB3aGVuIHRoZSB1c2VyIGRyYWdzIG92ZXIgYSBkcm9wIGFyZWEgKi9cbiAgICBAT3V0cHV0KCkgb25Ecm9wRW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKiogRW1pdCB3aGVuIHRoZSB1c2VyIGRyYWdzIG91dCBvZiBhIGRyb3AgYXJlYSAqL1xuICAgIEBPdXRwdXQoKSBvbkRyb3BMZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIC8qKiBTdG9yZSB0aGUgZWxlbWVudCB3ZSBoYXZlIGNsb25lZCAqL1xuICAgIHByaXZhdGUgX2Nsb25lOiBFbGVtZW50O1xuXG4gICAgLyoqIFN0b3JlIHRoZSBkcmFnZ2luZyBzdGF0ZSAqL1xuICAgIHByaXZhdGUgX2lzRHJhZ2dpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBTdG9yZSB0aGUgbW91c2Ugb2Zmc2V0IGZvciB0aGUgY2xvbmVkIGVsZW1lbnQgcG9zaXRpb24gKi9cbiAgICBwcml2YXRlIF9vZmZzZXQ6IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfTtcblxuICAgIC8qKiBDcmVhdGUgYW4gb2JzZXJ2YWJsZSBmcm9tIHRoZSBtb3VzZSBkb3duIGV2ZW50ICovXG4gICAgcHJpdmF0ZSBfbW91c2Vkb3duJCA9IGZyb21FdmVudDxNb3VzZUV2ZW50Pih0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdtb3VzZWRvd24nKTtcblxuICAgIC8qKiBDcmVhdGUgYW4gb2JzZXJ2YWJsZSBmcm9tIHRoZSBtb3VzZSBtb3ZlIGV2ZW50ICovXG4gICAgcHJpdmF0ZSBfbW91c2Vtb3ZlJCA9IGZyb21FdmVudDxNb3VzZUV2ZW50Pihkb2N1bWVudCwgJ21vdXNlbW92ZScpO1xuXG4gICAgLyoqIENyZWF0ZSBhbiBvYnNlcnZhYmxlIGZyb20gdGhlIG1vdXNlIHVwIGV2ZW50ICovXG4gICAgcHJpdmF0ZSBfbW91c2V1cCQgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4oZG9jdW1lbnQsICdtb3VzZXVwJyk7XG5cbiAgICAvKiogVXNlIGFuIG9ic2VydmFibGUgdG8gdW5zdWJzY3JpYmUgZnJvbSBhbGwgc3Vic2NyaXB0aW9ucyAqL1xuICAgIHByb3RlY3RlZCBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX25nWm9uZTogTmdab25lLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIF9kcmFnOiBEcmFnU2VydmljZSkge1xuXG4gICAgICAgIC8vIGVuc3VyZSBhbGwgbW91c2UgZG93biBldmVudHMgb24gdGhlIG9iamVjdCBhcmUgY2FwdHVyZWRcbiAgICAgICAgdGhpcy5fbW91c2Vkb3duJC5waXBlKGZpbHRlcigoKSA9PiB0aGlzLmRyYWdnYWJsZSksIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUodGhpcy5kcmFnU3RhcnQuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgLy8gZW1pdCB0aGUgb3V0cHV0cyB3aGVuIGRyYWcgZXZlbnRzIG9jY3VyXG4gICAgICAgIF9kcmFnLm9uRHJhZ1N0YXJ0LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIGZpbHRlcigoKSA9PiB0aGlzLl9pc0RyYWdnaW5nKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZHJhZ0V2ZW50ID0+IHRoaXMub25EcmFnU3RhcnQuZW1pdChkcmFnRXZlbnQuZXZlbnQpKTtcblxuICAgICAgICBfZHJhZy5vbkRyYWcucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgZmlsdGVyKCgpID0+IHRoaXMuX2lzRHJhZ2dpbmcpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShkcmFnRXZlbnQgPT4gdGhpcy5vbkRyYWcuZW1pdChkcmFnRXZlbnQuZXZlbnQpKTtcblxuICAgICAgICBfZHJhZy5vbkRyYWdFbmQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgZmlsdGVyKCgpID0+IHRoaXMuX2lzRHJhZ2dpbmcpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLm9uRHJhZ0VuZC5lbWl0KCkpO1xuXG4gICAgICAgIF9kcmFnLm9uRHJvcC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBmaWx0ZXIoKCkgPT4gdGhpcy5faXNEcmFnZ2luZykpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHRoaXMub25Ecm9wLmVtaXQoZXZlbnQpKTtcblxuICAgICAgICBfZHJhZy5vbkRyb3BFbnRlci5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBmaWx0ZXIoKCkgPT4gdGhpcy5faXNEcmFnZ2luZykpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMub25Ecm9wRW50ZXIuZW1pdCgpKTtcblxuICAgICAgICBfZHJhZy5vbkRyb3BMZWF2ZS5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBmaWx0ZXIoKCkgPT4gdGhpcy5faXNEcmFnZ2luZykpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMub25Ecm9wTGVhdmUuZW1pdCgpKTtcbiAgICB9XG5cbiAgICAvKiogRW1pdCBldmVudHMgYW5kIGNyZWF0ZSBjbG9uZSB3aGVuIGRyYWcgc3RhcnRzICovXG4gICAgZHJhZ1N0YXJ0KGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2xvbmUpIHtcbiAgICAgICAgICAgIC8vIGNsb25lIHRoZSBub2RlXG4gICAgICAgICAgICB0aGlzLmNsb25lTm9kZShldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhcHBseSBhIGNsYXNzIHRvIHRoZSBlbGVtZW50IGJlaW5nIGRyYWdnZWRcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndXgtZHJhZy1kcmFnZ2luZycpO1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBkcmFnZ2luZyBzdGF0ZVxuICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgICAvLyBlbWl0IHRoZSBkcmFnIHN0YXJ0IGV2ZW50XG4gICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gdGhpcy5fZHJhZy5vbkRyYWdTdGFydC5uZXh0KHsgZXZlbnQsIGdyb3VwOiB0aGlzLmdyb3VwLCBkYXRhOiB0aGlzLm1vZGVsIH0pKTtcblxuICAgICAgICB0aGlzLl9tb3VzZW1vdmUkLnBpcGUodGFrZVVudGlsKHRoaXMuX21vdXNldXAkKSwgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMuZHJhZ01vdmUuYmluZCh0aGlzKSwgbnVsbCwgdGhpcy5kcmFnRW5kLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIC8qKiBFbWl0IGV2ZW50IGFuZCB1cGRhdGUgY2xvbmUgcG9zaXRpb24gd2hlbiBkcmFnZ2luZyBtb3ZlcyAqL1xuICAgIGRyYWdNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2Nsb25lKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU5vZGVQb3NpdGlvbihldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbWl0IHRoZSBkcmFnIHN0YXJ0IGV2ZW50XG4gICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gdGhpcy5fZHJhZy5vbkRyYWcubmV4dCh7IGV2ZW50LCBncm91cDogdGhpcy5ncm91cCwgZGF0YTogdGhpcy5tb2RlbCB9KSk7XG4gICAgfVxuXG4gICAgLyoqIEVtaXQgZXZlbnQgYW5kIGRlc3Ryb3kgY2xvbmUgd2hlbiBkcmFnZ2luZyBlbmRzICovXG4gICAgZHJhZ0VuZCgpOiB2b2lkIHtcbiAgICAgICAgLy8gaWYgdGhlcmUgd2FzIGEgY2xvbmUsIHJlbW92ZSBpdFxuICAgICAgICBpZiAodGhpcy5fY2xvbmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNoaWxkKGRvY3VtZW50LmJvZHksIHRoaXMuX2Nsb25lKTtcbiAgICAgICAgICAgIHRoaXMuX2Nsb25lID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgZHJhZ2dpbmcgY2xhc3NcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndXgtZHJhZy1kcmFnZ2luZycpO1xuXG4gICAgICAgIC8vIGVtaXQgdGhlIG9uIGRyYWcgZW5kIG91dHB1dFxuICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHRoaXMuX2RyYWcub25EcmFnRW5kLm5leHQoeyBncm91cDogdGhpcy5ncm91cCwgZGF0YTogdGhpcy5tb2RlbCB9KSk7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIGRyYWdnaW5nIHN0YXRlXG4gICAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKiogQ3JlYXRlIGFuIGV4YWN0IGNsb25lIG9mIGFuIGVsZW1lbnQgKi9cbiAgICBjbG9uZU5vZGUoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBkdXBsaWNhdGUgdGhlIG5vZGVcbiAgICAgICAgdGhpcy5fY2xvbmUgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBwb3NpdGlvbiB3aXRoaW4gdGhlIGRyYWdnYWJsZSBlbGVtZW50XG4gICAgICAgIGNvbnN0IHsgdG9wLCBsZWZ0LCB3aWR0aCB9ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB0aGlzLl9vZmZzZXQgPSB7IHg6IGV2ZW50LmNsaWVudFggLSBsZWZ0LCB5OiBldmVudC5jbGllbnRZIC0gdG9wIH07XG5cbiAgICAgICAgLy8gaW5saW5lIGFsbCBzdHlsZXMgc28gaXQgbG9va3MgaWRlbnRpY2FsIHJlZ2FyZGxlc3Mgb2YgaXRzIHBvc2l0aW9uIGluIHRoZSBET01cbiAgICAgICAgdGhpcy5pbmxpbmVTdHlsZXModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl9jbG9uZSk7XG5cbiAgICAgICAgLy8gSUUgZG9lc24ndCBhbHdheXMgY2FsY3VsYXRlIHRoZSBjb3JyZWN0IHdpZHRoIHZhbHVlIHVzaW5nIGdldENvbXB1dGVkU3R5bGVzLi4uIHVzZSBib3VuZGluZyBjbGllbnQgdmFsdWUgaW5zdGVhZFxuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jbG9uZSwgJ3dpZHRoJywgd2lkdGggKyAncHgnKTtcblxuICAgICAgICAvLyBlbnN1cmUgd2UgY2FuIGVhc2lseSBwb3NpdGlvbiB0aGUgbm9kZSBhbiBpdCBpcyBhYm92ZSBhbGwgb3RoZXIgZWxlbWVudHNcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuX2Nsb25lLCAnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jbG9uZSwgJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2Nsb25lLCAnei1pbmRleCcsICc5OTk5OScpO1xuXG4gICAgICAgIC8vIGFwcGx5IGEgY2xhc3MgdG8gYWxsb3cgY3VzdG9tIHN0eWxpbmdcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fY2xvbmUsICd1eC1kcmFnLWRyYWdnaW5nLWNsb25lJyk7XG5cbiAgICAgICAgLy8gaW5zZXJ0IHRoZSBjbG9uZWQgZWxlbWVudFxuICAgICAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZChkb2N1bWVudC5ib2R5LCB0aGlzLl9jbG9uZSk7XG5cbiAgICAgICAgLy8gc2V0IHRoZSBjbG9uZWQgZWxlbWVudCBpbml0aWFsIHBvc2l0aW9uXG4gICAgICAgIHRoaXMudXBkYXRlTm9kZVBvc2l0aW9uKGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKiogUG9zaXRpb24gdGhlIGNsb25lIHJlbGF0aXZlIHRvIHRoZSBtb3VzZSAqL1xuICAgIHVwZGF0ZU5vZGVQb3NpdGlvbihldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jbG9uZSwgJ2xlZnQnLCAoZXZlbnQucGFnZVggLSB0aGlzLl9vZmZzZXQueCkgKyAncHgnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fY2xvbmUsICd0b3AnLCAoZXZlbnQucGFnZVkgLSB0aGlzLl9vZmZzZXQueSkgKyAncHgnKTtcbiAgICB9XG5cbiAgICAvKiogSW5saW5lIGFsbCBzdHlsZXMgdG8gZW5zdXJlIHN0eWxpbmcgaXMgY29uc2lzdGVudCByZWdhcmRsZXNzIG9mIGl0cyBwb3NpdGlvbiBpbiB0aGUgZG9tICovXG4gICAgaW5saW5lU3R5bGVzKHNvdXJjZTogRWxlbWVudCwgdGFyZ2V0OiBFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIC8vIGdldCBhbGwgdGhlIGNvbXB1dGVkIHN0eWxlcyBmcm9tIHRoZSBzb3VyY2UgZWxlbWVudFxuICAgICAgICBjb25zdCBzdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKHNvdXJjZSk7XG5cbiAgICAgICAgLy8gaW5saW5lIGV2ZXJ5IHNwZWNpZmllZCBzdHlsZVxuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBzdHlsZXMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSBzdHlsZXMuaXRlbShpZHgpO1xuXG4gICAgICAgICAgICBpZiAoc3R5bGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRhcmdldCwgc3R5bGVzW2lkeF0sIHN0eWxlc1tzdHlsZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW5zdXJlIHdlIGRvbnQgY2FwdHVyZSBhbnkgbW92ZSBldmVudHNcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGFyZ2V0LCAncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuXG4gICAgICAgIC8vIGRvIHRoZSBzYW1lIGZvciBhbGwgdGhlIGNoaWxkIGVsZW1lbnRzXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHNvdXJjZS5jaGlsZHJlbi5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICB0aGlzLmlubGluZVN0eWxlcyhzb3VyY2UuY2hpbGRyZW5baWR4XSwgdGFyZ2V0LmNoaWxkcmVuW2lkeF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFVuc3Vic2NyaWJlIGZyb20gYWxsIHN1YnNjcmlwdGlvbnMgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxufSJdfQ==