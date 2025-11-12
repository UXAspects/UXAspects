import { Directive, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { PageHeaderService } from '../../page-header.service';
import { PageHeaderNavigationItem } from '../navigation.component';

@Directive({ selector: '[uxPageHeaderNavigationSecondaryItem]' })
export class PageHeaderNavigationSecondaryItemDirective implements OnInit, OnDestroy {
  private readonly _pageHeaderService = inject(PageHeaderService);

  @Input('uxPageHeaderNavigationSecondaryItem')
  item: PageHeaderNavigationItem;

  private readonly _onDestroy = new Subject<void>();

  ngOnInit() {
    this._pageHeaderService.selected$.pipe(delay(0), takeUntil(this._onDestroy)).subscribe(next => {
      // Update selected state for this item
      this._pageHeaderService.updateItem(this.item, next);
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
