import { Directive, HostListener } from '@angular/core';
import { FocusIndicatorOriginService } from './focus-indicator-origin.service';

@Directive({
    selector: '[uxFocusIndicatorOrigin]',
})
export class FocusIndicatorOriginDirective {

    /** Click events can be trigged by both mouse and keyboard so we want to ensure we emit the correct origin */
    private _isMouseEvent: boolean;

    constructor(private _focusIndicatorEvent: FocusIndicatorOriginService) { }

    @HostListener('mousedown')
    onMouseDown(): void {
        this._isMouseEvent = true;
    }

    @HostListener('click')
    onClick(): void {
        // if the click was triggered after a mousedown event then it is a keyboard event
        this._focusIndicatorEvent.setOrigin(this._isMouseEvent ? 'mouse' : 'keyboard');

        // reset the mouse event flag
        this._isMouseEvent = false;
    }

    @HostListener('keydown')
    onKeydown(): void {
        this._isMouseEvent = false;
        this._focusIndicatorEvent.setOrigin('keyboard');
    }
}