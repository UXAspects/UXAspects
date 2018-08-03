/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ContentChildren, Directive, ElementRef, EventEmitter, HostBinding, Input, Output, QueryList, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ReorderableHandleDirective } from './reorderable-handle.directive';
import { ReorderableModelDirective } from './reorderable-model.directive';
import { ReorderableService } from './reorderable.service';
var ReorderableDirective = /** @class */ (function () {
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
                },] }
    ];
    /** @nocollapse */
    ReorderableDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ReorderableService }
    ]; };
    ReorderableDirective.propDecorators = {
        reorderableModel: [{ type: Input }],
        reorderableGroup: [{ type: Input }],
        reorderingDisabled: [{ type: Input }],
        reorderableModelChange: [{ type: Output }],
        reorderStart: [{ type: Output }],
        reorderCancel: [{ type: Output }],
        reorderEnd: [{ type: Output }],
        handles: [{ type: ContentChildren, args: [ReorderableHandleDirective, { read: ElementRef, descendants: true },] }],
        models: [{ type: ContentChildren, args: [ReorderableModelDirective,] }],
        dragging: [{ type: HostBinding, args: ['class.ux-reorderable-container-moving',] }]
    };
    return ReorderableDirective;
}());
export { ReorderableDirective };
function ReorderableDirective_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVvcmRlcmFibGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvcmVvcmRlcmFibGUvcmVvcmRlcmFibGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLGVBQWUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6SyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDMUUsT0FBTyxFQUE2SSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztJQXdCbE0sOEJBQ1ksYUFDQSxXQUNBO1FBRkEsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsY0FBUyxHQUFULFNBQVM7UUFDVCxhQUFRLEdBQVIsUUFBUTtrQ0FsQm1CLEtBQUs7c0NBQ1QsSUFBSSxZQUFZLEVBQWM7NEJBQ3hDLElBQUksWUFBWSxFQUFnQjs2QkFDL0IsSUFBSSxZQUFZLEVBQWdCOzBCQUNuQyxJQUFJLFlBQVksRUFBZ0I7d0JBT1UsS0FBSzs4QkFFN0MsSUFBSSxZQUFZLEVBQUU7S0FNdEM7SUFFTDs7T0FFRzs7Ozs7SUFDSCx1Q0FBUTs7OztJQUFSO1FBQUEsaUJBb0JDOztRQWpCRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUM5RDtRQUVELElBQUksQ0FBQyxV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QUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7UUFHckUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQXZCLENBQXVCLENBQUM7YUFDaEQsT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSyxPQUFBLE9BQU8sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBNUMsQ0FBNEMsQ0FBQyxDQUFDOzs7Z0JBbE1wRixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtpQkFDOUI7Ozs7Z0JBUm1ELFVBQVU7Z0JBQTBFLFNBQVM7Z0JBSUcsa0JBQWtCOzs7bUNBT2pLLEtBQUs7bUNBQ0wsS0FBSztxQ0FDTCxLQUFLO3lDQUNMLE1BQU07K0JBQ04sTUFBTTtnQ0FDTixNQUFNOzZCQUNOLE1BQU07MEJBRU4sZUFBZSxTQUFDLDBCQUEwQixFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO3lCQUNuRixlQUFlLFNBQUMseUJBQXlCOzJCQUl6QyxXQUFXLFNBQUMsdUNBQXVDOzsrQkF4QnhEOztTQVNhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgUXVlcnlMaXN0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IFJlb3JkZXJhYmxlSGFuZGxlRGlyZWN0aXZlIH0gZnJvbSAnLi9yZW9yZGVyYWJsZS1oYW5kbGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJlb3JkZXJhYmxlTW9kZWxEaXJlY3RpdmUgfSBmcm9tICcuL3Jlb3JkZXJhYmxlLW1vZGVsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSZW9yZGVyYWJsZUNhbmNlbEV2ZW50LCBSZW9yZGVyYWJsZUNsb25lZEV2ZW50LCBSZW9yZGVyYWJsZUNvbnRhaW5lciwgUmVvcmRlcmFibGVEcmFnRW5kRXZlbnQsIFJlb3JkZXJhYmxlRHJhZ0V2ZW50LCBSZW9yZGVyYWJsZURyb3BFdmVudCwgUmVvcmRlcmFibGVTZXJ2aWNlIH0gZnJvbSAnLi9yZW9yZGVyYWJsZS5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhSZW9yZGVyYWJsZV0nXG59KVxuZXhwb3J0IGNsYXNzIFJlb3JkZXJhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgcmVvcmRlcmFibGVNb2RlbDogQXJyYXk8YW55PjtcbiAgICBASW5wdXQoKSByZW9yZGVyYWJsZUdyb3VwOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcmVvcmRlcmluZ0Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQE91dHB1dCgpIHJlb3JkZXJhYmxlTW9kZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+KCk7XG4gICAgQE91dHB1dCgpIHJlb3JkZXJTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8UmVvcmRlckV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSByZW9yZGVyQ2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjxSZW9yZGVyRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHJlb3JkZXJFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPFJlb3JkZXJFdmVudD4oKTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUmVvcmRlcmFibGVIYW5kbGVEaXJlY3RpdmUsIHsgcmVhZDogRWxlbWVudFJlZiwgZGVzY2VuZGFudHM6IHRydWUgfSkgaGFuZGxlczogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuICAgIEBDb250ZW50Q2hpbGRyZW4oUmVvcmRlcmFibGVNb2RlbERpcmVjdGl2ZSkgbW9kZWxzOiBRdWVyeUxpc3Q8UmVvcmRlcmFibGVNb2RlbERpcmVjdGl2ZT47XG5cbiAgICBwcml2YXRlIF9jb250YWluZXI6IFJlb3JkZXJhYmxlQ29udGFpbmVyO1xuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy51eC1yZW9yZGVyYWJsZS1jb250YWluZXItbW92aW5nJykgZHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHJpdmF0ZSBfc2VydmljZTogUmVvcmRlcmFibGVTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpc2UgZHJhZ3VsYSBhbmQgYmluZCB0byBhbGwgdGhlIHJlcXVpcmVkIGV2ZW50c1xuICAgICAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIElmIG5vIGdyb3VwIG5hbWUgdGhlbiBnZW5lcmF0ZSBhIHVuaXF1ZSBvbmUgZm9yIHRoaXMgaW5zdGFuY2Ugb25seVxuICAgICAgICBpZiAoIXRoaXMucmVvcmRlcmFibGVHcm91cCkge1xuICAgICAgICAgICAgdGhpcy5yZW9yZGVyYWJsZUdyb3VwID0gdGhpcy5fc2VydmljZS5nZXRVbmlxdWVHcm91cE5hbWUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lciA9IHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgIGdldE1vZGVsRnJvbUVsZW1lbnQ6IHRoaXMuZ2V0TW9kZWxGcm9tRWxlbWVudC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgY2FuTW92ZTogdGhpcy5jYW5Nb3ZlLmJpbmQodGhpcylcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBSZWdpc3RlciBmb3IgZHJhZyBldmVudHMgb24gdGhpcyBlbGVtZW50XG4gICAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5fc2VydmljZS5yZWdpc3Rlcih0aGlzLnJlb3JkZXJhYmxlR3JvdXAsIHRoaXMuX2NvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuYWRkKGdyb3VwLmRyYWcuc3Vic2NyaWJlKHRoaXMub25EcmFnLmJpbmQodGhpcykpKTtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5hZGQoZ3JvdXAuZHJhZ0VuZC5zdWJzY3JpYmUodGhpcy5vbkRyYWdFbmQuYmluZCh0aGlzKSkpO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZChncm91cC5kcm9wLnN1YnNjcmliZSh0aGlzLm9uRHJvcC5iaW5kKHRoaXMpKSk7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuYWRkKGdyb3VwLmNhbmNlbC5zdWJzY3JpYmUoKGV2ZW50OiBSZW9yZGVyYWJsZUNhbmNlbEV2ZW50KSA9PiB0aGlzLnJlb3JkZXJDYW5jZWwuZW1pdCh7IGVsZW1lbnQ6IGV2ZW50LmVsZW1lbnQsIG1vZGVsOiBldmVudC5tb2RlbCB9KSkpO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZChncm91cC5jbG9uZWQuc3Vic2NyaWJlKHRoaXMub25DbG9uZS5iaW5kKHRoaXMpKSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zZXJ2aWNlLmluaXRpYWxpemUodGhpcy5yZW9yZGVyYWJsZUdyb3VwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXZSBuZWVkIHRvIGRlc3Ryb3kgdGhlIGRyYWd1bGEgaW5zdGFuY2Ugb24gY29tcG9uZW50IGRlc3Ryb3lcbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2VydmljZS51bnJlZ2lzdGVyKHRoaXMucmVvcmRlcmFibGVHcm91cCwgdGhpcy5fY29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIG9uRHJhZyhldmVudDogUmVvcmRlcmFibGVEcmFnRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnJlb3JkZXJTdGFydC5lbWl0KHsgZWxlbWVudDogZXZlbnQuZWxlbWVudCwgbW9kZWw6IGV2ZW50Lm1vZGVsIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgZmlyZWQgd2hlbiBpdGVtcyBnZXQgcmVvcmRlcmVkIC0gd2UgbmVlZCB0byBlbWl0IHRoZSBuZXcgb3JkZXIgb2YgdGhlIG1vZGVsc1xuICAgICAqL1xuICAgIG9uRHJvcChldmVudDogUmVvcmRlcmFibGVEcm9wRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyBwcm92aWRlZCBtb2R1bGUgd2UgY2FuIHNraXAgdGhpc1xuICAgICAgICBpZiAoIXRoaXMucmVvcmRlcmFibGVNb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoZXZlbnQuc291cmNlLmlzU2FtZU5vZGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSkge1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhpcyBtb2RlbCBmcm9tIHRoZSBsaXN0IG9mIG1vZGVsc1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnJlb3JkZXJhYmxlTW9kZWwuaW5kZXhPZihldmVudC5tb2RlbCk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlcmFibGVNb2RlbC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pc1NhbWVOb2RlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkpIHtcblxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBwb3NpdGlvbiBvZiBzaWJsaW5nIGVsZW1lbnRcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gZXZlbnQuc2libGluZyAmJiAhZXZlbnQuc2libGluZy5jbGFzc0xpc3QuY29udGFpbnMoJ2d1LW1pcnJvcicpID9cbiAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXJhYmxlTW9kZWwuaW5kZXhPZih0aGlzLmdldE1vZGVsRnJvbUVsZW1lbnQoZXZlbnQuc2libGluZykpIDpcbiAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXJhYmxlTW9kZWwubGVuZ3RoO1xuXG4gICAgICAgICAgICAvLyBpbnNlcnQgdGhlIG1vZGVsIGF0IGl0cyBuZXcgbG9jYXRpb25cbiAgICAgICAgICAgIHRoaXMucmVvcmRlcmFibGVNb2RlbC5zcGxpY2UoaW5kZXgsIDAsIGV2ZW50Lm1vZGVsKTtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRW1pdCBldmVudCBpZiBhbnkgY2hhbmdlcyB3ZXJlIG1hZGVcbiAgICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVvcmRlcmFibGVNb2RlbENoYW5nZS5lbWl0KHRoaXMucmVvcmRlcmFibGVNb2RlbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIG1vZGVsIGFzc2NpYXRlZCB3aXRoIGEgcGFydGljdWxhciBlbGVtZW50IGluIHRoZSBsaXN0LlxuICAgICAqIFRoaXMgc2hvdWxkIGVuc3VyZSB0aGF0IHRoZSBpdGVtcyBoYXZlIHRoZSBkcmFnZ2FibGUgbW9kZWwgZGlyZWN0aXZlIGFwcGxpZWRcbiAgICAgKi9cbiAgICBnZXRNb2RlbEZyb21FbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpOiBhbnkge1xuXG4gICAgICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbHMuZmluZChfbW9kZWwgPT4gX21vZGVsLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCA9PT0gZWxlbWVudCk7XG5cbiAgICAgICAgaWYgKCFtb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbW9kZWwudXhSZW9yZGVyYWJsZU1vZGVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gd2UgZmluaXNoIGRyYWdnaW5nIHJlbW92ZSB0aGUgdXRpbGxpdHkgY2xhc3MgZnJvbSB0aGUgZWxlbWVudCBiZWluZyBtb3ZlZFxuICAgICAqL1xuICAgIG9uRHJhZ0VuZChldmVudDogUmVvcmRlcmFibGVEcmFnRW5kRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC5lbGVtZW50KSkge1xuXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyhldmVudC5lbGVtZW50LCAndXgtcmVvcmRlcmFibGUtbW92aW5nJyk7XG5cbiAgICAgICAgICAgIHRoaXMucmVvcmRlckVuZC5lbWl0KHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBldmVudC5lbGVtZW50LFxuICAgICAgICAgICAgICAgIG1vZGVsOiBldmVudC5tb2RlbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXZSB3YW50IHRvIGVuc3VyZSB0aGF0IHRoZSBjbG9uZWQgZWxlbWVudCBpcyBpZGVudGljYWxcbiAgICAgKiB0byB0aGUgb3JpZ2luYWwsIHJlZ2FyZGxlc3Mgb2YgaXQncyBsb2NhdGlvbiBpbiB0aGUgRE9NIHRyZWVcbiAgICAgKi9cbiAgICBvbkNsb25lKGV2ZW50OiBSZW9yZGVyYWJsZUNsb25lZEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgaWYgKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC5lbGVtZW50KSkge1xuXG4gICAgICAgICAgICB0aGlzLnNldFRhYmxlQ2VsbFdpZHRocyhldmVudC5lbGVtZW50LCBldmVudC5jbG9uZSk7XG4gICAgICAgICAgICB0aGlzLmNhcHR1cmVDYW52YXNlcyhldmVudC5lbGVtZW50LCBldmVudC5jbG9uZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKGV2ZW50LmVsZW1lbnQsICd1eC1yZW9yZGVyYWJsZS1tb3ZpbmcnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElmIGVsZW1lbnRzIGNvbnRhaW4gaGFuZGxlcyB0aGVuIG9ubHkgZHJhZyB3aGVuIHRoZSBoYW5kbGUgaXMgZHJhZ2dlZFxuICAgICAqIG90aGVyd2lzZSBkcmFnIHdoZW5ldmVyIGFuIGltbWVkaWF0ZSBjaGlsZCBpcyBzcGVjaWZpZWRcbiAgICAgKi9cbiAgICBjYW5Nb3ZlKGVsZW1lbnQ6IEVsZW1lbnQsIGNvbnRhaW5lcjogRWxlbWVudCwgaGFuZGxlOiBFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnJlb3JkZXJpbmdEaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXMubGVuZ3RoID09PSAwID8gdHJ1ZSA6ICEhdGhpcy5oYW5kbGVzLmZpbmQoX2hhbmRsZSA9PiBfaGFuZGxlLm5hdGl2ZUVsZW1lbnQgPT09IGhhbmRsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRUYWJsZUNlbGxXaWR0aHMoc291cmNlOiBFbGVtZW50LCB0YXJnZXQ6IEVsZW1lbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBpZiBpdCBpcyBub3QgYSB0YWJsZSByb3cgdGhlbiBza2lwIHRoaXNcbiAgICAgICAgaWYgKHNvdXJjZS50YWdOYW1lICE9PSAnVFInKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaW5kIGFueSBpbW1lZGlhdGUgdGQgY2hpbGRyZW4gYW5kIGZpeCB0aGVpciB3aWR0aFxuICAgICAgICBjb25zdCBzb3VyY2VDZWxscyA9IEFycmF5LmZyb20oc291cmNlLmNoaWxkcmVuKSBhcyBIVE1MVGFibGVDZWxsRWxlbWVudFtdO1xuICAgICAgICBjb25zdCB0YXJnZXRDZWxscyA9IEFycmF5LmZyb20odGFyZ2V0LmNoaWxkcmVuKSBhcyBIVE1MVGFibGVDZWxsRWxlbWVudFtdO1xuXG4gICAgICAgIC8vIGZpeCB0aGUgd2lkdGggb2YgdGhlc2UgY2VsbHNcbiAgICAgICAgc291cmNlQ2VsbHMuZm9yRWFjaCgoY2VsbCwgaWR4KSA9PiB0YXJnZXRDZWxsc1tpZHhdLnN0eWxlLm1pbldpZHRoID0gZ2V0Q29tcHV0ZWRTdHlsZShjZWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhcHR1cmVDYW52YXNlcyhzb3VyY2U6IEVsZW1lbnQsIHRhcmdldDogRWxlbWVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGZpbmQgYWxsIGNoaWxkIGNhbnZhcyBlbGVtZW50c1xuICAgICAgICBjb25zdCBzb3VyY2VDYW52YXNlcyA9IEFycmF5LmZyb20oc291cmNlLnF1ZXJ5U2VsZWN0b3JBbGwoJ2NhbnZhcycpKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0Q2FudmFzZXMgPSBBcnJheS5mcm9tKHRhcmdldC5xdWVyeVNlbGVjdG9yQWxsKCdjYW52YXMnKSk7XG5cbiAgICAgICAgLy8gcmVwbGljYXRlIHRoZSBjYW52YXMgY29udGVudFxuICAgICAgICB0YXJnZXRDYW52YXNlcy5tYXAoY2FudmFzID0+IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxuICAgICAgICAgICAgLmZvckVhY2goKGNvbnRleHQsIGlkeCkgPT4gY29udGV4dC5kcmF3SW1hZ2Uoc291cmNlQ2FudmFzZXNbaWR4XSwgMCwgMCkpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVvcmRlckV2ZW50IHtcbiAgICBlbGVtZW50OiBFbGVtZW50O1xuICAgIG1vZGVsOiBhbnk7XG59XG4iXX0=