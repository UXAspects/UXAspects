import { FocusKeyManager } from '@angular/cdk/a11y';
import { OnDestroy, QueryList } from '@angular/core';
import { TabbableListItemDirective } from './tabbable-list-item.directive';
export declare class TabbableListService implements OnDestroy {
    allowAltModifier: boolean;
    allowCtrlModifier: boolean;
    focusKeyManager: FocusKeyManager<TabbableListItemDirective>;
    private _items;
    private _onDestroy;
    ngOnDestroy(): void;
    initialize(items: QueryList<TabbableListItemDirective>, direction: 'horizontal' | 'vertical', wrap: boolean): void;
    activate(item: TabbableListItemDirective): void;
    isItemActive(item: TabbableListItemDirective): boolean;
    setFirstItemTabbable(): void;
    ensureTabbableItem(): void;
    focusTabbableItem(): void;
}
