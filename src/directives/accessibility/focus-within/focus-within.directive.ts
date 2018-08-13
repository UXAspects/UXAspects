import { FocusMonitor } from '@angular/cdk/a11y';
import { Directive, ElementRef, EventEmitter, NgZone, OnDestroy, Output } from '@angular/core';

@Directive({
    selector: '[uxFocusWithin],[uxBlurWithin]',
})
export class FocusWithinDirective implements OnDestroy {

    @Output() uxFocusWithin = new EventEmitter<void>();
    @Output() uxBlurWithin = new EventEmitter<void>();

    constructor(private _elementRef: ElementRef, private _focusMonitor: FocusMonitor, ngZone: NgZone) {
        _focusMonitor.monitor(this._elementRef.nativeElement, true)
            .subscribe(origin => ngZone.run(() => origin ? this.uxFocusWithin.emit() : this.uxBlurWithin.emit()));
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
}