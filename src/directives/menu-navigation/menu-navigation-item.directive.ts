import { Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { FocusIndicator, FocusIndicatorService } from '../accessibility/index';
import { MenuNavigationService } from './menu-navigation.service';

@Directive({
    selector: '[uxMenuNavigationItem]'
})
export class MenuNavigationItemDirective implements OnDestroy {

    /** Emit when this menu is activated */
    @Output() activated = new EventEmitter<void>();

    /** Unsubscribe from all observables on destroy */
    private _onDestroy = new Subject<void>();

    /** Keep a reference to the focus indicator */
    private _focusIndicator: FocusIndicator;

    constructor(private _menuNavigationService: MenuNavigationService, private _elementRef: ElementRef, focusIndicatorService: FocusIndicatorService) {

        // register this item with the menu - this allows for nested menus as we each uxMenuNavigation will create its own service
        _menuNavigationService.register(this);

        // create the focus indicator
        this._focusIndicator = focusIndicatorService.monitor(_elementRef.nativeElement, { programmaticFocusIndicator: true, checkChildren: false });

        /** Subscribe to the current active index */
        _menuNavigationService.active$.pipe(takeUntil(this._onDestroy), filter(item => item === this)).subscribe(() => this.setActive());
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