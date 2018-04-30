import { ElementRef, OnInit, QueryList, OnDestroy, EventEmitter, Renderer2, NgZone } from '@angular/core';
import { ReorderableModelDirective } from './reorderable-model.directive';
export declare class ReorderableDirective implements OnInit, OnDestroy {
    private _elementRef;
    private _renderer;
    private _ngZone;
    reorderableModel: Array<any>;
    reorderableModelChange: EventEmitter<any[]>;
    reorderStart: EventEmitter<ReorderEvent>;
    reorderCancel: EventEmitter<ReorderEvent>;
    reorderEnd: EventEmitter<ReorderEvent>;
    handles: QueryList<ElementRef>;
    models: QueryList<ReorderableModelDirective>;
    private _instance;
    constructor(_elementRef: ElementRef, _renderer: Renderer2, _ngZone: NgZone);
    /**
     * Initialise dragula and bind to all the required events
     */
    ngOnInit(): void;
    /**
     * We need to destroy the dragula instance on component destroy
     */
    ngOnDestroy(): void;
    /**
     * This is fired when items get reordered - we need to emit the new order of the models
     */
    onDrop(element: Element, target: Element, source: Element, sibling: HTMLElement): void;
    /**
     * Return the model assciated with a particular element in the list.
     * This should ensure that the items have the draggable model directive applied
     */
    getModelFromElement(element: Element): any;
    /**
     * When we finish dragging remove the utillity class from the element being moved
     */
    onDragEnd(element: Element): void;
    /**
     * We want to ensure that the cloned element is identical
     * to the original, regardless of it's location in the DOM tree
     */
    onClone(clone: Element, element: Element, type: string): void;
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
