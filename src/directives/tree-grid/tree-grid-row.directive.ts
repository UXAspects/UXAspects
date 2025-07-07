import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TreeGridItem } from './tree-grid-item.interface';
import { TreeGridService } from './tree-grid.service';

@Directive({
  selector: '[uxTreeGridRow]',
  exportAs: 'uxTreeGridRow',
  host: {
    '[class.treegrid-row]': 'true',
  },
  standalone: false,
})
export class TreeGridRowDirective implements OnInit, OnDestroy {
  private readonly _treeGridService = inject(TreeGridService);

  @Input('uxTreeGridRow')
  item: TreeGridItem;

  @Input()
  canExpand: boolean;

  @Input()
  @HostBinding('class.treegrid-row-expanded')
  set expanded(value: boolean) {
    const expanded = coerceBooleanProperty(value);
    if (expanded !== this._expanded) {
      this._expanded = expanded;
      this._treeGridService.setExpanded(this.item, expanded);
    }
  }
  get expanded(): boolean {
    return this._expanded;
  }

  @Output()
  expandedChange = new EventEmitter<boolean>();

  @HostBinding('class.treegrid-row-loading')
  loading: boolean = false;

  private _expanded = false;

  private readonly _onDestroy = new Subject<void>();

  ngOnInit(): void {
    if (!this.item || !this.item.state) {
      throw new Error(
        'uxTreeGridRow should be configured with an object emitted by uxTreeGrid.rows.'
      );
    }

    this.item.state.loading$
      .pipe(takeUntil(this._onDestroy))
      .subscribe(loading => (this.loading = loading));
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  @HostListener('keydown.ArrowLeft', ['$event'])
  collapse(event?: Event): void {
    this.expanded = false;
    this.expandedChange.emit(false);

    if (event) {
      event.preventDefault();
    }
  }

  @HostListener('keydown.ArrowRight', ['$event'])
  expand(event?: Event): void {
    // take into account whether or not the item can expanded
    if (!this.canExpand) {
      return;
    }

    this.expanded = true;
    this.expandedChange.emit(true);

    if (event) {
      event.preventDefault();
    }
  }

  toggle(): void {
    this.expanded ? this.collapse() : this.expand();
  }
}
