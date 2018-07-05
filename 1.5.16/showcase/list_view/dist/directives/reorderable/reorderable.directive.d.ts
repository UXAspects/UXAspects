import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, OnInit, QueryList, Renderer2 } from '@angular/core';
import { ReorderableModelDirective } from './reorderable-model.directive';
import { ReorderableClonedEvent, ReorderableDragEndEvent, ReorderableDragEvent, ReorderableDropEvent, ReorderableService } from './reorderable.service';
export declare class ReorderableDirective implements OnInit, AfterViewInit, OnDestroy {
    private _elementRef;
    private _renderer;
    private _service;
    reorderableModel: Array<any>;
    reorderableGroup: string;
    reorderingDisabled: boolean;
    reorderableModelChange: EventEmitter<any[]>;
    reorderStart: EventEmitter<ReorderEvent>;
    reorderCancel: EventEmitter<ReorderEvent>;
    reorderEnd: EventEmitter<ReorderEvent>;
    handles: QueryList<ElementRef>;
    models: QueryList<ReorderableModelDirective>;
    private _container;
    dragging: boolean;
    private _subscriptions;
    constructor(_elementRef: ElementRef, _renderer: Renderer2, _service: ReorderableService);
    /**
     * Initialise dragula and bind to all the required events
     */
    ngOnInit(): void;
    ngAfterViewInit(): void;
    /**
     * We need to destroy the dragula instance on component destroy
     */
    ngOnDestroy(): void;
    onDrag(event: ReorderableDragEvent): void;
    /**
     * This is fired when items get reordered - we need to emit the new order of the models
     */
    onDrop(event: ReorderableDropEvent): void;
    /**
     * Return the model assciated with a particular element in the list.
     * This should ensure that the items have the draggable model directive applied
     */
    getModelFromElement(element: Element): any;
    /**
     * When we finish dragging remove the utillity class from the element being moved
     */
    onDragEnd(event: ReorderableDragEndEvent): void;
    /**
     * We want to ensure that the cloned element is identical
     * to the original, regardless of it's location in the DOM tree
     */
    onClone(event: ReorderableClonedEvent): void;
    /**
     * If elements contain handles then only drag when the handle is dragged
     * otherwise drag whenever an immediate child is specified
     */
    canMove(element: Element, container: Element, handle: Element): boolean;
    private setTableCellWidths(source, target);
    private captureCanvases(source, target);
}
export interface ReorderEvent {
    element: Element;
    model: any;
}
