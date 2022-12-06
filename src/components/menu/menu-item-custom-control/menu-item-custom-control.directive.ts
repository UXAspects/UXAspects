import { FocusableOption, FocusOrigin } from '@angular/cdk/a11y';
import { Directive, ElementRef, Inject, InjectionToken, OnDestroy, OnInit, Optional, Renderer2 } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FocusIndicatorService } from '../../../directives/accessibility';
import { FocusableControl } from '../interfaces/focusable-control.interface';
import { MenuItemType } from '../menu-item/menu-item-type.enum';
import { MenuTabbableItemDirective } from '../menu-tabbable-item/menu-tabbable-item.directive';
import { MenuComponent } from '../menu/menu.component';

export const FocusableItemToken = new InjectionToken<FocusableControl>('Focusable Option');

@Directive({
    selector: '[uxMenuItemCustomControl]',
    host: {
        '[class.ux-menu-item]': 'true',
        'role': 'menuitem'
    }
})
export class MenuItemCustomControlDirective extends MenuTabbableItemDirective implements FocusableOption, OnInit, OnDestroy {

    /** Indicate the type of the menu item */
    readonly type: MenuItemType = MenuItemType.Custom;

    constructor(
        readonly _menu: MenuComponent,
        readonly _elementRef: ElementRef<HTMLElement>,
        readonly _focusIndicatorService: FocusIndicatorService,
        readonly _renderer: Renderer2,
        @Inject(FocusableItemToken) @Optional() private readonly _focusableControl?: FocusableControl
    ) {
        super(_menu, _elementRef, _focusIndicatorService, _renderer);
    }

    ngOnInit(): void {
        // register this item in the MenuComponent
        super.ngOnInit();

        this._menu.opened
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => {
                // remove any existing tab index on component instance and have it handled by this directive
                this._focusableControl.setInputTabIndex(-1);
            });
    }

    /** Focus this item with a given origin */
    focus(origin: FocusOrigin): void {
        super.focus(origin);
        this._focusableControl ? this._focusableControl.focus(origin) : this._elementRef.nativeElement.focus();
    }

    /** We want to remove the ability to shift+tab back into the parent element */
    protected setTabIndex(): void {
        super.setTabIndex(false);
    }
}
