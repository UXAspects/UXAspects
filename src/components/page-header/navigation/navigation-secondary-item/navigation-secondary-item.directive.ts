import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { delay, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { PageHeaderService } from '../../page-header.service';
import { PageHeaderNavigationItem } from '../navigation.component';

@Directive({
    selector: '[uxPageHeaderNavigationSecondaryItem]'
})
export class PageHeaderNavigationSecondaryItemDirective implements OnInit, OnDestroy {

    @Input('uxPageHeaderNavigationSecondaryItem')
    item: PageHeaderNavigationItem;

    private _onDestroy = new Subject<void>();

    constructor(private _pageHeaderService: PageHeaderService) { }

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