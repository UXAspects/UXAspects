import { Directive, Input, ElementRef, OnInit, ContentChildren, QueryList, OnDestroy, Output, EventEmitter, Renderer2, AfterViewInit, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Drake } from 'dragula';
import { ReorderableHandleDirective } from './reorderable-handle.directive';
import { ReorderableModelDirective } from './reorderable-model.directive';
import { ReorderableService, ReorderableContainer, ReorderableDragEvent, ReorderableDragEndEvent, ReorderableDropEvent, ReorderableClonedEvent, ReorderableCancelEvent } from './reorderable.service';
import { dragula } from './dragula';

@Directive({
    selector: '[uxReorderable]'
})
export class ReorderableDirective implements OnInit, AfterViewInit, OnDestroy {

    @Input() reorderableModel: Array<any>;
    @Input() reorderableGroup: string;
    @Output() reorderableModelChange = new EventEmitter<Array<any>>();
    @Output() reorderStart = new EventEmitter<ReorderEvent>();
    @Output() reorderCancel = new EventEmitter<ReorderEvent>();
    @Output() reorderEnd = new EventEmitter<ReorderEvent>();

    @ContentChildren(ReorderableHandleDirective, { read: ElementRef, descendants: true }) handles: QueryList<ElementRef>;
    @ContentChildren(ReorderableModelDirective) models: QueryList<ReorderableModelDirective>;

    private _instance: Drake;
    private _container: ReorderableContainer;

    @HostBinding('class.ux-reorderable-container-moving')
    private _dragging = false;

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

        this._dragging = true;

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

        this._dragging = false;

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
