/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef } from '@angular/core';
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
        this.crumbsStyle = 'standard';
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
    Object.defineProperty(PageHeaderComponent.prototype, "logoBackground", {
        get: /**
         * @return {?}
         */
        function () {
            return this._logoBackground;
        },
        set: /**
         * @param {?} color
         * @return {?}
         */
        function (color) {
            this._logoBackground = this._colorService.resolve(color);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageHeaderComponent.prototype, "logoForeground", {
        get: /**
         * @return {?}
         */
        function () {
            return this._logoForeground;
        },
        set: /**
         * @param {?} color
         * @return {?}
         */
        function (color) {
            this._logoForeground = this._colorService.resolve(color);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageHeaderComponent.prototype, "familyBackground", {
        set: /**
         * @param {?} color
         * @return {?}
         */
        function (color) {
            this.logoBackground = color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageHeaderComponent.prototype, "familyForeground", {
        set: /**
         * @param {?} color
         * @return {?}
         */
        function (color) {
            this.logoForeground = color;
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
                    template: "<div class=\"ux-page-header\" [class.page-header-condensed]=\"condensed\" role=\"banner\">\n\n    <div *ngIf=\"!condensed\" class=\"page-header-content\">\n\n        <!-- Logo/product acronym -->\n        <div class=\"page-header-logo-container\" role=\"presentation\" [style.backgroundColor]=\"logoBackground\" [style.color]=\"logoForeground\">\n            <img *ngIf=\"logo\" [attr.src]=\"logo\" [alt]=\"header\" class=\"page-header-logo\">\n            <h1 *ngIf=\"header && !logo\" class=\"page-header-acronym\">{{header}}</h1>\n        </div>\n\n        <!-- Sub-title -->\n        <div *ngIf=\"title || titleTemplate\" class=\"page-header-subtitle-container\">\n            <span *ngIf=\"title\" class=\"page-header-subtitle\">{{title}}</span>\n            <ng-container [ngTemplateOutlet]=\"titleTemplate\"></ng-container>\n        </div>\n\n        <div class=\"page-header-state-container\" role=\"navigation\">\n\n            <!-- Back button -->\n            <button *ngIf=\"backVisible === true\" class=\"page-header-back-button\" (click)=\"goBack()\" aria-label=\"Go Back\">\n                <span class=\"hpe-icon hpe-previous text-primary\"></span>\n            </button>\n\n            <!-- Breadcrumbs and header -->\n            <div class=\"page-header-title-container\">\n\n                <ux-breadcrumbs *ngIf=\"crumbs && crumbs.length > 0\"\n                    [class.ux-breadcrumbs-small]=\"crumbsStyle === 'small'\"\n                    [crumbs]=\"crumbs\"></ux-breadcrumbs>\n\n                <h1 class=\"page-header-title\">{{header}}</h1>\n\n            </div>\n\n        </div>\n\n        <!-- Primary navigation -->\n        <div class=\"page-header-navigation\" [ngClass]=\"alignment\" role=\"navigation\" aria-label=\"Primary Navigation\">\n            <ux-page-header-horizontal-navigation></ux-page-header-horizontal-navigation>\n        </div>\n\n        <!-- Icon menus -->\n        <div class=\"page-header-icon-menus\" role=\"toolbar\">\n            <ng-container *ngFor=\"let menu of customMenus\" [ngTemplateOutlet]=\"menu\"></ng-container>\n            <ux-page-header-icon-menu *ngFor=\"let menu of iconMenus\" [menu]=\"menu\"></ux-page-header-icon-menu>\n        </div>\n    </div>\n\n    <!-- Display This Section Optimized for Condensed Mode -->\n    <div class=\"page-header-condensed-content\" *ngIf=\"condensed\">\n\n        <div class=\"page-header-breadcrumbs\" role=\"navigation\">\n            <ux-breadcrumbs [crumbs]=\"crumbs\"></ux-breadcrumbs>\n        </div>\n\n        <div class=\"page-header-navigation\" [ngClass]=\"alignment\" role=\"navigation\" aria-label=\"Primary Navigation\">\n\n            <!-- The Top Navigation Options -->\n            <ux-page-header-horizontal-navigation></ux-page-header-horizontal-navigation>\n        </div>\n\n        <div class=\"page-header-icon-menus\" role=\"toolbar\">\n            <ng-container *ngFor=\"let menu of customMenus\" [ngTemplateOutlet]=\"menu\"></ng-container>\n            <ux-page-header-icon-menu *ngFor=\"let menu of iconMenus\" [menu]=\"menu\"></ux-page-header-icon-menu>\n        </div>\n\n    </div>\n\n</div>\n\n<div *ngIf=\"secondaryNavigation && ((selectedRoot$ | async) !== (selected$ | async))\"\n    class=\"page-header-secondary\" [ngClass]=\"secondaryNavigationAlignment\" role=\"navigation\">\n\n    <ul *ngIf=\"(selectedRoot$ | async)?.children; let children\"\n        class=\"nav nav-tabs\" role=\"tablist\" aria-label=\"Secondary Navigation\">\n\n        <li *ngFor=\"let child of children\"\n            [class.active]=\"child.selected\"\n            role=\"none\"\n            [uxPageHeaderNavigationSecondaryItem]=\"child\">\n\n            <a role=\"tab\"\n                [attr.aria-selected]=\"child.selected\"\n                tabindex=\"0\"\n                (click)=\"select(child)\"\n                (keydown.enter)=\"select(child)\">{{ child.title }}</a>\n\n        </li>\n\n    </ul>\n\n</div>\n",
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
        title: [{ type: Input }],
        alignment: [{ type: Input }],
        condensed: [{ type: Input }],
        iconMenus: [{ type: Input }],
        backVisible: [{ type: Input }],
        secondaryNavigationAlignment: [{ type: Input }],
        secondaryNavigationAutoselect: [{ type: Input }],
        items: [{ type: Input }],
        secondaryNavigation: [{ type: Input }],
        crumbs: [{ type: Input }],
        crumbsStyle: [{ type: Input }],
        logoBackground: [{ type: Input }],
        logoForeground: [{ type: Input }],
        familyBackground: [{ type: Input }],
        familyForeground: [{ type: Input }],
        backClick: [{ type: Output }],
        titleTemplate: [{ type: ContentChild, args: ['title',] }],
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
    PageHeaderComponent.prototype.title;
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
    PageHeaderComponent.prototype.crumbsStyle;
    /** @type {?} */
    PageHeaderComponent.prototype.backClick;
    /** @type {?} */
    PageHeaderComponent.prototype.titleTemplate;
    /** @type {?} */
    PageHeaderComponent.prototype.customMenus;
    /** @type {?} */
    PageHeaderComponent.prototype.selected$;
    /** @type {?} */
    PageHeaderComponent.prototype.selectedRoot$;
    /** @type {?} */
    PageHeaderComponent.prototype._crumbs;
    /** @type {?} */
    PageHeaderComponent.prototype._logoBackground;
    /** @type {?} */
    PageHeaderComponent.prototype._logoForeground;
    /** @type {?} */
    PageHeaderComponent.prototype._colorService;
    /** @type {?} */
    PageHeaderComponent.prototype._pageHeaderService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTFELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBR3BGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7SUE4RjVFLDZCQUFvQixhQUEyQixFQUFVLGtCQUFxQztRQUExRSxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7eUJBakY1QyxRQUFRO3lCQUM1QixLQUFLOzJCQUVILElBQUk7NENBQ2lDLFFBQVE7MkJBa0NoQyxVQUFVO3lCQThCakMsSUFBSSxZQUFZLEVBQUU7eUJBTWUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVM7NkJBQzdCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhO3VCQUVoRSxFQUFFO0tBSWlFO0lBM0VuRyxzQkFDSSw4REFBNkI7Ozs7UUFJakM7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLDZCQUE2QixDQUFDO1NBQ2hFOzs7OztRQVBELFVBQ2tDLEtBQWM7WUFDNUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLDZCQUE2QixHQUFHLEtBQUssQ0FBQztTQUNqRTs7O09BQUE7SUFNRCxzQkFDSSxzQ0FBSzs7Ozs7UUFEVCxVQUNVLEtBQWlDO1lBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0M7OztPQUFBO0lBRUQsc0JBQ0ksb0RBQW1COzs7O1FBSXZCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDeEQ7Ozs7O1FBUEQsVUFDd0IsT0FBZ0I7WUFDcEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzNEOzs7T0FBQTtJQU1ELHNCQUNJLHVDQUFNOzs7O1FBSVY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGtCQUFLLElBQUksQ0FBQyxPQUFPLEdBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3BGOzs7OztRQVBELFVBQ1csTUFBb0I7WUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7U0FDekI7OztPQUFBO0lBUUQsc0JBQ0ksK0NBQWM7Ozs7UUFJbEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztTQUMvQjs7Ozs7UUFQRCxVQUNtQixLQUFhO1lBQzVCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUQ7OztPQUFBO0lBTUQsc0JBQ0ksK0NBQWM7Ozs7UUFJbEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztTQUMvQjs7Ozs7UUFQRCxVQUNtQixLQUFhO1lBQzVCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUQ7OztPQUFBO0lBTUQsc0JBQ0ksaURBQWdCOzs7OztRQURwQixVQUNxQixLQUFhO1lBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1NBQy9COzs7T0FBQTtJQUVELHNCQUNJLGlEQUFnQjs7Ozs7UUFEcEIsVUFDcUIsS0FBYTtZQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztTQUMvQjs7O09BQUE7Ozs7SUFpQkQsb0NBQU07OztJQUFOO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN6Qjs7Ozs7SUFFRCxvQ0FBTTs7OztJQUFOLFVBQU8sSUFBMEI7UUFDN0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN4Qzs7Z0JBcEdKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixpM0hBQXlDO29CQUN6QyxTQUFTLEVBQUUsQ0FBRSxpQkFBaUIsQ0FBRTtpQkFDbkM7Ozs7Z0JBWlEsWUFBWTtnQkFLVSxpQkFBaUI7Ozt1QkFVM0MsS0FBSzt5QkFDTCxLQUFLO3dCQUNMLEtBQUs7NEJBQ0wsS0FBSzs0QkFDTCxLQUFLOzRCQUNMLEtBQUs7OEJBQ0wsS0FBSzsrQ0FDTCxLQUFLO2dEQUVMLEtBQUs7d0JBU0wsS0FBSztzQ0FLTCxLQUFLO3lCQVNMLEtBQUs7OEJBU0wsS0FBSztpQ0FFTCxLQUFLO2lDQVNMLEtBQUs7bUNBU0wsS0FBSzttQ0FLTCxLQUFLOzRCQUtMLE1BQU07Z0NBRU4sWUFBWSxTQUFDLE9BQU87OEJBRXBCLGVBQWUsU0FBQyw2QkFBNkIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7OzhCQTVGekU7O1NBZWEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIENvbnRlbnRDaGlsZHJlbiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBRdWVyeUxpc3QsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBDb2xvclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb2xvci9pbmRleCc7XG5pbXBvcnQgeyBCcmVhZGNydW1iIH0gZnJvbSAnLi4vYnJlYWRjcnVtYnMvaW5kZXgnO1xuaW1wb3J0IHsgUGFnZUhlYWRlckN1c3RvbU1lbnVEaXJlY3RpdmUgfSBmcm9tICcuL2N1c3RvbS1tZW51L2N1c3RvbS1tZW51LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQYWdlSGVhZGVySWNvbk1lbnUgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtIH0gZnJvbSAnLi9uYXZpZ2F0aW9uL25hdmlnYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uLCBQYWdlSGVhZGVyU2VydmljZSB9IGZyb20gJy4vcGFnZS1oZWFkZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtcGFnZS1oZWFkZXInLFxuICAgIGV4cG9ydEFzOiAndXgtcGFnZS1oZWFkZXInLFxuICAgIHRlbXBsYXRlVXJsOiAncGFnZS1oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHByb3ZpZGVyczogWyBQYWdlSGVhZGVyU2VydmljZSBdXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2VIZWFkZXJDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgbG9nbzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG4gICAgQElucHV0KCkgYWxpZ25tZW50OiAnbGVmdCcgfCAncmlnaHQnIHwgJ2NlbnRlcicgPSAnY2VudGVyJztcbiAgICBASW5wdXQoKSBjb25kZW5zZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBpY29uTWVudXM6IFBhZ2VIZWFkZXJJY29uTWVudVtdO1xuICAgIEBJbnB1dCgpIGJhY2tWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBzZWNvbmRhcnlOYXZpZ2F0aW9uQWxpZ25tZW50OiAnbGVmdCcgfCAncmlnaHQnIHwgJ2NlbnRlcicgPSAnY2VudGVyJztcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHNlY29uZGFyeU5hdmlnYXRpb25BdXRvc2VsZWN0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3BhZ2VIZWFkZXJTZXJ2aWNlLnNlY29uZGFyeU5hdmlnYXRpb25BdXRvc2VsZWN0ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHNlY29uZGFyeU5hdmlnYXRpb25BdXRvc2VsZWN0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2Vjb25kYXJ5TmF2aWdhdGlvbkF1dG9zZWxlY3Q7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgaXRlbXMoaXRlbXM6IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbVtdKSB7XG4gICAgICAgIHRoaXMuX3BhZ2VIZWFkZXJTZXJ2aWNlLnNldEl0ZW1zKGl0ZW1zKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBzZWNvbmRhcnlOYXZpZ2F0aW9uKGVuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2V0U2Vjb25kYXJ5TmF2aWdhdGlvbihlbmFibGVkKTtcbiAgICB9XG5cbiAgICBnZXQgc2Vjb25kYXJ5TmF2aWdhdGlvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhZ2VIZWFkZXJTZXJ2aWNlLnNlY29uZGFyeSQuZ2V0VmFsdWUoKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBjcnVtYnMoY3J1bWJzOiBCcmVhZGNydW1iW10pIHtcbiAgICAgICAgdGhpcy5fY3J1bWJzID0gY3J1bWJzO1xuICAgIH1cblxuICAgIGdldCBjcnVtYnMoKTogQnJlYWRjcnVtYltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZGVuc2VkID8gWy4uLnRoaXMuX2NydW1icywgeyB0aXRsZTogdGhpcy5oZWFkZXIgfV0gOiB0aGlzLl9jcnVtYnM7XG4gICAgfVxuXG4gICAgQElucHV0KCkgY3J1bWJzU3R5bGU6ICdzdGFuZGFyZCcgfCAnc21hbGwnID0gJ3N0YW5kYXJkJztcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGxvZ29CYWNrZ3JvdW5kKGNvbG9yOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbG9nb0JhY2tncm91bmQgPSB0aGlzLl9jb2xvclNlcnZpY2UucmVzb2x2ZShjb2xvcik7XG4gICAgfVxuXG4gICAgZ2V0IGxvZ29CYWNrZ3JvdW5kKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2dvQmFja2dyb3VuZDtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBsb2dvRm9yZWdyb3VuZChjb2xvcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2xvZ29Gb3JlZ3JvdW5kID0gdGhpcy5fY29sb3JTZXJ2aWNlLnJlc29sdmUoY29sb3IpO1xuICAgIH1cblxuICAgIGdldCBsb2dvRm9yZWdyb3VuZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9nb0ZvcmVncm91bmQ7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZmFtaWx5QmFja2dyb3VuZChjb2xvcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubG9nb0JhY2tncm91bmQgPSBjb2xvcjtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBmYW1pbHlGb3JlZ3JvdW5kKGNvbG9yOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5sb2dvRm9yZWdyb3VuZCA9IGNvbG9yO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSBiYWNrQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAQ29udGVudENoaWxkKCd0aXRsZScpIHRpdGxlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFBhZ2VIZWFkZXJDdXN0b21NZW51RGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pIGN1c3RvbU1lbnVzOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBzZWxlY3RlZCQ6IEJlaGF2aW9yU3ViamVjdDxQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0+ID0gdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2VsZWN0ZWQkO1xuICAgIHNlbGVjdGVkUm9vdCQ6IEJlaGF2aW9yU3ViamVjdDxQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0+ID0gdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2VsZWN0ZWRSb290JDtcblxuICAgIHByaXZhdGUgX2NydW1iczogQnJlYWRjcnVtYltdID0gW107XG4gICAgcHJpdmF0ZSBfbG9nb0JhY2tncm91bmQ6IHN0cmluZztcbiAgICBwcml2YXRlIF9sb2dvRm9yZWdyb3VuZDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY29sb3JTZXJ2aWNlOiBDb2xvclNlcnZpY2UsIHByaXZhdGUgX3BhZ2VIZWFkZXJTZXJ2aWNlOiBQYWdlSGVhZGVyU2VydmljZSkgeyB9XG5cbiAgICBnb0JhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYmFja0NsaWNrLmVtaXQoKTtcbiAgICB9XG5cbiAgICBzZWxlY3QoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2VsZWN0KGl0ZW0pO1xuICAgIH1cbn0iXX0=