import { EventEmitter, OnDestroy } from '@angular/core';
import { DragService, UxDragEvent } from './drag.service';
export declare class DropDirective implements OnDestroy {
    private _dragService;
    /** Define a specific group of dragged items to listen to */
    group: string | string[];
    /** Emit the model of the item dropped */
    onDrop: EventEmitter<any>;
    /** Determine whether or not the mouse is within the drop region */
    isMouseOver: boolean;
    /** Determine whether or not we are currently dragging an item */
    isDragging: boolean;
    /** Store the group of the dragged item */
    private _group;
    /** Ensure we destroy all subscriptions */
    private _onDestroy;
    constructor(_dragService: DragService);
    ngOnDestroy(): void;
    /** Update the mouse over state */
    onMouseOver(): void;
    /** Update the mouse over state */
    onMouseLeave(): void;
    /** Update the dragging state */
    onDragStart(event: UxDragEvent): void;
    /** Update the dragging state */
    onDragEnd(event: UxDragEvent): void;
    /** Determine whether or not the event is part of the specified groups */
    private isGroupAllowed(group);
}
