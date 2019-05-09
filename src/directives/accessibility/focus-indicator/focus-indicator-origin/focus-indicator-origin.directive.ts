import { Directive, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { FocusIndicatorOrigin } from './focus-indicator-origin';
import { FocusIndicatorOriginService } from './focus-indicator-origin.service';

@Directive({
    selector: '[uxFocusIndicatorOrigin]',
})
export class FocusIndicatorOriginDirective implements OnDestroy {

    /** Store the instance of the focus indicator origin */
    private _focusOrigin: FocusIndicatorOrigin;

    constructor(focusOriginService: FocusIndicatorOriginService, elementRef: ElementRef, renderer: Renderer2) {
        this._focusOrigin = new FocusIndicatorOrigin(focusOriginService, elementRef, renderer);
    }

    ngOnDestroy(): void {
        this._focusOrigin.destroy();
    }
}