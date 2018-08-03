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
            },] }
];
/** @nocollapse */
ReorderableDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ReorderableService }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVvcmRlcmFibGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvcmVvcmRlcmFibGUvcmVvcmRlcmFibGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLGVBQWUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6SyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDMUUsT0FBTyxFQUE2SSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBS3RNLE1BQU07Ozs7OztJQW1CRixZQUNZLGFBQ0EsV0FDQTtRQUZBLGdCQUFXLEdBQVgsV0FBVztRQUNYLGNBQVMsR0FBVCxTQUFTO1FBQ1QsYUFBUSxHQUFSLFFBQVE7a0NBbEJtQixLQUFLO3NDQUNULElBQUksWUFBWSxFQUFjOzRCQUN4QyxJQUFJLFlBQVksRUFBZ0I7NkJBQy9CLElBQUksWUFBWSxFQUFnQjswQkFDbkMsSUFBSSxZQUFZLEVBQWdCO3dCQU9VLEtBQUs7OEJBRTdDLElBQUksWUFBWSxFQUFFO0tBTXRDOzs7OztJQUtMLFFBQVE7O1FBR0osRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDOUQ7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHO1lBQ2QsT0FBTyxF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LENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O1lBbE1wRixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjthQUM5Qjs7OztZQVJtRCxVQUFVO1lBQTBFLFNBQVM7WUFJRyxrQkFBa0I7OzsrQkFPakssS0FBSzsrQkFDTCxLQUFLO2lDQUNMLEtBQUs7cUNBQ0wsTUFBTTsyQkFDTixNQUFNOzRCQUNOLE1BQU07eUJBQ04sTUFBTTtzQkFFTixlQUFlLFNBQUMsMEJBQTBCLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7cUJBQ25GLGVBQWUsU0FBQyx5QkFBeUI7dUJBSXpDLFdBQVcsU0FBQyx1Q0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBSZW9yZGVyYWJsZUhhbmRsZURpcmVjdGl2ZSB9IGZyb20gJy4vcmVvcmRlcmFibGUtaGFuZGxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSZW9yZGVyYWJsZU1vZGVsRGlyZWN0aXZlIH0gZnJvbSAnLi9yZW9yZGVyYWJsZS1tb2RlbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUmVvcmRlcmFibGVDYW5jZWxFdmVudCwgUmVvcmRlcmFibGVDbG9uZWRFdmVudCwgUmVvcmRlcmFibGVDb250YWluZXIsIFJlb3JkZXJhYmxlRHJhZ0VuZEV2ZW50LCBSZW9yZGVyYWJsZURyYWdFdmVudCwgUmVvcmRlcmFibGVEcm9wRXZlbnQsIFJlb3JkZXJhYmxlU2VydmljZSB9IGZyb20gJy4vcmVvcmRlcmFibGUuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4UmVvcmRlcmFibGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBSZW9yZGVyYWJsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHJlb3JkZXJhYmxlTW9kZWw6IEFycmF5PGFueT47XG4gICAgQElucHV0KCkgcmVvcmRlcmFibGVHcm91cDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHJlb3JkZXJpbmdEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBPdXRwdXQoKSByZW9yZGVyYWJsZU1vZGVsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xuICAgIEBPdXRwdXQoKSByZW9yZGVyU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPFJlb3JkZXJFdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgcmVvcmRlckNhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8UmVvcmRlckV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSByZW9yZGVyRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxSZW9yZGVyRXZlbnQ+KCk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFJlb3JkZXJhYmxlSGFuZGxlRGlyZWN0aXZlLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIGRlc2NlbmRhbnRzOiB0cnVlIH0pIGhhbmRsZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcbiAgICBAQ29udGVudENoaWxkcmVuKFJlb3JkZXJhYmxlTW9kZWxEaXJlY3RpdmUpIG1vZGVsczogUXVlcnlMaXN0PFJlb3JkZXJhYmxlTW9kZWxEaXJlY3RpdmU+O1xuXG4gICAgcHJpdmF0ZSBfY29udGFpbmVyOiBSZW9yZGVyYWJsZUNvbnRhaW5lcjtcblxuICAgIEBIb3N0QmluZGluZygnY2xhc3MudXgtcmVvcmRlcmFibGUtY29udGFpbmVyLW1vdmluZycpIGRyYWdnaW5nID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIHByaXZhdGUgX3NlcnZpY2U6IFJlb3JkZXJhYmxlU2VydmljZVxuICAgICkgeyB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXNlIGRyYWd1bGEgYW5kIGJpbmQgdG8gYWxsIHRoZSByZXF1aXJlZCBldmVudHNcbiAgICAgKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBJZiBubyBncm91cCBuYW1lIHRoZW4gZ2VuZXJhdGUgYSB1bmlxdWUgb25lIGZvciB0aGlzIGluc3RhbmNlIG9ubHlcbiAgICAgICAgaWYgKCF0aGlzLnJlb3JkZXJhYmxlR3JvdXApIHtcbiAgICAgICAgICAgIHRoaXMucmVvcmRlcmFibGVHcm91cCA9IHRoaXMuX3NlcnZpY2UuZ2V0VW5pcXVlR3JvdXBOYW1lKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb250YWluZXIgPSB7XG4gICAgICAgICAgICBlbGVtZW50OiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICBnZXRNb2RlbEZyb21FbGVtZW50OiB0aGlzLmdldE1vZGVsRnJvbUVsZW1lbnQuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGNhbk1vdmU6IHRoaXMuY2FuTW92ZS5iaW5kKHRoaXMpXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gUmVnaXN0ZXIgZm9yIGRyYWcgZXZlbnRzIG9uIHRoaXMgZWxlbWVudFxuICAgICAgICBjb25zdCBncm91cCA9IHRoaXMuX3NlcnZpY2UucmVnaXN0ZXIodGhpcy5yZW9yZGVyYWJsZUdyb3VwLCB0aGlzLl9jb250YWluZXIpO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZChncm91cC5kcmFnLnN1YnNjcmliZSh0aGlzLm9uRHJhZy5iaW5kKHRoaXMpKSk7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuYWRkKGdyb3VwLmRyYWdFbmQuc3Vic2NyaWJlKHRoaXMub25EcmFnRW5kLmJpbmQodGhpcykpKTtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5hZGQoZ3JvdXAuZHJvcC5zdWJzY3JpYmUodGhpcy5vbkRyb3AuYmluZCh0aGlzKSkpO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZChncm91cC5jYW5jZWwuc3Vic2NyaWJlKChldmVudDogUmVvcmRlcmFibGVDYW5jZWxFdmVudCkgPT4gdGhpcy5yZW9yZGVyQ2FuY2VsLmVtaXQoeyBlbGVtZW50OiBldmVudC5lbGVtZW50LCBtb2RlbDogZXZlbnQubW9kZWwgfSkpKTtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5hZGQoZ3JvdXAuY2xvbmVkLnN1YnNjcmliZSh0aGlzLm9uQ2xvbmUuYmluZCh0aGlzKSkpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2VydmljZS5pbml0aWFsaXplKHRoaXMucmVvcmRlcmFibGVHcm91cCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2UgbmVlZCB0byBkZXN0cm95IHRoZSBkcmFndWxhIGluc3RhbmNlIG9uIGNvbXBvbmVudCBkZXN0cm95XG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3NlcnZpY2UudW5yZWdpc3Rlcih0aGlzLnJlb3JkZXJhYmxlR3JvdXAsIHRoaXMuX2NvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBvbkRyYWcoZXZlbnQ6IFJlb3JkZXJhYmxlRHJhZ0V2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5yZW9yZGVyU3RhcnQuZW1pdCh7IGVsZW1lbnQ6IGV2ZW50LmVsZW1lbnQsIG1vZGVsOiBldmVudC5tb2RlbCB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIGZpcmVkIHdoZW4gaXRlbXMgZ2V0IHJlb3JkZXJlZCAtIHdlIG5lZWQgdG8gZW1pdCB0aGUgbmV3IG9yZGVyIG9mIHRoZSBtb2RlbHNcbiAgICAgKi9cbiAgICBvbkRyb3AoZXZlbnQ6IFJlb3JkZXJhYmxlRHJvcEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gcHJvdmlkZWQgbW9kdWxlIHdlIGNhbiBza2lwIHRoaXNcbiAgICAgICAgaWYgKCF0aGlzLnJlb3JkZXJhYmxlTW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGV2ZW50LnNvdXJjZS5pc1NhbWVOb2RlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkpIHtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoaXMgbW9kZWwgZnJvbSB0aGUgbGlzdCBvZiBtb2RlbHNcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5yZW9yZGVyYWJsZU1vZGVsLmluZGV4T2YoZXZlbnQubW9kZWwpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXJhYmxlTW9kZWwuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaXNTYW1lTm9kZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpKSB7XG5cbiAgICAgICAgICAgIC8vIGdldCB0aGUgcG9zaXRpb24gb2Ygc2libGluZyBlbGVtZW50XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGV2ZW50LnNpYmxpbmcgJiYgIWV2ZW50LnNpYmxpbmcuY2xhc3NMaXN0LmNvbnRhaW5zKCdndS1taXJyb3InKSA/XG4gICAgICAgICAgICAgICAgdGhpcy5yZW9yZGVyYWJsZU1vZGVsLmluZGV4T2YodGhpcy5nZXRNb2RlbEZyb21FbGVtZW50KGV2ZW50LnNpYmxpbmcpKSA6XG4gICAgICAgICAgICAgICAgdGhpcy5yZW9yZGVyYWJsZU1vZGVsLmxlbmd0aDtcblxuICAgICAgICAgICAgLy8gaW5zZXJ0IHRoZSBtb2RlbCBhdCBpdHMgbmV3IGxvY2F0aW9uXG4gICAgICAgICAgICB0aGlzLnJlb3JkZXJhYmxlTW9kZWwuc3BsaWNlKGluZGV4LCAwLCBldmVudC5tb2RlbCk7XG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVtaXQgZXZlbnQgaWYgYW55IGNoYW5nZXMgd2VyZSBtYWRlXG4gICAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLnJlb3JkZXJhYmxlTW9kZWxDaGFuZ2UuZW1pdCh0aGlzLnJlb3JkZXJhYmxlTW9kZWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBtb2RlbCBhc3NjaWF0ZWQgd2l0aCBhIHBhcnRpY3VsYXIgZWxlbWVudCBpbiB0aGUgbGlzdC5cbiAgICAgKiBUaGlzIHNob3VsZCBlbnN1cmUgdGhhdCB0aGUgaXRlbXMgaGF2ZSB0aGUgZHJhZ2dhYmxlIG1vZGVsIGRpcmVjdGl2ZSBhcHBsaWVkXG4gICAgICovXG4gICAgZ2V0TW9kZWxGcm9tRWxlbWVudChlbGVtZW50OiBFbGVtZW50KTogYW55IHtcblxuICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxzLmZpbmQoX21vZGVsID0+IF9tb2RlbC5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgPT09IGVsZW1lbnQpO1xuXG4gICAgICAgIGlmICghbW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1vZGVsLnV4UmVvcmRlcmFibGVNb2RlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHdlIGZpbmlzaCBkcmFnZ2luZyByZW1vdmUgdGhlIHV0aWxsaXR5IGNsYXNzIGZyb20gdGhlIGVsZW1lbnQgYmVpbmcgbW92ZWRcbiAgICAgKi9cbiAgICBvbkRyYWdFbmQoZXZlbnQ6IFJlb3JkZXJhYmxlRHJhZ0VuZEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQuZWxlbWVudCkpIHtcblxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3MoZXZlbnQuZWxlbWVudCwgJ3V4LXJlb3JkZXJhYmxlLW1vdmluZycpO1xuXG4gICAgICAgICAgICB0aGlzLnJlb3JkZXJFbmQuZW1pdCh7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogZXZlbnQuZWxlbWVudCxcbiAgICAgICAgICAgICAgICBtb2RlbDogZXZlbnQubW9kZWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2Ugd2FudCB0byBlbnN1cmUgdGhhdCB0aGUgY2xvbmVkIGVsZW1lbnQgaXMgaWRlbnRpY2FsXG4gICAgICogdG8gdGhlIG9yaWdpbmFsLCByZWdhcmRsZXNzIG9mIGl0J3MgbG9jYXRpb24gaW4gdGhlIERPTSB0cmVlXG4gICAgICovXG4gICAgb25DbG9uZShldmVudDogUmVvcmRlcmFibGVDbG9uZWRFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIGlmICh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQuZWxlbWVudCkpIHtcblxuICAgICAgICAgICAgdGhpcy5zZXRUYWJsZUNlbGxXaWR0aHMoZXZlbnQuZWxlbWVudCwgZXZlbnQuY2xvbmUpO1xuICAgICAgICAgICAgdGhpcy5jYXB0dXJlQ2FudmFzZXMoZXZlbnQuZWxlbWVudCwgZXZlbnQuY2xvbmUpO1xuXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhldmVudC5lbGVtZW50LCAndXgtcmVvcmRlcmFibGUtbW92aW5nJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZiBlbGVtZW50cyBjb250YWluIGhhbmRsZXMgdGhlbiBvbmx5IGRyYWcgd2hlbiB0aGUgaGFuZGxlIGlzIGRyYWdnZWRcbiAgICAgKiBvdGhlcndpc2UgZHJhZyB3aGVuZXZlciBhbiBpbW1lZGlhdGUgY2hpbGQgaXMgc3BlY2lmaWVkXG4gICAgICovXG4gICAgY2FuTW92ZShlbGVtZW50OiBFbGVtZW50LCBjb250YWluZXI6IEVsZW1lbnQsIGhhbmRsZTogRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5yZW9yZGVyaW5nRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVzLmxlbmd0aCA9PT0gMCA/IHRydWUgOiAhIXRoaXMuaGFuZGxlcy5maW5kKF9oYW5kbGUgPT4gX2hhbmRsZS5uYXRpdmVFbGVtZW50ID09PSBoYW5kbGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0VGFibGVDZWxsV2lkdGhzKHNvdXJjZTogRWxlbWVudCwgdGFyZ2V0OiBFbGVtZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgaXQgaXMgbm90IGEgdGFibGUgcm93IHRoZW4gc2tpcCB0aGlzXG4gICAgICAgIGlmIChzb3VyY2UudGFnTmFtZSAhPT0gJ1RSJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmluZCBhbnkgaW1tZWRpYXRlIHRkIGNoaWxkcmVuIGFuZCBmaXggdGhlaXIgd2lkdGhcbiAgICAgICAgY29uc3Qgc291cmNlQ2VsbHMgPSBBcnJheS5mcm9tKHNvdXJjZS5jaGlsZHJlbikgYXMgSFRNTFRhYmxlQ2VsbEVsZW1lbnRbXTtcbiAgICAgICAgY29uc3QgdGFyZ2V0Q2VsbHMgPSBBcnJheS5mcm9tKHRhcmdldC5jaGlsZHJlbikgYXMgSFRNTFRhYmxlQ2VsbEVsZW1lbnRbXTtcblxuICAgICAgICAvLyBmaXggdGhlIHdpZHRoIG9mIHRoZXNlIGNlbGxzXG4gICAgICAgIHNvdXJjZUNlbGxzLmZvckVhY2goKGNlbGwsIGlkeCkgPT4gdGFyZ2V0Q2VsbHNbaWR4XS5zdHlsZS5taW5XaWR0aCA9IGdldENvbXB1dGVkU3R5bGUoY2VsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYXB0dXJlQ2FudmFzZXMoc291cmNlOiBFbGVtZW50LCB0YXJnZXQ6IEVsZW1lbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBmaW5kIGFsbCBjaGlsZCBjYW52YXMgZWxlbWVudHNcbiAgICAgICAgY29uc3Qgc291cmNlQ2FudmFzZXMgPSBBcnJheS5mcm9tKHNvdXJjZS5xdWVyeVNlbGVjdG9yQWxsKCdjYW52YXMnKSk7XG4gICAgICAgIGNvbnN0IHRhcmdldENhbnZhc2VzID0gQXJyYXkuZnJvbSh0YXJnZXQucXVlcnlTZWxlY3RvckFsbCgnY2FudmFzJykpO1xuXG4gICAgICAgIC8vIHJlcGxpY2F0ZSB0aGUgY2FudmFzIGNvbnRlbnRcbiAgICAgICAgdGFyZ2V0Q2FudmFzZXMubWFwKGNhbnZhcyA9PiBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSlcbiAgICAgICAgICAgIC5mb3JFYWNoKChjb250ZXh0LCBpZHgpID0+IGNvbnRleHQuZHJhd0ltYWdlKHNvdXJjZUNhbnZhc2VzW2lkeF0sIDAsIDApKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlb3JkZXJFdmVudCB7XG4gICAgZWxlbWVudDogRWxlbWVudDtcbiAgICBtb2RlbDogYW55O1xufVxuIl19