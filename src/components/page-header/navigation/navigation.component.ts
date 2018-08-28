import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { ResizeService } from '../../../directives/resize/index';
import { PageHeaderNavigation, PageHeaderService } from '../page-header.service';
import { PageHeaderNavigationItemComponent } from './navigation-item/navigation-item.component';

@Component({
    selector: 'ux-page-header-horizontal-navigation',
    templateUrl: './navigation.component.html',
    host: {
        'role': 'menubar'
    }
})
export class PageHeaderNavigationComponent implements AfterViewInit, OnDestroy {

    @ViewChildren(PageHeaderNavigationItemComponent) menuItems: QueryList<PageHeaderNavigationItemComponent>;

    items$: BehaviorSubject<PageHeaderNavigationItem[]> = this._pageHeaderService.items$;
    indicatorVisible: boolean = false;
    indicatorX: number = 0;
    indicatorWidth: number = 0;

    private _subscription = new Subscription();

    constructor(elementRef: ElementRef, resizeService: ResizeService, private _pageHeaderService: PageHeaderService) {
        this._subscription.add(resizeService.addResizeListener(elementRef.nativeElement).subscribe(this.updateSelectedIndicator.bind(this)));
        this._subscription.add(_pageHeaderService.selected$.pipe(distinctUntilChanged()).subscribe(this.updateSelectedIndicator.bind(this)));
        this._subscription.add(_pageHeaderService.secondary$.pipe(distinctUntilChanged()).subscribe(this.updateSelectedIndicator.bind(this)));
    }

    ngAfterViewInit(): void {
        this.updateSelectedIndicator();
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    updateSelectedIndicator(): void {
        setTimeout(() => {
            // find the selected item
            const selected = this.menuItems.find(item => item.item.selected);

            // determine whether or not to show the indicator
            this.indicatorVisible = !!selected;

            // set the width of the indicator to match the width of the navigation item
            if (selected) {
                const styles = getComputedStyle(selected.elementRef.nativeElement);

                this.indicatorX = selected.elementRef.nativeElement.offsetLeft;
                this.indicatorWidth = parseInt(styles.getPropertyValue('width'));
            }
        });
    }

}

export interface PageHeaderNavigationItem {
    icon?: string;
    title: string;
    selected?: boolean;
    routerLink?: string | any[];
    routerExtras?: NavigationExtras;
    select?: (item: PageHeaderNavigationItem) => void;
    children?: PageHeaderNavigationDropdownItem[];
    parent?: PageHeaderNavigation;
}

export interface PageHeaderNavigationDropdownItem {
    title: string;
    selected?: boolean;
    routerLink?: string | any[];
    routerExtras?: NavigationExtras;
    select?: (item: PageHeaderNavigationDropdownItem) => void;
    children?: PageHeaderNavigationDropdownItem[];
    parent?: PageHeaderNavigation;
}

// This is an alias for MF use as "DropdownItem" doesn't make sense in context with how it is used
export interface PageHeaderSecondaryNavigationItem extends PageHeaderNavigationDropdownItem { }