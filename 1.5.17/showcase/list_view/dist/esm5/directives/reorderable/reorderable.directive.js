/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ContentChildren, Directive, ElementRef, EventEmitter, HostBinding, Input, Output, QueryList, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ReorderableHandleDirective } from './reorderable-handle.directive';
import { ReorderableModelDirective } from './reorderable-model.directive';
import { ReorderableService } from './reorderable.service';
var ReorderableDirective = (function () {
    function ReorderableDirective(_elementRef, _renderer, _service) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._service = _service;
        this.reorderingDisabled = false;
        this.reorderableModelChange = new EventEmitter();
        this.reorderStart = new EventEmitter();
        this.reorderCancel = new EventEmitter();
        this.reorderEnd = new EventEmitter();
        this.dragging = false;
        this._subscriptions = new Subscription();
    }
    /**
     * Initialise dragula and bind to all the required events
     */
    /**
     * Initialise dragula and bind to all the required events
     * @return {?}
     */
    ReorderableDirective.prototype.ngOnInit = /**
     * Initialise dragula and bind to all the required events
     * @return {?}
     */
    function () {
        var _this = this;
        // If no group name then generate a unique one for this instance only
        if (!this.reorderableGroup) {
            this.reorderableGroup = this._service.getUniqueGroupName();
        }
        this._container = {
            element: this._elementRef.nativeElement,
            getModelFromElement: this.getModelFromElement.bind(this),
            canMove: this.canMove.bind(this)
        };
        // Register for drag events on this element
        var /** @type {?} */ group = this._service.register(this.reorderableGroup, this._container);
        this._subscriptions.add(group.drag.subscribe(this.onDrag.bind(this)));
        this._subscriptions.add(group.dragEnd.subscribe(this.onDragEnd.bind(this)));
        this._subscriptions.add(group.drop.subscribe(this.onDrop.bind(this)));
        this._subscriptions.add(group.cancel.subscribe(function (event) { return _this.reorderCancel.emit({ element: event.element, model: event.model }); }));
        this._subscriptions.add(group.cloned.subscribe(this.onClone.bind(this)));
    };
    /**
     * @return {?}
     */
    ReorderableDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this._service.initialize(this.reorderableGroup);
    };
    /**
     * We need to destroy the dragula instance on component destroy
     */
    /**
     * We need to destroy the dragula instance on component destroy
     * @return {?}
     */
    ReorderableDirective.prototype.ngOnDestroy = /**
     * We need to destroy the dragula instance on component destroy
     * @return {?}
     */
    function () {
        this._service.unregister(this.reorderableGroup, this._container);
        this._subscriptions.unsubscribe();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ReorderableDirective.prototype.onDrag = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.dragging = true;
        this.reorderStart.emit({ element: event.element, model: event.model });
    };
    /**
     * This is fired when items get reordered - we need to emit the new order of the models
     */
    /**
     * This is fired when items get reordered - we need to emit the new order of the models
     * @param {?} event
     * @return {?}
     */
    ReorderableDirective.prototype.onDrop = /**
     * This is fired when items get reordered - we need to emit the new order of the models
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // if there is no provided module we can skip this
        if (!this.reorderableModel) {
            return;
        }
        var /** @type {?} */ changed = false;
        if (event.source.isSameNode(this._elementRef.nativeElement)) {
            // remove this model from the list of models
            var /** @type {?} */ index = this.reorderableModel.indexOf(event.model);
            if (index >= 0) {
                this.reorderableModel.splice(index, 1);
                changed = true;
            }
        }
        if (event.target.isSameNode(this._elementRef.nativeElement)) {
            // get the position of sibling element
            var /** @type {?} */ index = event.sibling && !event.sibling.classList.contains('gu-mirror') ?
                this.reorderableModel.indexOf(this.getModelFromElement(event.sibling)) :
                this.reorderableModel.length;
            // insert the model at its new location
            this.reorderableModel.splice(index, 0, event.model);
            changed = true;
        }
        // Emit event if any changes were made
        if (changed) {
            this.reorderableModelChange.emit(this.reorderableModel);
        }
    };
    /**
     * Return the model assciated with a particular element in the list.
     * This should ensure that the items have the draggable model directive applied
     */
    /**
     * Return the model assciated with a particular element in the list.
     * This should ensure that the items have the draggable model directive applied
     * @param {?} element
     * @return {?}
     */
    ReorderableDirective.prototype.getModelFromElement = /**
     * Return the model assciated with a particular element in the list.
     * This should ensure that the items have the draggable model directive applied
     * @param {?} element
     * @return {?}
     */
    function (element) {
        var /** @type {?} */ model = this.models.find(function (_model) { return _model.elementRef.nativeElement === element; });
        if (!model) {
            return null;
        }
        return model.uxReorderableModel;
    };
    /**
     * When we finish dragging remove the utillity class from the element being moved
     */
    /**
     * When we finish dragging remove the utillity class from the element being moved
     * @param {?} event
     * @return {?}
     */
    ReorderableDirective.prototype.onDragEnd = /**
     * When we finish dragging remove the utillity class from the element being moved
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.dragging = false;
        if (this._elementRef.nativeElement.contains(event.element)) {
            this._renderer.removeClass(event.element, 'ux-reorderable-moving');
            this.reorderEnd.emit({
                element: event.element,
                model: event.model
            });
        }
    };
    /**
     * We want to ensure that the cloned element is identical
     * to the original, regardless of it's location in the DOM tree
     */
    /**
     * We want to ensure that the cloned element is identical
     * to the original, regardless of it's location in the DOM tree
     * @param {?} event
     * @return {?}
     */
    ReorderableDirective.prototype.onClone = /**
     * We want to ensure that the cloned element is identical
     * to the original, regardless of it's location in the DOM tree
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this._elementRef.nativeElement.contains(event.element)) {
            this.setTableCellWidths(event.element, event.clone);
            this.captureCanvases(event.element, event.clone);
            this._renderer.addClass(event.element, 'ux-reorderable-moving');
        }
    };
    /**
     * If elements contain handles then only drag when the handle is dragged
     * otherwise drag whenever an immediate child is specified
     */
    /**
     * If elements contain handles then only drag when the handle is dragged
     * otherwise drag whenever an immediate child is specified
     * @param {?} element
     * @param {?} container
     * @param {?} handle
     * @return {?}
     */
    ReorderableDirective.prototype.canMove = /**
     * If elements contain handles then only drag when the handle is dragged
     * otherwise drag whenever an immediate child is specified
     * @param {?} element
     * @param {?} container
     * @param {?} handle
     * @return {?}
     */
    function (element, container, handle) {
        if (this.reorderingDisabled) {
            return false;
        }
        return this.handles.length === 0 ? true : !!this.handles.find(function (_handle) { return _handle.nativeElement === handle; });
    };
    /**
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    ReorderableDirective.prototype.setTableCellWidths = /**
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    function (source, target) {
        // if it is not a table row then skip this
        if (source.tagName !== 'TR') {
            return;
        }
        // find any immediate td children and fix their width
        var /** @type {?} */ sourceCells = /** @type {?} */ (Array.from(source.children));
        var /** @type {?} */ targetCells = /** @type {?} */ (Array.from(target.children));
        // fix the width of these cells
        sourceCells.forEach(function (cell, idx) { return targetCells[idx].style.minWidth = getComputedStyle(cell).getPropertyValue('width'); });
    };
    /**
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    ReorderableDirective.prototype.captureCanvases = /**
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    function (source, target) {
        // find all child canvas elements
        var /** @type {?} */ sourceCanvases = Array.from(source.querySelectorAll('canvas'));
        var /** @type {?} */ targetCanvases = Array.from(target.querySelectorAll('canvas'));
        // replicate the canvas content
        targetCanvases.map(function (canvas) { return canvas.getContext('2d'); })
            .forEach(function (context, idx) { return context.drawImage(sourceCanvases[idx], 0, 0); });
    };
    ReorderableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxReorderable]'
                },] },
    ];
    /** @nocollapse */
    ReorderableDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
        { type: ReorderableService, },
    ]; };
    ReorderableDirective.propDecorators = {
        "reorderableModel": [{ type: Input },],
        "reorderableGroup": [{ type: Input },],
        "reorderingDisabled": [{ type: Input },],
        "reorderableModelChange": [{ type: Output },],
        "reorderStart": [{ type: Output },],
        "reorderCancel": [{ type: Output },],
        "reorderEnd": [{ type: Output },],
        "handles": [{ type: ContentChildren, args: [ReorderableHandleDirective, { read: ElementRef, descendants: true },] },],
        "models": [{ type: ContentChildren, args: [ReorderableModelDirective,] },],
        "dragging": [{ type: HostBinding, args: ['class.ux-reorderable-container-moving',] },],
    };
    return ReorderableDirective;
}());
export { ReorderableDirective };
function ReorderableDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ReorderableDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ReorderableDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ReorderableDirective.propDecorators;
    /** @type {?} */
    ReorderableDirective.prototype.reorderableModel;
    /** @type {?} */
    ReorderableDirective.prototype.reorderableGroup;
    /** @type {?} */
    ReorderableDirective.prototype.reorderingDisabled;
    /** @type {?} */
    ReorderableDirective.prototype.reorderableModelChange;
    /** @type {?} */
    ReorderableDirective.prototype.reorderStart;
    /** @type {?} */
    ReorderableDirective.prototype.reorderCancel;
    /** @type {?} */
    ReorderableDirective.prototype.reorderEnd;
    /** @type {?} */
    ReorderableDirective.prototype.handles;
    /** @type {?} */
    ReorderableDirective.prototype.models;
    /** @type {?} */
    ReorderableDirective.prototype._container;
    /** @type {?} */
    ReorderableDirective.prototype.dragging;
    /** @type {?} */
    ReorderableDirective.prototype._subscriptions;
    /** @type {?} */
    ReorderableDirective.prototype._elementRef;
    /** @type {?} */
    ReorderableDirective.prototype._renderer;
    /** @type {?} */
    ReorderableDirective.prototype._service;
}
/**
 * @record
 */
