import { AfterViewInit, Component, ElementRef, Input, QueryList, ViewChildren, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ResizeService } from '../../../directives/resize/index';
import { PageHeaderNavigationItemComponent } from './navigation-item/navigation-item.component';

@Component({
    selector: 'ux-page-header-horizontal-navigation',
    templateUrl: './navigation.component.html'
})
export class PageHeaderNavigationComponent implements AfterViewInit, OnDestroy {
    
    @ViewChildren(PageHeaderNavigationItemComponent) menuItems: QueryList<PageHeaderNavigationItemComponent>;
    
    @Input() items: PageHeaderNavigationItem[] = [];
    @Input() secondaryNavigation: boolean = false;
    @Output() selected = new EventEmitter<PageHeaderNavigationItem>();
    
    indicatorVisible: boolean = false;
    indicatorX: number = 0;
    indicatorWidth: number = 0;
    
    private _subscription: Subscription;

    constructor(elementRef: ElementRef, resizeService: ResizeService) {
        this._subscription = resizeService.addResizeListener(elementRef.nativeElement).subscribe(this.updateSelectedIndicator.bind(this));
    }

    ngAfterViewInit(): void {
        this.updateSelectedIndicator();
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    onSelect(item: PageHeaderNavigationItem): void {
        
        if (item.select) {
            item.select.call(item, item);
        }

        // emit the selected item
        this.selected.emit(item);

        // deselect all items in all menus
        this.deselectAll();

        // update the selected indicator
        this.updateSelectedIndicator();
    }

    deselectAll(): void {
        this.items.forEach(item => this.deselect(item));
    }

    deselect(navItem: PageHeaderNavigationItem | PageHeaderNavigationDropdownItem): void {
        
        // deselect the current item
        navItem.selected = false;

        // iterate any children and deselect them
        if (navItem.children) {
            navItem.children.forEach(item => this.deselect(item));
        }

        // update the selected indicator
        this.updateSelectedIndicator();
    }

    updateSelectedIndicator(): void {

        setTimeout(() => {

            // find the selected item
            const selectedItem = this.menuItems.find(item => item.item.selected);

            // determine whether or not to show the indicator
            this.indicatorVisible = !!selectedItem;

            // set the width of the indicator to match the width of the navigation item
            if (selectedItem) {
                const styles = getComputedStyle(selectedItem.elementRef.nativeElement);

                this.indicatorX = selectedItem.elementRef.nativeElement.offsetLeft;
                this.indicatorWidth = parseInt(styles.getPropertyValue('width'));
            }
        });
    }

}

export interface PageHeaderNavigationItem {
    icon?: string;
    title: string;
    selected?: boolean;
    select?: (item: PageHeaderNavigationItem) => void;
    children?: PageHeaderNavigationDropdownItem[];
}

export interface PageHeaderNavigationDropdownItem {
    title: string;
    selected?: boolean;    
    select?: (item: PageHeaderNavigationDropdownItem) => void;
    children?: PageHeaderNavigationDropdownItem[];
}