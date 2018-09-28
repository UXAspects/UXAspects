import { ElementRef, EventEmitter, NgZone, OnDestroy, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DragService } from './drag.service';
export declare class DragDirective implements OnDestroy {
    private _elementRef;
    private _ngZone;
    private _renderer;
    private _drag;
    /** Detemine if we should show a clone when dragging */
    clone: boolean;
    /** Define the group the drag event belongs to */
    group: string;
    /** Associate some data with the drag event */
    model: any;
    /** Allow the dragging to be enabled/disabled */
    draggable: boolean;
    /** Emit an event when dragging starts */
    onDragStart: EventEmitter<MouseEvent>;
    /** Emit an event when the mouse moves while dragging */
    onDrag: EventEmitter<MouseEvent>;
    /** Emit an event when the dragging finishes */
    onDragEnd: EventEmitter<void>;
    /** Emit when the user drops an item in a drop area */
    onDrop: EventEmitter<any>;
    /** Emit when the user drags over a drop area */
    onDropEnter: EventEmitter<void>;
    /** Emit when the user drags out of a drop area */
    onDropLeave: EventEmitter<void>;
    /** Store the element we have cloned */
    private _clone;
    /** Store the dragging state */
    private _isDragging;
    /** Store the mouse offset for the cloned element position */
    private _offset;
    /** Create an observable from the mouse down event */
    private _mousedown$;
    /** Create an observable from the mouse move event */
    private _mousemove$;
    /** Create an observable from the mouse up event */
    private _mouseup$;
    /** Use an observable to unsubscribe from all subscriptions */
    protected _onDestroy: Subject<void>;
    constructor(_elementRef: ElementRef, _ngZone: NgZone, _renderer: Renderer2, _drag: DragService);
    /** Emit events and create clone when drag starts */
    dragStart(event: MouseEvent): void;
    /** Emit event and update clone position when dragging moves */
    dragMove(event: MouseEvent): void;
    /** Emit event and destroy clone when dragging ends */
    dragEnd(): void;
    /** Create an exact clone of an element */
    cloneNode(event: MouseEvent): void;
    /** Position the clone relative to the mouse */
    updateNodePosition(event: MouseEvent): void;
    /** Inline all styles to ensure styling is consistent regardless of its position in the dom */
    inlineStyles(source: Element, target: Element): void;
    /** Unsubscribe from all subscriptions */
    ngOnDestroy(): void;
}
