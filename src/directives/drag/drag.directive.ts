import { Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, Output, Renderer2 } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, first, takeUntil } from 'rxjs/operators';
import { Coordinates } from '../../common/index';
import { DragService, UxDragEvent } from './drag.service';

export interface DragScrollEvent {
    pageX: number;
    pageY: number;
}

@Directive({
    selector: '[uxDrag]'
})
export class DragDirective<T = any> implements OnDestroy {

    /** Detemine if we should show a clone when dragging */
    @Input() clone: boolean = false;

    /** Define the group the drag event belongs to */
    @Input() group: string;

    /** Associate some data with the drag event */
    @Input() model: T;

    /** Allow the dragging to be enabled/disabled */
    @Input() draggable: boolean = true;

    /** Emit an event when dragging starts */
    @Output() onDragStart = new EventEmitter<MouseEvent>();

    /** Emit an event when the mouse moves while dragging */
    @Output() onDrag = new EventEmitter<MouseEvent>();

    /** Emit an event when the document scrolls while dragging */
    @Output() onDragScroll = new EventEmitter<DragScrollEvent>();

    /** Emit an event when the dragging finishes */
    @Output() onDragEnd = new EventEmitter<void>();

    /** Emit when the user drops an item in a drop area */
    @Output() onDrop = new EventEmitter<T>();

    /** Emit when the user drags over a drop area */
    @Output() onDropEnter = new EventEmitter<void>();

    /** Emit when the user drags out of a drop area */
    @Output() onDropLeave = new EventEmitter<void>();

    /** Store the element we have cloned */
    private _clone: Element;

    /** Store the dragging state */
    private _isDragging: boolean = false;

    /** Store the mouse offset for the cloned element position */
    private _offset: { x: number, y: number };

    /** Create an observable from the mouse down event */
    private _mousedown$ = fromEvent<MouseEvent>(this._elementRef.nativeElement, 'mousedown');

    /** Create an observable from the mouse move event */
    private _mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');

    /** Create an observable from the mouse up event */
    private _mouseup$ = fromEvent<MouseEvent>(document, 'mouseup');

    /** The current position of the cursor while dragging */
    private _dragPosition: Coordinates;

    /** The offset in pixels currently being scrolled while dragging */
    private _scrollOffset: Coordinates = { x: 0, y: 0 };

    /** The current `setInterval` handle for periodic scrolling */
    private _scrollIntervalHandle: number;

    /** Use an observable to unsubscribe from all subscriptions */
    protected _onDestroy = new Subject<void>();

    constructor(private _elementRef: ElementRef, private _ngZone: NgZone, private _renderer: Renderer2, private _drag: DragService<T>) {

        // ensure all mouse down events on the object are captured
        this._mousedown$.pipe(filter(() => this.draggable), takeUntil(this._onDestroy))
            .subscribe(this.dragStart.bind(this));

        // emit the outputs when drag events occur
        _drag.onDragStart.pipe(filter(() => this._isDragging), takeUntil(this._onDestroy))
            .subscribe((dragEvent: UxDragEvent<T>) => this.onDragStart.emit(dragEvent.event));

        _drag.onDrag.pipe(filter(() => this._isDragging), takeUntil(this._onDestroy))
            .subscribe((dragEvent: UxDragEvent<T>) => this.onDrag.emit(dragEvent.event));

        _drag.onDragEnd.pipe(filter(event => this._isDragging || (this.model && this.model === event.data)), takeUntil(this._onDestroy))
            .subscribe(() => this.onDragEnd.emit());

        _drag.onDrop.pipe(filter(() => this._isDragging), takeUntil(this._onDestroy))
            .subscribe((event: T) => this.onDrop.emit(event));

        _drag.onDropEnter.pipe(filter(() => this._isDragging), takeUntil(this._onDestroy))
            .subscribe(() => this.onDropEnter.emit());

        _drag.onDropLeave.pipe(filter(() => this._isDragging), takeUntil(this._onDestroy))
            .subscribe(() => this.onDropLeave.emit());
    }

    /** Emit events and create clone when drag starts */
    dragStart(event: MouseEvent): void {
        event.preventDefault();

        this._dragPosition = { x: event.pageX, y: event.pageY };

        if (this.clone) {
            // clone the node
            this.cloneNode(event);
        }

        // apply a class to the element being dragged
        this._renderer.addClass(this._elementRef.nativeElement, 'ux-drag-dragging');

        // store the dragging state
        this._isDragging = true;

        // emit the drag start event
        this._ngZone.run(() => this._drag.onDragStart.next({ event, group: this.group, data: this.model }));

        this._mousemove$.pipe(takeUntil(this._mouseup$), takeUntil(this._onDestroy))
            .subscribe(this.dragMove.bind(this));

        // When dragging stops emit the drag end
        this._mouseup$.pipe(first()).subscribe(this.dragEnd.bind(this));
    }

    /** Emit event and update clone position when dragging moves */
    dragMove(event: MouseEvent): void {
        event.preventDefault();

        this._dragPosition = { x: event.pageX, y: event.pageY };

        // scroll the viewport if needed
        this.updateScrolling(event);

        if (this._clone) {
            this.updateNodePosition(event);
        }

        // emit the drag start event
        this._ngZone.run(() => this._drag.onDrag.next({ event, group: this.group, data: this.model }));
    }

