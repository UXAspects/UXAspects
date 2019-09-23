import { Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';

@Directive({
    selector: '[uxFocusWithin],[uxBlurWithin]',
})
export class FocusWithinDirective implements OnDestroy {

    /** Emits when a child element gains focus */
    @Output() uxFocusWithin = new EventEmitter<void>();

    /** Emits when a child element loses focus */
    @Output() uxBlurWithin = new EventEmitter<void>();

    /**
     * Note: We used to use @angular/cdk FocusMonitor here instead of manually listening
     * to focus blur events, however this was problematic as any child elements using the FocusMonitor,
     * eg: `uxFocusIndicator` which not get the correct `origin`, they will instead get a programmatic
     * origin even if it was clicked or focused via the keyboard.
     */
    constructor(private _elementRef: ElementRef) {

        // We need to listen in capture phase since focus events don't bubble.
        _elementRef.nativeElement.addEventListener('focus', this.onFocus.bind(this), true);
        _elementRef.nativeElement.addEventListener('blur', this.onBlur.bind(this), true);
    }

    ngOnDestroy(): void {
        this._elementRef.nativeElement.removeEventListener('focus', this.onFocus.bind(this), true);
        this._elementRef.nativeElement.removeEventListener('blur', this.onBlur.bind(this), true);
    }

    private onFocus(): void {
        this.uxFocusWithin.emit();
    }

    private onBlur(): void {
        this.uxBlurWithin.emit();
    }
}