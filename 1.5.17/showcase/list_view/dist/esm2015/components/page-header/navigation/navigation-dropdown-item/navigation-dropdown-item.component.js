/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators';
import { PageHeaderService } from '../../page-header.service';
export class PageHeaderNavigationDropdownItemComponent {
    /**
     * @param {?} _pageHeaderService
     */
    constructor(_pageHeaderService) {
        this._pageHeaderService = _pageHeaderService;
        this.dropdownOpen = false;
        this._hover$ = new Subject();
        // subscribe to stream with a debounce (a small debounce is all that is required)
        this._subscription = this._hover$.pipe(debounceTime(1)).subscribe(visible => this.dropdownOpen = visible);
        // Close submenus when selected item changes
        this._subscription.add(_pageHeaderService.selected$.subscribe(() => {
            this.dropdownOpen = false;
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    select(item) {
        // clicking on an item with children then return
        if (item.children) {
            return;
        }
        // emit the selected item in an event
        this._pageHeaderService.select(item);
    }
    /**
     * @return {?}
     */
    focus() {
        this.button.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    hoverStart() {
        this._hover$.next(true);
    }
    /**
     * @return {?}
     */
    hoverLeave() {
        this._hover$.next(false);
    }
    /**
     * @return {?}
     */
    close() {
        this.dropdownOpen = false;
    }
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    keydownHandler(event, item) {
        switch (event.key) {
            case 'Enter':
            case ' ':
                this.select(item);
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    }
}
PageHeaderNavigationDropdownItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-page-header-horizontal-navigation-dropdown-item',
                exportAs: 'ux-page-header-horizontal-navigation-dropdown-item',
                template: `<div *ngIf="item.children && item.children.length > 0"
    dropdown
    #subMenu="bs-dropdown"
    [isOpen]="dropdownOpen"
    container="body"
    placement="right"
    (mouseenter)="hoverStart()"
    (mouseleave)="hoverLeave()">

    <a role="menuitem"
        class="dropdown-item"
        [class.selected]="item.selected"
        aria-haspopup="true"
        [attr.aria-expanded]="dropdownOpen"
        [attr.aria-selected]="item.selected"
        tabindex="-1"
        #button
        dropdownToggle
        uxMenuNavigationToggle
        #menuNavigationToggle="uxMenuNavigationToggle"
        [(menuOpen)]="dropdownOpen"
        menuPosition="right">

        <span class="dropdown-item-title">{{ item.title }}</span>
        <span class="dropdown-item-icon hpe-icon hpe-next"></span>

    </a>

    <ul *dropdownMenu
        role="menu"
        class="dropdown-menu horizontal-navigation-dropdown-submenu"
        (mouseenter)="hoverStart()"
        (mouseleave)="hoverLeave()"
        uxMenuNavigation
        #menuNavigation="uxMenuNavigation"
        [toggleButton]="menuNavigationToggle"
        toggleButtonPosition="left">

        <li *ngFor="let subItem of item.children" role="none">

            <a role="menuitem"
                class="dropdown-item"
                [class.selected]="subItem.selected"
                [attr.aria-selected]="subItem.selected"
                tabindex="-1"
                (click)="select(subItem)"
                (keydown)="keydownHandler($event, subItem)"
                uxMenuNavigationItem>

                <span class="dropdown-item-title">{{ subItem.title }}</span>

            </a>

        </li>
    </ul>

</div>

<div *ngIf="!item.children || item.children.length === 0"
    (mouseenter)="hoverStart()"
    (mouseleave)="hoverLeave()">

    <a role="menuitem"
        #button
        class="dropdown-item"
        [class.selected]="item.selected"
        [attr.aria-selected]="item.selected"
        tabindex="-1"
        (click)="select(item)"
        (keydown)="keydownHandler($event, item)">

        <span class="dropdown-item-title">{{ item.title }}</span>

    </a>

</div>`
            },] },
];
/** @nocollapse */
PageHeaderNavigationDropdownItemComponent.ctorParameters = () => [
    { type: PageHeaderService, },
];
PageHeaderNavigationDropdownItemComponent.propDecorators = {
    "item": [{ type: Input },],
    "button": [{ type: ViewChild, args: ['button',] },],
};
function PageHeaderNavigationDropdownItemComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PageHeaderNavigationDropdownItemComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PageHeaderNavigationDropdownItemComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    PageHeaderNavigationDropdownItemComponent.propDecorators;
    /** @type {?} */
    PageHeaderNavigationDropdownItemComponent.prototype.item;
    /** @type {?} */
    PageHeaderNavigationDropdownItemComponent.prototype.button;
    /** @type {?} */
    PageHeaderNavigationDropdownItemComponent.prototype.dropdownOpen;
    /** @type {?} */
    PageHeaderNavigationDropdownItemComponent.prototype._subscription;
    /** @type {?} */
    PageHeaderNavigationDropdownItemComponent.prototype._hover$;
    /** @type {?} */
    PageHeaderNavigationDropdownItemComponent.prototype._pageHeaderService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1kcm9wZG93bi1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3BhZ2UtaGVhZGVyL25hdmlnYXRpb24vbmF2aWdhdGlvbi1kcm9wZG93bi1pdGVtL25hdmlnYXRpb24tZHJvcGRvd24taXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV2QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFtRjlELE1BQU07Ozs7SUFZRixZQUFvQixrQkFBcUM7UUFBckMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjs0QkFMakMsS0FBSzt1QkFHTyxJQUFJLE9BQU8sRUFBVzs7UUFLdEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLENBQUM7O1FBRzFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNsQixrQkFBa0IsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1lBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQzdCLENBQUMsQ0FDTCxDQUFDO0tBQ0w7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQzs7Ozs7SUFFRCxNQUFNLENBQUMsSUFBc0M7O1FBR3pDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQztTQUNWOztRQUdELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDeEM7Ozs7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDckM7Ozs7SUFFRCxVQUFVO1FBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDM0I7Ozs7SUFFRCxVQUFVO1FBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDNUI7Ozs7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7S0FDN0I7Ozs7OztJQUVELGNBQWMsQ0FBQyxLQUFvQixFQUFFLElBQXNDO1FBRXZFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxHQUFHO2dCQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN4QixLQUFLLENBQUM7U0FDYjtLQUNKOzs7WUFsSkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxvREFBb0Q7Z0JBQzlELFFBQVEsRUFBRSxvREFBb0Q7Z0JBQzlELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMkVQO2FBQ047Ozs7WUFsRlEsaUJBQWlCOzs7cUJBcUZyQixLQUFLO3VCQUVMLFNBQVMsU0FBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgUGFnZUhlYWRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9wYWdlLWhlYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtIH0gZnJvbSAnLi4vbmF2aWdhdGlvbi5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LXBhZ2UtaGVhZGVyLWhvcml6b250YWwtbmF2aWdhdGlvbi1kcm9wZG93bi1pdGVtJyxcbiAgICBleHBvcnRBczogJ3V4LXBhZ2UtaGVhZGVyLWhvcml6b250YWwtbmF2aWdhdGlvbi1kcm9wZG93bi1pdGVtJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJpdGVtLmNoaWxkcmVuICYmIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMFwiXG4gICAgZHJvcGRvd25cbiAgICAjc3ViTWVudT1cImJzLWRyb3Bkb3duXCJcbiAgICBbaXNPcGVuXT1cImRyb3Bkb3duT3BlblwiXG4gICAgY29udGFpbmVyPVwiYm9keVwiXG4gICAgcGxhY2VtZW50PVwicmlnaHRcIlxuICAgIChtb3VzZWVudGVyKT1cImhvdmVyU3RhcnQoKVwiXG4gICAgKG1vdXNlbGVhdmUpPVwiaG92ZXJMZWF2ZSgpXCI+XG5cbiAgICA8YSByb2xlPVwibWVudWl0ZW1cIlxuICAgICAgICBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIlxuICAgICAgICBbY2xhc3Muc2VsZWN0ZWRdPVwiaXRlbS5zZWxlY3RlZFwiXG4gICAgICAgIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCJcbiAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJkcm9wZG93bk9wZW5cIlxuICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cIml0ZW0uc2VsZWN0ZWRcIlxuICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgI2J1dHRvblxuICAgICAgICBkcm9wZG93blRvZ2dsZVxuICAgICAgICB1eE1lbnVOYXZpZ2F0aW9uVG9nZ2xlXG4gICAgICAgICNtZW51TmF2aWdhdGlvblRvZ2dsZT1cInV4TWVudU5hdmlnYXRpb25Ub2dnbGVcIlxuICAgICAgICBbKG1lbnVPcGVuKV09XCJkcm9wZG93bk9wZW5cIlxuICAgICAgICBtZW51UG9zaXRpb249XCJyaWdodFwiPlxuXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZHJvcGRvd24taXRlbS10aXRsZVwiPnt7IGl0ZW0udGl0bGUgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZHJvcGRvd24taXRlbS1pY29uIGhwZS1pY29uIGhwZS1uZXh0XCI+PC9zcGFuPlxuXG4gICAgPC9hPlxuXG4gICAgPHVsICpkcm9wZG93bk1lbnVcbiAgICAgICAgcm9sZT1cIm1lbnVcIlxuICAgICAgICBjbGFzcz1cImRyb3Bkb3duLW1lbnUgaG9yaXpvbnRhbC1uYXZpZ2F0aW9uLWRyb3Bkb3duLXN1Ym1lbnVcIlxuICAgICAgICAobW91c2VlbnRlcik9XCJob3ZlclN0YXJ0KClcIlxuICAgICAgICAobW91c2VsZWF2ZSk9XCJob3ZlckxlYXZlKClcIlxuICAgICAgICB1eE1lbnVOYXZpZ2F0aW9uXG4gICAgICAgICNtZW51TmF2aWdhdGlvbj1cInV4TWVudU5hdmlnYXRpb25cIlxuICAgICAgICBbdG9nZ2xlQnV0dG9uXT1cIm1lbnVOYXZpZ2F0aW9uVG9nZ2xlXCJcbiAgICAgICAgdG9nZ2xlQnV0dG9uUG9zaXRpb249XCJsZWZ0XCI+XG5cbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBzdWJJdGVtIG9mIGl0ZW0uY2hpbGRyZW5cIiByb2xlPVwibm9uZVwiPlxuXG4gICAgICAgICAgICA8YSByb2xlPVwibWVudWl0ZW1cIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLnNlbGVjdGVkXT1cInN1Ykl0ZW0uc2VsZWN0ZWRcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwic3ViSXRlbS5zZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdChzdWJJdGVtKVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwia2V5ZG93bkhhbmRsZXIoJGV2ZW50LCBzdWJJdGVtKVwiXG4gICAgICAgICAgICAgICAgdXhNZW51TmF2aWdhdGlvbkl0ZW0+XG5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRyb3Bkb3duLWl0ZW0tdGl0bGVcIj57eyBzdWJJdGVtLnRpdGxlIH19PC9zcGFuPlxuXG4gICAgICAgICAgICA8L2E+XG5cbiAgICAgICAgPC9saT5cbiAgICA8L3VsPlxuXG48L2Rpdj5cblxuPGRpdiAqbmdJZj1cIiFpdGVtLmNoaWxkcmVuIHx8IGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID09PSAwXCJcbiAgICAobW91c2VlbnRlcik9XCJob3ZlclN0YXJ0KClcIlxuICAgIChtb3VzZWxlYXZlKT1cImhvdmVyTGVhdmUoKVwiPlxuXG4gICAgPGEgcm9sZT1cIm1lbnVpdGVtXCJcbiAgICAgICAgI2J1dHRvblxuICAgICAgICBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIlxuICAgICAgICBbY2xhc3Muc2VsZWN0ZWRdPVwiaXRlbS5zZWxlY3RlZFwiXG4gICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiaXRlbS5zZWxlY3RlZFwiXG4gICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAoY2xpY2spPVwic2VsZWN0KGl0ZW0pXCJcbiAgICAgICAgKGtleWRvd24pPVwia2V5ZG93bkhhbmRsZXIoJGV2ZW50LCBpdGVtKVwiPlxuXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZHJvcGRvd24taXRlbS10aXRsZVwiPnt7IGl0ZW0udGl0bGUgfX08L3NwYW4+XG5cbiAgICA8L2E+XG5cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgUGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW07XG5cbiAgICBAVmlld0NoaWxkKCdidXR0b24nKVxuICAgIGJ1dHRvbjogRWxlbWVudFJlZjtcblxuICAgIGRyb3Bkb3duT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBfaG92ZXIkOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhZ2VIZWFkZXJTZXJ2aWNlOiBQYWdlSGVhZGVyU2VydmljZSkge1xuXG4gICAgICAgIC8vIHN1YnNjcmliZSB0byBzdHJlYW0gd2l0aCBhIGRlYm91bmNlIChhIHNtYWxsIGRlYm91bmNlIGlzIGFsbCB0aGF0IGlzIHJlcXVpcmVkKVxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLl9ob3ZlciQucGlwZShkZWJvdW5jZVRpbWUoMSkpLnN1YnNjcmliZSh2aXNpYmxlID0+IHRoaXMuZHJvcGRvd25PcGVuID0gdmlzaWJsZSk7XG5cbiAgICAgICAgLy8gQ2xvc2Ugc3VibWVudXMgd2hlbiBzZWxlY3RlZCBpdGVtIGNoYW5nZXNcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgICAgICAgIF9wYWdlSGVhZGVyU2VydmljZS5zZWxlY3RlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0KGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtKSB7XG5cbiAgICAgICAgLy8gY2xpY2tpbmcgb24gYW4gaXRlbSB3aXRoIGNoaWxkcmVuIHRoZW4gcmV0dXJuXG4gICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbWl0IHRoZSBzZWxlY3RlZCBpdGVtIGluIGFuIGV2ZW50XG4gICAgICAgIHRoaXMuX3BhZ2VIZWFkZXJTZXJ2aWNlLnNlbGVjdChpdGVtKTtcbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5idXR0b24ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGhvdmVyU3RhcnQoKSB7XG4gICAgICAgIHRoaXMuX2hvdmVyJC5uZXh0KHRydWUpO1xuICAgIH1cblxuICAgIGhvdmVyTGVhdmUoKSB7XG4gICAgICAgIHRoaXMuX2hvdmVyJC5uZXh0KGZhbHNlKTtcbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5kcm9wZG93bk9wZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBrZXlkb3duSGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCwgaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW0pOiB2b2lkIHtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgY2FzZSAnICc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QoaXRlbSk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=