import { Component, Input, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { PageHeaderNavigationItemComponent } from './navigation-item/navigation-item.component';
import { ResizeService } from '../../../directives/resize/index';

@Component({
    selector: 'ux-page-header-horizontal-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class PageHeaderNavigationComponent implements AfterViewInit {
    
    @ViewChildren(PageHeaderNavigationItemComponent) menuItems: QueryList<PageHeaderNavigationItemComponent>;
     
    @Input() items: PageHeaderNavigationItem[] = [];

    indicatorVisible: boolean = false;
    indicatorX: number = 0;
    indicatorWidth: number = 0;

    constructor(elementRef: ElementRef, resizeService: ResizeService) {
        resizeService.addResizeListener(elementRef.nativeElement).subscribe(this.updateSelectedIndicator.bind(this));
    }

    ngAfterViewInit(): void {
        this.updateSelectedIndicator();
    }

    onSelect(item: PageHeaderNavigationItem): void {
        
        if (item.select) {
            item.select.call(item, item);
        }

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
            let selectedItem = this.menuItems.find(item => item.item.selected);

            // determine whether or not to show the indicator
            this.indicatorVisible = !!selectedItem;

            // set the width of the indicator to match the width of the navigation item
            if (selectedItem) {
                let styles = getComputedStyle(selectedItem.elementRef.nativeElement);

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