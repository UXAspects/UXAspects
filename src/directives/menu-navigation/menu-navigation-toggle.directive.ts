import { Directive, Input, HostListener, EventEmitter, Output, ElementRef } from '@angular/core';

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

    keyEnter = new EventEmitter<void>();

    private _menuOpen: boolean;

    constructor(private _elementRef: ElementRef) { }

    focus(): void {
        this._elementRef.nativeElement.focus();
    }

    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {

        if (this.isKeyMatch(event.key)) {

            // Open the menu
            this.menuOpen = true;

            // Allow the menu to init, then send the event to give it focus
            setTimeout(() => {
                this.keyEnter.emit();
            });

            event.preventDefault();
            event.stopPropagation();
        }
    }

    private isKeyMatch(key: string): boolean {
        switch (key) {
            case 'Enter':
            case ' ':
                return true;

            case 'ArrowUp':
            case 'Up':
                return this.menuPosition === 'top';

            case 'ArrowDown':
            case 'Down':
                return this.menuPosition === 'bottom';

            case 'ArrowLeft':
            case 'Left':
                return this.menuPosition === 'left';

            case 'ArrowRight':
            case 'Right':
                return this.menuPosition === 'right';
        }

        return false;
    }
}