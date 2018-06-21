import { ElementRef, EventEmitter } from '@angular/core';
export declare class MenuNavigationToggleDirective {
    private _elementRef;
    menuOpen: boolean;
    menuPosition: 'top' | 'right' | 'bottom' | 'left';
    menuOpenChange: EventEmitter<boolean>;
    keyEnter: EventEmitter<void>;
    private _menuOpen;
    constructor(_elementRef: ElementRef);
    focus(): void;
    keydownHandler(event: KeyboardEvent): void;
    private isKeyMatch(key);
}
