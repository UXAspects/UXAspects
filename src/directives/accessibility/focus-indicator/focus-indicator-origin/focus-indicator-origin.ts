import { ElementRef, Renderer2 } from '@angular/core';
import { FocusIndicatorOriginDirective } from './focus-indicator-origin.directive';
import { FocusIndicatorOriginService } from './focus-indicator-origin.service';

/**
 * When working with component host elements
 * we cannot apply directives, eg. FocusIndicatorOriginDirective
 * however we may still want the functionality to be applied to
 * the host element. This class allows the host element to become
 * a focus indicator origin
 */
export class FocusIndicatorOrigin extends FocusIndicatorOriginDirective {

    /** Store all event handlers */
    private _handlers: (() => void)[] = [];

    constructor(focusIndicatorOrigin: FocusIndicatorOriginService, elementRef: ElementRef, renderer: Renderer2) {
        super(focusIndicatorOrigin);

        // add event handlers)
        this._handlers = [
            renderer.listen(elementRef.nativeElement, 'click', () => this.onClick()),
            renderer.listen(elementRef.nativeElement, 'mousedown', () => this.onMouseDown()),
            renderer.listen(elementRef.nativeElement, 'keydown', () => this.onKeydown())
        ];
    }

    /** Remove all event handlers */
    destroy(): void {
        this._handlers.forEach(handler => handler());
    }

}