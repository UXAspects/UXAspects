/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChild, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef } from '@angular/core';
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
        this.crumbsStyle = 'standard';
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
    set logoBackground(color) {
        this._logoBackground = this._colorService.resolve(color);
    }
    /**
     * @return {?}
     */
    get logoBackground() {
        return this._logoBackground;
    }
    /**
     * @param {?} color
     * @return {?}
     */
    set logoForeground(color) {
        this._logoForeground = this._colorService.resolve(color);
    }
    /**
     * @return {?}
     */
    get logoForeground() {
        return this._logoForeground;
    }
    /**
     * @param {?} color
     * @return {?}
     */
    set familyBackground(color) {
        this.logoBackground = color;
    }
    /**
     * @param {?} color
     * @return {?}
     */
    set familyForeground(color) {
        this.logoForeground = color;
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
                template: "<div class=\"ux-page-header\" [class.page-header-condensed]=\"condensed\" role=\"banner\">\n\n    <div *ngIf=\"!condensed\" class=\"page-header-content\">\n\n        <!-- Logo/product acronym -->\n        <div class=\"page-header-logo-container\" role=\"presentation\" [style.backgroundColor]=\"logoBackground\" [style.color]=\"logoForeground\">\n            <img *ngIf=\"logo\" [attr.src]=\"logo\" [alt]=\"header\" class=\"page-header-logo\">\n            <h1 *ngIf=\"header && !logo\" class=\"page-header-acronym\">{{header}}</h1>\n        </div>\n\n        <!-- Sub-title -->\n        <div *ngIf=\"title || titleTemplate\" class=\"page-header-subtitle-container\">\n            <span *ngIf=\"title\" class=\"page-header-subtitle\">{{title}}</span>\n            <ng-container [ngTemplateOutlet]=\"titleTemplate\"></ng-container>\n        </div>\n\n        <div class=\"page-header-state-container\" role=\"navigation\">\n\n            <!-- Back button -->\n            <button *ngIf=\"backVisible === true\" class=\"page-header-back-button\" (click)=\"goBack()\" aria-label=\"Go Back\">\n                <span class=\"hpe-icon hpe-previous text-primary\"></span>\n            </button>\n\n            <!-- Breadcrumbs and header -->\n            <div class=\"page-header-title-container\">\n\n                <ux-breadcrumbs *ngIf=\"crumbs && crumbs.length > 0\"\n                    [class.ux-breadcrumbs-small]=\"crumbsStyle === 'small'\"\n                    [crumbs]=\"crumbs\"></ux-breadcrumbs>\n\n                <h1 class=\"page-header-title\">{{header}}</h1>\n\n            </div>\n\n        </div>\n\n        <!-- Primary navigation -->\n        <div class=\"page-header-navigation\" [ngClass]=\"alignment\" role=\"navigation\" aria-label=\"Primary Navigation\">\n            <ux-page-header-horizontal-navigation></ux-page-header-horizontal-navigation>\n        </div>\n\n        <!-- Icon menus -->\n        <div class=\"page-header-icon-menus\" role=\"toolbar\">\n            <ng-container *ngFor=\"let menu of customMenus\" [ngTemplateOutlet]=\"menu\"></ng-container>\n            <ux-page-header-icon-menu *ngFor=\"let menu of iconMenus\" [menu]=\"menu\"></ux-page-header-icon-menu>\n        </div>\n    </div>\n\n    <!-- Display This Section Optimized for Condensed Mode -->\n    <div class=\"page-header-condensed-content\" *ngIf=\"condensed\">\n\n        <div class=\"page-header-breadcrumbs\" role=\"navigation\">\n            <ux-breadcrumbs [crumbs]=\"crumbs\"></ux-breadcrumbs>\n        </div>\n\n        <div class=\"page-header-navigation\" [ngClass]=\"alignment\" role=\"navigation\" aria-label=\"Primary Navigation\">\n\n            <!-- The Top Navigation Options -->\n            <ux-page-header-horizontal-navigation></ux-page-header-horizontal-navigation>\n        </div>\n\n        <div class=\"page-header-icon-menus\" role=\"toolbar\">\n            <ng-container *ngFor=\"let menu of customMenus\" [ngTemplateOutlet]=\"menu\"></ng-container>\n            <ux-page-header-icon-menu *ngFor=\"let menu of iconMenus\" [menu]=\"menu\"></ux-page-header-icon-menu>\n        </div>\n\n    </div>\n\n</div>\n\n<div *ngIf=\"secondaryNavigation && ((selectedRoot$ | async) !== (selected$ | async))\"\n    class=\"page-header-secondary\" [ngClass]=\"secondaryNavigationAlignment\" role=\"navigation\">\n\n    <ux-tabset *ngIf=\"(selectedRoot$ | async)?.children; let children\">\n        <ux-tab *ngFor=\"let child of children\"\n            [heading]=\"child.title\"\n            [active]=\"child === (selected$ | async)\"\n            (select)=\"select(child)\"\n            [uxPageHeaderNavigationSecondaryItem]=\"child\">\n        </ux-tab>\n    </ux-tabset>\n\n</div>\n",
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5SCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFMUQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFHcEYsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBUWhGLE1BQU07Ozs7O0lBc0ZGLFlBQW9CLGFBQTJCLEVBQVUsa0JBQXFDO1FBQTFFLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjt5QkFqRjVDLFFBQVE7eUJBQzVCLEtBQUs7MkJBRUgsSUFBSTs0Q0FDaUMsUUFBUTsyQkFrQ2hDLFVBQVU7eUJBOEJqQyxJQUFJLFlBQVksRUFBRTt5QkFNZSxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUzs2QkFDN0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWE7dUJBRWhFLEVBQUU7S0FJaUU7Ozs7O0lBM0VuRyxJQUNJLDZCQUE2QixDQUFDLEtBQWM7UUFDNUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLDZCQUE2QixHQUFHLEtBQUssQ0FBQztLQUNqRTs7OztJQUVELElBQUksNkJBQTZCO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsNkJBQTZCLENBQUM7S0FDaEU7Ozs7O0lBRUQsSUFDSSxLQUFLLENBQUMsS0FBaUM7UUFDdkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMzQzs7Ozs7SUFFRCxJQUNJLG1CQUFtQixDQUFDLE9BQWdCO1FBQ3BDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMzRDs7OztJQUVELElBQUksbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ3hEOzs7OztJQUVELElBQ0ksTUFBTSxDQUFDLE1BQW9CO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0tBQ3pCOzs7O0lBRUQsSUFBSSxNQUFNO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ3BGOzs7OztJQUlELElBQ0ksY0FBYyxDQUFDLEtBQWE7UUFDNUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM1RDs7OztJQUVELElBQUksY0FBYztRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO0tBQy9COzs7OztJQUVELElBQ0ksY0FBYyxDQUFDLEtBQWE7UUFDNUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM1RDs7OztJQUVELElBQUksY0FBYztRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO0tBQy9COzs7OztJQUVELElBQ0ksZ0JBQWdCLENBQUMsS0FBYTtRQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztLQUMvQjs7Ozs7SUFFRCxJQUNJLGdCQUFnQixDQUFDLEtBQWE7UUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7S0FDL0I7Ozs7SUFpQkQsTUFBTTtRQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDekI7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQTBCO1FBQzdCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDeEM7OztZQXBHSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsNm5IQUF5QztnQkFDekMsU0FBUyxFQUFFLENBQUUsaUJBQWlCLENBQUU7YUFDbkM7Ozs7WUFaUSxZQUFZO1lBS1UsaUJBQWlCOzs7bUJBVTNDLEtBQUs7cUJBQ0wsS0FBSztvQkFDTCxLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsS0FBSzt3QkFDTCxLQUFLOzBCQUNMLEtBQUs7MkNBQ0wsS0FBSzs0Q0FFTCxLQUFLO29CQVNMLEtBQUs7a0NBS0wsS0FBSztxQkFTTCxLQUFLOzBCQVNMLEtBQUs7NkJBRUwsS0FBSzs2QkFTTCxLQUFLOytCQVNMLEtBQUs7K0JBS0wsS0FBSzt3QkFLTCxNQUFNOzRCQUVOLFlBQVksU0FBQyxPQUFPOzBCQUVwQixlQUFlLFNBQUMsNkJBQTZCLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIENvbnRlbnRDaGlsZHJlbiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBRdWVyeUxpc3QsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBDb2xvclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb2xvci9pbmRleCc7XG5pbXBvcnQgeyBCcmVhZGNydW1iIH0gZnJvbSAnLi4vYnJlYWRjcnVtYnMvaW5kZXgnO1xuaW1wb3J0IHsgUGFnZUhlYWRlckN1c3RvbU1lbnVEaXJlY3RpdmUgfSBmcm9tICcuL2N1c3RvbS1tZW51L2N1c3RvbS1tZW51LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQYWdlSGVhZGVySWNvbk1lbnUgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtIH0gZnJvbSAnLi9uYXZpZ2F0aW9uL25hdmlnYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uLCBQYWdlSGVhZGVyU2VydmljZSB9IGZyb20gJy4vcGFnZS1oZWFkZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtcGFnZS1oZWFkZXInLFxuICAgIGV4cG9ydEFzOiAndXgtcGFnZS1oZWFkZXInLFxuICAgIHRlbXBsYXRlVXJsOiAncGFnZS1oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHByb3ZpZGVyczogWyBQYWdlSGVhZGVyU2VydmljZSBdXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2VIZWFkZXJDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgbG9nbzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG4gICAgQElucHV0KCkgYWxpZ25tZW50OiAnbGVmdCcgfCAncmlnaHQnIHwgJ2NlbnRlcicgPSAnY2VudGVyJztcbiAgICBASW5wdXQoKSBjb25kZW5zZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBpY29uTWVudXM6IFBhZ2VIZWFkZXJJY29uTWVudVtdO1xuICAgIEBJbnB1dCgpIGJhY2tWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBzZWNvbmRhcnlOYXZpZ2F0aW9uQWxpZ25tZW50OiAnbGVmdCcgfCAncmlnaHQnIHwgJ2NlbnRlcicgPSAnY2VudGVyJztcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHNlY29uZGFyeU5hdmlnYXRpb25BdXRvc2VsZWN0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3BhZ2VIZWFkZXJTZXJ2aWNlLnNlY29uZGFyeU5hdmlnYXRpb25BdXRvc2VsZWN0ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHNlY29uZGFyeU5hdmlnYXRpb25BdXRvc2VsZWN0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2Vjb25kYXJ5TmF2aWdhdGlvbkF1dG9zZWxlY3Q7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgaXRlbXMoaXRlbXM6IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbVtdKSB7XG4gICAgICAgIHRoaXMuX3BhZ2VIZWFkZXJTZXJ2aWNlLnNldEl0ZW1zKGl0ZW1zKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBzZWNvbmRhcnlOYXZpZ2F0aW9uKGVuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2V0U2Vjb25kYXJ5TmF2aWdhdGlvbihlbmFibGVkKTtcbiAgICB9XG5cbiAgICBnZXQgc2Vjb25kYXJ5TmF2aWdhdGlvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhZ2VIZWFkZXJTZXJ2aWNlLnNlY29uZGFyeSQuZ2V0VmFsdWUoKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBjcnVtYnMoY3J1bWJzOiBCcmVhZGNydW1iW10pIHtcbiAgICAgICAgdGhpcy5fY3J1bWJzID0gY3J1bWJzO1xuICAgIH1cblxuICAgIGdldCBjcnVtYnMoKTogQnJlYWRjcnVtYltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZGVuc2VkID8gWy4uLnRoaXMuX2NydW1icywgeyB0aXRsZTogdGhpcy5oZWFkZXIgfV0gOiB0aGlzLl9jcnVtYnM7XG4gICAgfVxuXG4gICAgQElucHV0KCkgY3J1bWJzU3R5bGU6ICdzdGFuZGFyZCcgfCAnc21hbGwnID0gJ3N0YW5kYXJkJztcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGxvZ29CYWNrZ3JvdW5kKGNvbG9yOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbG9nb0JhY2tncm91bmQgPSB0aGlzLl9jb2xvclNlcnZpY2UucmVzb2x2ZShjb2xvcik7XG4gICAgfVxuXG4gICAgZ2V0IGxvZ29CYWNrZ3JvdW5kKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2dvQmFja2dyb3VuZDtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBsb2dvRm9yZWdyb3VuZChjb2xvcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2xvZ29Gb3JlZ3JvdW5kID0gdGhpcy5fY29sb3JTZXJ2aWNlLnJlc29sdmUoY29sb3IpO1xuICAgIH1cblxuICAgIGdldCBsb2dvRm9yZWdyb3VuZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9nb0ZvcmVncm91bmQ7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZmFtaWx5QmFja2dyb3VuZChjb2xvcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubG9nb0JhY2tncm91bmQgPSBjb2xvcjtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBmYW1pbHlGb3JlZ3JvdW5kKGNvbG9yOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5sb2dvRm9yZWdyb3VuZCA9IGNvbG9yO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSBiYWNrQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAQ29udGVudENoaWxkKCd0aXRsZScpIHRpdGxlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFBhZ2VIZWFkZXJDdXN0b21NZW51RGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pIGN1c3RvbU1lbnVzOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBzZWxlY3RlZCQ6IEJlaGF2aW9yU3ViamVjdDxQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0+ID0gdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2VsZWN0ZWQkO1xuICAgIHNlbGVjdGVkUm9vdCQ6IEJlaGF2aW9yU3ViamVjdDxQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0+ID0gdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2VsZWN0ZWRSb290JDtcblxuICAgIHByaXZhdGUgX2NydW1iczogQnJlYWRjcnVtYltdID0gW107XG4gICAgcHJpdmF0ZSBfbG9nb0JhY2tncm91bmQ6IHN0cmluZztcbiAgICBwcml2YXRlIF9sb2dvRm9yZWdyb3VuZDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY29sb3JTZXJ2aWNlOiBDb2xvclNlcnZpY2UsIHByaXZhdGUgX3BhZ2VIZWFkZXJTZXJ2aWNlOiBQYWdlSGVhZGVyU2VydmljZSkgeyB9XG5cbiAgICBnb0JhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYmFja0NsaWNrLmVtaXQoKTtcbiAgICB9XG5cbiAgICBzZWxlY3QoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2VsZWN0KGl0ZW0pO1xuICAgIH1cbn0iXX0=