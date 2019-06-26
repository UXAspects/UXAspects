import { AfterViewInit, ContentChildren, Directive, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output, QueryList, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReorderableHandleDirective } from './reorderable-handle.directive';
import { ReorderableModelDirective } from './reorderable-model.directive';
import { ReorderableCancelEvent, ReorderableClonedEvent, ReorderableContainer, ReorderableDragEndEvent, ReorderableDragEvent, ReorderableDropEvent, ReorderableService } from './reorderable.service';

@Directive({
    selector: '[uxReorderable]'
})
export class ReorderableDirective<T> implements OnInit, AfterViewInit, OnDestroy {

    /**
     * This property can be used to provide the `uxReorderable` directive with a dataset that represents the items that can be reordered.
     * This can used as a two way binding which will ensure the dataset always reflects the current order of items in the list.
     * Each list item should have a `uxReorderableModel` directive applied, with a value indicating which item in the dataset it represents.
     *
     * If the list is generated using `ngFor` this property should be bound to the same dataset.
     * If there is no dataset representing the items then this property is not required.
     */
    @Input() reorderableModel: Array<any>;

    /**
     * The name of the reorderable group which this container belongs to `uxReorderable` elements which belong to
     * the same group can have items dragged between them. Only required if multiple drop containers are being created.
     */
    @Input() reorderableGroup: string;

    /** Determines if reordering is disabled. */
    @Input() reorderingDisabled: boolean = false;

    /**
     * This event will be triggered when the order changes and will contain an updated dataset containing the items
     * in their current order. This should be used when the list of items is generated using ngFor to ensure the
     * data remains in the same order for both the `uxReorderable` and `ngFor` directives.
     */
    @Output() reorderableModelChange = new EventEmitter<Array<any>>();

    /** This event is triggered when a user begins dragging an item. The event will contain the element being moved. */
    @Output() reorderStart = new EventEmitter<ReorderEvent>();

    /** This event is triggered when the item being dragged is returned to the same location as it began. The event will contain the element that was being moved. */
    @Output() reorderCancel = new EventEmitter<ReorderEvent>();

    /** This event is triggered when a user has relocated an item. The event will contain the element that was moved. */
    @Output() reorderEnd = new EventEmitter<ReorderEvent>();

    @ContentChildren(ReorderableHandleDirective, { read: ElementRef, descendants: true }) handles: QueryList<ElementRef>;
    @ContentChildren(ReorderableModelDirective) models: QueryList<ReorderableModelDirective<T>>;

    private _container: ReorderableContainer;

    @HostBinding('class.ux-reorderable-container-moving') dragging = false;

    private _subscriptions = new Subscription();

    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        private _service: ReorderableService
    ) { }

    /**
     * Initialise dragula and bind to all the required events
     */
    ngOnInit(): void {

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
        const group = this._service.register(this.reorderableGroup, this._container);
        this._subscriptions.add(group.drag.subscribe(this.onDrag.bind(this)));
        this._subscriptions.add(group.dragEnd.subscribe(this.onDragEnd.bind(this)));
        this._subscriptions.add(group.drop.subscribe(this.onDrop.bind(this)));
        this._subscriptions.add(group.cancel.subscribe((event: ReorderableCancelEvent) => this.reorderCancel.emit({ element: event.element, model: event.model })));
        this._subscriptions.add(group.cloned.subscribe(this.onClone.bind(this)));
    }

    ngAfterViewInit(): void {
        this._service.initialize(this.reorderableGroup);
    }

    /**
     * We need to destroy the dragula instance on component destroy
     */
    ngOnDestroy(): void {
        this._service.unregister(this.reorderableGroup, this._container);
        this._subscriptions.unsubscribe();
    }

    onDrag(event: ReorderableDragEvent): void {

        this.dragging = true;

        this.reorderStart.emit({ element: event.element, model: event.model });
    }

    /**
     * This is fired when items get reordered - we need to emit the new order of the models
     */
    onDrop(event: ReorderableDropEvent): void {

        // if there is no provided module we can skip this
        if (!this.reorderableModel) {
            return;
        }

        let changed = false;

        if (event.source.isSameNode(this._elementRef.nativeElement)) {

            // remove this model from the list of models
            const index = this.reorderableModel.indexOf(event.model);
            if (index >= 0) {
                this.reorderableModel.splice(index, 1);
                changed = true;
            }
        }

        if (event.target.isSameNode(this._elementRef.nativeElement)) {

            // get the position of sibling element
            const index = event.sibling && !event.sibling.classList.contains('gu-mirror') ?
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
     */
    getModelFromElement(element: Element): any {

        const model = this.models.find(_model => _model.elementRef.nativeElement === element);

        if (!model) {
            return null;
        }

        return model.uxReorderableModel;
    }

    /**
     * When we finish dragging remove the utillity class from the element being moved
     */
    onDragEnd(event: ReorderableDragEndEvent): void {

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
     */
    onClone(event: ReorderableClonedEvent): void {

        if (this._elementRef.nativeElement.contains(event.element)) {

            this.setTableCellWidths(event.element, event.clone);
            this.captureCanvases(event.element, event.clone);

            this._renderer.addClass(event.element, 'ux-reorderable-moving');
        }
    }

    /**
     * If elements contain handles then only drag when the handle is dragged
     * otherwise drag whenever an immediate child is specified
     */
    canMove(element: Element, container: Element, handle: Element): boolean {
        if (this.reorderingDisabled) {
            return false;
        }
        return this.handles.length === 0 ? true : !!this.handles.find(_handle => _handle.nativeElement === handle);
    }

    private setTableCellWidths(source: Element, target: Element): void {

        // if it is not a table row then skip this
        if (source.tagName !== 'TR') {
            return;
        }

        // find any immediate td children and fix their width
        const sourceCells = Array.from(source.children) as HTMLTableCellElement[];
        const targetCells = Array.from(target.children) as HTMLTableCellElement[];

        // fix the width of these cells
        sourceCells.forEach((cell, idx) => targetCells[idx].style.minWidth = getComputedStyle(cell).getPropertyValue('width'));
    }

    private captureCanvases(source: Element, target: Element): void {

        // find all child canvas elements
        const sourceCanvases = Array.from(source.querySelectorAll('canvas'));
        const targetCanvases = Array.from(target.querySelectorAll('canvas'));

        // replicate the canvas content
        targetCanvases.map(canvas => canvas.getContext('2d'))
            .forEach((context, idx) => context.drawImage(sourceCanvases[idx], 0, 0));

    }

}

export interface ReorderEvent {
    element: Element;
    model: any;
}
