import { Directive, Output, EventEmitter, ElementRef, NgZone, OnDestroy, Input, HostListener } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { takeUntil } from 'rxjs/operators/takeUntil';

@Directive({ 
    selector: '[uxDrag]' 
})
export class DragDirective implements OnDestroy {

    @Output() dragstart = new EventEmitter<MouseEvent>();
    @Output() drag = new EventEmitter<MouseEvent>();
    @Output() dragend = new EventEmitter<void>();

    private _subscription: Subscription;

    constructor(elementRef: ElementRef, ngZone: NgZone) {
        const mousedown$ = fromEvent<MouseEvent>(elementRef.nativeElement, 'mousedown');
        const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');
        const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup');

        this._subscription = mousedown$.subscribe(event => {
            event.preventDefault();

            // emit the drag start event 
            ngZone.run(() => this.dragstart.emit(event));

            mousemove$.pipe(takeUntil<MouseEvent>(mouseup$)).subscribe(moveevent => {
                moveevent.preventDefault();

                // emit the drag start event 
                ngZone.run(() => this.drag.emit(moveevent));
            }, null, 
            () => ngZone.run(() => this.dragend.emit()));
        });
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}