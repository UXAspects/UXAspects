import { Directive, ElementRef, EventEmitter, inject, OnDestroy, Output } from '@angular/core';

@Directive({
    selector: '[uxFocusWithin],[uxBlurWithin]',
    standalone: false
})
export class FocusWithinDirective implements OnDestroy {
    private readonly _elementRef = inject(ElementRef);

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
    constructor() {

        // We need to listen in capture phase since focus events don't bubble.
        this._elementRef.nativeElement.addEventListener('focus', this.onFocus.bind(this), true);
        this._elementRef.nativeElement.addEventListener('blur', this.onBlur.bind(this), true);
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
