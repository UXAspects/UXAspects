/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators';
import { PageHeaderService } from '../../page-header.service';
var PageHeaderNavigationDropdownItemComponent = (function () {
    function PageHeaderNavigationDropdownItemComponent(_pageHeaderService) {
        var _this = this;
        this._pageHeaderService = _pageHeaderService;
        this.dropdownOpen = false;
        this._hover$ = new Subject();
        // subscribe to stream with a debounce (a small debounce is all that is required)
        this._subscription = this._hover$.pipe(debounceTime(1)).subscribe(function (visible) { return _this.dropdownOpen = visible; });
        // Close submenus when selected item changes
        this._subscription.add(_pageHeaderService.selected$.subscribe(function () {
            _this.dropdownOpen = false;
        }));
    }
    /**
     * @return {?}
     */
    PageHeaderNavigationDropdownItemComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    PageHeaderNavigationDropdownItemComponent.prototype.select = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        // clicking on an item with children then return
        if (item.children) {
            return;
        }
        // emit the selected item in an event
        this._pageHeaderService.select(item);
    };
    /**
     * @return {?}
     */
    PageHeaderNavigationDropdownItemComponent.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.button.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    PageHeaderNavigationDropdownItemComponent.prototype.hoverStart = /**
     * @return {?}
     */
    function () {
        this._hover$.next(true);
    };
    /**
     * @return {?}
     */
    PageHeaderNavigationDropdownItemComponent.prototype.hoverLeave = /**
     * @return {?}
     */
    function () {
        this._hover$.next(false);
    };
    /**
     * @return {?}
     */
    PageHeaderNavigationDropdownItemComponent.prototype.close = /**
     * @return {?}
     */
    function () {
        this.dropdownOpen = false;
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    PageHeaderNavigationDropdownItemComponent.prototype.keydownHandler = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        switch (event.key) {
            case 'Enter':
            case ' ':
                this.select(item);
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    };
    PageHeaderNavigationDropdownItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-page-header-horizontal-navigation-dropdown-item',
                    exportAs: 'ux-page-header-horizontal-navigation-dropdown-item',
                    template: "<div *ngIf=\"item.children && item.children.length > 0\"\n    dropdown\n    #subMenu=\"bs-dropdown\"\n    [isOpen]=\"dropdownOpen\"\n    container=\"body\"\n    placement=\"right\"\n    (mouseenter)=\"hoverStart()\"\n    (mouseleave)=\"hoverLeave()\">\n\n    <a role=\"menuitem\"\n        class=\"dropdown-item\"\n        [class.selected]=\"item.selected\"\n        aria-haspopup=\"true\"\n        [attr.aria-expanded]=\"dropdownOpen\"\n        [attr.aria-selected]=\"item.selected\"\n        tabindex=\"-1\"\n        #button\n        dropdownToggle\n        uxMenuNavigationToggle\n        #menuNavigationToggle=\"uxMenuNavigationToggle\"\n        [(menuOpen)]=\"dropdownOpen\"\n        menuPosition=\"right\">\n\n        <span class=\"dropdown-item-title\">{{ item.title }}</span>\n        <span class=\"dropdown-item-icon hpe-icon hpe-next\"></span>\n\n    </a>\n\n    <ul *dropdownMenu\n        role=\"menu\"\n        class=\"dropdown-menu horizontal-navigation-dropdown-submenu\"\n        (mouseenter)=\"hoverStart()\"\n        (mouseleave)=\"hoverLeave()\"\n        uxMenuNavigation\n        #menuNavigation=\"uxMenuNavigation\"\n        [toggleButton]=\"menuNavigationToggle\"\n        toggleButtonPosition=\"left\">\n\n        <li *ngFor=\"let subItem of item.children\" role=\"none\">\n\n            <a role=\"menuitem\"\n                class=\"dropdown-item\"\n                [class.selected]=\"subItem.selected\"\n                [attr.aria-selected]=\"subItem.selected\"\n                tabindex=\"-1\"\n                (click)=\"select(subItem)\"\n                (keydown)=\"keydownHandler($event, subItem)\"\n                uxMenuNavigationItem>\n\n                <span class=\"dropdown-item-title\">{{ subItem.title }}</span>\n\n            </a>\n\n        </li>\n    </ul>\n\n</div>\n\n<div *ngIf=\"!item.children || item.children.length === 0\"\n    (mouseenter)=\"hoverStart()\"\n    (mouseleave)=\"hoverLeave()\">\n\n    <a role=\"menuitem\"\n        #button\n        class=\"dropdown-item\"\n        [class.selected]=\"item.selected\"\n        [attr.aria-selected]=\"item.selected\"\n        tabindex=\"-1\"\n        (click)=\"select(item)\"\n        (keydown)=\"keydownHandler($event, item)\">\n\n        <span class=\"dropdown-item-title\">{{ item.title }}</span>\n\n    </a>\n\n</div>"
                },] },
    ];
    /** @nocollapse */
    PageHeaderNavigationDropdownItemComponent.ctorParameters = function () { return [
        { type: PageHeaderService, },
    ]; };
    PageHeaderNavigationDropdownItemComponent.propDecorators = {
        "item": [{ type: Input },],
        "button": [{ type: ViewChild, args: ['button',] },],
    };
    return PageHeaderNavigationDropdownItemComponent;
}());
export { PageHeaderNavigationDropdownItemComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1kcm9wZG93bi1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3BhZ2UtaGVhZGVyL25hdmlnYXRpb24vbmF2aWdhdGlvbi1kcm9wZG93bi1pdGVtL25hdmlnYXRpb24tZHJvcGRvd24taXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV2QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0lBK0YxRCxtREFBb0Isa0JBQXFDO1FBQXpELGlCQVdDO1FBWG1CLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7NEJBTGpDLEtBQUs7dUJBR08sSUFBSSxPQUFPLEVBQVc7O1FBS3RELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsS0FBSSxDQUFDLFlBQVksR0FBRyxPQUFPLEVBQTNCLENBQTJCLENBQUMsQ0FBQzs7UUFHMUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ2xCLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7WUFDbkMsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7U0FDN0IsQ0FBQyxDQUNMLENBQUM7S0FDTDs7OztJQUVELCtEQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7Ozs7O0lBRUQsMERBQU07Ozs7SUFBTixVQUFPLElBQXNDOztRQUd6QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNLENBQUM7U0FDVjs7UUFHRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3hDOzs7O0lBRUQseURBQUs7OztJQUFMO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDckM7Ozs7SUFFRCw4REFBVTs7O0lBQVY7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzQjs7OztJQUVELDhEQUFVOzs7SUFBVjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzVCOzs7O0lBRUQseURBQUs7OztJQUFMO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7S0FDN0I7Ozs7OztJQUVELGtFQUFjOzs7OztJQUFkLFVBQWUsS0FBb0IsRUFBRSxJQUFzQztRQUV2RSxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNoQixLQUFLLE9BQU8sQ0FBQztZQUNiLEtBQUssR0FBRztnQkFDSixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDeEIsS0FBSyxDQUFDO1NBQ2I7S0FDSjs7Z0JBbEpKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsb0RBQW9EO29CQUM5RCxRQUFRLEVBQUUsb0RBQW9EO29CQUM5RCxRQUFRLEVBQUUsMndFQTJFUDtpQkFDTjs7OztnQkFsRlEsaUJBQWlCOzs7eUJBcUZyQixLQUFLOzJCQUVMLFNBQVMsU0FBQyxRQUFROztvREEzRnZCOztTQXVGYSx5Q0FBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBQYWdlSGVhZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3BhZ2UtaGVhZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW0gfSBmcm9tICcuLi9uYXZpZ2F0aW9uLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtcGFnZS1oZWFkZXItaG9yaXpvbnRhbC1uYXZpZ2F0aW9uLWRyb3Bkb3duLWl0ZW0nLFxuICAgIGV4cG9ydEFzOiAndXgtcGFnZS1oZWFkZXItaG9yaXpvbnRhbC1uYXZpZ2F0aW9uLWRyb3Bkb3duLWl0ZW0nLFxuICAgIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cIml0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwXCJcbiAgICBkcm9wZG93blxuICAgICNzdWJNZW51PVwiYnMtZHJvcGRvd25cIlxuICAgIFtpc09wZW5dPVwiZHJvcGRvd25PcGVuXCJcbiAgICBjb250YWluZXI9XCJib2R5XCJcbiAgICBwbGFjZW1lbnQ9XCJyaWdodFwiXG4gICAgKG1vdXNlZW50ZXIpPVwiaG92ZXJTdGFydCgpXCJcbiAgICAobW91c2VsZWF2ZSk9XCJob3ZlckxlYXZlKClcIj5cblxuICAgIDxhIHJvbGU9XCJtZW51aXRlbVwiXG4gICAgICAgIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiXG4gICAgICAgIFtjbGFzcy5zZWxlY3RlZF09XCJpdGVtLnNlbGVjdGVkXCJcbiAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIlxuICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImRyb3Bkb3duT3BlblwiXG4gICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiaXRlbS5zZWxlY3RlZFwiXG4gICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAjYnV0dG9uXG4gICAgICAgIGRyb3Bkb3duVG9nZ2xlXG4gICAgICAgIHV4TWVudU5hdmlnYXRpb25Ub2dnbGVcbiAgICAgICAgI21lbnVOYXZpZ2F0aW9uVG9nZ2xlPVwidXhNZW51TmF2aWdhdGlvblRvZ2dsZVwiXG4gICAgICAgIFsobWVudU9wZW4pXT1cImRyb3Bkb3duT3BlblwiXG4gICAgICAgIG1lbnVQb3NpdGlvbj1cInJpZ2h0XCI+XG5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJkcm9wZG93bi1pdGVtLXRpdGxlXCI+e3sgaXRlbS50aXRsZSB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJkcm9wZG93bi1pdGVtLWljb24gaHBlLWljb24gaHBlLW5leHRcIj48L3NwYW4+XG5cbiAgICA8L2E+XG5cbiAgICA8dWwgKmRyb3Bkb3duTWVudVxuICAgICAgICByb2xlPVwibWVudVwiXG4gICAgICAgIGNsYXNzPVwiZHJvcGRvd24tbWVudSBob3Jpem9udGFsLW5hdmlnYXRpb24tZHJvcGRvd24tc3VibWVudVwiXG4gICAgICAgIChtb3VzZWVudGVyKT1cImhvdmVyU3RhcnQoKVwiXG4gICAgICAgIChtb3VzZWxlYXZlKT1cImhvdmVyTGVhdmUoKVwiXG4gICAgICAgIHV4TWVudU5hdmlnYXRpb25cbiAgICAgICAgI21lbnVOYXZpZ2F0aW9uPVwidXhNZW51TmF2aWdhdGlvblwiXG4gICAgICAgIFt0b2dnbGVCdXR0b25dPVwibWVudU5hdmlnYXRpb25Ub2dnbGVcIlxuICAgICAgICB0b2dnbGVCdXR0b25Qb3NpdGlvbj1cImxlZnRcIj5cblxuICAgICAgICA8bGkgKm5nRm9yPVwibGV0IHN1Ykl0ZW0gb2YgaXRlbS5jaGlsZHJlblwiIHJvbGU9XCJub25lXCI+XG5cbiAgICAgICAgICAgIDxhIHJvbGU9XCJtZW51aXRlbVwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCJcbiAgICAgICAgICAgICAgICBbY2xhc3Muc2VsZWN0ZWRdPVwic3ViSXRlbS5zZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJzdWJJdGVtLnNlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0KHN1Ykl0ZW0pXCJcbiAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJrZXlkb3duSGFuZGxlcigkZXZlbnQsIHN1Ykl0ZW0pXCJcbiAgICAgICAgICAgICAgICB1eE1lbnVOYXZpZ2F0aW9uSXRlbT5cblxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZHJvcGRvd24taXRlbS10aXRsZVwiPnt7IHN1Ykl0ZW0udGl0bGUgfX08L3NwYW4+XG5cbiAgICAgICAgICAgIDwvYT5cblxuICAgICAgICA8L2xpPlxuICAgIDwvdWw+XG5cbjwvZGl2PlxuXG48ZGl2ICpuZ0lmPVwiIWl0ZW0uY2hpbGRyZW4gfHwgaXRlbS5jaGlsZHJlbi5sZW5ndGggPT09IDBcIlxuICAgIChtb3VzZWVudGVyKT1cImhvdmVyU3RhcnQoKVwiXG4gICAgKG1vdXNlbGVhdmUpPVwiaG92ZXJMZWF2ZSgpXCI+XG5cbiAgICA8YSByb2xlPVwibWVudWl0ZW1cIlxuICAgICAgICAjYnV0dG9uXG4gICAgICAgIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiXG4gICAgICAgIFtjbGFzcy5zZWxlY3RlZF09XCJpdGVtLnNlbGVjdGVkXCJcbiAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJpdGVtLnNlbGVjdGVkXCJcbiAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgIChjbGljayk9XCJzZWxlY3QoaXRlbSlcIlxuICAgICAgICAoa2V5ZG93bik9XCJrZXlkb3duSGFuZGxlcigkZXZlbnQsIGl0ZW0pXCI+XG5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJkcm9wZG93bi1pdGVtLXRpdGxlXCI+e3sgaXRlbS50aXRsZSB9fTwvc3Bhbj5cblxuICAgIDwvYT5cblxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbTtcblxuICAgIEBWaWV3Q2hpbGQoJ2J1dHRvbicpXG4gICAgYnV0dG9uOiBFbGVtZW50UmVmO1xuXG4gICAgZHJvcGRvd25PcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIF9ob3ZlciQ6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZUhlYWRlclNlcnZpY2U6IFBhZ2VIZWFkZXJTZXJ2aWNlKSB7XG5cbiAgICAgICAgLy8gc3Vic2NyaWJlIHRvIHN0cmVhbSB3aXRoIGEgZGVib3VuY2UgKGEgc21hbGwgZGVib3VuY2UgaXMgYWxsIHRoYXQgaXMgcmVxdWlyZWQpXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMuX2hvdmVyJC5waXBlKGRlYm91bmNlVGltZSgxKSkuc3Vic2NyaWJlKHZpc2libGUgPT4gdGhpcy5kcm9wZG93bk9wZW4gPSB2aXNpYmxlKTtcblxuICAgICAgICAvLyBDbG9zZSBzdWJtZW51cyB3aGVuIHNlbGVjdGVkIGl0ZW0gY2hhbmdlc1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgICAgICAgX3BhZ2VIZWFkZXJTZXJ2aWNlLnNlbGVjdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJvcGRvd25PcGVuID0gZmFsc2U7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBzZWxlY3QoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW0pIHtcblxuICAgICAgICAvLyBjbGlja2luZyBvbiBhbiBpdGVtIHdpdGggY2hpbGRyZW4gdGhlbiByZXR1cm5cbiAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVtaXQgdGhlIHNlbGVjdGVkIGl0ZW0gaW4gYW4gZXZlbnRcbiAgICAgICAgdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2VsZWN0KGl0ZW0pO1xuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJ1dHRvbi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgaG92ZXJTdGFydCgpIHtcbiAgICAgICAgdGhpcy5faG92ZXIkLm5leHQodHJ1ZSk7XG4gICAgfVxuXG4gICAgaG92ZXJMZWF2ZSgpIHtcbiAgICAgICAgdGhpcy5faG92ZXIkLm5leHQoZmFsc2UpO1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIGtleWRvd25IYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbSk6IHZvaWQge1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBjYXNlICcgJzpcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdChpdGVtKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==