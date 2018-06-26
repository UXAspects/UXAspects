import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { RowSelectionStrategy } from './strategies/row-selection.strategy';
import { SelectionStrategy } from './strategies/selection.strategy';
import { SimpleSelectionStrategy } from './strategies/simple-selection.strategy';

@Injectable()
export class SelectionService implements OnDestroy {

  private _selection = new Set();
  private _rowStrategy = new RowSelectionStrategy(this);
  private _simpleStrategy = new SimpleSelectionStrategy(this);

  dataset: any[] = [];
  enabled: boolean = true;
  clickEnabled: boolean = true;
  keyboardEnabled: boolean = true;
  strategy: SelectionStrategy = this._simpleStrategy;

  active$ = new BehaviorSubject<any>(null);
  focusTarget$ = new BehaviorSubject<any>(null);
  selection$ = new BehaviorSubject<any[]>([]);

  ngOnDestroy(): void {
    this._rowStrategy.destroy();
    this._simpleStrategy.destroy();
  }

  /**
   * If the item is not currently selected then add it
   * to the list of selected items
   */
  select(...selections: any[]): void {

    // add each selection to the set
    selections.forEach(selection => this._selection.add(selection));

    // propagate the changes
    this.selectionHasMutated();
  }

  /**
   * Remove an item from the list of selected items
   */
  deselect(...selections: any[]): void {
    // remove each item from the set
    selections.forEach(selection => this._selection.delete(selection));

    // propagate the changes
    this.selectionHasMutated();
  }

  /**
   * Toggle the selected state of any specified items
   */
  toggle(...selections: any[]): void {
    selections.forEach(selection => this.isSelected(selection) ? this.deselect(selection) : this.select(selection));
  }

  /**
   * Determine whether or not a specific item is currently selected
   */
  isSelected(data: any): boolean {
    return this._selection.has(data);
  }

  /**
   * Return an observable specifically for notifying the subscriber
   * only when the selection state of a specific object has changed
   */
  selected$(data: any): Observable<boolean> {
    return this.selection$.pipe(map(() => this.isSelected(data)), distinctUntilChanged());
  }

  /**
   * Define how selections should be performed.
   * This allows us to use an strategy pattern to handle the various keyboard
   * and mouse interactions while keeping each mode separated and
   * easily extensible if we want to add more modes in future!
   */
  setMode(mode: SelectionMode): void {

    switch (mode.toLowerCase().trim()) {

      case 'simple':
        this.strategy = this._simpleStrategy;
        break;

      case 'row':
        this.strategy = this._rowStrategy;
        break;

      default:
        throw new Error(`The selection mode '${mode}' does not exist. Valid modes are 'simple' or 'row'.`);
    }
  }

  /**
   * Set the current active item
   */
  activate(data: any): void {
    this.active$.next(data);
  }

  /**
   * Deactive all items
   */
  deactivate(): void {
    this.active$.next(null);
  }

  /**
   * Activate the sibling of the current active item.
   * If previous is set to true the previous sibling will be activated
   * rather than the next sibling. This function will also return the
   * data of the newly activated sibling
   */
  activateSibling(previous: boolean = false): any {

    // get the currently active item
    const current = this.active$.getValue();

    // check if there is a current active item
    if (!current) {
      return;
    }

    // get the index of the current item
    const idx = this.dataset.indexOf(current);
    const target = this.dataset[previous ? idx - 1 : idx + 1];

    // check if the target exists
    if (target) {
      this.activate(target);
    }

    return target;
  }

  setDisabled(disabled: boolean): void {
    // store the current disabled state
    this.enabled = !disabled;

    // clear any stateful data
    this.active$.next(null);
    this._selection.clear();

    // emit the selection change information
    this.selectionHasMutated();
  }

  private selectionHasMutated(): void {
    this.selection$.next(Array.from(this._selection));
  }
}

export type SelectionMode = 'simple' | 'row';
