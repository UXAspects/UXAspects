import { ElementRef, EventEmitter, NgZone, OnDestroy, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs/Subject';
export declare class DragDirective implements OnDestroy {
    private _elementRef;
    private _ngZone;
    private _renderer;
    /** Detemine if we should show a clone when dragging */
    clone: boolean;
    /** Allow the dragging to be enabled/disabled */
    draggable: boolean;
    /** Emit an event when dragging starts */
    dragstart: EventEmitter<MouseEvent>;
    /** Emit an event when the mouse moves while dragging */
    drag: EventEmitter<MouseEvent>;
    /** Emit an event when the dragging finishes */
    dragend: EventEmitter<void>;
    /** Store the element we have cloned */
    private _clone;
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
    constructor(_elementRef: ElementRef, _ngZone: NgZone, _renderer: Renderer2);
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
