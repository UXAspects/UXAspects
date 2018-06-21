/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ContentChildren, Directive, ElementRef, EventEmitter, HostBinding, Input, Output, QueryList, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ReorderableHandleDirective } from './reorderable-handle.directive';
import { ReorderableModelDirective } from './reorderable-model.directive';
import { ReorderableService } from './reorderable.service';
export class ReorderableDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _service
     */
    constructor(_elementRef, _renderer, _service) {
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
     * @return {?}
     */
    ngOnInit() {
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
        const /** @type {?} */ group = this._service.register(this.reorderableGroup, this._container);
        this._subscriptions.add(group.drag.subscribe(this.onDrag.bind(this)));
        this._subscriptions.add(group.dragEnd.subscribe(this.onDragEnd.bind(this)));
        this._subscriptions.add(group.drop.subscribe(this.onDrop.bind(this)));
        this._subscriptions.add(group.cancel.subscribe((event) => this.reorderCancel.emit({ element: event.element, model: event.model })));
        this._subscriptions.add(group.cloned.subscribe(this.onClone.bind(this)));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._service.initialize(this.reorderableGroup);
    }
    /**
     * We need to destroy the dragula instance on component destroy
     * @return {?}
     */
    ngOnDestroy() {
        this._service.unregister(this.reorderableGroup, this._container);
        this._subscriptions.unsubscribe();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDrag(event) {
        this.dragging = true;
        this.reorderStart.emit({ element: event.element, model: event.model });
    }
    /**
     * This is fired when items get reordered - we need to emit the new order of the models
     * @param {?} event
     * @return {?}
     */
    onDrop(event) {
        // if there is no provided module we can skip this
        if (!this.reorderableModel) {
            return;
        }
        let /** @type {?} */ changed = false;
        if (event.source.isSameNode(this._elementRef.nativeElement)) {
            // remove this model from the list of models
            const /** @type {?} */ index = this.reorderableModel.indexOf(event.model);
            if (index >= 0) {
                this.reorderableModel.splice(index, 1);
                changed = true;
            }
        }
        if (event.target.isSameNode(this._elementRef.nativeElement)) {
            // get the position of sibling element
            const /** @type {?} */ index = event.sibling && !event.sibling.classList.contains('gu-mirror') ?
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
    }
    /**
     * Return the model assciated with a particular element in the list.
     * This should ensure that the items have the draggable model directive applied
     * @param {?} element
     * @return {?}
     */
    getModelFromElement(element) {
        const /** @type {?} */ model = this.models.find(_model => _model.elementRef.nativeElement === element);
        if (!model) {
            return null;
        }
        return model.uxReorderableModel;
    }
    /**
     * When we finish dragging remove the utillity class from the element being moved
     * @param {?} event
     * @return {?}
     */
    onDragEnd(event) {
        this.dragging = false;
        if (this._elementRef.nativeElement.contains(event.element)) {
            this._renderer.removeClass(event.element, 'ux-reorderable-moving');
            this.reorderEnd.emit({
                element: event.element,
                model: event.model
            });
        }
    }
    /**
     * We want to ensure that the cloned element is identical
     * to the original, regardless of it's location in the DOM tree
     * @param {?} event
     * @return {?}
     */
    onClone(event) {
        if (this._elementRef.nativeElement.contains(event.element)) {
            this.setTableCellWidths(event.element, event.clone);
            this.captureCanvases(event.element, event.clone);
            this._renderer.addClass(event.element, 'ux-reorderable-moving');
        }
    }
    /**
     * If elements contain handles then only drag when the handle is dragged
     * otherwise drag whenever an immediate child is specified
     * @param {?} element
     * @param {?} container
     * @param {?} handle
     * @return {?}
     */
    canMove(element, container, handle) {
        if (this.reorderingDisabled) {
            return false;
        }
        return this.handles.length === 0 ? true : !!this.handles.find(_handle => _handle.nativeElement === handle);
    }
    /**
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    setTableCellWidths(source, target) {
        // if it is not a table row then skip this
        if (source.tagName !== 'TR') {
            return;
        }
        // find any immediate td children and fix their width
        const /** @type {?} */ sourceCells = /** @type {?} */ (Array.from(source.children));
        const /** @type {?} */ targetCells = /** @type {?} */ (Array.from(target.children));
        // fix the width of these cells
        sourceCells.forEach((cell, idx) => targetCells[idx].style.minWidth = getComputedStyle(cell).getPropertyValue('width'));
    }
    /**
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    captureCanvases(source, target) {
        // find all child canvas elements
        const /** @type {?} */ sourceCanvases = Array.from(source.querySelectorAll('canvas'));
        const /** @type {?} */ targetCanvases = Array.from(target.querySelectorAll('canvas'));
        // replicate the canvas content
        targetCanvases.map(canvas => canvas.getContext('2d'))
            .forEach((context, idx) => context.drawImage(sourceCanvases[idx], 0, 0));
    }
}
ReorderableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxReorderable]'
            },] },
];
/** @nocollapse */
ReorderableDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: ReorderableService, },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVvcmRlcmFibGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvcmVvcmRlcmFibGUvcmVvcmRlcmFibGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLGVBQWUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6SyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDMUUsT0FBTyxFQUE2SSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBS3RNLE1BQU07Ozs7OztJQW1CRixZQUNZLGFBQ0EsV0FDQTtRQUZBLGdCQUFXLEdBQVgsV0FBVztRQUNYLGNBQVMsR0FBVCxTQUFTO1FBQ1QsYUFBUSxHQUFSLFFBQVE7a0NBbEJtQixLQUFLO3NDQUNULElBQUksWUFBWSxFQUFjOzRCQUN4QyxJQUFJLFlBQVksRUFBZ0I7NkJBQy9CLElBQUksWUFBWSxFQUFnQjswQkFDbkMsSUFBSSxZQUFZLEVBQWdCO3dCQU9VLEtBQUs7OEJBRTdDLElBQUksWUFBWSxFQUFFO0tBTXRDOzs7OztJQUtMLFFBQVE7O1FBR0osRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDOUQ7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHO1lBQ2QsT0FBTyxF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U0FBUztZQUlHLGtCQUFrQjs7O2lDQU9qSyxLQUFLO2lDQUNMLEtBQUs7bUNBQ0wsS0FBSzt1Q0FDTCxNQUFNOzZCQUNOLE1BQU07OEJBQ04sTUFBTTsyQkFDTixNQUFNO3dCQUVOLGVBQWUsU0FBQywwQkFBMEIsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTt1QkFDbkYsZUFBZSxTQUFDLHlCQUF5Qjt5QkFJekMsV0FBVyxTQUFDLHVDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgUXVlcnlMaXN0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IFJlb3JkZXJhYmxlSGFuZGxlRGlyZWN0aXZlIH0gZnJvbSAnLi9yZW9yZGVyYWJsZS1oYW5kbGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJlb3JkZXJhYmxlTW9kZWxEaXJlY3RpdmUgfSBmcm9tICcuL3Jlb3JkZXJhYmxlLW1vZGVsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSZW9yZGVyYWJsZUNhbmNlbEV2ZW50LCBSZW9yZGVyYWJsZUNsb25lZEV2ZW50LCBSZW9yZGVyYWJsZUNvbnRhaW5lciwgUmVvcmRlcmFibGVEcmFnRW5kRXZlbnQsIFJlb3JkZXJhYmxlRHJhZ0V2ZW50LCBSZW9yZGVyYWJsZURyb3BFdmVudCwgUmVvcmRlcmFibGVTZXJ2aWNlIH0gZnJvbSAnLi9yZW9yZGVyYWJsZS5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhSZW9yZGVyYWJsZV0nXG59KVxuZXhwb3J0IGNsYXNzIFJlb3JkZXJhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgcmVvcmRlcmFibGVNb2RlbDogQXJyYXk8YW55PjtcbiAgICBASW5wdXQoKSByZW9yZGVyYWJsZUdyb3VwOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcmVvcmRlcmluZ0Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQE91dHB1dCgpIHJlb3JkZXJhYmxlTW9kZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+KCk7XG4gICAgQE91dHB1dCgpIHJlb3JkZXJTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8UmVvcmRlckV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSByZW9yZGVyQ2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjxSZW9yZGVyRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHJlb3JkZXJFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPFJlb3JkZXJFdmVudD4oKTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUmVvcmRlcmFibGVIYW5kbGVEaXJlY3RpdmUsIHsgcmVhZDogRWxlbWVudFJlZiwgZGVzY2VuZGFudHM6IHRydWUgfSkgaGFuZGxlczogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuICAgIEBDb250ZW50Q2hpbGRyZW4oUmVvcmRlcmFibGVNb2RlbERpcmVjdGl2ZSkgbW9kZWxzOiBRdWVyeUxpc3Q8UmVvcmRlcmFibGVNb2RlbERpcmVjdGl2ZT47XG5cbiAgICBwcml2YXRlIF9jb250YWluZXI6IFJlb3JkZXJhYmxlQ29udGFpbmVyO1xuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy51eC1yZW9yZGVyYWJsZS1jb250YWluZXItbW92aW5nJykgZHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHJpdmF0ZSBfc2VydmljZTogUmVvcmRlcmFibGVTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpc2UgZHJhZ3VsYSBhbmQgYmluZCB0byBhbGwgdGhlIHJlcXVpcmVkIGV2ZW50c1xuICAgICAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIElmIG5vIGdyb3VwIG5hbWUgdGhlbiBnZW5lcmF0ZSBhIHVuaXF1ZSBvbmUgZm9yIHRoaXMgaW5zdGFuY2Ugb25seVxuICAgICAgICBpZiAoIXRoaXMucmVvcmRlcmFibGVHcm91cCkge1xuICAgICAgICAgICAgdGhpcy5yZW9yZGVyYWJsZUdyb3VwID0gdGhpcy5fc2VydmljZS5nZXRVbmlxdWVHcm91cE5hbWUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lciA9IHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgIGdldE1vZGVsRnJvbUVsZW1lbnQ6IHRoaXMuZ2V0TW9kZWxGcm9tRWxlbWVudC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgY2FuTW92ZTogdGhpcy5jYW5Nb3ZlLmJpbmQodGhpcylcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBSZWdpc3RlciBmb3IgZHJhZyBldmVudHMgb24gdGhpcyBlbGVtZW50XG4gICAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5fc2VydmljZS5yZWdpc3Rlcih0aGlzLnJlb3JkZXJhYmxlR3JvdXAsIHRoaXMuX2NvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuYWRkKGdyb3VwLmRyYWcuc3Vic2NyaWJlKHRoaXMub25EcmFnLmJpbmQodGhpcykpKTtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5hZGQoZ3JvdXAuZHJhZ0VuZC5zdWJzY3JpYmUodGhpcy5vbkRyYWdFbmQuYmluZCh0aGlzKSkpO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZChncm91cC5kcm9wLnN1YnNjcmliZSh0aGlzLm9uRHJvcC5iaW5kKHRoaXMpKSk7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuYWRkKGdyb3VwLmNhbmNlbC5zdWJzY3JpYmUoKGV2ZW50OiBSZW9yZGVyYWJsZUNhbmNlbEV2ZW50KSA9PiB0aGlzLnJlb3JkZXJDYW5jZWwuZW1pdCh7IGVsZW1lbnQ6IGV2ZW50LmVsZW1lbnQsIG1vZGVsOiBldmVudC5tb2RlbCB9KSkpO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZChncm91cC5jbG9uZWQuc3Vic2NyaWJlKHRoaXMub25DbG9uZS5iaW5kKHRoaXMpKSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zZXJ2aWNlLmluaXRpYWxpemUodGhpcy5yZW9yZGVyYWJsZUdyb3VwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXZSBuZWVkIHRvIGRlc3Ryb3kgdGhlIGRyYWd1bGEgaW5zdGFuY2Ugb24gY29tcG9uZW50IGRlc3Ryb3lcbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2VydmljZS51bnJlZ2lzdGVyKHRoaXMucmVvcmRlcmFibGVHcm91cCwgdGhpcy5fY29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIG9uRHJhZyhldmVudDogUmVvcmRlcmFibGVEcmFnRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnJlb3JkZXJTdGFydC5lbWl0KHsgZWxlbWVudDogZXZlbnQuZWxlbWVudCwgbW9kZWw6IGV2ZW50Lm1vZGVsIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgZmlyZWQgd2hlbiBpdGVtcyBnZXQgcmVvcmRlcmVkIC0gd2UgbmVlZCB0byBlbWl0IHRoZSBuZXcgb3JkZXIgb2YgdGhlIG1vZGVsc1xuICAgICAqL1xuICAgIG9uRHJvcChldmVudDogUmVvcmRlcmFibGVEcm9wRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyBwcm92aWRlZCBtb2R1bGUgd2UgY2FuIHNraXAgdGhpc1xuICAgICAgICBpZiAoIXRoaXMucmVvcmRlcmFibGVNb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoZXZlbnQuc291cmNlLmlzU2FtZU5vZGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSkge1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhpcyBtb2RlbCBmcm9tIHRoZSBsaXN0IG9mIG1vZGVsc1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnJlb3JkZXJhYmxlTW9kZWwuaW5kZXhPZihldmVudC5tb2RlbCk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlcmFibGVNb2RlbC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pc1NhbWVOb2RlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkpIHtcblxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBwb3NpdGlvbiBvZiBzaWJsaW5nIGVsZW1lbnRcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gZXZlbnQuc2libGluZyAmJiAhZXZlbnQuc2libGluZy5jbGFzc0xpc3QuY29udGFpbnMoJ2d1LW1pcnJvcicpID9cbiAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXJhYmxlTW9kZWwuaW5kZXhPZih0aGlzLmdldE1vZGVsRnJvbUVsZW1lbnQoZXZlbnQuc2libGluZykpIDpcbiAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXJhYmxlTW9kZWwubGVuZ3RoO1xuXG4gICAgICAgICAgICAvLyBpbnNlcnQgdGhlIG1vZGVsIGF0IGl0cyBuZXcgbG9jYXRpb25cbiAgICAgICAgICAgIHRoaXMucmVvcmRlcmFibGVNb2RlbC5zcGxpY2UoaW5kZXgsIDAsIGV2ZW50Lm1vZGVsKTtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRW1pdCBldmVudCBpZiBhbnkgY2hhbmdlcyB3ZXJlIG1hZGVcbiAgICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVvcmRlcmFibGVNb2RlbENoYW5nZS5lbWl0KHRoaXMucmVvcmRlcmFibGVNb2RlbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIG1vZGVsIGFzc2NpYXRlZCB3aXRoIGEgcGFydGljdWxhciBlbGVtZW50IGluIHRoZSBsaXN0LlxuICAgICAqIFRoaXMgc2hvdWxkIGVuc3VyZSB0aGF0IHRoZSBpdGVtcyBoYXZlIHRoZSBkcmFnZ2FibGUgbW9kZWwgZGlyZWN0aXZlIGFwcGxpZWRcbiAgICAgKi9cbiAgICBnZXRNb2RlbEZyb21FbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpOiBhbnkge1xuXG4gICAgICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbHMuZmluZChfbW9kZWwgPT4gX21vZGVsLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCA9PT0gZWxlbWVudCk7XG5cbiAgICAgICAgaWYgKCFtb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbW9kZWwudXhSZW9yZGVyYWJsZU1vZGVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gd2UgZmluaXNoIGRyYWdnaW5nIHJlbW92ZSB0aGUgdXRpbGxpdHkgY2xhc3MgZnJvbSB0aGUgZWxlbWVudCBiZWluZyBtb3ZlZFxuICAgICAqL1xuICAgIG9uRHJhZ0VuZChldmVudDogUmVvcmRlcmFibGVEcmFnRW5kRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC5lbGVtZW50KSkge1xuXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyhldmVudC5lbGVtZW50LCAndXgtcmVvcmRlcmFibGUtbW92aW5nJyk7XG5cbiAgICAgICAgICAgIHRoaXMucmVvcmRlckVuZC5lbWl0KHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBldmVudC5lbGVtZW50LFxuICAgICAgICAgICAgICAgIG1vZGVsOiBldmVudC5tb2RlbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXZSB3YW50IHRvIGVuc3VyZSB0aGF0IHRoZSBjbG9uZWQgZWxlbWVudCBpcyBpZGVudGljYWxcbiAgICAgKiB0byB0aGUgb3JpZ2luYWwsIHJlZ2FyZGxlc3Mgb2YgaXQncyBsb2NhdGlvbiBpbiB0aGUgRE9NIHRyZWVcbiAgICAgKi9cbiAgICBvbkNsb25lKGV2ZW50OiBSZW9yZGVyYWJsZUNsb25lZEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgaWYgKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC5lbGVtZW50KSkge1xuXG4gICAgICAgICAgICB0aGlzLnNldFRhYmxlQ2VsbFdpZHRocyhldmVudC5lbGVtZW50LCBldmVudC5jbG9uZSk7XG4gICAgICAgICAgICB0aGlzLmNhcHR1cmVDYW52YXNlcyhldmVudC5lbGVtZW50LCBldmVudC5jbG9uZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKGV2ZW50LmVsZW1lbnQsICd1eC1yZW9yZGVyYWJsZS1tb3ZpbmcnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElmIGVsZW1lbnRzIGNvbnRhaW4gaGFuZGxlcyB0aGVuIG9ubHkgZHJhZyB3aGVuIHRoZSBoYW5kbGUgaXMgZHJhZ2dlZFxuICAgICAqIG90aGVyd2lzZSBkcmFnIHdoZW5ldmVyIGFuIGltbWVkaWF0ZSBjaGlsZCBpcyBzcGVjaWZpZWRcbiAgICAgKi9cbiAgICBjYW5Nb3ZlKGVsZW1lbnQ6IEVsZW1lbnQsIGNvbnRhaW5lcjogRWxlbWVudCwgaGFuZGxlOiBFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnJlb3JkZXJpbmdEaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXMubGVuZ3RoID09PSAwID8gdHJ1ZSA6ICEhdGhpcy5oYW5kbGVzLmZpbmQoX2hhbmRsZSA9PiBfaGFuZGxlLm5hdGl2ZUVsZW1lbnQgPT09IGhhbmRsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRUYWJsZUNlbGxXaWR0aHMoc291cmNlOiBFbGVtZW50LCB0YXJnZXQ6IEVsZW1lbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBpZiBpdCBpcyBub3QgYSB0YWJsZSByb3cgdGhlbiBza2lwIHRoaXNcbiAgICAgICAgaWYgKHNvdXJjZS50YWdOYW1lICE9PSAnVFInKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaW5kIGFueSBpbW1lZGlhdGUgdGQgY2hpbGRyZW4gYW5kIGZpeCB0aGVpciB3aWR0aFxuICAgICAgICBjb25zdCBzb3VyY2VDZWxscyA9IEFycmF5LmZyb20oc291cmNlLmNoaWxkcmVuKSBhcyBIVE1MVGFibGVDZWxsRWxlbWVudFtdO1xuICAgICAgICBjb25zdCB0YXJnZXRDZWxscyA9IEFycmF5LmZyb20odGFyZ2V0LmNoaWxkcmVuKSBhcyBIVE1MVGFibGVDZWxsRWxlbWVudFtdO1xuXG4gICAgICAgIC8vIGZpeCB0aGUgd2lkdGggb2YgdGhlc2UgY2VsbHNcbiAgICAgICAgc291cmNlQ2VsbHMuZm9yRWFjaCgoY2VsbCwgaWR4KSA9PiB0YXJnZXRDZWxsc1tpZHhdLnN0eWxlLm1pbldpZHRoID0gZ2V0Q29tcHV0ZWRTdHlsZShjZWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhcHR1cmVDYW52YXNlcyhzb3VyY2U6IEVsZW1lbnQsIHRhcmdldDogRWxlbWVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGZpbmQgYWxsIGNoaWxkIGNhbnZhcyBlbGVtZW50c1xuICAgICAgICBjb25zdCBzb3VyY2VDYW52YXNlcyA9IEFycmF5LmZyb20oc291cmNlLnF1ZXJ5U2VsZWN0b3JBbGwoJ2NhbnZhcycpKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0Q2FudmFzZXMgPSBBcnJheS5mcm9tKHRhcmdldC5xdWVyeVNlbGVjdG9yQWxsKCdjYW52YXMnKSk7XG5cbiAgICAgICAgLy8gcmVwbGljYXRlIHRoZSBjYW52YXMgY29udGVudFxuICAgICAgICB0YXJnZXRDYW52YXNlcy5tYXAoY2FudmFzID0+IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxuICAgICAgICAgICAgLmZvckVhY2goKGNvbnRleHQsIGlkeCkgPT4gY29udGV4dC5kcmF3SW1hZ2Uoc291cmNlQ2FudmFzZXNbaWR4XSwgMCwgMCkpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVvcmRlckV2ZW50IHtcbiAgICBlbGVtZW50OiBFbGVtZW50O1xuICAgIG1vZGVsOiBhbnk7XG59XG4iXX0=