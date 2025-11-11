import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { SankeyNodeLink } from './interfaces/node-link.interface';
import { SankeyFocusManager } from './sankey-focus-manager';

@Directive({ selector: '[uxSankeyNode]' })
export class SankeyNodeDirective<T> implements OnInit, OnDestroy {
  private readonly _focusManager = inject<SankeyFocusManager<T>>(SankeyFocusManager);
  private readonly _elementRef = inject(ElementRef);

  /** Access the node data */
  @Input('uxSankeyNode') node: SankeyNodeLink<T>;

  /** Specify the tab index of the current item */
  @HostBinding() tabIndex: number = -1;

  /** Unsubscribe from all observables on destroy */
  private readonly _onDestroy = new Subject<void>();

  ngOnInit(): void {
    // Update the tabindex based on the current active item
    this._focusManager.active$
      .pipe(
        map(item => item && item.node.id === this.node.node.id),
        takeUntil(this._onDestroy)
      )
      .subscribe(isActive => (this.tabIndex = isActive ? 0 : -1));

    // If this element should be focused perform the focus
    this._focusManager.focused$
      .pipe(
        filter(node => node.node.id === this.node.node.id),
        takeUntil(this._onDestroy)
      )
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
