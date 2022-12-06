import { FocusableOption, FocusOrigin } from '@angular/cdk/a11y';
import { Directive, ElementRef, Inject, InjectionToken, OnDestroy, OnInit, Optional, Renderer2 } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FocusIndicatorService } from '../../../directives/accessibility';
import { MenuItemType } from '../menu-item/menu-item-type.enum';
import { MenuTabbableItemDirective } from '../menu-tabbable-item/menu-tabbable-item.directive';
import { MenuComponent } from '../menu/menu.component';

export const FocusableItemToken = new InjectionToken<FocusableOption>('Focusable Option');

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
        @Inject(FocusableItemToken) @Optional() private readonly _focusableOption: FocusableOption
    ) {
        super(_menu, _elementRef, _focusIndicatorService, _renderer);
    }


    ngOnInit(): void {
        // register this item in the MenuComponent
        super.ngOnInit();

        this._menu.opened
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => {
                this.removeInternalTabIndex();
            });
    }

    /** Focus this item with a given origin */
    focus(origin: FocusOrigin): void {
        super.focus(origin);
        this._focusableOption ? this._focusableOption.focus(origin) : this._elementRef.nativeElement.focus();
    }

    // remove any existing tab index on component instance and have it handled by this directive
    private removeInternalTabIndex(): void {
        const elementsWithTabIndex = this._elementRef.nativeElement.querySelectorAll('[tabindex]');

        if (elementsWithTabIndex.length === 0) {
            return;
        }

        elementsWithTabIndex.forEach(element => this._renderer.setAttribute(element, 'tabindex', '-1'));
    }
}