    /** Emit event and destroy clone when dragging ends */
    dragEnd(): void {

        this._dragPosition = null;

        // if the drag ended outside of the viewport, stop the scrolling interval
        this.stopScrolling();

        // if there was a clone, remove it
        if (this._clone) {
            this._renderer.removeChild(document.body, this._clone);
            this._clone = null;
        }

        // remove the dragging class
        this._renderer.removeClass(this._elementRef.nativeElement, 'ux-drag-dragging');

        // emit the on drag end output
        this._ngZone.run(() => this._drag.onDragEnd.next({ group: this.group, data: this.model }));

        // store the dragging state
        this._isDragging = false;
    }

    /** Create an exact clone of an element */
    cloneNode(event: MouseEvent): void {

        // duplicate the node
        this._clone = this._elementRef.nativeElement.cloneNode(true);

        // store the position within the draggable element
        const { top, left, width } = this._elementRef.nativeElement.getBoundingClientRect();
        this._offset = { x: event.clientX - left, y: event.clientY - top };

        // inline all styles so it looks identical regardless of its position in the DOM
        this.inlineStyles(this._elementRef.nativeElement, this._clone);

        // IE doesn't always calculate the correct width value using getComputedStyles... use bounding client value instead
        this._renderer.setStyle(this._clone, 'width', width + 'px');

        // ensure we can easily position the node an it is above all other elements
        this._renderer.setAttribute(this._clone, 'aria-hidden', 'true');
        this._renderer.setStyle(this._clone, 'position', 'absolute');
        this._renderer.setStyle(this._clone, 'z-index', '99999');

        // apply a class to allow custom styling
        this._renderer.addClass(this._clone, 'ux-drag-dragging-clone');

        // insert the cloned element
        this._renderer.appendChild(document.body, this._clone);

        // set the cloned element initial position
        this.updateNodePosition(event);
    }

    /** Position the clone relative to the mouse */
    updateNodePosition(event: MouseEvent): void {
        this._renderer.setStyle(this._clone, 'left', (event.pageX - this._offset.x) + 'px');
        this._renderer.setStyle(this._clone, 'top', (event.pageY - this._offset.y) + 'px');
    }

    /** Inline all styles to ensure styling is consistent regardless of its position in the dom */
    inlineStyles(source: Element, target: Element): void {
        // get all the computed styles from the source element
        const styles = getComputedStyle(source);

        // inline every specified style
        for (let idx = 0; idx < styles.length; idx++) {
            const style = styles.item(idx);

            if (style !== undefined) {
                this._renderer.setStyle(target, styles[idx], styles[style]);
            }
        }

        // ensure we dont capture any move events
        this._renderer.setStyle(target, 'pointer-events', 'none');

        // do the same for all the child elements
        for (let idx = 0; idx < source.children.length; idx++) {
            this.inlineStyles(source.children[idx], target.children[idx]);
        }
    }

    /** Unsubscribe from all subscriptions */
    ngOnDestroy(): void {
        this.stopScrolling();
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    private updateScrolling(event: MouseEvent): void {
        const scrollElement = document.documentElement;
        this._scrollOffset = this.getScrollOffsets(scrollElement, event);

        if (this._scrollOffset.x === 0 && this._scrollOffset.y === 0) {
            this.stopScrolling();
        } else {
            this.startScrolling(scrollElement);
        }
    }

    private getScrollOffsets(scrollElement: HTMLElement, event: MouseEvent): Coordinates {
        let scrollX = 0;
        let scrollY = 0;

        // additional amount to scroll since we want to scroll if the cursor is exactly at the edge of the viewport
        const minScroll = 5;

        if (event.clientX <= 0 && scrollElement.scrollLeft > 0) {
            scrollX = Math.min(event.clientX, -minScroll);
        } else if (event.clientX >= scrollElement.clientWidth && (scrollElement.scrollLeft + scrollElement.clientWidth) < scrollElement.scrollWidth) {
            scrollX = Math.max(event.clientX - scrollElement.clientWidth, minScroll);
        }

        if (event.clientY <= 0 && scrollElement.scrollTop > 0) {
            scrollY = Math.min(event.clientY, -minScroll);
        } else if (event.clientY >= scrollElement.clientHeight && (scrollElement.scrollTop + scrollElement.clientHeight) < scrollElement.scrollHeight) {
            scrollY = Math.max(event.clientY - scrollElement.clientHeight, minScroll);
        }

        return { x: scrollX, y: scrollY };
    }

    private updateDragPosition(): void {
        if (this._dragPosition) {
            this._dragPosition = {
                x: this._dragPosition.x + this._scrollOffset.x,
                y: this._dragPosition.y + this._scrollOffset.y
            };
        }
    }

    private startScrolling(scrollElement: HTMLElement): void {
        if (!this._scrollIntervalHandle) {
            this._scrollIntervalHandle = window.setInterval(() => this.performScroll(scrollElement), 100);
        }
    }

    private stopScrolling(): void {
        if (this._scrollIntervalHandle) {
            clearInterval(this._scrollIntervalHandle);
            this._scrollIntervalHandle = 0;
        }
    }

    private performScroll(scrollElement: HTMLElement): void {
        const previousLeft = scrollElement.scrollLeft;
        const previousTop = scrollElement.scrollTop;

        scrollElement.scrollLeft += this._scrollOffset.x;
        scrollElement.scrollTop += this._scrollOffset.y;

        // only emit event if scroll actually happened
        if (scrollElement.scrollLeft !== previousLeft || scrollElement.scrollTop !== previousTop) {
            this.updateDragPosition();
            this.onDragScroll.emit({ pageX: this._dragPosition.x, pageY: this._dragPosition.y});
        }
    }
}
