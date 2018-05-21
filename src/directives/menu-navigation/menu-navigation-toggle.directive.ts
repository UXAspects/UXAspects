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
    keys = ['Enter', 'ArrowDown'];

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

        if (this.keys.find((k) => k === event.key)) {

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
}