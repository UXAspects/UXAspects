import { AfterContentInit, ChangeDetectorRef, ContentChildren, Directive, EventEmitter, HostBinding, Input, OnDestroy, Output, QueryList } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SelectionItemDirective } from './selection-item.directive';
import { SelectionMode, SelectionService } from './selection.service';
import { SelectionStrategy } from './strategies/selection.strategy';


@Directive({
  selector: '[uxSelection]',
  exportAs: 'ux-selection',
  providers: [ SelectionService ]
})
export class SelectionDirective implements AfterContentInit, OnDestroy {

  @Input() set uxSelection(items: any[]) {
    this._selectionService.select(...items);
  }

  @Input() set disabled(disabled: boolean) {
    this._selectionService.setDisabled(disabled);
  }

  @Input() set mode(mode: SelectionMode | SelectionStrategy) {
    this._selectionService.setMode(mode);
  }

  @Input() set clickSelection(enabled: boolean) {
    this._selectionService.clickEnabled = enabled;
  }

  @Input() set keyboardSelection(enabled: boolean) {
    this._selectionService.keyboardEnabled = enabled;
  }

  @Input() @HostBinding('attr.tabindex') tabindex: number = null;

  @Output() uxSelectionChange = new EventEmitter<any[]>();

  @ContentChildren(SelectionItemDirective) items: QueryList<SelectionItemDirective>;

  private _subscriptions = new Subscription();

  constructor(private _selectionService: SelectionService, private _cdRef: ChangeDetectorRef) {
    this._subscriptions.add(_selectionService.selection$.subscribe(items => this.uxSelectionChange.emit(items)));
  }

  ngAfterContentInit(): void {
    // provide the initial list of selection items
    this.update();

    // if the list changes then inform the service
    this._subscriptions.add(this.items.changes.subscribe(() => this.update()));

    // The above could trigger a change in the computed tabindex for selection items
    this._cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  /**
   * Update the dataset to reflect the latest selection items
   */
  update(): void {

    this._selectionService.dataset = this.items.map(item => item.uxSelectionItem);

    // Make sure that a tab target has been defined so that the component can be tabbed to.
    if (this._selectionService.focusTarget$.getValue() === null && this._selectionService.dataset.length > 0) {
      this._selectionService.focusTarget$.next(this._selectionService.dataset[0]);
    }
  }

  /**
   * Select all the items in the list
   */
  selectAll(): void {
    if (this._selectionService.enabled) {
      this._selectionService.strategy.selectAll();
    }
  }

  /**
   * Deselect all currently selected items
   */
  deselectAll(): void {
    if (this._selectionService.enabled) {
      this._selectionService.strategy.deselectAll();
    }
  }
}
