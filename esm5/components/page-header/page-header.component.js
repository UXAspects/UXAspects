/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef } from '@angular/core';
import { ColorService } from '../../services/color/index';
import { PageHeaderCustomMenuDirective } from './custom-menu/custom-menu.directive';
import { PageHeaderService } from './page-header.service';
var PageHeaderComponent = /** @class */ (function () {
    function PageHeaderComponent(_colorService, _pageHeaderService) {
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
    Object.defineProperty(PageHeaderComponent.prototype, "secondaryNavigationAutoselect", {
        get: /**
         * @return {?}
         */
        function () {
            return this._pageHeaderService.secondaryNavigationAutoselect;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._pageHeaderService.secondaryNavigationAutoselect = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageHeaderComponent.prototype, "items", {
        set: /**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            this._pageHeaderService.setItems(items);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageHeaderComponent.prototype, "secondaryNavigation", {
        get: /**
         * @return {?}
         */
        function () {
            return this._pageHeaderService.secondary$.getValue();
        },
        set: /**
         * @param {?} enabled
         * @return {?}
         */
        function (enabled) {
            this._pageHeaderService.setSecondaryNavigation(enabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageHeaderComponent.prototype, "crumbs", {
        get: /**
         * @return {?}
         */
        function () {
            return this.condensed ? tslib_1.__spread(this._crumbs, [{ title: this.header }]) : this._crumbs;
        },
        set: /**
         * @param {?} crumbs
         * @return {?}
         */
        function (crumbs) {
            this._crumbs = crumbs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageHeaderComponent.prototype, "familyBackground", {
        get: /**
         * @return {?}
         */
        function () {
            return this._familyBackground;
        },
        set: /**
         * @param {?} color
         * @return {?}
         */
        function (color) {
            this._familyBackground = this._colorService.resolve(color);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageHeaderComponent.prototype, "familyForeground", {
        get: /**
         * @return {?}
         */
        function () {
            return this._familyForeground;
        },
        set: /**
         * @param {?} color
         * @return {?}
         */
        function (color) {
            this._familyForeground = this._colorService.resolve(color);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PageHeaderComponent.prototype.goBack = /**
     * @return {?}
     */
    function () {
        this.backClick.emit();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    PageHeaderComponent.prototype.select = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this._pageHeaderService.select(item);
    };
    PageHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-page-header',
                    exportAs: 'ux-page-header',
                    template: "<div class=\"ux-page-header\" [class.page-header-condensed]=\"condensed\" role=\"banner\">\n\n    <!-- Display Upper Section when not condensed -->\n    <div class=\"page-header-actions\" *ngIf=\"!condensed\">\n\n        <div class=\"page-header-logo-container\" role=\"presentation\" [hidden]=\"!logo\">\n            <img [attr.src]=\"logo\" class=\"page-header-logo\">\n        </div>\n\n        <div class=\"page-header-navigation\" [ngClass]=\"alignment\" role=\"navigation\" aria-label=\"Primary Navigation\">\n\n            <!-- The Top Navigation Options -->\n            <ux-page-header-horizontal-navigation></ux-page-header-horizontal-navigation>\n        </div>\n\n        <div class=\"page-header-icon-menus\" role=\"toolbar\">\n            <ng-container *ngFor=\"let menu of customMenus\" [ngTemplateOutlet]=\"menu\"></ng-container>\n\n            <ux-page-header-icon-menu *ngFor=\"let menu of iconMenus\" [menu]=\"menu\"></ux-page-header-icon-menu>\n        </div>\n    </div>\n\n    <!-- Display Lower Section When Not Condensed -->\n    <div class=\"page-header-details\" *ngIf=\"!condensed\">\n\n        <div class=\"page-header-state-container\" role=\"navigation\">\n\n            <button *ngIf=\"backVisible === true\" class=\"page-header-back-button\" (click)=\"goBack()\" aria-label=\"Go Back\">\n                <span class=\"hpe-icon hpe-previous text-primary\"></span>\n            </button>\n\n            <div class=\"page-header-title-container\">\n\n                <ux-breadcrumbs [crumbs]=\"crumbs\"></ux-breadcrumbs>\n\n                <h1 class=\"page-header-title\" [style.backgroundColor]=\"familyBackground\" [style.color]=\"familyForeground\">{{ header }}</h1>\n            </div>\n\n        </div>\n\n    </div>\n\n    <!-- Display This Section Optimized for Condensed Mode -->\n    <div class=\"page-header-condensed-content\" *ngIf=\"condensed\">\n\n        <div class=\"page-header-breadcrumbs\" role=\"navigation\">\n            <ux-breadcrumbs [crumbs]=\"crumbs\"></ux-breadcrumbs>\n        </div>\n\n        <div class=\"page-header-navigation\" [ngClass]=\"alignment\" role=\"navigation\" aria-label=\"Primary Navigation\">\n\n            <!-- The Top Navigation Options -->\n            <ux-page-header-horizontal-navigation></ux-page-header-horizontal-navigation>\n        </div>\n\n        <div class=\"page-header-icon-menus\" role=\"toolbar\">\n            <ng-container *ngFor=\"let menu of customMenus\" [ngTemplateOutlet]=\"menu\"></ng-container>\n            <ux-page-header-icon-menu *ngFor=\"let menu of iconMenus\" [menu]=\"menu\"></ux-page-header-icon-menu>\n        </div>\n\n    </div>\n\n</div>\n\n<div class=\"page-header-secondary\" [ngClass]=\"secondaryNavigationAlignment\" role=\"navigation\" *ngIf=\"secondaryNavigation && (selectedRoot$ | async)\">\n    <ul class=\"nav nav-tabs\" role=\"tablist\" aria-label=\"Secondary Navigation\" *ngIf=\"(selectedRoot$ | async)?.children; let children\">\n        <li *ngFor=\"let child of children\"\n            [class.active]=\"child.selected\"\n            role=\"none\"\n            [uxPageHeaderNavigationSecondaryItem]=\"child\">\n\n            <a role=\"tab\"\n                [attr.aria-selected]=\"child.selected\"\n                tabindex=\"0\"\n                (click)=\"select(child)\"\n                (keydown.enter)=\"select(child)\">{{ child.title }}</a>\n\n        </li>\n    </ul>\n</div>",
                    providers: [PageHeaderService]
                }] }
    ];
    /** @nocollapse */
    PageHeaderComponent.ctorParameters = function () { return [
        { type: ColorService },
        { type: PageHeaderService }
    ]; };
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
    return PageHeaderComponent;
}());
export { PageHeaderComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFMUQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFHcEYsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztJQTJFNUUsNkJBQW9CLGFBQTJCLEVBQVUsa0JBQXFDO1FBQTFFLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjt5QkEvRDVDLFFBQVE7eUJBQzVCLEtBQUs7MkJBRUgsSUFBSTs0Q0FDWSxRQUFRO3lCQWdEbEMsSUFBSSxZQUFZLEVBQUU7eUJBSWUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVM7NkJBQzdCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhO3VCQUVoRSxFQUFFO0tBSWlFO0lBekRuRyxzQkFBYSw4REFBNkI7Ozs7UUFJMUM7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLDZCQUE2QixDQUFDO1NBQ2hFOzs7OztRQU5ELFVBQTJDLEtBQWM7WUFDckQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLDZCQUE2QixHQUFHLEtBQUssQ0FBQztTQUNqRTs7O09BQUE7SUFNRCxzQkFBYSxzQ0FBSzs7Ozs7UUFBbEIsVUFBbUIsS0FBaUM7WUFDaEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzQzs7O09BQUE7SUFFRCxzQkFBYSxvREFBbUI7Ozs7UUFJaEM7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUN4RDs7Ozs7UUFORCxVQUFpQyxPQUFnQjtZQUM3QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDM0Q7OztPQUFBO0lBTUQsc0JBQWEsdUNBQU07Ozs7UUFJbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGtCQUFLLElBQUksQ0FBQyxPQUFPLEdBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3BGOzs7OztRQU5ELFVBQW9CLE1BQW9CO1lBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1NBQ3pCOzs7T0FBQTtJQU1ELHNCQUNJLGlEQUFnQjs7OztRQUlwQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7U0FDakM7Ozs7O1FBUEQsVUFDcUIsS0FBYTtZQUM5QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUQ7OztPQUFBO0lBTUQsc0JBQ0ksaURBQWdCOzs7O1FBSXBCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztTQUNqQzs7Ozs7UUFQRCxVQUNxQixLQUFhO1lBQzlCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5RDs7O09BQUE7Ozs7SUFtQkQsb0NBQU07OztJQUFOO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN6Qjs7Ozs7SUFFRCxvQ0FBTTs7OztJQUFOLFVBQU8sSUFBMEI7UUFDN0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN4Qzs7Z0JBakZKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixtMkdBQXlDO29CQUN6QyxTQUFTLEVBQUUsQ0FBRSxpQkFBaUIsQ0FBRTtpQkFDbkM7Ozs7Z0JBWlEsWUFBWTtnQkFLVSxpQkFBaUI7Ozt1QkFVM0MsS0FBSzt5QkFDTCxLQUFLOzRCQUNMLEtBQUs7NEJBQ0wsS0FBSzs0QkFDTCxLQUFLOzhCQUNMLEtBQUs7K0NBQ0wsS0FBSztnREFFTCxLQUFLO3dCQVFMLEtBQUs7c0NBSUwsS0FBSzt5QkFRTCxLQUFLO21DQVFMLEtBQUs7bUNBU0wsS0FBSzs0QkFTTCxNQUFNOzhCQUVOLGVBQWUsU0FBQyw2QkFBNkIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7OzhCQXpFekU7O1NBZWEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgUXVlcnlMaXN0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgQ29sb3JTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29sb3IvaW5kZXgnO1xuaW1wb3J0IHsgQnJlYWRjcnVtYiB9IGZyb20gJy4uL2JyZWFkY3J1bWJzL2luZGV4JztcbmltcG9ydCB7IFBhZ2VIZWFkZXJDdXN0b21NZW51RGlyZWN0aXZlIH0gZnJvbSAnLi9jdXN0b20tbWVudS9jdXN0b20tbWVudS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUGFnZUhlYWRlckljb25NZW51IH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbSB9IGZyb20gJy4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYWdlSGVhZGVyTmF2aWdhdGlvbiwgUGFnZUhlYWRlclNlcnZpY2UgfSBmcm9tICcuL3BhZ2UtaGVhZGVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LXBhZ2UtaGVhZGVyJyxcbiAgICBleHBvcnRBczogJ3V4LXBhZ2UtaGVhZGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3BhZ2UtaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBwcm92aWRlcnM6IFsgUGFnZUhlYWRlclNlcnZpY2UgXVxufSlcbmV4cG9ydCBjbGFzcyBQYWdlSGVhZGVyQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGxvZ286IHN0cmluZztcbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSBhbGlnbm1lbnQ6ICdsZWZ0JyB8ICdyaWdodCcgfCAnY2VudGVyJyA9ICdjZW50ZXInO1xuICAgIEBJbnB1dCgpIGNvbmRlbnNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGljb25NZW51czogUGFnZUhlYWRlckljb25NZW51W107XG4gICAgQElucHV0KCkgYmFja1Zpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHNlY29uZGFyeU5hdmlnYXRpb25BbGlnbm1lbnQ6IHN0cmluZyA9ICdjZW50ZXInO1xuXG4gICAgQElucHV0KCkgc2V0IHNlY29uZGFyeU5hdmlnYXRpb25BdXRvc2VsZWN0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3BhZ2VIZWFkZXJTZXJ2aWNlLnNlY29uZGFyeU5hdmlnYXRpb25BdXRvc2VsZWN0ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHNlY29uZGFyeU5hdmlnYXRpb25BdXRvc2VsZWN0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2Vjb25kYXJ5TmF2aWdhdGlvbkF1dG9zZWxlY3Q7XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V0IGl0ZW1zKGl0ZW1zOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW1bXSkge1xuICAgICAgICB0aGlzLl9wYWdlSGVhZGVyU2VydmljZS5zZXRJdGVtcyhpdGVtcyk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V0IHNlY29uZGFyeU5hdmlnYXRpb24oZW5hYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9wYWdlSGVhZGVyU2VydmljZS5zZXRTZWNvbmRhcnlOYXZpZ2F0aW9uKGVuYWJsZWQpO1xuICAgIH1cblxuICAgIGdldCBzZWNvbmRhcnlOYXZpZ2F0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2Vjb25kYXJ5JC5nZXRWYWx1ZSgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHNldCBjcnVtYnMoY3J1bWJzOiBCcmVhZGNydW1iW10pIHtcbiAgICAgICAgdGhpcy5fY3J1bWJzID0gY3J1bWJzO1xuICAgIH1cblxuICAgIGdldCBjcnVtYnMoKTogQnJlYWRjcnVtYltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZGVuc2VkID8gWy4uLnRoaXMuX2NydW1icywgeyB0aXRsZTogdGhpcy5oZWFkZXIgfV0gOiB0aGlzLl9jcnVtYnM7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZmFtaWx5QmFja2dyb3VuZChjb2xvcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2ZhbWlseUJhY2tncm91bmQgPSB0aGlzLl9jb2xvclNlcnZpY2UucmVzb2x2ZShjb2xvcik7XG4gICAgfVxuXG4gICAgZ2V0IGZhbWlseUJhY2tncm91bmQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZhbWlseUJhY2tncm91bmQ7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZmFtaWx5Rm9yZWdyb3VuZChjb2xvcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2ZhbWlseUZvcmVncm91bmQgPSB0aGlzLl9jb2xvclNlcnZpY2UucmVzb2x2ZShjb2xvcik7XG4gICAgfVxuXG4gICAgZ2V0IGZhbWlseUZvcmVncm91bmQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZhbWlseUZvcmVncm91bmQ7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpIGJhY2tDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUGFnZUhlYWRlckN1c3RvbU1lbnVEaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYgfSkgY3VzdG9tTWVudXM6IFF1ZXJ5TGlzdDxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHNlbGVjdGVkJDogQmVoYXZpb3JTdWJqZWN0PFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbT4gPSB0aGlzLl9wYWdlSGVhZGVyU2VydmljZS5zZWxlY3RlZCQ7XG4gICAgc2VsZWN0ZWRSb290JDogQmVoYXZpb3JTdWJqZWN0PFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbT4gPSB0aGlzLl9wYWdlSGVhZGVyU2VydmljZS5zZWxlY3RlZFJvb3QkO1xuXG4gICAgcHJpdmF0ZSBfY3J1bWJzOiBCcmVhZGNydW1iW10gPSBbXTtcbiAgICBwcml2YXRlIF9mYW1pbHlCYWNrZ3JvdW5kOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfZmFtaWx5Rm9yZWdyb3VuZDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY29sb3JTZXJ2aWNlOiBDb2xvclNlcnZpY2UsIHByaXZhdGUgX3BhZ2VIZWFkZXJTZXJ2aWNlOiBQYWdlSGVhZGVyU2VydmljZSkgeyB9XG5cbiAgICBnb0JhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYmFja0NsaWNrLmVtaXQoKTtcbiAgICB9XG5cbiAgICBzZWxlY3QoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2VsZWN0KGl0ZW0pO1xuICAgIH1cbn0iXX0=