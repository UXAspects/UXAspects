import { ElementRef, Renderer2 } from '@angular/core';
import { FocusIndicatorOriginService } from './focus-indicator-origin.service';

/**
 * When working with component host elements
 * we cannot apply directives, eg. FocusIndicatorOriginDirective
 * however we may still want the functionality to be applied to
 * the host element. This class allows the host element to become
 * a focus indicator origin
 */
export class FocusIndicatorOrigin {

    /** Store all event handlers */
    private _handlers: (() => void)[] = [];

    /** Click events can be trigged by both mouse and keyboard so we want to ensure we emit the correct origin */
    private _isMouseEvent: boolean;

    constructor(private _focusIndicatorOrigin: FocusIndicatorOriginService, elementRef: ElementRef, renderer: Renderer2) {

        // add event handlers
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

    onMouseDown(): void {
        this._isMouseEvent = true;
    }

    onClick(): void {
        // if the click was triggered after a mousedown event then it is a keyboard event
        this._focusIndicatorOrigin.setOrigin(this._isMouseEvent ? 'mouse' : 'keyboard');

        // reset the mouse event flag
        this._isMouseEvent = false;
    }

    onKeydown(): void {
        this._isMouseEvent = false;
        this._focusIndicatorOrigin.setOrigin('keyboard');
    }

}