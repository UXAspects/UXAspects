import { AfterContentInit, ChangeDetectorRef, ContentChildren, Directive, EventEmitter, HostBinding, Input, OnDestroy, Output, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SelectionItemDirective } from './selection-item.directive';
import { SelectionMode, SelectionService } from './selection.service';
import { SelectionStrategy } from './strategies/selection.strategy';

@Directive({
  selector: '[uxSelection]',
  exportAs: 'ux-selection',
  providers: [ SelectionService ]
})
export class SelectionDirective<T> implements AfterContentInit, OnDestroy {

  @Input() set uxSelection(items: T[]) {
    this._selectionService.select(...items);
  }

  @Input() set disabled(disabled: boolean) {
    this._selectionService.setDisabled(disabled);
  }

  @Input() set mode(mode: SelectionMode | SelectionStrategy<T>) {
    this._selectionService.setStrategy(mode);
  }

  @Input() set clickSelection(isClickEnabled: boolean) {
    this._selectionService.isClickEnabled = isClickEnabled;
  }

  @Input() set keyboardSelection(isKeyboardEnabled: boolean) {
    this._selectionService.isKeyboardEnabled = isKeyboardEnabled;
  }

  @Input() @HostBinding('attr.tabindex') tabindex: number = null;

  @Output() uxSelectionChange = new EventEmitter<T[]>();

  @ContentChildren(SelectionItemDirective) items: QueryList<SelectionItemDirective<T>>;

  private _onDestroy = new Subject<void>();

  constructor(private _selectionService: SelectionService<T>, private _cdRef: ChangeDetectorRef) {
    _selectionService.selection$.pipe(takeUntil(this._onDestroy)).subscribe(items => this.uxSelectionChange.emit(items));
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

    this._selectionService.dataset = this.items.map(item => item.uxSelectionItem);

    // Make sure that a tab target has been defined so that the component can be tabbed to.
    if (this._selectionService.focus$.getValue() === null && this._selectionService.dataset.length > 0) {
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
}
