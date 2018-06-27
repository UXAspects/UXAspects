import { Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, Output, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Directive({
    selector: '[uxDrag]'
})
export class DragDirective implements OnDestroy {

    /** Detemine if we should show a clone when dragging */
    @Input() clone: boolean = false;

    /** Emit an event when dragging starts */
    @Output() dragstart = new EventEmitter<MouseEvent>();

    /** Emit an event when the mouse moves while dragging */
    @Output() drag = new EventEmitter<MouseEvent>();

    /** Emit an event when the dragging finishes */
    @Output() dragend = new EventEmitter<void>();

    /** Store the element we have cloned */
    private _clone: Element;

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

    constructor(private _elementRef: ElementRef, private _ngZone: NgZone, private _renderer: Renderer2) {
        this._mousedown$.pipe(takeUntil(this._onDestroy)).subscribe(this.dragStart.bind(this));
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

        // emit the drag start event
        this._ngZone.run(() => this.dragstart.emit(event));

        this._mousemove$.pipe(takeUntil(this._mouseup$), takeUntil(this._onDestroy))
            .subscribe(this.dragMove.bind(this), null, this.dragEnd.bind(this));
    }

    /** Emit event and update clone position when dragging moves */
    dragMove(event: MouseEvent): void {
        event.preventDefault();

        if (this._clone) {
            this.updateNodePosition(event);
        }

        // emit the drag start event
        this._ngZone.run(() => this.drag.emit(event));
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

        this._ngZone.run(() => this.dragend.emit());
    }

    /** Create an exact clone of an element */
    cloneNode(event: MouseEvent): void {

        // duplicate the node
        this._clone = this._elementRef.nativeElement.cloneNode(true);

        // store the position within the draggable element
        const { top, left } = this._elementRef.nativeElement.getBoundingClientRect();
        this._offset = { x: event.clientX - left, y: event.clientY - top };

        // inline all styles so it looks identical regardless of its position in the DOM
        this.inlineStyles(this._elementRef.nativeElement, this._clone);

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