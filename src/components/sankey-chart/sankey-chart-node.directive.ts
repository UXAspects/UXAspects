import { Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SankeyNodeLink } from './interfaces/node-link.interface';
import { SankeyFocusManager } from './sankey-focus-manager';

@Directive({
  selector: '[uxSankeyNode]',
})
export class SankeyNodeDirective<T> implements OnInit, OnDestroy {

  /** Access the node data */
  @Input('uxSankeyNode') node: SankeyNodeLink<T>;

  /** Specify the tab index of the current item */
  @HostBinding() tabIndex: number = -1;

  /** Unsubscribe from all observables on destroy */
  private _onDestroy = new Subject<void>();

  constructor(
    private _focusManager: SankeyFocusManager<T>,
    private _elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    // Update the tabindex based on the current active item
    this._focusManager.active$.pipe(map(item => item && item.node.id === this.node.node.id), takeUntil(this._onDestroy))
      .subscribe(isActive => this.tabIndex = isActive ? 0 : -1);

    // If this element should be focused perform the focus
    this._focusManager.focused$.pipe(filter(node => node.node.id === this.node.node.id), takeUntil(this._onDestroy))
      .subscribe(() => this._elementRef.nativeElement.focus());
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  @HostListener('click')
  onClick(): void {
    this._focusManager.setActiveItem(this.node);
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    this._focusManager.onKeydown(event);
  }
}
