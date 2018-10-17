import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: '[uxMenuNavigationToggle]',
    exportAs: 'uxMenuNavigationToggle'
})
export class MenuNavigationToggleDirective {

    @Input()
    get menuOpen(): boolean {
        return this._menuOpen;
    }

    set menuOpen(value: boolean) {
        this._menuOpen = value;
        this.menuOpenChange.emit(value);
    }

    @Input()
    menuPosition: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

    @Output()
    menuOpenChange = new EventEmitter<boolean>();

    @Output()
    keyEnter = new EventEmitter<void>();

    private _menuOpen: boolean;

    constructor(private _elementRef: ElementRef) { }

    focus(): void {
        this._elementRef.nativeElement.focus();
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