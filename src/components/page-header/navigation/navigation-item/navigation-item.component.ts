import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { Subscription } from 'rxjs/Subscription';
import { PageHeaderNavigationDropdownItemComponent } from '../navigation-dropdown-item/navigation-dropdown-item.component';
import { PageHeaderNavigationDropdownItem, PageHeaderNavigationItem } from '../navigation.component';

@Component({
    selector: 'ux-page-header-horizontal-navigation-item',
    templateUrl: './navigation-item.component.html'
})
export class PageHeaderNavigationItemComponent implements OnInit, OnDestroy {

    @ViewChild('menu') menu: BsDropdownDirective;
    @ViewChildren(PageHeaderNavigationDropdownItemComponent) dropdowns: QueryList<PageHeaderNavigationDropdownItemComponent>;
    
    @Input() item: PageHeaderNavigationItem;
    @Input() secondaryNavigation: boolean = false;    
    @Output() onSelect: EventEmitter<PageHeaderNavigationDropdownItem> = new EventEmitter<PageHeaderNavigationDropdownItem>();
    
    private _subscription: Subscription;

    constructor(public elementRef: ElementRef) { }

    ngOnInit() {
        this._subscription = this.menu.onHidden.subscribe(() => this.dropdowns.forEach(dropdown => dropdown.close()));
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    selectItem() {

        // if the item has children then do nothing at this stage 
        if (this.item.children && this.secondaryNavigation === false) {
            return;
        }

        // otherwise select the current item
        this.onItemSelect(this.item);
    }

    onItemSelect(item: PageHeaderNavigationItem | PageHeaderNavigationDropdownItem) {
        this.onSelect.emit(item);

        // select the current item
        this.item.selected = true;
    }
}