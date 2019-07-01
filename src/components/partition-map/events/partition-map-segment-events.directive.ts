import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[segmentFocus],[segmentBlur]',
})
export class PartitionMapSegmentEventsDirective implements AfterViewInit, OnDestroy {

    /** Emit when the segment receives focus */
    @Output() segmentFocus = new EventEmitter<FocusEvent>();

    /** Emit when the segment is blurred */
    @Output() segmentBlur = new EventEmitter<FocusEvent>();

    /** Unsubscribe from observables */
    private _onDestroy = new Subject<void>();

    constructor(private _elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        // Get the parent segment element
        // Note we cannot use DI to get the element as this is a template
        // and the context has no knowledge of the partition map template
        const segment = this.getSegmentElement();

        if (segment) {
            fromEvent<FocusEvent>(segment, 'focus')
                .pipe(takeUntil(this._onDestroy))
                .subscribe(event => this.segmentFocus.emit(event));

            fromEvent<FocusEvent>(segment, 'blur')
                .pipe(takeUntil(this._onDestroy))
                .subscribe(event => this.segmentBlur.emit(event));
        }
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /**
     * Find the parent element that is a partition map segment
     */
    private getSegmentElement(): HTMLElement {
        let ancestor = (this._elementRef.nativeElement as HTMLElement).parentElement;

        while (ancestor !== null) {
            if (ancestor.classList.contains('partition-map-segment')) {
                return ancestor;
            }
            ancestor = ancestor.parentElement;
        }
    }
}