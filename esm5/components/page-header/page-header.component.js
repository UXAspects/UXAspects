/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef } from '@angular/core';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { ColorService } from '../../services/color/index';
import { PageHeaderCustomMenuDirective } from './custom-menu/custom-menu.directive';
import { PageHeaderService } from './page-header.service';
var PageHeaderComponent = (function () {
    function PageHeaderComponent(_colorService, _pageHeaderService) {
        this._colorService = _colorService;
        this._pageHeaderService = _pageHeaderService;
        this.alignment = 'center';
        this.condensed = false;
        this.backVisible = true;
        this.secondaryNavigationAlignment = 'center';
        this.secondaryNavigationAutoselect = false;
        this.backClick = new EventEmitter();
        this.selected$ = this._pageHeaderService.selected$;
        this.selectedRoot$ = this._pageHeaderService.selectedRoot$;
        this._crumbs = [];
    }
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
    PageHeaderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._subscription = this.selectedRoot$.pipe(distinctUntilChanged(), filter(function () { return _this.secondaryNavigation && _this.secondaryNavigationAutoselect; }), filter(function (item) { return item && item.children && item.children.length > 0; }), map(function (item) { return item.children[0]; })).subscribe(function (item) { return _this.select(item); });
    };
    /**
     * @return {?}
     */
    PageHeaderComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
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
                    template: "<div class=\"ux-page-header\" [class.page-header-condensed]=\"condensed\" role=\"banner\">\n\n    <!-- Display Upper Section when not condensed -->\n    <div class=\"page-header-actions\" *ngIf=\"!condensed\">\n\n        <div class=\"page-header-logo-container\" role=\"presentation\" [hidden]=\"!logo\">\n            <img [attr.src]=\"logo\" class=\"page-header-logo\">\n        </div>\n\n        <div class=\"page-header-navigation\" [ngClass]=\"alignment\" role=\"navigation\" aria-label=\"Primary Navigation\">\n\n            <!-- The Top Navigation Options -->\n            <ux-page-header-horizontal-navigation></ux-page-header-horizontal-navigation>\n        </div>\n\n        <div class=\"page-header-icon-menus\" role=\"toolbar\">\n            <ng-container *ngFor=\"let menu of customMenus\" [ngTemplateOutlet]=\"menu\"></ng-container>\n\n            <ux-page-header-icon-menu *ngFor=\"let menu of iconMenus\" [menu]=\"menu\"></ux-page-header-icon-menu>\n        </div>\n    </div>\n\n    <!-- Display Lower Section When Not Condensed -->\n    <div class=\"page-header-details\" *ngIf=\"!condensed\">\n\n        <div class=\"page-header-state-container\" role=\"navigation\">\n\n            <button *ngIf=\"backVisible === true\" class=\"page-header-back-button\" (click)=\"goBack()\" aria-label=\"Go Back\">\n                <span class=\"hpe-icon hpe-previous text-primary\"></span>\n            </button>\n\n            <div class=\"page-header-title-container\">\n\n                <ux-breadcrumbs [crumbs]=\"crumbs\"></ux-breadcrumbs>\n\n                <h1 class=\"page-header-title\" [style.backgroundColor]=\"familyBackground\" [style.color]=\"familyForeground\">{{ header }}</h1>\n            </div>\n\n        </div>\n\n    </div>\n\n    <!-- Display This Section Optimized for Condensed Mode -->\n    <div class=\"page-header-condensed-content\" *ngIf=\"condensed\">\n\n        <div class=\"page-header-breadcrumbs\" role=\"navigation\">\n            <ux-breadcrumbs [crumbs]=\"crumbs\"></ux-breadcrumbs>\n        </div>\n\n        <div class=\"page-header-navigation\" [ngClass]=\"alignment\" role=\"navigation\" aria-label=\"Primary Navigation\">\n\n            <!-- The Top Navigation Options -->\n            <ux-page-header-horizontal-navigation></ux-page-header-horizontal-navigation>\n        </div>\n\n        <div class=\"page-header-icon-menus\" role=\"toolbar\">\n            <ng-container *ngFor=\"let menu of customMenus\" [ngTemplateOutlet]=\"menu\"></ng-container>\n            <ux-page-header-icon-menu *ngFor=\"let menu of iconMenus\" [menu]=\"menu\"></ux-page-header-icon-menu>\n        </div>\n\n    </div>\n\n</div>\n\n<div class=\"page-header-secondary\" [ngClass]=\"secondaryNavigationAlignment\" role=\"navigation\" *ngIf=\"secondaryNavigation && (selectedRoot$ | async)\">\n    <ul class=\"nav nav-tabs\" role=\"tablist\" aria-label=\"Secondary Navigation\" *ngIf=\"(selectedRoot$ | async)?.children; let children\">\n        <li *ngFor=\"let child of children\" [class.active]=\"child === (selected$ | async)\" role=\"none\">\n            <a role=\"tab\"\n                [attr.aria-selected]=\"child === (selected$ | async)\"\n                tabindex=\"0\"\n                (click)=\"select(child)\"\n                (keydown.enter)=\"select(child)\">{{ child.title }}</a>\n        </li>\n    </ul>\n</div>",
                    providers: [PageHeaderService]
                },] },
    ];
    /** @nocollapse */
    PageHeaderComponent.ctorParameters = function () { return [
        { type: ColorService, },
        { type: PageHeaderService, },
    ]; };
    PageHeaderComponent.propDecorators = {
        "logo": [{ type: Input },],
        "header": [{ type: Input },],
        "alignment": [{ type: Input },],
        "condensed": [{ type: Input },],
        "iconMenus": [{ type: Input },],
        "backVisible": [{ type: Input },],
        "secondaryNavigationAlignment": [{ type: Input },],
        "secondaryNavigationAutoselect": [{ type: Input },],
        "items": [{ type: Input },],
        "secondaryNavigation": [{ type: Input },],
        "crumbs": [{ type: Input },],
        "familyBackground": [{ type: Input },],
        "familyForeground": [{ type: Input },],
        "backClick": [{ type: Output },],
        "customMenus": [{ type: ContentChildren, args: [PageHeaderCustomMenuDirective, { read: TemplateRef },] },],
    };
    return PageHeaderComponent;
}());
export { PageHeaderComponent };
function PageHeaderComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PageHeaderComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PageHeaderComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    PageHeaderComponent.propDecorators;
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
    PageHeaderComponent.prototype.secondaryNavigationAutoselect;
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
    PageHeaderComponent.prototype._subscription;
    /** @type {?} */
    PageHeaderComponent.prototype._colorService;
    /** @type {?} */
    PageHeaderComponent.prototype._pageHeaderService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHbkksT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFMUQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFHcEYsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztJQStJNUUsNkJBQW9CLGFBQTJCLEVBQVUsa0JBQXFDO1FBQTFFLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjt5QkF6RDVDLFFBQVE7eUJBQzVCLEtBQUs7MkJBRUgsSUFBSTs0Q0FDWSxRQUFROzZDQUNOLEtBQUs7eUJBd0NqQyxJQUFJLFlBQVksRUFBRTt5QkFJZSxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUzs2QkFDN0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWE7dUJBRWhFLEVBQUU7S0FLaUU7MEJBbER0RixzQ0FBSzs7Ozs7a0JBQUMsS0FBaUM7WUFDaEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7MEJBRy9CLG9EQUFtQjs7OztRQUloQztZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3hEOzs7OztrQkFOZ0MsT0FBZ0I7WUFDN0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7OzswQkFPL0MsdUNBQU07Ozs7UUFJbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsb0JBQU8sSUFBSSxDQUFDLE9BQU8sR0FBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUNwRjs7Ozs7a0JBTm1CLE1BQW9CO1lBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDOzs7OzswQkFRdEIsaURBQWdCOzs7O1FBSXBCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztTQUNqQzs7Ozs7a0JBTm9CLEtBQWE7WUFDOUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OzswQkFRM0QsaURBQWdCOzs7O1FBSXBCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztTQUNqQzs7Ozs7a0JBTm9CLEtBQWE7WUFDOUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7OztJQXFCL0Qsc0NBQVE7OztJQUFSO1FBQUEsaUJBT0M7UUFORyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUN4QyxvQkFBb0IsRUFBRSxFQUN0QixNQUFNLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsSUFBSSxLQUFJLENBQUMsNkJBQTZCLEVBQTlELENBQThELENBQUMsRUFDNUUsTUFBTSxDQUFDLFVBQUMsSUFBMEIsSUFBSyxPQUFBLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBakQsQ0FBaUQsQ0FBQyxFQUN6RixHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQ2hDLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0tBQzFDOzs7O0lBRUQseUNBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQzs7OztJQUVELG9DQUFNOzs7SUFBTjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDekI7Ozs7O0lBRUQsb0NBQU07Ozs7SUFBTixVQUFPLElBQTBCO1FBQzdCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDeEM7O2dCQWxLSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLDR4R0EwRVA7b0JBQ0gsU0FBUyxFQUFFLENBQUUsaUJBQWlCLENBQUU7aUJBQ25DOzs7O2dCQXRGUSxZQUFZO2dCQUtVLGlCQUFpQjs7O3lCQW9GM0MsS0FBSzsyQkFDTCxLQUFLOzhCQUNMLEtBQUs7OEJBQ0wsS0FBSzs4QkFDTCxLQUFLO2dDQUNMLEtBQUs7aURBQ0wsS0FBSztrREFDTCxLQUFLOzBCQUVMLEtBQUs7d0NBSUwsS0FBSzsyQkFRTCxLQUFLO3FDQVFMLEtBQUs7cUNBU0wsS0FBSzs4QkFTTCxNQUFNO2dDQUVOLGVBQWUsU0FBQyw2QkFBNkIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7OzhCQTlJekU7O1NBMkZhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBRdWVyeUxpc3QsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb2xvclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb2xvci9pbmRleCc7XG5pbXBvcnQgeyBCcmVhZGNydW1iIH0gZnJvbSAnLi4vYnJlYWRjcnVtYnMvaW5kZXgnO1xuaW1wb3J0IHsgUGFnZUhlYWRlckN1c3RvbU1lbnVEaXJlY3RpdmUgfSBmcm9tICcuL2N1c3RvbS1tZW51L2N1c3RvbS1tZW51LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQYWdlSGVhZGVySWNvbk1lbnUgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtIH0gZnJvbSAnLi9uYXZpZ2F0aW9uL25hdmlnYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uLCBQYWdlSGVhZGVyU2VydmljZSB9IGZyb20gJy4vcGFnZS1oZWFkZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtcGFnZS1oZWFkZXInLFxuICAgIGV4cG9ydEFzOiAndXgtcGFnZS1oZWFkZXInLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInV4LXBhZ2UtaGVhZGVyXCIgW2NsYXNzLnBhZ2UtaGVhZGVyLWNvbmRlbnNlZF09XCJjb25kZW5zZWRcIiByb2xlPVwiYmFubmVyXCI+XG5cbiAgICA8IS0tIERpc3BsYXkgVXBwZXIgU2VjdGlvbiB3aGVuIG5vdCBjb25kZW5zZWQgLS0+XG4gICAgPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyLWFjdGlvbnNcIiAqbmdJZj1cIiFjb25kZW5zZWRcIj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFnZS1oZWFkZXItbG9nby1jb250YWluZXJcIiByb2xlPVwicHJlc2VudGF0aW9uXCIgW2hpZGRlbl09XCIhbG9nb1wiPlxuICAgICAgICAgICAgPGltZyBbYXR0ci5zcmNdPVwibG9nb1wiIGNsYXNzPVwicGFnZS1oZWFkZXItbG9nb1wiPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFnZS1oZWFkZXItbmF2aWdhdGlvblwiIFtuZ0NsYXNzXT1cImFsaWdubWVudFwiIHJvbGU9XCJuYXZpZ2F0aW9uXCIgYXJpYS1sYWJlbD1cIlByaW1hcnkgTmF2aWdhdGlvblwiPlxuXG4gICAgICAgICAgICA8IS0tIFRoZSBUb3AgTmF2aWdhdGlvbiBPcHRpb25zIC0tPlxuICAgICAgICAgICAgPHV4LXBhZ2UtaGVhZGVyLWhvcml6b250YWwtbmF2aWdhdGlvbj48L3V4LXBhZ2UtaGVhZGVyLWhvcml6b250YWwtbmF2aWdhdGlvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyLWljb24tbWVudXNcIiByb2xlPVwidG9vbGJhclwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbWVudSBvZiBjdXN0b21NZW51c1wiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm1lbnVcIj48L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgPHV4LXBhZ2UtaGVhZGVyLWljb24tbWVudSAqbmdGb3I9XCJsZXQgbWVudSBvZiBpY29uTWVudXNcIiBbbWVudV09XCJtZW51XCI+PC91eC1wYWdlLWhlYWRlci1pY29uLW1lbnU+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBEaXNwbGF5IExvd2VyIFNlY3Rpb24gV2hlbiBOb3QgQ29uZGVuc2VkIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJwYWdlLWhlYWRlci1kZXRhaWxzXCIgKm5nSWY9XCIhY29uZGVuc2VkXCI+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyLXN0YXRlLWNvbnRhaW5lclwiIHJvbGU9XCJuYXZpZ2F0aW9uXCI+XG5cbiAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJiYWNrVmlzaWJsZSA9PT0gdHJ1ZVwiIGNsYXNzPVwicGFnZS1oZWFkZXItYmFjay1idXR0b25cIiAoY2xpY2spPVwiZ29CYWNrKClcIiBhcmlhLWxhYmVsPVwiR28gQmFja1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaHBlLWljb24gaHBlLXByZXZpb3VzIHRleHQtcHJpbWFyeVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFnZS1oZWFkZXItdGl0bGUtY29udGFpbmVyXCI+XG5cbiAgICAgICAgICAgICAgICA8dXgtYnJlYWRjcnVtYnMgW2NydW1ic109XCJjcnVtYnNcIj48L3V4LWJyZWFkY3J1bWJzPlxuXG4gICAgICAgICAgICAgICAgPGgxIGNsYXNzPVwicGFnZS1oZWFkZXItdGl0bGVcIiBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cImZhbWlseUJhY2tncm91bmRcIiBbc3R5bGUuY29sb3JdPVwiZmFtaWx5Rm9yZWdyb3VuZFwiPnt7IGhlYWRlciB9fTwvaDE+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBEaXNwbGF5IFRoaXMgU2VjdGlvbiBPcHRpbWl6ZWQgZm9yIENvbmRlbnNlZCBNb2RlIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJwYWdlLWhlYWRlci1jb25kZW5zZWQtY29udGVudFwiICpuZ0lmPVwiY29uZGVuc2VkXCI+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyLWJyZWFkY3J1bWJzXCIgcm9sZT1cIm5hdmlnYXRpb25cIj5cbiAgICAgICAgICAgIDx1eC1icmVhZGNydW1icyBbY3J1bWJzXT1cImNydW1ic1wiPjwvdXgtYnJlYWRjcnVtYnM+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYWdlLWhlYWRlci1uYXZpZ2F0aW9uXCIgW25nQ2xhc3NdPVwiYWxpZ25tZW50XCIgcm9sZT1cIm5hdmlnYXRpb25cIiBhcmlhLWxhYmVsPVwiUHJpbWFyeSBOYXZpZ2F0aW9uXCI+XG5cbiAgICAgICAgICAgIDwhLS0gVGhlIFRvcCBOYXZpZ2F0aW9uIE9wdGlvbnMgLS0+XG4gICAgICAgICAgICA8dXgtcGFnZS1oZWFkZXItaG9yaXpvbnRhbC1uYXZpZ2F0aW9uPjwvdXgtcGFnZS1oZWFkZXItaG9yaXpvbnRhbC1uYXZpZ2F0aW9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFnZS1oZWFkZXItaWNvbi1tZW51c1wiIHJvbGU9XCJ0b29sYmFyXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBtZW51IG9mIGN1c3RvbU1lbnVzXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwibWVudVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPHV4LXBhZ2UtaGVhZGVyLWljb24tbWVudSAqbmdGb3I9XCJsZXQgbWVudSBvZiBpY29uTWVudXNcIiBbbWVudV09XCJtZW51XCI+PC91eC1wYWdlLWhlYWRlci1pY29uLW1lbnU+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwicGFnZS1oZWFkZXItc2Vjb25kYXJ5XCIgW25nQ2xhc3NdPVwic2Vjb25kYXJ5TmF2aWdhdGlvbkFsaWdubWVudFwiIHJvbGU9XCJuYXZpZ2F0aW9uXCIgKm5nSWY9XCJzZWNvbmRhcnlOYXZpZ2F0aW9uICYmIChzZWxlY3RlZFJvb3QkIHwgYXN5bmMpXCI+XG4gICAgPHVsIGNsYXNzPVwibmF2IG5hdi10YWJzXCIgcm9sZT1cInRhYmxpc3RcIiBhcmlhLWxhYmVsPVwiU2Vjb25kYXJ5IE5hdmlnYXRpb25cIiAqbmdJZj1cIihzZWxlY3RlZFJvb3QkIHwgYXN5bmMpPy5jaGlsZHJlbjsgbGV0IGNoaWxkcmVuXCI+XG4gICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgY2hpbGQgb2YgY2hpbGRyZW5cIiBbY2xhc3MuYWN0aXZlXT1cImNoaWxkID09PSAoc2VsZWN0ZWQkIHwgYXN5bmMpXCIgcm9sZT1cIm5vbmVcIj5cbiAgICAgICAgICAgIDxhIHJvbGU9XCJ0YWJcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiY2hpbGQgPT09IChzZWxlY3RlZCQgfCBhc3luYylcIlxuICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdChjaGlsZClcIlxuICAgICAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cInNlbGVjdChjaGlsZClcIj57eyBjaGlsZC50aXRsZSB9fTwvYT5cbiAgICAgICAgPC9saT5cbiAgICA8L3VsPlxuPC9kaXY+YCxcbiAgICBwcm92aWRlcnM6IFsgUGFnZUhlYWRlclNlcnZpY2UgXVxufSlcbmV4cG9ydCBjbGFzcyBQYWdlSGVhZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgbG9nbzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGFsaWdubWVudDogJ2xlZnQnIHwgJ3JpZ2h0JyB8ICdjZW50ZXInID0gJ2NlbnRlcic7XG4gICAgQElucHV0KCkgY29uZGVuc2VkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgaWNvbk1lbnVzOiBQYWdlSGVhZGVySWNvbk1lbnVbXTtcbiAgICBASW5wdXQoKSBiYWNrVmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgc2Vjb25kYXJ5TmF2aWdhdGlvbkFsaWdubWVudDogc3RyaW5nID0gJ2NlbnRlcic7XG4gICAgQElucHV0KCkgc2Vjb25kYXJ5TmF2aWdhdGlvbkF1dG9zZWxlY3Q6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHNldCBpdGVtcyhpdGVtczogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtW10pIHtcbiAgICAgICAgdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2V0SXRlbXMoaXRlbXMpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHNldCBzZWNvbmRhcnlOYXZpZ2F0aW9uKGVuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2V0U2Vjb25kYXJ5TmF2aWdhdGlvbihlbmFibGVkKTtcbiAgICB9XG5cbiAgICBnZXQgc2Vjb25kYXJ5TmF2aWdhdGlvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhZ2VIZWFkZXJTZXJ2aWNlLnNlY29uZGFyeSQuZ2V0VmFsdWUoKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBzZXQgY3J1bWJzKGNydW1iczogQnJlYWRjcnVtYltdKSB7XG4gICAgICAgIHRoaXMuX2NydW1icyA9IGNydW1icztcbiAgICB9XG5cbiAgICBnZXQgY3J1bWJzKCk6IEJyZWFkY3J1bWJbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmRlbnNlZCA/IFsuLi50aGlzLl9jcnVtYnMsIHsgdGl0bGU6IHRoaXMuaGVhZGVyIH1dIDogdGhpcy5fY3J1bWJzO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGZhbWlseUJhY2tncm91bmQoY29sb3I6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9mYW1pbHlCYWNrZ3JvdW5kID0gdGhpcy5fY29sb3JTZXJ2aWNlLnJlc29sdmUoY29sb3IpO1xuICAgIH1cblxuICAgIGdldCBmYW1pbHlCYWNrZ3JvdW5kKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mYW1pbHlCYWNrZ3JvdW5kO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGZhbWlseUZvcmVncm91bmQoY29sb3I6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9mYW1pbHlGb3JlZ3JvdW5kID0gdGhpcy5fY29sb3JTZXJ2aWNlLnJlc29sdmUoY29sb3IpO1xuICAgIH1cblxuICAgIGdldCBmYW1pbHlGb3JlZ3JvdW5kKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mYW1pbHlGb3JlZ3JvdW5kO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSBiYWNrQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFBhZ2VIZWFkZXJDdXN0b21NZW51RGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pIGN1c3RvbU1lbnVzOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBzZWxlY3RlZCQ6IEJlaGF2aW9yU3ViamVjdDxQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0+ID0gdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2VsZWN0ZWQkO1xuICAgIHNlbGVjdGVkUm9vdCQ6IEJlaGF2aW9yU3ViamVjdDxQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0+ID0gdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2VsZWN0ZWRSb290JDtcblxuICAgIHByaXZhdGUgX2NydW1iczogQnJlYWRjcnVtYltdID0gW107XG4gICAgcHJpdmF0ZSBfZmFtaWx5QmFja2dyb3VuZDogc3RyaW5nO1xuICAgIHByaXZhdGUgX2ZhbWlseUZvcmVncm91bmQ6IHN0cmluZztcbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbG9yU2VydmljZTogQ29sb3JTZXJ2aWNlLCBwcml2YXRlIF9wYWdlSGVhZGVyU2VydmljZTogUGFnZUhlYWRlclNlcnZpY2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMuc2VsZWN0ZWRSb290JC5waXBlKFxuICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLnNlY29uZGFyeU5hdmlnYXRpb24gJiYgdGhpcy5zZWNvbmRhcnlOYXZpZ2F0aW9uQXV0b3NlbGVjdCksXG4gICAgICAgICAgICBmaWx0ZXIoKGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uKSA9PiBpdGVtICYmIGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKSxcbiAgICAgICAgICAgIG1hcChpdGVtID0+IGl0ZW0uY2hpbGRyZW5bMF0pXG4gICAgICAgICkuc3Vic2NyaWJlKGl0ZW0gPT4gdGhpcy5zZWxlY3QoaXRlbSkpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBnb0JhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYmFja0NsaWNrLmVtaXQoKTtcbiAgICB9XG5cbiAgICBzZWxlY3QoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2VsZWN0KGl0ZW0pO1xuICAgIH1cbn0iXX0=