import { FocusOrigin } from '@angular/cdk/a11y';
import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { FocusIndicator, FocusIndicatorService } from '../accessibility/index';

@Directive({
    selector: '[uxMenuNavigationToggle]',
    exportAs: 'uxMenuNavigationToggle'
})
export class MenuNavigationToggleDirective implements OnDestroy {

    /** Define if the menu is open */
    @Input()
    get menuOpen(): boolean {
        return this._menuOpen;
    }

    set menuOpen(value: boolean) {
        this._menuOpen = value;
        this.menuOpenChange.emit(value);
    }

    /** Define the position the menu appears relative to the button */
    @Input() menuPosition: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

    /** Emit when the menu open state changes */
    @Output() menuOpenChange = new EventEmitter<boolean>();

    /** Emits whenever a key that opens the menu is pressed */
    @Output() keyEnter = new EventEmitter<void>();

    /** Store the current menu open state */
    private _menuOpen: boolean;

    /** Store a reference to the focus indicator */
    private _focusIndicator: FocusIndicator;

    constructor(elementRef: ElementRef, focusIndicatorService: FocusIndicatorService) {
        this._focusIndicator = focusIndicatorService.monitor(elementRef.nativeElement);
    }

    ngOnDestroy(): void {
        this._focusIndicator.destroy();
    }

    focus(origin?: FocusOrigin): void {
        this._focusIndicator.focus(origin);
    }

    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {

        if (this.isKeyMatch(event.which)) {

            // Open the menu
            this.menuOpen = true;

            // Allow the menu to init, then send the event to give it focus
            setTimeout(() => this.keyEnter.emit());

            event.preventDefault();
            event.stopPropagation();
        }
    }

    private isKeyMatch(key: number): boolean {
        switch (key) {
            case ENTER:
            case SPACE:
                return true;

            case UP_ARROW:
                return this.menuPosition === 'top';

            case DOWN_ARROW:
                return this.menuPosition === 'bottom';

            case LEFT_ARROW:
                return this.menuPosition === 'left';

            case RIGHT_ARROW:
                return this.menuPosition === 'right';
        }

        return false;
    }
}