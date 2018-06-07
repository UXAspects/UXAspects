import { OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { SelectionStrategy } from './strategies/selection.strategy';
export declare class SelectionService implements OnDestroy {
    private _selection;
    private _rowStrategy;
    private _simpleStrategy;
    dataset: any[];
    enabled: boolean;
    clickEnabled: boolean;
    keyboardEnabled: boolean;
    strategy: SelectionStrategy;
    active$: BehaviorSubject<any>;
    selection$: BehaviorSubject<any[]>;
    ngOnDestroy(): void;
    /**
     * If the item is not currently selected then add it
     * to the list of selected items
     */
    select(...selections: any[]): void;
    /**
     * Remove an item from the list of selected items
     */
    deselect(...selections: any[]): void;
    /**
     * Toggle the selected state of any specified items
     */
    toggle(...selections: any[]): void;
    /**
     * Determine whether or not a specific item is currently selected
     */
    isSelected(data: any): boolean;
    /**
     * Return an observable specifically for notifying the subscriber
     * only when the selection state of a specific object has changed
     */
    selected$(data: any): Observable<boolean>;
    /**
     * Define how selections should be performed.
     * This allows us to use an strategy pattern to handle the various keyboard
     * and mouse interactions while keeping each mode separated and
     * easily extensible if we want to add more modes in future!
     */
    setMode(mode: SelectionMode): void;
    /**
     * Set the current active item
     */
    activate(data: any): void;
    /**
     * Deactive all items
     */
    deactivate(): void;
    /**
     * Activate the sibling of the current active item.
     * If previous is set to true the previous sibling will be activated
     * rather than the next sibling. This function will also return the
     * data of the newly activated sibling
     */
    activateSibling(previous?: boolean): any;
    setDisabled(disabled: boolean): void;
    private selectionHasMutated();
}
export declare type SelectionMode = 'simple' | 'row';
