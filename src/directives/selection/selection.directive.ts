import {
  AfterContentInit,
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { SelectionItemDirective } from './selection-item.directive';
import { SelectionMode, SelectionService } from './selection.service';
import { SelectionStrategy } from './strategies/selection.strategy';

@Directive({
  selector: '[uxSelection]',
  exportAs: 'ux-selection',
  providers: [SelectionService],
  standalone: false,
})
export class SelectionDirective<T> implements AfterContentInit, OnDestroy {
  readonly _selectionService = inject<SelectionService<T>>(SelectionService);

  readonly _cdRef = inject(ChangeDetectorRef);

  /** Defines the items that should be selected. */
  @Input() set uxSelection(items: Array<T> | ReadonlyArray<T>) {
    this._lastSelection = items;
    this._selectionService.selectOnly(...items);
  }

  /** Can be used to enabled/disable selection behavior. */
  @Input() set disabled(disabled: boolean) {
    this._selectionService.setDisabled(disabled);
  }

  /**
   * Defines the selection behavior. Alternatively, custom selection behavior can be defined by defining a
   * class which extends SelectionStrategy, and providing an instance of the custom class to this property.
   * See below for details of the SelectionStrategy class.
   */
  @Input() set mode(mode: SelectionMode | SelectionStrategy<T>) {
    this._selectionService.setStrategy(mode);
  }

  /**
   * Can be used to enable/disable click selection on items. This can be used to manually control the selection of an item,
   * for example, binding the selection state to a checkbox.
   */
  @Input() set clickSelection(isClickEnabled: boolean) {
    this._selectionService.isClickEnabled = isClickEnabled;
  }

  /** Can be used to enable/disable keyboard navigation on items. Use this if you wish to provide custom keyboard controls for selection. */
  @Input() set keyboardSelection(isKeyboardEnabled: boolean) {
    this._selectionService.isKeyboardEnabled = isKeyboardEnabled;
  }

  /**
   * The full set of selection items.
   * Only needed if the full set of `uxSelectionItem`s is not available, e.g. within a virtual scroll container.
   */
  @Input() set selectionItems(value: T[]) {
    this._hasExplicitDataset = !!value;
    if (value) {
      this._selectionService.dataset = value;
    }
  }

  /** The tabstop of the selection outer element */
  @Input() @HostBinding('attr.tabindex') tabindex: string | number = null;

  /** This event will be triggered when there is a change to the selected items. It will contain an array of the currently selected items. */
  @Output() uxSelectionChange = new EventEmitter<T[]>();

  /** Access all items within the list */
  @ContentChildren(SelectionItemDirective) items: QueryList<SelectionItemDirective<T>>;

  /** Unsubscribe from all observables on component destroy */
  private readonly _onDestroy = new Subject<void>();

  /** Store the previous selection so we don't emit more than we have to */
  private _lastSelection: ReadonlyArray<T> = [];

  /** Whether a value has been provided to the `selectionItems` input. */
  private _hasExplicitDataset: boolean = false;

  constructor() {
    this._selectionService.selection$
      .pipe(debounceTime(0), takeUntil(this._onDestroy))
      .subscribe(items => {
        if (this.isSelectionChanged(items)) {
          this.uxSelectionChange.emit(items);
        }

        // store the most recent selection
        this._lastSelection = [...items];
      });
  }

  ngAfterContentInit(): void {
    // provide the initial list of selection items
    this.update();

    // if the list changes then inform the service
    this.items.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => this.update());
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Update the dataset to reflect the latest selection items
   */
  update(): void {
    // Capture the set of data items from the ContentChildren, unless an explicit value has been provided.
    if (!this._hasExplicitDataset) {
      this._selectionService.dataset = this.items.map(item => item.uxSelectionItem);
    }

    // Make sure that a tab target has been defined so that the component can be tabbed to.
    if (
      this._selectionService.focus$.getValue() === null &&
      this._selectionService.dataset.length > 0
    ) {
      this._selectionService.focus$.next(this._selectionService.dataset[0]);
    }

    // The above could trigger a change in the computed tabindex for selection items
    this._cdRef.detectChanges();
  }

  /**
   * Select all the items in the list
   */
  selectAll(): void {
    if (this._selectionService.isEnabled) {
      this._selectionService.strategy.selectAll();
    }
  }

  /**
   * Deselect all currently selected items
   */
  deselectAll(): void {
    if (this._selectionService.isEnabled) {
      this._selectionService.strategy.deselectAll();
    }
  }

  /**
   * Determine if the previous selection is the same as the current selection
   */
  private isSelectionChanged(selection: T[]): boolean {
    // fast, efficient check, if length is different they must have changed
    if ((!this._lastSelection && selection) || this._lastSelection.length !== selection.length) {
      return true;
    }

    // if both arrays have 0 items then they have not changed
    if (this._lastSelection.length === 0 && selection.length === 0) {
      return false;
    }

    // otherwise do a check on each item
    return !this._lastSelection.every(item => selection.indexOf(item) !== -1);
  }
}
