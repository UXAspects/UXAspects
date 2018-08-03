import { FocusKeyManager } from '@angular/cdk/a11y';
import { QueryList } from '@angular/core';
import { TabbableListItemDirective } from './tabbable-list-item.directive';
export declare class TabbableListService {
    focusKeyManager: FocusKeyManager<TabbableListItemDirective>;
    private _items;
    initialize(items: QueryList<TabbableListItemDirective>, direction: 'horizontal' | 'vertical', wrap: boolean): void;
    activate(item: TabbableListItemDirective): void;
    isItemActive(item: TabbableListItemDirective): boolean;
}
