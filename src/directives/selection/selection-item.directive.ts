import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { SelectionService } from './selection.service';

@Directive({
  selector: '[uxSelectionItem]',
  exportAs: 'ux-selection-item'
})
export class SelectionItemDirective implements OnInit, OnDestroy {

  @Input() uxSelectionItem: any;

  @Input() @HostBinding('class.ux-selection-selected')
  set selected(selected: boolean) {
    selected ? this.select() : this.deselect();
  }
  
  @Input() @HostBinding('tabindex') tabindex: number = 0;
  @Output() selectedChange = new EventEmitter<boolean>();

  @HostBinding('class.ux-selection-focused') active: boolean = false;

  private _selected: boolean = false;
  private _subscriptions = new Subscription();

  constructor(private _selectionService: SelectionService, private _elementRef: ElementRef) { }

  ngOnInit(): void {

    // if there is no associated data then throw an error
    if (!this.uxSelectionItem) {
      throw new Error('The uxSelectionItem directive must have data associated with it.');
    }

    // subscribe to selection changes on this item
    this._subscriptions.add(this._selectionService.selected$(this.uxSelectionItem).subscribe(selected => {

      // store the selected state
      this._selected = selected;

      // emit the selected state
      this.selectedChange.emit(selected);
    }));

    // subscribe to changes to the active state
    this._subscriptions.add(this._selectionService.active$.pipe(map(active => active === this.uxSelectionItem)).subscribe(active => {

      // store the focus state
      this.active = active;

      // if it is active then focus the element
      if (active === true) {
        this._elementRef.nativeElement.focus();
      }
    }));
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  @HostListener('click', ['$event']) click(event: MouseEvent): void {
    if (this._selectionService.enabled && this._selectionService.clickEnabled) {
      this._selectionService.strategy.click(event, this.uxSelectionItem);
    }
  }

  @HostListener('mousedown', ['$event']) mousedown(event: MouseEvent): void {
    if (this._selectionService.enabled && this._selectionService.clickEnabled) {
      this._selectionService.strategy.mousedown(event, this.uxSelectionItem);
    }
  }

  @HostListener('keydown', ['$event']) keydown(event: KeyboardEvent): void {
    if (this._selectionService.enabled && this._selectionService.keyboardEnabled) {
      this._selectionService.strategy.keydown(event, this.uxSelectionItem);
    }
  }

  /**
   * Select this item using the current strategy
   */
  select(): void {
    if (this._selectionService.enabled) {
      this._selectionService.strategy.select(this.uxSelectionItem);
    }
  }

  /**
   * Deselect this item using the current strategy
   */
  deselect(): void {
    if (this._selectionService.enabled) {
      this._selectionService.strategy.deselect(this.uxSelectionItem);
    }
  }
}
