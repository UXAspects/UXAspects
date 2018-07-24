import { Directive, Output, EventEmitter, ElementRef, OnDestroy, Input } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Directive({
    selector: '[focusWithin],[blurWithin]',
})
export class FocusWithinDirective implements OnDestroy {

    @Output() focusWithin = new EventEmitter<void>();
    @Output() blurWithin = new EventEmitter<void>();

    private _target: Element = document.activeElement;
    private _onDestroy = new Subject<void>();

    constructor(private _elementRef: ElementRef) {

        // create observables from window events
        const focus = fromEvent(window, 'focus', { capture: true });
        const blur = fromEvent(window, 'blur', { capture: true });

        // watch for any changes to the focus or blur event within the document
        merge(focus, blur).pipe(takeUntil(this._onDestroy)).subscribe(this.focusChange.bind(this));
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** When the focus has changed within the document, update the focus within status */
    private focusChange(): void {

        // check if the focused element has changed
        if (document.activeElement === this._target) {
            return;
        }

        // check if the active element is within the current element
        const isFocusWithin = this._elementRef.nativeElement.contains(document.activeElement);

        // emit the appropriate event
        isFocusWithin ? this.focusWithin.emit() : this.blurWithin.emit();

        // store the focused element
        this._target = document.activeElement;
    }
}