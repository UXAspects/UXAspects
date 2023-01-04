import { Directive, ElementRef, inject, OnDestroy, Renderer2 } from '@angular/core';
import { FocusIndicatorOrigin } from './focus-indicator-origin';
import { FocusIndicatorOriginService } from './focus-indicator-origin.service';

@Directive({
    selector: '[uxFocusIndicatorOrigin]',
})
export class FocusIndicatorOriginDirective implements OnDestroy {
    readonly focusOriginService = inject(FocusIndicatorOriginService);

    readonly elementRef = inject(ElementRef);

    readonly renderer = inject(Renderer2);

    /** Store the instance of the focus indicator origin */
    private _focusOrigin: FocusIndicatorOrigin;

    constructor() {
        this._focusOrigin = new FocusIndicatorOrigin(this.focusOriginService, this.elementRef, this.renderer);
    }

    ngOnDestroy(): void {
        this._focusOrigin.destroy();
    }
}