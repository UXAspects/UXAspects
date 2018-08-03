/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef } from '@angular/core';
import { ColorService } from '../../services/color/index';
import { PageHeaderCustomMenuDirective } from './custom-menu/custom-menu.directive';
import { PageHeaderService } from './page-header.service';
export class PageHeaderComponent {
    /**
     * @param {?} _colorService
     * @param {?} _pageHeaderService
     */
    constructor(_colorService, _pageHeaderService) {
        this._colorService = _colorService;
        this._pageHeaderService = _pageHeaderService;
        this.alignment = 'center';
        this.condensed = false;
        this.backVisible = true;
        this.secondaryNavigationAlignment = 'center';
        this.backClick = new EventEmitter();
        this.selected$ = this._pageHeaderService.selected$;
        this.selectedRoot$ = this._pageHeaderService.selectedRoot$;
        this._crumbs = [];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set secondaryNavigationAutoselect(value) {
        this._pageHeaderService.secondaryNavigationAutoselect = value;
    }
    /**
     * @return {?}
     */
    get secondaryNavigationAutoselect() {
        return this._pageHeaderService.secondaryNavigationAutoselect;
    }
    /**
     * @param {?} items
     * @return {?}
     */
    set items(items) {
        this._pageHeaderService.setItems(items);
    }
    /**
     * @param {?} enabled
     * @return {?}
     */
    set secondaryNavigation(enabled) {
        this._pageHeaderService.setSecondaryNavigation(enabled);
    }
    /**
     * @return {?}
     */
    get secondaryNavigation() {
        return this._pageHeaderService.secondary$.getValue();
    }
    /**
     * @param {?} crumbs
     * @return {?}
     */
    set crumbs(crumbs) {
        this._crumbs = crumbs;
    }
    /**
     * @return {?}
     */
    get crumbs() {
        return this.condensed ? [...this._crumbs, { title: this.header }] : this._crumbs;
    }
    /**
     * @param {?} color
     * @return {?}
     */
    set familyBackground(color) {
        this._familyBackground = this._colorService.resolve(color);
    }
    /**
     * @return {?}
     */
    get familyBackground() {
        return this._familyBackground;
    }
    /**
     * @param {?} color
     * @return {?}
     */
    set familyForeground(color) {
        this._familyForeground = this._colorService.resolve(color);
    }
    /**
     * @return {?}
     */
    get familyForeground() {
        return this._familyForeground;
    }
    /**
     * @return {?}
     */
    goBack() {
        this.backClick.emit();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    select(item) {
        this._pageHeaderService.select(item);
    }
}
PageHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-page-header',
                exportAs: 'ux-page-header',
                template: "<div class=\"ux-page-header\" [class.page-header-condensed]=\"condensed\" role=\"banner\">\n\n    <!-- Display Upper Section when not condensed -->\n    <div class=\"page-header-actions\" *ngIf=\"!condensed\">\n\n        <div class=\"page-header-logo-container\" role=\"presentation\" [hidden]=\"!logo\">\n            <img [attr.src]=\"logo\" class=\"page-header-logo\">\n        </div>\n\n        <div class=\"page-header-navigation\" [ngClass]=\"alignment\" role=\"navigation\" aria-label=\"Primary Navigation\">\n\n            <!-- The Top Navigation Options -->\n            <ux-page-header-horizontal-navigation></ux-page-header-horizontal-navigation>\n        </div>\n\n        <div class=\"page-header-icon-menus\" role=\"toolbar\">\n            <ng-container *ngFor=\"let menu of customMenus\" [ngTemplateOutlet]=\"menu\"></ng-container>\n\n            <ux-page-header-icon-menu *ngFor=\"let menu of iconMenus\" [menu]=\"menu\"></ux-page-header-icon-menu>\n        </div>\n    </div>\n\n    <!-- Display Lower Section When Not Condensed -->\n    <div class=\"page-header-details\" *ngIf=\"!condensed\">\n\n        <div class=\"page-header-state-container\" role=\"navigation\">\n\n            <button *ngIf=\"backVisible === true\" class=\"page-header-back-button\" (click)=\"goBack()\" aria-label=\"Go Back\">\n                <span class=\"hpe-icon hpe-previous text-primary\"></span>\n            </button>\n\n            <div class=\"page-header-title-container\">\n\n                <ux-breadcrumbs [crumbs]=\"crumbs\"></ux-breadcrumbs>\n\n                <h1 class=\"page-header-title\" [style.backgroundColor]=\"familyBackground\" [style.color]=\"familyForeground\">{{ header }}</h1>\n            </div>\n\n        </div>\n\n    </div>\n\n    <!-- Display This Section Optimized for Condensed Mode -->\n    <div class=\"page-header-condensed-content\" *ngIf=\"condensed\">\n\n        <div class=\"page-header-breadcrumbs\" role=\"navigation\">\n            <ux-breadcrumbs [crumbs]=\"crumbs\"></ux-breadcrumbs>\n        </div>\n\n        <div class=\"page-header-navigation\" [ngClass]=\"alignment\" role=\"navigation\" aria-label=\"Primary Navigation\">\n\n            <!-- The Top Navigation Options -->\n            <ux-page-header-horizontal-navigation></ux-page-header-horizontal-navigation>\n        </div>\n\n        <div class=\"page-header-icon-menus\" role=\"toolbar\">\n            <ng-container *ngFor=\"let menu of customMenus\" [ngTemplateOutlet]=\"menu\"></ng-container>\n            <ux-page-header-icon-menu *ngFor=\"let menu of iconMenus\" [menu]=\"menu\"></ux-page-header-icon-menu>\n        </div>\n\n    </div>\n\n</div>\n\n<div class=\"page-header-secondary\" [ngClass]=\"secondaryNavigationAlignment\" role=\"navigation\" *ngIf=\"secondaryNavigation && (selectedRoot$ | async)\">\n    <ul class=\"nav nav-tabs\" role=\"tablist\" aria-label=\"Secondary Navigation\" *ngIf=\"(selectedRoot$ | async)?.children; let children\">\n        <li *ngFor=\"let child of children\"\n            [class.active]=\"child.selected\"\n            role=\"none\"\n            [uxPageHeaderNavigationSecondaryItem]=\"child\">\n\n            <a role=\"tab\"\n                [attr.aria-selected]=\"child.selected\"\n                tabindex=\"0\"\n                (click)=\"select(child)\"\n                (keydown.enter)=\"select(child)\">{{ child.title }}</a>\n\n        </li>\n    </ul>\n</div>",
                providers: [PageHeaderService]
            }] }
];
/** @nocollapse */
PageHeaderComponent.ctorParameters = () => [
    { type: ColorService },
    { type: PageHeaderService }
];
PageHeaderComponent.propDecorators = {
    logo: [{ type: Input }],
    header: [{ type: Input }],
    alignment: [{ type: Input }],
    condensed: [{ type: Input }],
    iconMenus: [{ type: Input }],
    backVisible: [{ type: Input }],
    secondaryNavigationAlignment: [{ type: Input }],
    secondaryNavigationAutoselect: [{ type: Input }],
    items: [{ type: Input }],
    secondaryNavigation: [{ type: Input }],
    crumbs: [{ type: Input }],
    familyBackground: [{ type: Input }],
    familyForeground: [{ type: Input }],
    backClick: [{ type: Output }],
    customMenus: [{ type: ContentChildren, args: [PageHeaderCustomMenuDirective, { read: TemplateRef },] }]
};
function PageHeaderComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    PageHeaderComponent.prototype.logo;
    /** @type {?} */
    PageHeaderComponent.prototype.header;
    /** @type {?} */
    PageHeaderComponent.prototype.alignment;
    /** @type {?} */
    PageHeaderComponent.prototype.condensed;
    /** @type {?} */
    PageHeaderComponent.prototype.iconMenus;
    /** @type {?} */
    PageHeaderComponent.prototype.backVisible;
    /** @type {?} */
    PageHeaderComponent.prototype.secondaryNavigationAlignment;
    /** @type {?} */
    PageHeaderComponent.prototype.backClick;
    /** @type {?} */
    PageHeaderComponent.prototype.customMenus;
    /** @type {?} */
    PageHeaderComponent.prototype.selected$;
    /** @type {?} */
    PageHeaderComponent.prototype.selectedRoot$;
    /** @type {?} */
    PageHeaderComponent.prototype._crumbs;
    /** @type {?} */
    PageHeaderComponent.prototype._familyBackground;
    /** @type {?} */
    PageHeaderComponent.prototype._familyForeground;
    /** @type {?} */
    PageHeaderComponent.prototype._colorService;
    /** @type {?} */
    PageHeaderComponent.prototype._pageHeaderService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWhILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUdwRixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFRaEYsTUFBTTs7Ozs7SUFtRUYsWUFBb0IsYUFBMkIsRUFBVSxrQkFBcUM7UUFBMUUsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO3lCQS9ENUMsUUFBUTt5QkFDNUIsS0FBSzsyQkFFSCxJQUFJOzRDQUNZLFFBQVE7eUJBZ0RsQyxJQUFJLFlBQVksRUFBRTt5QkFJZSxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUzs2QkFDN0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWE7dUJBRWhFLEVBQUU7S0FJaUU7Ozs7O0lBekRuRyxJQUFhLDZCQUE2QixDQUFDLEtBQWM7UUFDckQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLDZCQUE2QixHQUFHLEtBQUssQ0FBQztLQUNqRTs7OztJQUVELElBQUksNkJBQTZCO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsNkJBQTZCLENBQUM7S0FDaEU7Ozs7O0lBRUQsSUFBYSxLQUFLLENBQUMsS0FBaUM7UUFDaEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMzQzs7Ozs7SUFFRCxJQUFhLG1CQUFtQixDQUFDLE9BQWdCO1FBQzdDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMzRDs7OztJQUVELElBQUksbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ3hEOzs7OztJQUVELElBQWEsTUFBTSxDQUFDLE1BQW9CO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0tBQ3pCOzs7O0lBRUQsSUFBSSxNQUFNO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ3BGOzs7OztJQUVELElBQ0ksZ0JBQWdCLENBQUMsS0FBYTtRQUM5QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDOUQ7Ozs7SUFFRCxJQUFJLGdCQUFnQjtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0tBQ2pDOzs7OztJQUVELElBQ0ksZ0JBQWdCLENBQUMsS0FBYTtRQUM5QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDOUQ7Ozs7SUFFRCxJQUFJLGdCQUFnQjtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0tBQ2pDOzs7O0lBZUQsTUFBTTtRQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDekI7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQTBCO1FBQzdCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDeEM7OztZQWpGSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsbTJHQUF5QztnQkFDekMsU0FBUyxFQUFFLENBQUUsaUJBQWlCLENBQUU7YUFDbkM7Ozs7WUFaUSxZQUFZO1lBS1UsaUJBQWlCOzs7bUJBVTNDLEtBQUs7cUJBQ0wsS0FBSzt3QkFDTCxLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsS0FBSzswQkFDTCxLQUFLOzJDQUNMLEtBQUs7NENBRUwsS0FBSztvQkFRTCxLQUFLO2tDQUlMLEtBQUs7cUJBUUwsS0FBSzsrQkFRTCxLQUFLOytCQVNMLEtBQUs7d0JBU0wsTUFBTTswQkFFTixlQUFlLFNBQUMsNkJBQTZCLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgUXVlcnlMaXN0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgQ29sb3JTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29sb3IvaW5kZXgnO1xuaW1wb3J0IHsgQnJlYWRjcnVtYiB9IGZyb20gJy4uL2JyZWFkY3J1bWJzL2luZGV4JztcbmltcG9ydCB7IFBhZ2VIZWFkZXJDdXN0b21NZW51RGlyZWN0aXZlIH0gZnJvbSAnLi9jdXN0b20tbWVudS9jdXN0b20tbWVudS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUGFnZUhlYWRlckljb25NZW51IH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbSB9IGZyb20gJy4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYWdlSGVhZGVyTmF2aWdhdGlvbiwgUGFnZUhlYWRlclNlcnZpY2UgfSBmcm9tICcuL3BhZ2UtaGVhZGVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LXBhZ2UtaGVhZGVyJyxcbiAgICBleHBvcnRBczogJ3V4LXBhZ2UtaGVhZGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3BhZ2UtaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBwcm92aWRlcnM6IFsgUGFnZUhlYWRlclNlcnZpY2UgXVxufSlcbmV4cG9ydCBjbGFzcyBQYWdlSGVhZGVyQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGxvZ286IHN0cmluZztcbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSBhbGlnbm1lbnQ6ICdsZWZ0JyB8ICdyaWdodCcgfCAnY2VudGVyJyA9ICdjZW50ZXInO1xuICAgIEBJbnB1dCgpIGNvbmRlbnNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGljb25NZW51czogUGFnZUhlYWRlckljb25NZW51W107XG4gICAgQElucHV0KCkgYmFja1Zpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHNlY29uZGFyeU5hdmlnYXRpb25BbGlnbm1lbnQ6IHN0cmluZyA9ICdjZW50ZXInO1xuXG4gICAgQElucHV0KCkgc2V0IHNlY29uZGFyeU5hdmlnYXRpb25BdXRvc2VsZWN0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3BhZ2VIZWFkZXJTZXJ2aWNlLnNlY29uZGFyeU5hdmlnYXRpb25BdXRvc2VsZWN0ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHNlY29uZGFyeU5hdmlnYXRpb25BdXRvc2VsZWN0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2Vjb25kYXJ5TmF2aWdhdGlvbkF1dG9zZWxlY3Q7XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V0IGl0ZW1zKGl0ZW1zOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW1bXSkge1xuICAgICAgICB0aGlzLl9wYWdlSGVhZGVyU2VydmljZS5zZXRJdGVtcyhpdGVtcyk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V0IHNlY29uZGFyeU5hdmlnYXRpb24oZW5hYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9wYWdlSGVhZGVyU2VydmljZS5zZXRTZWNvbmRhcnlOYXZpZ2F0aW9uKGVuYWJsZWQpO1xuICAgIH1cblxuICAgIGdldCBzZWNvbmRhcnlOYXZpZ2F0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2Vjb25kYXJ5JC5nZXRWYWx1ZSgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHNldCBjcnVtYnMoY3J1bWJzOiBCcmVhZGNydW1iW10pIHtcbiAgICAgICAgdGhpcy5fY3J1bWJzID0gY3J1bWJzO1xuICAgIH1cblxuICAgIGdldCBjcnVtYnMoKTogQnJlYWRjcnVtYltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZGVuc2VkID8gWy4uLnRoaXMuX2NydW1icywgeyB0aXRsZTogdGhpcy5oZWFkZXIgfV0gOiB0aGlzLl9jcnVtYnM7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZmFtaWx5QmFja2dyb3VuZChjb2xvcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2ZhbWlseUJhY2tncm91bmQgPSB0aGlzLl9jb2xvclNlcnZpY2UucmVzb2x2ZShjb2xvcik7XG4gICAgfVxuXG4gICAgZ2V0IGZhbWlseUJhY2tncm91bmQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZhbWlseUJhY2tncm91bmQ7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZmFtaWx5Rm9yZWdyb3VuZChjb2xvcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2ZhbWlseUZvcmVncm91bmQgPSB0aGlzLl9jb2xvclNlcnZpY2UucmVzb2x2ZShjb2xvcik7XG4gICAgfVxuXG4gICAgZ2V0IGZhbWlseUZvcmVncm91bmQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZhbWlseUZvcmVncm91bmQ7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpIGJhY2tDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUGFnZUhlYWRlckN1c3RvbU1lbnVEaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYgfSkgY3VzdG9tTWVudXM6IFF1ZXJ5TGlzdDxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHNlbGVjdGVkJDogQmVoYXZpb3JTdWJqZWN0PFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbT4gPSB0aGlzLl9wYWdlSGVhZGVyU2VydmljZS5zZWxlY3RlZCQ7XG4gICAgc2VsZWN0ZWRSb290JDogQmVoYXZpb3JTdWJqZWN0PFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbT4gPSB0aGlzLl9wYWdlSGVhZGVyU2VydmljZS5zZWxlY3RlZFJvb3QkO1xuXG4gICAgcHJpdmF0ZSBfY3J1bWJzOiBCcmVhZGNydW1iW10gPSBbXTtcbiAgICBwcml2YXRlIF9mYW1pbHlCYWNrZ3JvdW5kOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfZmFtaWx5Rm9yZWdyb3VuZDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY29sb3JTZXJ2aWNlOiBDb2xvclNlcnZpY2UsIHByaXZhdGUgX3BhZ2VIZWFkZXJTZXJ2aWNlOiBQYWdlSGVhZGVyU2VydmljZSkgeyB9XG5cbiAgICBnb0JhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYmFja0NsaWNrLmVtaXQoKTtcbiAgICB9XG5cbiAgICBzZWxlY3QoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2VsZWN0KGl0ZW0pO1xuICAgIH1cbn0iXX0=