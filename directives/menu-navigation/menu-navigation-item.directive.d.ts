import { ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { MenuNavigationService } from './menu-navigation.service';
export declare class MenuNavigationItemDirective implements OnDestroy {
    private _elementRef;
    activated: EventEmitter<void>;
    private _subscription;
    constructor(service: MenuNavigationService, _elementRef: ElementRef);
    ngOnDestroy(): void;
    setActive(): void;
}
