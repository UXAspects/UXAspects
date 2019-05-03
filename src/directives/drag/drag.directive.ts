import { Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, Output, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { filter, first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { DragService, UxDragEvent } from './drag.service';

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

        if (this._clone) {
            this.updateNodePosition(event);
        }

        // emit the drag start event
        this._ngZone.run(() => this._drag.onDrag.next({ event, group: this.group, data: this.model }));
    }

    /** Emit event and destroy clone when dragging ends */
    dragEnd(): void {
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
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}