export function ReorderEvent() { }
function ReorderEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    ReorderEvent.prototype.element;
    /** @type {?} */
    ReorderEvent.prototype.model;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVvcmRlcmFibGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvcmVvcmRlcmFibGUvcmVvcmRlcmFibGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLGVBQWUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6SyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDMUUsT0FBTyxFQUE2SSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztJQXdCbE0sOEJBQ1ksYUFDQSxXQUNBO1FBRkEsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsY0FBUyxHQUFULFNBQVM7UUFDVCxhQUFRLEdBQVIsUUFBUTtrQ0FsQm1CLEtBQUs7c0NBQ1QsSUFBSSxZQUFZLEVBQWM7NEJBQ3hDLElBQUksWUFBWSxFQUFnQjs2QkFDL0IsSUFBSSxZQUFZLEVBQWdCOzBCQUNuQyxJQUFJLFlBQVksRUFBZ0I7d0JBT1UsS0FBSzs4QkFFN0MsSUFBSSxZQUFZLEVBQUU7S0FNdEM7SUFFTDs7T0FFRzs7Ozs7SUFDSCx1Q0FBUTs7OztJQUFSO1FBQUEsaUJBb0JDOztRQWpCRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUM5RDtRQUVELElBQUksQ0FBQyxV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OztRQUdyRSxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQzthQUNoRCxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsR0FBRyxJQUFLLE9BQUEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUE1QyxDQUE0QyxDQUFDLENBQUM7OztnQkFsTXBGLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2lCQUM5Qjs7OztnQkFSbUQsVUFBVTtnQkFBMEUsU0FBUztnQkFJRyxrQkFBa0I7OztxQ0FPakssS0FBSztxQ0FDTCxLQUFLO3VDQUNMLEtBQUs7MkNBQ0wsTUFBTTtpQ0FDTixNQUFNO2tDQUNOLE1BQU07K0JBQ04sTUFBTTs0QkFFTixlQUFlLFNBQUMsMEJBQTBCLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7MkJBQ25GLGVBQWUsU0FBQyx5QkFBeUI7NkJBSXpDLFdBQVcsU0FBQyx1Q0FBdUM7OytCQXhCeEQ7O1NBU2Esb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBRdWVyeUxpc3QsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgUmVvcmRlcmFibGVIYW5kbGVEaXJlY3RpdmUgfSBmcm9tICcuL3Jlb3JkZXJhYmxlLWhhbmRsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUmVvcmRlcmFibGVNb2RlbERpcmVjdGl2ZSB9IGZyb20gJy4vcmVvcmRlcmFibGUtbW9kZWwuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJlb3JkZXJhYmxlQ2FuY2VsRXZlbnQsIFJlb3JkZXJhYmxlQ2xvbmVkRXZlbnQsIFJlb3JkZXJhYmxlQ29udGFpbmVyLCBSZW9yZGVyYWJsZURyYWdFbmRFdmVudCwgUmVvcmRlcmFibGVEcmFnRXZlbnQsIFJlb3JkZXJhYmxlRHJvcEV2ZW50LCBSZW9yZGVyYWJsZVNlcnZpY2UgfSBmcm9tICcuL3Jlb3JkZXJhYmxlLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eFJlb3JkZXJhYmxlXSdcbn0pXG5leHBvcnQgY2xhc3MgUmVvcmRlcmFibGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSByZW9yZGVyYWJsZU1vZGVsOiBBcnJheTxhbnk+O1xuICAgIEBJbnB1dCgpIHJlb3JkZXJhYmxlR3JvdXA6IHN0cmluZztcbiAgICBASW5wdXQoKSByZW9yZGVyaW5nRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBAT3V0cHV0KCkgcmVvcmRlcmFibGVNb2RlbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8YW55Pj4oKTtcbiAgICBAT3V0cHV0KCkgcmVvcmRlclN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxSZW9yZGVyRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHJlb3JkZXJDYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyPFJlb3JkZXJFdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgcmVvcmRlckVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8UmVvcmRlckV2ZW50PigpO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihSZW9yZGVyYWJsZUhhbmRsZURpcmVjdGl2ZSwgeyByZWFkOiBFbGVtZW50UmVmLCBkZXNjZW5kYW50czogdHJ1ZSB9KSBoYW5kbGVzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG4gICAgQENvbnRlbnRDaGlsZHJlbihSZW9yZGVyYWJsZU1vZGVsRGlyZWN0aXZlKSBtb2RlbHM6IFF1ZXJ5TGlzdDxSZW9yZGVyYWJsZU1vZGVsRGlyZWN0aXZlPjtcblxuICAgIHByaXZhdGUgX2NvbnRhaW5lcjogUmVvcmRlcmFibGVDb250YWluZXI7XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLnV4LXJlb3JkZXJhYmxlLWNvbnRhaW5lci1tb3ZpbmcnKSBkcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBwcml2YXRlIF9zZXJ2aWNlOiBSZW9yZGVyYWJsZVNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGlzZSBkcmFndWxhIGFuZCBiaW5kIHRvIGFsbCB0aGUgcmVxdWlyZWQgZXZlbnRzXG4gICAgICovXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gSWYgbm8gZ3JvdXAgbmFtZSB0aGVuIGdlbmVyYXRlIGEgdW5pcXVlIG9uZSBmb3IgdGhpcyBpbnN0YW5jZSBvbmx5XG4gICAgICAgIGlmICghdGhpcy5yZW9yZGVyYWJsZUdyb3VwKSB7XG4gICAgICAgICAgICB0aGlzLnJlb3JkZXJhYmxlR3JvdXAgPSB0aGlzLl9zZXJ2aWNlLmdldFVuaXF1ZUdyb3VwTmFtZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY29udGFpbmVyID0ge1xuICAgICAgICAgICAgZWxlbWVudDogdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgZ2V0TW9kZWxGcm9tRWxlbWVudDogdGhpcy5nZXRNb2RlbEZyb21FbGVtZW50LmJpbmQodGhpcyksXG4gICAgICAgICAgICBjYW5Nb3ZlOiB0aGlzLmNhbk1vdmUuYmluZCh0aGlzKVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFJlZ2lzdGVyIGZvciBkcmFnIGV2ZW50cyBvbiB0aGlzIGVsZW1lbnRcbiAgICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLl9zZXJ2aWNlLnJlZ2lzdGVyKHRoaXMucmVvcmRlcmFibGVHcm91cCwgdGhpcy5fY29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5hZGQoZ3JvdXAuZHJhZy5zdWJzY3JpYmUodGhpcy5vbkRyYWcuYmluZCh0aGlzKSkpO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZChncm91cC5kcmFnRW5kLnN1YnNjcmliZSh0aGlzLm9uRHJhZ0VuZC5iaW5kKHRoaXMpKSk7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuYWRkKGdyb3VwLmRyb3Auc3Vic2NyaWJlKHRoaXMub25Ecm9wLmJpbmQodGhpcykpKTtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5hZGQoZ3JvdXAuY2FuY2VsLnN1YnNjcmliZSgoZXZlbnQ6IFJlb3JkZXJhYmxlQ2FuY2VsRXZlbnQpID0+IHRoaXMucmVvcmRlckNhbmNlbC5lbWl0KHsgZWxlbWVudDogZXZlbnQuZWxlbWVudCwgbW9kZWw6IGV2ZW50Lm1vZGVsIH0pKSk7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuYWRkKGdyb3VwLmNsb25lZC5zdWJzY3JpYmUodGhpcy5vbkNsb25lLmJpbmQodGhpcykpKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuaW5pdGlhbGl6ZSh0aGlzLnJlb3JkZXJhYmxlR3JvdXApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdlIG5lZWQgdG8gZGVzdHJveSB0aGUgZHJhZ3VsYSBpbnN0YW5jZSBvbiBjb21wb25lbnQgZGVzdHJveVxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zZXJ2aWNlLnVucmVnaXN0ZXIodGhpcy5yZW9yZGVyYWJsZUdyb3VwLCB0aGlzLl9jb250YWluZXIpO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgb25EcmFnKGV2ZW50OiBSZW9yZGVyYWJsZURyYWdFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMucmVvcmRlclN0YXJ0LmVtaXQoeyBlbGVtZW50OiBldmVudC5lbGVtZW50LCBtb2RlbDogZXZlbnQubW9kZWwgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBmaXJlZCB3aGVuIGl0ZW1zIGdldCByZW9yZGVyZWQgLSB3ZSBuZWVkIHRvIGVtaXQgdGhlIG5ldyBvcmRlciBvZiB0aGUgbW9kZWxzXG4gICAgICovXG4gICAgb25Ecm9wKGV2ZW50OiBSZW9yZGVyYWJsZURyb3BFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIHByb3ZpZGVkIG1vZHVsZSB3ZSBjYW4gc2tpcCB0aGlzXG4gICAgICAgIGlmICghdGhpcy5yZW9yZGVyYWJsZU1vZGVsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChldmVudC5zb3VyY2UuaXNTYW1lTm9kZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpKSB7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGlzIG1vZGVsIGZyb20gdGhlIGxpc3Qgb2YgbW9kZWxzXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMucmVvcmRlcmFibGVNb2RlbC5pbmRleE9mKGV2ZW50Lm1vZGVsKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW9yZGVyYWJsZU1vZGVsLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlzU2FtZU5vZGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSkge1xuXG4gICAgICAgICAgICAvLyBnZXQgdGhlIHBvc2l0aW9uIG9mIHNpYmxpbmcgZWxlbWVudFxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBldmVudC5zaWJsaW5nICYmICFldmVudC5zaWJsaW5nLmNsYXNzTGlzdC5jb250YWlucygnZ3UtbWlycm9yJykgP1xuICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlcmFibGVNb2RlbC5pbmRleE9mKHRoaXMuZ2V0TW9kZWxGcm9tRWxlbWVudChldmVudC5zaWJsaW5nKSkgOlxuICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlcmFibGVNb2RlbC5sZW5ndGg7XG5cbiAgICAgICAgICAgIC8vIGluc2VydCB0aGUgbW9kZWwgYXQgaXRzIG5ldyBsb2NhdGlvblxuICAgICAgICAgICAgdGhpcy5yZW9yZGVyYWJsZU1vZGVsLnNwbGljZShpbmRleCwgMCwgZXZlbnQubW9kZWwpO1xuICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbWl0IGV2ZW50IGlmIGFueSBjaGFuZ2VzIHdlcmUgbWFkZVxuICAgICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5yZW9yZGVyYWJsZU1vZGVsQ2hhbmdlLmVtaXQodGhpcy5yZW9yZGVyYWJsZU1vZGVsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgbW9kZWwgYXNzY2lhdGVkIHdpdGggYSBwYXJ0aWN1bGFyIGVsZW1lbnQgaW4gdGhlIGxpc3QuXG4gICAgICogVGhpcyBzaG91bGQgZW5zdXJlIHRoYXQgdGhlIGl0ZW1zIGhhdmUgdGhlIGRyYWdnYWJsZSBtb2RlbCBkaXJlY3RpdmUgYXBwbGllZFxuICAgICAqL1xuICAgIGdldE1vZGVsRnJvbUVsZW1lbnQoZWxlbWVudDogRWxlbWVudCk6IGFueSB7XG5cbiAgICAgICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVscy5maW5kKF9tb2RlbCA9PiBfbW9kZWwuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50ID09PSBlbGVtZW50KTtcblxuICAgICAgICBpZiAoIW1vZGVsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtb2RlbC51eFJlb3JkZXJhYmxlTW9kZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiB3ZSBmaW5pc2ggZHJhZ2dpbmcgcmVtb3ZlIHRoZSB1dGlsbGl0eSBjbGFzcyBmcm9tIHRoZSBlbGVtZW50IGJlaW5nIG1vdmVkXG4gICAgICovXG4gICAgb25EcmFnRW5kKGV2ZW50OiBSZW9yZGVyYWJsZURyYWdFbmRFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LmVsZW1lbnQpKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKGV2ZW50LmVsZW1lbnQsICd1eC1yZW9yZGVyYWJsZS1tb3ZpbmcnKTtcblxuICAgICAgICAgICAgdGhpcy5yZW9yZGVyRW5kLmVtaXQoe1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGV2ZW50LmVsZW1lbnQsXG4gICAgICAgICAgICAgICAgbW9kZWw6IGV2ZW50Lm1vZGVsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdlIHdhbnQgdG8gZW5zdXJlIHRoYXQgdGhlIGNsb25lZCBlbGVtZW50IGlzIGlkZW50aWNhbFxuICAgICAqIHRvIHRoZSBvcmlnaW5hbCwgcmVnYXJkbGVzcyBvZiBpdCdzIGxvY2F0aW9uIGluIHRoZSBET00gdHJlZVxuICAgICAqL1xuICAgIG9uQ2xvbmUoZXZlbnQ6IFJlb3JkZXJhYmxlQ2xvbmVkRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICBpZiAodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LmVsZW1lbnQpKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0VGFibGVDZWxsV2lkdGhzKGV2ZW50LmVsZW1lbnQsIGV2ZW50LmNsb25lKTtcbiAgICAgICAgICAgIHRoaXMuY2FwdHVyZUNhbnZhc2VzKGV2ZW50LmVsZW1lbnQsIGV2ZW50LmNsb25lKTtcblxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MoZXZlbnQuZWxlbWVudCwgJ3V4LXJlb3JkZXJhYmxlLW1vdmluZycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgZWxlbWVudHMgY29udGFpbiBoYW5kbGVzIHRoZW4gb25seSBkcmFnIHdoZW4gdGhlIGhhbmRsZSBpcyBkcmFnZ2VkXG4gICAgICogb3RoZXJ3aXNlIGRyYWcgd2hlbmV2ZXIgYW4gaW1tZWRpYXRlIGNoaWxkIGlzIHNwZWNpZmllZFxuICAgICAqL1xuICAgIGNhbk1vdmUoZWxlbWVudDogRWxlbWVudCwgY29udGFpbmVyOiBFbGVtZW50LCBoYW5kbGU6IEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMucmVvcmRlcmluZ0Rpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlcy5sZW5ndGggPT09IDAgPyB0cnVlIDogISF0aGlzLmhhbmRsZXMuZmluZChfaGFuZGxlID0+IF9oYW5kbGUubmF0aXZlRWxlbWVudCA9PT0gaGFuZGxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFRhYmxlQ2VsbFdpZHRocyhzb3VyY2U6IEVsZW1lbnQsIHRhcmdldDogRWxlbWVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGlmIGl0IGlzIG5vdCBhIHRhYmxlIHJvdyB0aGVuIHNraXAgdGhpc1xuICAgICAgICBpZiAoc291cmNlLnRhZ05hbWUgIT09ICdUUicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpbmQgYW55IGltbWVkaWF0ZSB0ZCBjaGlsZHJlbiBhbmQgZml4IHRoZWlyIHdpZHRoXG4gICAgICAgIGNvbnN0IHNvdXJjZUNlbGxzID0gQXJyYXkuZnJvbShzb3VyY2UuY2hpbGRyZW4pIGFzIEhUTUxUYWJsZUNlbGxFbGVtZW50W107XG4gICAgICAgIGNvbnN0IHRhcmdldENlbGxzID0gQXJyYXkuZnJvbSh0YXJnZXQuY2hpbGRyZW4pIGFzIEhUTUxUYWJsZUNlbGxFbGVtZW50W107XG5cbiAgICAgICAgLy8gZml4IHRoZSB3aWR0aCBvZiB0aGVzZSBjZWxsc1xuICAgICAgICBzb3VyY2VDZWxscy5mb3JFYWNoKChjZWxsLCBpZHgpID0+IHRhcmdldENlbGxzW2lkeF0uc3R5bGUubWluV2lkdGggPSBnZXRDb21wdXRlZFN0eWxlKGNlbGwpLmdldFByb3BlcnR5VmFsdWUoJ3dpZHRoJykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FwdHVyZUNhbnZhc2VzKHNvdXJjZTogRWxlbWVudCwgdGFyZ2V0OiBFbGVtZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gZmluZCBhbGwgY2hpbGQgY2FudmFzIGVsZW1lbnRzXG4gICAgICAgIGNvbnN0IHNvdXJjZUNhbnZhc2VzID0gQXJyYXkuZnJvbShzb3VyY2UucXVlcnlTZWxlY3RvckFsbCgnY2FudmFzJykpO1xuICAgICAgICBjb25zdCB0YXJnZXRDYW52YXNlcyA9IEFycmF5LmZyb20odGFyZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2NhbnZhcycpKTtcblxuICAgICAgICAvLyByZXBsaWNhdGUgdGhlIGNhbnZhcyBjb250ZW50XG4gICAgICAgIHRhcmdldENhbnZhc2VzLm1hcChjYW52YXMgPT4gY2FudmFzLmdldENvbnRleHQoJzJkJykpXG4gICAgICAgICAgICAuZm9yRWFjaCgoY29udGV4dCwgaWR4KSA9PiBjb250ZXh0LmRyYXdJbWFnZShzb3VyY2VDYW52YXNlc1tpZHhdLCAwLCAwKSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZW9yZGVyRXZlbnQge1xuICAgIGVsZW1lbnQ6IEVsZW1lbnQ7XG4gICAgbW9kZWw6IGFueTtcbn1cbiJdfQ==