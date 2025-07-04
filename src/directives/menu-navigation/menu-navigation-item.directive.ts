import { Directive, ElementRef, EventEmitter, inject, OnDestroy, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { FocusIndicator, FocusIndicatorService } from '../accessibility/index';
import { MenuNavigationService } from './menu-navigation.service';

@Directive({
    selector: '[uxMenuNavigationItem]',
    standalone: false
})
export class MenuNavigationItemDirective implements OnDestroy {
    readonly focusIndicatorService = inject(FocusIndicatorService);

    private readonly _elementRef = inject(ElementRef);

    private readonly _menuNavigationService = inject(MenuNavigationService);

    /** Emit when this menu is activated */
    @Output() activated = new EventEmitter<void>();

    /** Unsubscribe from all observables on destroy */
    private readonly _onDestroy = new Subject<void>();

    /** Keep a reference to the focus indicator */
    private readonly _focusIndicator: FocusIndicator;

    constructor() {

        // register this item with the menu - this allows for nested menus as we each uxMenuNavigation will create its own service
        this._menuNavigationService.register(this);

        // create the focus indicator
        this._focusIndicator = this.focusIndicatorService.monitor(this._elementRef.nativeElement, { programmaticFocusIndicator: true, checkChildren: false });

        /** Subscribe to the current active index */
        this._menuNavigationService.active$.pipe(takeUntil(this._onDestroy), filter(item => item === this)).subscribe(() => this.setActive());
    }

    ngOnDestroy(): void {
        this._menuNavigationService.unregister(this);
        this._onDestroy.unsubscribe();
        this._focusIndicator.destroy();
    }

    setActive(): void {
        this._elementRef.nativeElement.focus();
        this.activated.emit();
    }
}