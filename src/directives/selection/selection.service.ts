import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { RowAltSelectionStrategy } from './strategies/row-alt-selection.strategy';
import { RowSelectionStrategy } from './strategies/row-selection.strategy';
import { SelectionStrategy } from './strategies/selection.strategy';
import { SimpleSelectionStrategy } from './strategies/simple-selection.strategy';

@Injectable()
export class SelectionService implements OnDestroy {

  set dataset(dataset: ReadonlyArray<any>) {
    this._dataset = dataset;
    if (this._dataset.indexOf(this._active) === -1) {
      this.setFirstItemFocusable();
    }
  }

  get dataset(): ReadonlyArray<any> {
    return this._dataset;
  }

  strategy: SelectionStrategy = new SimpleSelectionStrategy(this);
  isEnabled: boolean = true;
  isClickEnabled: boolean = true;
  isKeyboardEnabled: boolean = true;

  focus$ = new BehaviorSubject<any>(null);
  active$ = new BehaviorSubject<any>(null);
  selection$ = new BehaviorSubject<any[]>([]);

  private _active: any;
  private _dataset: ReadonlyArray<any> = [];
  private _selection = new Set();
  private _strategyToDestroy: SelectionStrategy = this.strategy;

  ngOnDestroy(): void {
    if (this._strategyToDestroy) {
      this._strategyToDestroy.destroy();
    }
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
   * Remove all items from the list of selected items
   */
  deselectAll(): void {
    // remove all items in the array
    this.deselect(...this._dataset);

    // clear the set in case any items have been removed from the DOM but are still selected
    this._selection.clear();
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
  getSelectionState(data: any): Observable<boolean> {
    return this.selection$.pipe(map(() => this.isSelected(data)), distinctUntilChanged());
  }

  /**
   * Define how selections should be performed.
   * This allows us to use an strategy pattern to handle the various keyboard
   * and mouse interactions while keeping each mode separated and
   * easily extensible if we want to add more modes in future!
   */
  setStrategy(mode: SelectionMode | SelectionStrategy): void {

    if (this._strategyToDestroy) {
      // Destroy previous strategy if it was created internally
      this._strategyToDestroy.destroy();
      this._strategyToDestroy = null;
    }

    if (mode instanceof SelectionStrategy) {

      // Custom strategy - pass in the service instance
      this.strategy = mode;
      this.strategy.setSelectionService(this);

    } else {

      switch (mode.toLowerCase().trim()) {

        case 'simple':
          this.strategy = this._strategyToDestroy = new SimpleSelectionStrategy(this);
          break;

        case 'row':
          this.strategy = this._strategyToDestroy = new RowSelectionStrategy(this);
          break;

        case 'row-alt':
          this.strategy = this._strategyToDestroy = new RowAltSelectionStrategy(this);
          break;

        default:
          throw new Error(`The selection mode '${mode}' does not exist. Valid modes are 'simple', 'row', or 'row-alt'.`);
      }
    }
  }

  /**
   * Set the current active item
   */
  activate(data: any): void {
    this._active = data;
    this.active$.next(this._active);
  }

  /**
   * Deactive all items
   */
  deactivate(): void {
    this._active = null;
    this.active$.next(this._active);
  }

  /**
   * Return the next or previous sibling of the current active item.
   * @param previous If true, the previous sibling will be returned.
   */
  getSibling(previous: boolean = false): any {

    // check if there is a current active item
    if (!this._active) {
      return;
    }

    // get the index of the current item
    const idx = this.dataset.indexOf(this._active);
    const target = this.dataset[previous ? idx - 1 : idx + 1];

    return target;
  }

  /**
   * Activate the sibling of the current active item.
   * If previous is set to true the previous sibling will be activated
   * rather than the next sibling. This function will also return the
   * data of the newly activated sibling
   */
  activateSibling(previous: boolean = false): any {

    const target = this.getSibling(previous);

    // check if the target exists
    if (target) {
      this.activate(target);
    }

    return target;
  }

  setDisabled(disabled: boolean): void {
    // store the current disabled state
    this.isEnabled = !disabled;

    // clear any stateful data
    this._active = null;
    this.active$.next(this._active);
    this._selection.clear();

    // emit the selection change information
    this.selectionHasMutated();
  }

  private selectionHasMutated(): void {
    this.selection$.next(Array.from(this._selection));
  }

  private setFirstItemFocusable(): void {
    if (this._dataset.length > 0) {
      this.focus$.next(this._dataset[0]);
      this._active = this._dataset[0];
    } else {
      this._active = null;
    }
  }
}

export type SelectionMode = 'simple' | 'row' | 'row-alt';