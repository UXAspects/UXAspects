/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Input, NgZone, Output, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { DragService } from './drag.service';
var DragDirective = /** @class */ (function () {
    function DragDirective(_elementRef, _ngZone, _renderer, _drag) {
        var _this = this;
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
        this._mousedown$.pipe(filter(function () { return _this.draggable; }), takeUntil(this._onDestroy)).subscribe(this.dragStart.bind(this));
        // emit the outputs when drag events occur
        _drag.onDragStart.pipe(takeUntil(this._onDestroy), filter(function () { return _this._isDragging; }))
            .subscribe(function (dragEvent) { return _this.onDragStart.emit(dragEvent.event); });
        _drag.onDrag.pipe(takeUntil(this._onDestroy), filter(function () { return _this._isDragging; }))
            .subscribe(function (dragEvent) { return _this.onDrag.emit(dragEvent.event); });
        _drag.onDragEnd.pipe(takeUntil(this._onDestroy), filter(function () { return _this._isDragging; }))
            .subscribe(function () { return _this.onDragEnd.emit(); });
        _drag.onDrop.pipe(takeUntil(this._onDestroy), filter(function () { return _this._isDragging; }))
            .subscribe(function (event) { return _this.onDrop.emit(event); });
        _drag.onDropEnter.pipe(takeUntil(this._onDestroy), filter(function () { return _this._isDragging; }))
            .subscribe(function () { return _this.onDropEnter.emit(); });
        _drag.onDropLeave.pipe(takeUntil(this._onDestroy), filter(function () { return _this._isDragging; }))
            .subscribe(function () { return _this.onDropLeave.emit(); });
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
        // store the dragging state
        this._isDragging = true;
        // emit the drag start event
        this._ngZone.run(function () { return _this._drag.onDragStart.next({ event: event, group: _this.group, data: _this.model }); });
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
        this._ngZone.run(function () { return _this._drag.onDrag.next({ event: event, group: _this.group, data: _this.model }); });
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
        // emit the on drag end output
        this._ngZone.run(function () { return _this._drag.onDragEnd.next({ group: _this.group, data: _this.model }); });
        // store the dragging state
        this._isDragging = false;
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
        var _a = this._elementRef.nativeElement.getBoundingClientRect(), top = _a.top, left = _a.left, width = _a.width;
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
                },] }
    ];
    /** @nocollapse */
    DragDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: Renderer2 },
        { type: DragService }
    ]; };
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
    return DragDirective;
}());
export { DragDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9kcmFnL2RyYWcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBYSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztJQTBEekMsdUJBQW9CLFdBQXVCLEVBQVUsT0FBZSxFQUFVLFNBQW9CLEVBQVUsS0FBa0I7UUFBOUgsaUJBdUJDO1FBdkJtQixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBYTs7OztxQkFsRHBHLEtBQUs7Ozs7eUJBU0QsSUFBSTs7OzsyQkFHVixJQUFJLFlBQVksRUFBYzs7OztzQkFHbkMsSUFBSSxZQUFZLEVBQWM7Ozs7eUJBRzNCLElBQUksWUFBWSxFQUFROzs7O3NCQUczQixJQUFJLFlBQVksRUFBTzs7OzsyQkFHbEIsSUFBSSxZQUFZLEVBQVE7Ozs7MkJBR3hCLElBQUksWUFBWSxFQUFROzs7OzJCQU1qQixLQUFLOzs7OzJCQU1kLFNBQVMsQ0FBYSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUM7Ozs7MkJBR2xFLFNBQVMsQ0FBYSxRQUFRLEVBQUUsV0FBVyxDQUFD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QixNQUFNO2dCQUFxQixTQUFTO2dCQUloRixXQUFXOzs7d0JBUWYsS0FBSzt3QkFHTCxLQUFLO3dCQUdMLEtBQUs7NEJBR0wsS0FBSzs4QkFHTCxNQUFNO3lCQUdOLE1BQU07NEJBR04sTUFBTTt5QkFHTixNQUFNOzhCQUdOLE1BQU07OEJBR04sTUFBTTs7d0JBdkNYOztTQVNhLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE5nWm9uZSwgT25EZXN0cm95LCBPdXRwdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2Zyb21FdmVudCc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgRHJhZ1NlcnZpY2UgfSBmcm9tICcuL2RyYWcuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4RHJhZ10nXG59KVxuZXhwb3J0IGNsYXNzIERyYWdEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIERldGVtaW5lIGlmIHdlIHNob3VsZCBzaG93IGEgY2xvbmUgd2hlbiBkcmFnZ2luZyAqL1xuICAgIEBJbnB1dCgpIGNsb25lOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogRGVmaW5lIHRoZSBncm91cCB0aGUgZHJhZyBldmVudCBiZWxvbmdzIHRvICovXG4gICAgQElucHV0KCkgZ3JvdXA6IHN0cmluZztcblxuICAgIC8qKiBBc3NvY2lhdGUgc29tZSBkYXRhIHdpdGggdGhlIGRyYWcgZXZlbnQgKi9cbiAgICBASW5wdXQoKSBtb2RlbDogYW55O1xuXG4gICAgLyoqIEFsbG93IHRoZSBkcmFnZ2luZyB0byBiZSBlbmFibGVkL2Rpc2FibGVkICovXG4gICAgQElucHV0KCkgZHJhZ2dhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBFbWl0IGFuIGV2ZW50IHdoZW4gZHJhZ2dpbmcgc3RhcnRzICovXG4gICAgQE91dHB1dCgpIG9uRHJhZ1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gICAgLyoqIEVtaXQgYW4gZXZlbnQgd2hlbiB0aGUgbW91c2UgbW92ZXMgd2hpbGUgZHJhZ2dpbmcgKi9cbiAgICBAT3V0cHV0KCkgb25EcmFnID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gICAgLyoqIEVtaXQgYW4gZXZlbnQgd2hlbiB0aGUgZHJhZ2dpbmcgZmluaXNoZXMgKi9cbiAgICBAT3V0cHV0KCkgb25EcmFnRW5kID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEVtaXQgd2hlbiB0aGUgdXNlciBkcm9wcyBhbiBpdGVtIGluIGEgZHJvcCBhcmVhICovXG4gICAgQE91dHB1dCgpIG9uRHJvcCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgLyoqIEVtaXQgd2hlbiB0aGUgdXNlciBkcmFncyBvdmVyIGEgZHJvcCBhcmVhICovXG4gICAgQE91dHB1dCgpIG9uRHJvcEVudGVyID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEVtaXQgd2hlbiB0aGUgdXNlciBkcmFncyBvdXQgb2YgYSBkcm9wIGFyZWEgKi9cbiAgICBAT3V0cHV0KCkgb25Ecm9wTGVhdmUgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKiogU3RvcmUgdGhlIGVsZW1lbnQgd2UgaGF2ZSBjbG9uZWQgKi9cbiAgICBwcml2YXRlIF9jbG9uZTogRWxlbWVudDtcblxuICAgIC8qKiBTdG9yZSB0aGUgZHJhZ2dpbmcgc3RhdGUgKi9cbiAgICBwcml2YXRlIF9pc0RyYWdnaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogU3RvcmUgdGhlIG1vdXNlIG9mZnNldCBmb3IgdGhlIGNsb25lZCBlbGVtZW50IHBvc2l0aW9uICovXG4gICAgcHJpdmF0ZSBfb2Zmc2V0OiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH07XG5cbiAgICAvKiogQ3JlYXRlIGFuIG9ic2VydmFibGUgZnJvbSB0aGUgbW91c2UgZG93biBldmVudCAqL1xuICAgIHByaXZhdGUgX21vdXNlZG93biQgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4odGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbW91c2Vkb3duJyk7XG5cbiAgICAvKiogQ3JlYXRlIGFuIG9ic2VydmFibGUgZnJvbSB0aGUgbW91c2UgbW92ZSBldmVudCAqL1xuICAgIHByaXZhdGUgX21vdXNlbW92ZSQgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4oZG9jdW1lbnQsICdtb3VzZW1vdmUnKTtcblxuICAgIC8qKiBDcmVhdGUgYW4gb2JzZXJ2YWJsZSBmcm9tIHRoZSBtb3VzZSB1cCBldmVudCAqL1xuICAgIHByaXZhdGUgX21vdXNldXAkID0gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KGRvY3VtZW50LCAnbW91c2V1cCcpO1xuXG4gICAgLyoqIFVzZSBhbiBvYnNlcnZhYmxlIHRvIHVuc3Vic2NyaWJlIGZyb20gYWxsIHN1YnNjcmlwdGlvbnMgKi9cbiAgICBwcm90ZWN0ZWQgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBfZHJhZzogRHJhZ1NlcnZpY2UpIHtcblxuICAgICAgICAvLyBlbnN1cmUgYWxsIG1vdXNlIGRvd24gZXZlbnRzIG9uIHRoZSBvYmplY3QgYXJlIGNhcHR1cmVkXG4gICAgICAgIHRoaXMuX21vdXNlZG93biQucGlwZShmaWx0ZXIoKCkgPT4gdGhpcy5kcmFnZ2FibGUpLCB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKHRoaXMuZHJhZ1N0YXJ0LmJpbmQodGhpcykpO1xuXG4gICAgICAgIC8vIGVtaXQgdGhlIG91dHB1dHMgd2hlbiBkcmFnIGV2ZW50cyBvY2N1clxuICAgICAgICBfZHJhZy5vbkRyYWdTdGFydC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBmaWx0ZXIoKCkgPT4gdGhpcy5faXNEcmFnZ2luZykpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGRyYWdFdmVudCA9PiB0aGlzLm9uRHJhZ1N0YXJ0LmVtaXQoZHJhZ0V2ZW50LmV2ZW50KSk7XG5cbiAgICAgICAgX2RyYWcub25EcmFnLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIGZpbHRlcigoKSA9PiB0aGlzLl9pc0RyYWdnaW5nKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZHJhZ0V2ZW50ID0+IHRoaXMub25EcmFnLmVtaXQoZHJhZ0V2ZW50LmV2ZW50KSk7XG5cbiAgICAgICAgX2RyYWcub25EcmFnRW5kLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIGZpbHRlcigoKSA9PiB0aGlzLl9pc0RyYWdnaW5nKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vbkRyYWdFbmQuZW1pdCgpKTtcblxuICAgICAgICBfZHJhZy5vbkRyb3AucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgZmlsdGVyKCgpID0+IHRoaXMuX2lzRHJhZ2dpbmcpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShldmVudCA9PiB0aGlzLm9uRHJvcC5lbWl0KGV2ZW50KSk7XG5cbiAgICAgICAgX2RyYWcub25Ecm9wRW50ZXIucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgZmlsdGVyKCgpID0+IHRoaXMuX2lzRHJhZ2dpbmcpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLm9uRHJvcEVudGVyLmVtaXQoKSk7XG5cbiAgICAgICAgX2RyYWcub25Ecm9wTGVhdmUucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgZmlsdGVyKCgpID0+IHRoaXMuX2lzRHJhZ2dpbmcpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLm9uRHJvcExlYXZlLmVtaXQoKSk7XG4gICAgfVxuXG4gICAgLyoqIEVtaXQgZXZlbnRzIGFuZCBjcmVhdGUgY2xvbmUgd2hlbiBkcmFnIHN0YXJ0cyAqL1xuICAgIGRyYWdTdGFydChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmNsb25lKSB7XG4gICAgICAgICAgICAvLyBjbG9uZSB0aGUgbm9kZVxuICAgICAgICAgICAgdGhpcy5jbG9uZU5vZGUoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXBwbHkgYSBjbGFzcyB0byB0aGUgZWxlbWVudCBiZWluZyBkcmFnZ2VkXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3V4LWRyYWctZHJhZ2dpbmcnKTtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgZHJhZ2dpbmcgc3RhdGVcbiAgICAgICAgdGhpcy5faXNEcmFnZ2luZyA9IHRydWU7XG5cbiAgICAgICAgLy8gZW1pdCB0aGUgZHJhZyBzdGFydCBldmVudFxuICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHRoaXMuX2RyYWcub25EcmFnU3RhcnQubmV4dCh7IGV2ZW50LCBncm91cDogdGhpcy5ncm91cCwgZGF0YTogdGhpcy5tb2RlbCB9KSk7XG5cbiAgICAgICAgdGhpcy5fbW91c2Vtb3ZlJC5waXBlKHRha2VVbnRpbCh0aGlzLl9tb3VzZXVwJCksIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSh0aGlzLmRyYWdNb3ZlLmJpbmQodGhpcyksIG51bGwsIHRoaXMuZHJhZ0VuZC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICAvKiogRW1pdCBldmVudCBhbmQgdXBkYXRlIGNsb25lIHBvc2l0aW9uIHdoZW4gZHJhZ2dpbmcgbW92ZXMgKi9cbiAgICBkcmFnTW92ZShldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9jbG9uZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVOb2RlUG9zaXRpb24oZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW1pdCB0aGUgZHJhZyBzdGFydCBldmVudFxuICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHRoaXMuX2RyYWcub25EcmFnLm5leHQoeyBldmVudCwgZ3JvdXA6IHRoaXMuZ3JvdXAsIGRhdGE6IHRoaXMubW9kZWwgfSkpO1xuICAgIH1cblxuICAgIC8qKiBFbWl0IGV2ZW50IGFuZCBkZXN0cm95IGNsb25lIHdoZW4gZHJhZ2dpbmcgZW5kcyAqL1xuICAgIGRyYWdFbmQoKTogdm9pZCB7XG4gICAgICAgIC8vIGlmIHRoZXJlIHdhcyBhIGNsb25lLCByZW1vdmUgaXRcbiAgICAgICAgaWYgKHRoaXMuX2Nsb25lKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDaGlsZChkb2N1bWVudC5ib2R5LCB0aGlzLl9jbG9uZSk7XG4gICAgICAgICAgICB0aGlzLl9jbG9uZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgdGhlIGRyYWdnaW5nIGNsYXNzXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3V4LWRyYWctZHJhZ2dpbmcnKTtcblxuICAgICAgICAvLyBlbWl0IHRoZSBvbiBkcmFnIGVuZCBvdXRwdXRcbiAgICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB0aGlzLl9kcmFnLm9uRHJhZ0VuZC5uZXh0KHsgZ3JvdXA6IHRoaXMuZ3JvdXAsIGRhdGE6IHRoaXMubW9kZWwgfSkpO1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBkcmFnZ2luZyBzdGF0ZVxuICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqIENyZWF0ZSBhbiBleGFjdCBjbG9uZSBvZiBhbiBlbGVtZW50ICovXG4gICAgY2xvbmVOb2RlKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gZHVwbGljYXRlIHRoZSBub2RlXG4gICAgICAgIHRoaXMuX2Nsb25lID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsb25lTm9kZSh0cnVlKTtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgcG9zaXRpb24gd2l0aGluIHRoZSBkcmFnZ2FibGUgZWxlbWVudFxuICAgICAgICBjb25zdCB7IHRvcCwgbGVmdCwgd2lkdGggfSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdGhpcy5fb2Zmc2V0ID0geyB4OiBldmVudC5jbGllbnRYIC0gbGVmdCwgeTogZXZlbnQuY2xpZW50WSAtIHRvcCB9O1xuXG4gICAgICAgIC8vIGlubGluZSBhbGwgc3R5bGVzIHNvIGl0IGxvb2tzIGlkZW50aWNhbCByZWdhcmRsZXNzIG9mIGl0cyBwb3NpdGlvbiBpbiB0aGUgRE9NXG4gICAgICAgIHRoaXMuaW5saW5lU3R5bGVzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fY2xvbmUpO1xuXG4gICAgICAgIC8vIElFIGRvZXNuJ3QgYWx3YXlzIGNhbGN1bGF0ZSB0aGUgY29ycmVjdCB3aWR0aCB2YWx1ZSB1c2luZyBnZXRDb21wdXRlZFN0eWxlcy4uLiB1c2UgYm91bmRpbmcgY2xpZW50IHZhbHVlIGluc3RlYWRcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fY2xvbmUsICd3aWR0aCcsIHdpZHRoICsgJ3B4Jyk7XG5cbiAgICAgICAgLy8gZW5zdXJlIHdlIGNhbiBlYXNpbHkgcG9zaXRpb24gdGhlIG5vZGUgYW4gaXQgaXMgYWJvdmUgYWxsIG90aGVyIGVsZW1lbnRzXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLl9jbG9uZSwgJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fY2xvbmUsICdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jbG9uZSwgJ3otaW5kZXgnLCAnOTk5OTknKTtcblxuICAgICAgICAvLyBhcHBseSBhIGNsYXNzIHRvIGFsbG93IGN1c3RvbSBzdHlsaW5nXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2Nsb25lLCAndXgtZHJhZy1kcmFnZ2luZy1jbG9uZScpO1xuXG4gICAgICAgIC8vIGluc2VydCB0aGUgY2xvbmVkIGVsZW1lbnRcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuYm9keSwgdGhpcy5fY2xvbmUpO1xuXG4gICAgICAgIC8vIHNldCB0aGUgY2xvbmVkIGVsZW1lbnQgaW5pdGlhbCBwb3NpdGlvblxuICAgICAgICB0aGlzLnVwZGF0ZU5vZGVQb3NpdGlvbihldmVudCk7XG4gICAgfVxuXG4gICAgLyoqIFBvc2l0aW9uIHRoZSBjbG9uZSByZWxhdGl2ZSB0byB0aGUgbW91c2UgKi9cbiAgICB1cGRhdGVOb2RlUG9zaXRpb24oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fY2xvbmUsICdsZWZ0JywgKGV2ZW50LnBhZ2VYIC0gdGhpcy5fb2Zmc2V0LngpICsgJ3B4Jyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2Nsb25lLCAndG9wJywgKGV2ZW50LnBhZ2VZIC0gdGhpcy5fb2Zmc2V0LnkpICsgJ3B4Jyk7XG4gICAgfVxuXG4gICAgLyoqIElubGluZSBhbGwgc3R5bGVzIHRvIGVuc3VyZSBzdHlsaW5nIGlzIGNvbnNpc3RlbnQgcmVnYXJkbGVzcyBvZiBpdHMgcG9zaXRpb24gaW4gdGhlIGRvbSAqL1xuICAgIGlubGluZVN0eWxlcyhzb3VyY2U6IEVsZW1lbnQsIHRhcmdldDogRWxlbWVudCk6IHZvaWQge1xuICAgICAgICAvLyBnZXQgYWxsIHRoZSBjb21wdXRlZCBzdHlsZXMgZnJvbSB0aGUgc291cmNlIGVsZW1lbnRcbiAgICAgICAgY29uc3Qgc3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShzb3VyY2UpO1xuXG4gICAgICAgIC8vIGlubGluZSBldmVyeSBzcGVjaWZpZWQgc3R5bGVcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgc3R5bGVzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gc3R5bGVzLml0ZW0oaWR4KTtcblxuICAgICAgICAgICAgaWYgKHN0eWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0YXJnZXQsIHN0eWxlc1tpZHhdLCBzdHlsZXNbc3R5bGVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVuc3VyZSB3ZSBkb250IGNhcHR1cmUgYW55IG1vdmUgZXZlbnRzXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRhcmdldCwgJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcblxuICAgICAgICAvLyBkbyB0aGUgc2FtZSBmb3IgYWxsIHRoZSBjaGlsZCBlbGVtZW50c1xuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBzb3VyY2UuY2hpbGRyZW4ubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgdGhpcy5pbmxpbmVTdHlsZXMoc291cmNlLmNoaWxkcmVuW2lkeF0sIHRhcmdldC5jaGlsZHJlbltpZHhdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBVbnN1YnNjcmliZSBmcm9tIGFsbCBzdWJzY3JpcHRpb25zICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cbn0iXX0=