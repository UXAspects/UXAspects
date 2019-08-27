import { FocusableOption } from '@angular/cdk/a11y';
import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getIconType, IconType } from '../../../../common/index';
import { tick } from '../../../../common/operators/index';
import { PageHeaderService } from '../../page-header.service';
import { PageHeaderNavigationItem } from '../navigation.component';
import { PageHeaderNavigationService } from '../navigation.service';

@Component({
    selector: 'ux-page-header-horizontal-navigation-item',
    templateUrl: './navigation-item.component.html'
})
export class PageHeaderNavigationItemComponent implements AfterViewInit, OnDestroy, FocusableOption {

    /** Access the data for this dropdown item */
    @Input() set item(item: PageHeaderNavigationItem) {
        this._item = item;
        this._iconType = getIconType(item.icon);
    }

    get item(): PageHeaderNavigationItem {
        return this._item;
    }

    /** Store the secondary state */
    secondary$: BehaviorSubject<boolean> = this._pageHeaderService.secondary$;

    /** Store the open state of the item dropdown */
    isOpen: boolean;

    /** Store the item data */
    _item: PageHeaderNavigationItem;

    /** Store the icon type */
    _iconType: IconType;

    /** Update the tabindex based on keyboard input */
    _tabindex: Observable<number> = this._navigationService.getTabIndex(this);

    /** Access the navigation button element */
    @ViewChild('navigationBtn', { static: false }) navigationBtn: ElementRef;

    /** Unsubscribe when the component is destroyed */
    private _onDestroy = new Subject<void>();

    constructor(
        public elementRef: ElementRef,
        private _pageHeaderService: PageHeaderService,
        private _navigationService: PageHeaderNavigationService) { }

    ngAfterViewInit(): void {
        this._pageHeaderService.selected$.pipe(tick(), takeUntil(this._onDestroy)).subscribe(selectedItem => {

            // Update selected state for this item
            this._pageHeaderService.updateItem(this.item, selectedItem);

            if (selectedItem && this.isOpen) {
                this.isOpen = false;
            }
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    focus(): void {
        this.navigationBtn.nativeElement.focus();
    }

    select(): void {

        // if the item is disabled or has children then do nothing at this stage
        if (this.item.disabled || (this.item.children && this._pageHeaderService.secondary$.getValue() === false)) {
            return;
        }

        // otherwise select the current item
        this._pageHeaderService.select(this.item);
    }

    @HostListener('keydown', ['$event'])
    onKeydown(event: KeyboardEvent): void {
        if (event.keyCode === LEFT_ARROW || event.keyCode === RIGHT_ARROW) {
            this._navigationService.onKeydown(event);
        }
    }
}