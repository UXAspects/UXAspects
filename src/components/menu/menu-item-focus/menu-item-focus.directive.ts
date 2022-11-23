import { FocusableOption, FocusOrigin } from '@angular/cdk/a11y';
import { Directive, ElementRef, Inject, InjectionToken, OnDestroy, OnInit, Optional, Renderer2 } from '@angular/core';
import { FocusIndicatorService } from '../../../directives/accessibility/index';
import { MenuItemType } from '../menu-item/menu-item-type.enum';
import { MenuTabbableItemDirective } from '../menu-tabbable-item/menu-tabbable-item.directive';
import { MenuComponent } from '../menu/menu.component';

export const FocusableItemToken = new InjectionToken<FocusableOption>('Focusable Option');

@Directive({
    selector: '[uxMenuItemFocus]',
    host: {
        '[class.ux-menu-item]': 'true',
        'role': 'menuitem'
    }
})
export class MenuItemFocus extends MenuTabbableItemDirective implements OnInit, OnDestroy, FocusableOption {

    /** Indicate the type of the menu item */
    readonly type: MenuItemType = MenuItemType.Custom;

    constructor(
        readonly _menu: MenuComponent,
        readonly _elementRef: ElementRef<HTMLElement>,
        readonly  _focusIndicatorService: FocusIndicatorService,
        readonly _renderer: Renderer2,
        @Inject(FocusableItemToken) @Optional() private readonly _focusableOption: FocusableOption
    ) {
        super(_menu, _elementRef, _focusIndicatorService, _renderer);

        if (!_focusableOption) {
            throw new Error('This component cannot be used with the MenuItemFocus directive');
        }
    }

    /** Focus this item with a given origin */
    focus(origin: FocusOrigin): void {
        this.focusIndicator.focus(origin);
        this._focusableOption.focus();
    }
}
