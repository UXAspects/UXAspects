import { FocusMonitor } from '@angular/cdk/a11y';
import { Directive, ElementRef, EventEmitter, NgZone, OnDestroy, Output } from '@angular/core';

@Directive({
    selector: '[focusWithin],[blurWithin]',
})
export class FocusWithinDirective implements OnDestroy {

    @Output() focusWithin = new EventEmitter<void>();
    @Output() blurWithin = new EventEmitter<void>();

    constructor(private _elementRef: ElementRef, private _focusMonitor: FocusMonitor, ngZone: NgZone) {
        _focusMonitor.monitor(this._elementRef.nativeElement, true)
            .subscribe(origin => ngZone.run(() => origin ? this.focusWithin.emit() : this.blurWithin.emit()));
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
}