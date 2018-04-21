import { AfterContentInit, ContentChildren, Directive, EventEmitter, HostBinding, HostListener, Input, OnDestroy, Output, QueryList } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SelectionItemDirective } from './selection-item.directive';
import { SelectionMode, SelectionService } from './selection.service';


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

  @Input() set mode(mode: SelectionMode) {
    this._selectionService.setMode(mode);
  }

  @Input() set clickSelection(enabled: boolean) {
    this._selectionService.clickEnabled = enabled;
  }

  @Input() set keyboardSelection(enabled: boolean) {
    this._selectionService.keyboardEnabled = enabled;
  }

  @Input() @HostBinding('tabindex') tabindex: number = 0;

  @Output() uxSelectionChange = new EventEmitter<any[]>();

  @ContentChildren(SelectionItemDirective) items: QueryList<SelectionItemDirective>;

  private _subscriptions = new Subscription();

  constructor(private _selectionService: SelectionService) {
    this._subscriptions.add(_selectionService.selection$.subscribe(items => this.uxSelectionChange.emit(items)));
  }

  ngAfterContentInit(): void {
    // provide the initial list of selection items
    this.update();

    // if the list changes then inform the service
    this._subscriptions.add(this.items.changes.subscribe(() => this.update()));
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  /**
   * If the directive element receives focus then activate the first item
   */
  @HostListener('focus') focus(): void {
    if (this._selectionService.enabled && this._selectionService.dataset.length > 0) {
      this._selectionService.activate(this._selectionService.dataset[0]);
    }
  }

  /**
   * Update the dataset to reflect the latest selection items
   */
  update(): void {
    this._selectionService.dataset = this.items.map(item => item.uxSelectionItem);
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
