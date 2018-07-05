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
                template: `<div class="ux-page-header" [class.page-header-condensed]="condensed" role="banner">

    <!-- Display Upper Section when not condensed -->
    <div class="page-header-actions" *ngIf="!condensed">

        <div class="page-header-logo-container" role="presentation" [hidden]="!logo">
            <img [attr.src]="logo" class="page-header-logo">
        </div>

        <div class="page-header-navigation" [ngClass]="alignment" role="navigation" aria-label="Primary Navigation">

            <!-- The Top Navigation Options -->
            <ux-page-header-horizontal-navigation></ux-page-header-horizontal-navigation>
        </div>

        <div class="page-header-icon-menus" role="toolbar">
            <ng-container *ngFor="let menu of customMenus" [ngTemplateOutlet]="menu"></ng-container>

            <ux-page-header-icon-menu *ngFor="let menu of iconMenus" [menu]="menu"></ux-page-header-icon-menu>
        </div>
    </div>

    <!-- Display Lower Section When Not Condensed -->
    <div class="page-header-details" *ngIf="!condensed">

        <div class="page-header-state-container" role="navigation">

            <button *ngIf="backVisible === true" class="page-header-back-button" (click)="goBack()" aria-label="Go Back">
                <span class="hpe-icon hpe-previous text-primary"></span>
            </button>

            <div class="page-header-title-container">

                <ux-breadcrumbs [crumbs]="crumbs"></ux-breadcrumbs>

                <h1 class="page-header-title" [style.backgroundColor]="familyBackground" [style.color]="familyForeground">{{ header }}</h1>
            </div>

        </div>

    </div>

    <!-- Display This Section Optimized for Condensed Mode -->
    <div class="page-header-condensed-content" *ngIf="condensed">

        <div class="page-header-breadcrumbs" role="navigation">
            <ux-breadcrumbs [crumbs]="crumbs"></ux-breadcrumbs>
        </div>

        <div class="page-header-navigation" [ngClass]="alignment" role="navigation" aria-label="Primary Navigation">

            <!-- The Top Navigation Options -->
            <ux-page-header-horizontal-navigation></ux-page-header-horizontal-navigation>
        </div>

        <div class="page-header-icon-menus" role="toolbar">
            <ng-container *ngFor="let menu of customMenus" [ngTemplateOutlet]="menu"></ng-container>
            <ux-page-header-icon-menu *ngFor="let menu of iconMenus" [menu]="menu"></ux-page-header-icon-menu>
        </div>

    </div>

</div>

<div class="page-header-secondary" [ngClass]="secondaryNavigationAlignment" role="navigation" *ngIf="secondaryNavigation && (selectedRoot$ | async)">
    <ul class="nav nav-tabs" role="tablist" aria-label="Secondary Navigation" *ngIf="(selectedRoot$ | async)?.children; let children">
        <li *ngFor="let child of children"
            [class.active]="child.selected"
            role="none"
            [uxPageHeaderNavigationSecondaryItem]="child">

            <a role="tab"
                [attr.aria-selected]="child.selected"
                tabindex="0"
                (click)="select(child)"
                (keydown.enter)="select(child)">{{ child.title }}</a>

        </li>
    </ul>
</div>`,
                providers: [PageHeaderService]
            },] },
];
/** @nocollapse */
PageHeaderComponent.ctorParameters = () => [
    { type: ColorService, },
    { type: PageHeaderService, },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWhILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUdwRixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUF1RmhGLE1BQU07Ozs7O0lBbUVGLFlBQW9CLGFBQTJCLEVBQVUsa0JBQXFDO1FBQTFFLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjt5QkEvRDVDLFFBQVE7eUJBQzVCLEtBQUs7MkJBRUgsSUFBSTs0Q0FDWSxRQUFRO3lCQWdEbEMsSUFBSSxZQUFZLEVBQUU7eUJBSWUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVM7NkJBQzdCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhO3VCQUVoRSxFQUFFO0tBSWlFOzs7OztRQXpEdEYsNkJBQTZCLENBQUMsS0FBYztRQUNyRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsNkJBQTZCLEdBQUcsS0FBSyxDQUFDOzs7OztJQUdsRSxJQUFJLDZCQUE2QjtRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLDZCQUE2QixDQUFDO0tBQ2hFOzs7OztRQUVZLEtBQUssQ0FBQyxLQUFpQztRQUNoRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7UUFHL0IsbUJBQW1CLENBQUMsT0FBZ0I7UUFDN0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7OztJQUc1RCxJQUFJLG1CQUFtQjtRQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUN4RDs7Ozs7UUFFWSxNQUFNLENBQUMsTUFBb0I7UUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Ozs7O0lBRzFCLElBQUksTUFBTTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDcEY7Ozs7O1FBR0csZ0JBQWdCLENBQUMsS0FBYTtRQUM5QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7O0lBRy9ELElBQUksZ0JBQWdCO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7S0FDakM7Ozs7O1FBR0csZ0JBQWdCLENBQUMsS0FBYTtRQUM5QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7O0lBRy9ELElBQUksZ0JBQWdCO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7S0FDakM7Ozs7SUFlRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN6Qjs7Ozs7SUFFRCxNQUFNLENBQUMsSUFBMEI7UUFDN0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN4Qzs7O1lBaEtKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0ErRVA7Z0JBQ0gsU0FBUyxFQUFFLENBQUUsaUJBQWlCLENBQUU7YUFDbkM7Ozs7WUEzRlEsWUFBWTtZQUtVLGlCQUFpQjs7O3FCQXlGM0MsS0FBSzt1QkFDTCxLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxLQUFLOzRCQUNMLEtBQUs7NkNBQ0wsS0FBSzs4Q0FFTCxLQUFLO3NCQVFMLEtBQUs7b0NBSUwsS0FBSzt1QkFRTCxLQUFLO2lDQVFMLEtBQUs7aUNBU0wsS0FBSzswQkFTTCxNQUFNOzRCQUVOLGVBQWUsU0FBQyw2QkFBNkIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBRdWVyeUxpc3QsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBDb2xvclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb2xvci9pbmRleCc7XG5pbXBvcnQgeyBCcmVhZGNydW1iIH0gZnJvbSAnLi4vYnJlYWRjcnVtYnMvaW5kZXgnO1xuaW1wb3J0IHsgUGFnZUhlYWRlckN1c3RvbU1lbnVEaXJlY3RpdmUgfSBmcm9tICcuL2N1c3RvbS1tZW51L2N1c3RvbS1tZW51LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQYWdlSGVhZGVySWNvbk1lbnUgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtIH0gZnJvbSAnLi9uYXZpZ2F0aW9uL25hdmlnYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uLCBQYWdlSGVhZGVyU2VydmljZSB9IGZyb20gJy4vcGFnZS1oZWFkZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtcGFnZS1oZWFkZXInLFxuICAgIGV4cG9ydEFzOiAndXgtcGFnZS1oZWFkZXInLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInV4LXBhZ2UtaGVhZGVyXCIgW2NsYXNzLnBhZ2UtaGVhZGVyLWNvbmRlbnNlZF09XCJjb25kZW5zZWRcIiByb2xlPVwiYmFubmVyXCI+XG5cbiAgICA8IS0tIERpc3BsYXkgVXBwZXIgU2VjdGlvbiB3aGVuIG5vdCBjb25kZW5zZWQgLS0+XG4gICAgPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyLWFjdGlvbnNcIiAqbmdJZj1cIiFjb25kZW5zZWRcIj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFnZS1oZWFkZXItbG9nby1jb250YWluZXJcIiByb2xlPVwicHJlc2VudGF0aW9uXCIgW2hpZGRlbl09XCIhbG9nb1wiPlxuICAgICAgICAgICAgPGltZyBbYXR0ci5zcmNdPVwibG9nb1wiIGNsYXNzPVwicGFnZS1oZWFkZXItbG9nb1wiPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFnZS1oZWFkZXItbmF2aWdhdGlvblwiIFtuZ0NsYXNzXT1cImFsaWdubWVudFwiIHJvbGU9XCJuYXZpZ2F0aW9uXCIgYXJpYS1sYWJlbD1cIlByaW1hcnkgTmF2aWdhdGlvblwiPlxuXG4gICAgICAgICAgICA8IS0tIFRoZSBUb3AgTmF2aWdhdGlvbiBPcHRpb25zIC0tPlxuICAgICAgICAgICAgPHV4LXBhZ2UtaGVhZGVyLWhvcml6b250YWwtbmF2aWdhdGlvbj48L3V4LXBhZ2UtaGVhZGVyLWhvcml6b250YWwtbmF2aWdhdGlvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyLWljb24tbWVudXNcIiByb2xlPVwidG9vbGJhclwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbWVudSBvZiBjdXN0b21NZW51c1wiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm1lbnVcIj48L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgPHV4LXBhZ2UtaGVhZGVyLWljb24tbWVudSAqbmdGb3I9XCJsZXQgbWVudSBvZiBpY29uTWVudXNcIiBbbWVudV09XCJtZW51XCI+PC91eC1wYWdlLWhlYWRlci1pY29uLW1lbnU+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBEaXNwbGF5IExvd2VyIFNlY3Rpb24gV2hlbiBOb3QgQ29uZGVuc2VkIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJwYWdlLWhlYWRlci1kZXRhaWxzXCIgKm5nSWY9XCIhY29uZGVuc2VkXCI+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyLXN0YXRlLWNvbnRhaW5lclwiIHJvbGU9XCJuYXZpZ2F0aW9uXCI+XG5cbiAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJiYWNrVmlzaWJsZSA9PT0gdHJ1ZVwiIGNsYXNzPVwicGFnZS1oZWFkZXItYmFjay1idXR0b25cIiAoY2xpY2spPVwiZ29CYWNrKClcIiBhcmlhLWxhYmVsPVwiR28gQmFja1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaHBlLWljb24gaHBlLXByZXZpb3VzIHRleHQtcHJpbWFyeVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFnZS1oZWFkZXItdGl0bGUtY29udGFpbmVyXCI+XG5cbiAgICAgICAgICAgICAgICA8dXgtYnJlYWRjcnVtYnMgW2NydW1ic109XCJjcnVtYnNcIj48L3V4LWJyZWFkY3J1bWJzPlxuXG4gICAgICAgICAgICAgICAgPGgxIGNsYXNzPVwicGFnZS1oZWFkZXItdGl0bGVcIiBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cImZhbWlseUJhY2tncm91bmRcIiBbc3R5bGUuY29sb3JdPVwiZmFtaWx5Rm9yZWdyb3VuZFwiPnt7IGhlYWRlciB9fTwvaDE+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBEaXNwbGF5IFRoaXMgU2VjdGlvbiBPcHRpbWl6ZWQgZm9yIENvbmRlbnNlZCBNb2RlIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJwYWdlLWhlYWRlci1jb25kZW5zZWQtY29udGVudFwiICpuZ0lmPVwiY29uZGVuc2VkXCI+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyLWJyZWFkY3J1bWJzXCIgcm9sZT1cIm5hdmlnYXRpb25cIj5cbiAgICAgICAgICAgIDx1eC1icmVhZGNydW1icyBbY3J1bWJzXT1cImNydW1ic1wiPjwvdXgtYnJlYWRjcnVtYnM+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYWdlLWhlYWRlci1uYXZpZ2F0aW9uXCIgW25nQ2xhc3NdPVwiYWxpZ25tZW50XCIgcm9sZT1cIm5hdmlnYXRpb25cIiBhcmlhLWxhYmVsPVwiUHJpbWFyeSBOYXZpZ2F0aW9uXCI+XG5cbiAgICAgICAgICAgIDwhLS0gVGhlIFRvcCBOYXZpZ2F0aW9uIE9wdGlvbnMgLS0+XG4gICAgICAgICAgICA8dXgtcGFnZS1oZWFkZXItaG9yaXpvbnRhbC1uYXZpZ2F0aW9uPjwvdXgtcGFnZS1oZWFkZXItaG9yaXpvbnRhbC1uYXZpZ2F0aW9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFnZS1oZWFkZXItaWNvbi1tZW51c1wiIHJvbGU9XCJ0b29sYmFyXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBtZW51IG9mIGN1c3RvbU1lbnVzXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwibWVudVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPHV4LXBhZ2UtaGVhZGVyLWljb24tbWVudSAqbmdGb3I9XCJsZXQgbWVudSBvZiBpY29uTWVudXNcIiBbbWVudV09XCJtZW51XCI+PC91eC1wYWdlLWhlYWRlci1pY29uLW1lbnU+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwicGFnZS1oZWFkZXItc2Vjb25kYXJ5XCIgW25nQ2xhc3NdPVwic2Vjb25kYXJ5TmF2aWdhdGlvbkFsaWdubWVudFwiIHJvbGU9XCJuYXZpZ2F0aW9uXCIgKm5nSWY9XCJzZWNvbmRhcnlOYXZpZ2F0aW9uICYmIChzZWxlY3RlZFJvb3QkIHwgYXN5bmMpXCI+XG4gICAgPHVsIGNsYXNzPVwibmF2IG5hdi10YWJzXCIgcm9sZT1cInRhYmxpc3RcIiBhcmlhLWxhYmVsPVwiU2Vjb25kYXJ5IE5hdmlnYXRpb25cIiAqbmdJZj1cIihzZWxlY3RlZFJvb3QkIHwgYXN5bmMpPy5jaGlsZHJlbjsgbGV0IGNoaWxkcmVuXCI+XG4gICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgY2hpbGQgb2YgY2hpbGRyZW5cIlxuICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJjaGlsZC5zZWxlY3RlZFwiXG4gICAgICAgICAgICByb2xlPVwibm9uZVwiXG4gICAgICAgICAgICBbdXhQYWdlSGVhZGVyTmF2aWdhdGlvblNlY29uZGFyeUl0ZW1dPVwiY2hpbGRcIj5cblxuICAgICAgICAgICAgPGEgcm9sZT1cInRhYlwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJjaGlsZC5zZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0KGNoaWxkKVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24uZW50ZXIpPVwic2VsZWN0KGNoaWxkKVwiPnt7IGNoaWxkLnRpdGxlIH19PC9hPlxuXG4gICAgICAgIDwvbGk+XG4gICAgPC91bD5cbjwvZGl2PmAsXG4gICAgcHJvdmlkZXJzOiBbIFBhZ2VIZWFkZXJTZXJ2aWNlIF1cbn0pXG5leHBvcnQgY2xhc3MgUGFnZUhlYWRlckNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBsb2dvOiBzdHJpbmc7XG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgYWxpZ25tZW50OiAnbGVmdCcgfCAncmlnaHQnIHwgJ2NlbnRlcicgPSAnY2VudGVyJztcbiAgICBASW5wdXQoKSBjb25kZW5zZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBpY29uTWVudXM6IFBhZ2VIZWFkZXJJY29uTWVudVtdO1xuICAgIEBJbnB1dCgpIGJhY2tWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBzZWNvbmRhcnlOYXZpZ2F0aW9uQWxpZ25tZW50OiBzdHJpbmcgPSAnY2VudGVyJztcblxuICAgIEBJbnB1dCgpIHNldCBzZWNvbmRhcnlOYXZpZ2F0aW9uQXV0b3NlbGVjdCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9wYWdlSGVhZGVyU2VydmljZS5zZWNvbmRhcnlOYXZpZ2F0aW9uQXV0b3NlbGVjdCA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBzZWNvbmRhcnlOYXZpZ2F0aW9uQXV0b3NlbGVjdCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhZ2VIZWFkZXJTZXJ2aWNlLnNlY29uZGFyeU5hdmlnYXRpb25BdXRvc2VsZWN0O1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHNldCBpdGVtcyhpdGVtczogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtW10pIHtcbiAgICAgICAgdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2V0SXRlbXMoaXRlbXMpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHNldCBzZWNvbmRhcnlOYXZpZ2F0aW9uKGVuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2V0U2Vjb25kYXJ5TmF2aWdhdGlvbihlbmFibGVkKTtcbiAgICB9XG5cbiAgICBnZXQgc2Vjb25kYXJ5TmF2aWdhdGlvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhZ2VIZWFkZXJTZXJ2aWNlLnNlY29uZGFyeSQuZ2V0VmFsdWUoKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBzZXQgY3J1bWJzKGNydW1iczogQnJlYWRjcnVtYltdKSB7XG4gICAgICAgIHRoaXMuX2NydW1icyA9IGNydW1icztcbiAgICB9XG5cbiAgICBnZXQgY3J1bWJzKCk6IEJyZWFkY3J1bWJbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmRlbnNlZCA/IFsuLi50aGlzLl9jcnVtYnMsIHsgdGl0bGU6IHRoaXMuaGVhZGVyIH1dIDogdGhpcy5fY3J1bWJzO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGZhbWlseUJhY2tncm91bmQoY29sb3I6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9mYW1pbHlCYWNrZ3JvdW5kID0gdGhpcy5fY29sb3JTZXJ2aWNlLnJlc29sdmUoY29sb3IpO1xuICAgIH1cblxuICAgIGdldCBmYW1pbHlCYWNrZ3JvdW5kKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mYW1pbHlCYWNrZ3JvdW5kO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGZhbWlseUZvcmVncm91bmQoY29sb3I6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9mYW1pbHlGb3JlZ3JvdW5kID0gdGhpcy5fY29sb3JTZXJ2aWNlLnJlc29sdmUoY29sb3IpO1xuICAgIH1cblxuICAgIGdldCBmYW1pbHlGb3JlZ3JvdW5kKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mYW1pbHlGb3JlZ3JvdW5kO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSBiYWNrQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFBhZ2VIZWFkZXJDdXN0b21NZW51RGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pIGN1c3RvbU1lbnVzOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBzZWxlY3RlZCQ6IEJlaGF2aW9yU3ViamVjdDxQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0+ID0gdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2VsZWN0ZWQkO1xuICAgIHNlbGVjdGVkUm9vdCQ6IEJlaGF2aW9yU3ViamVjdDxQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0+ID0gdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2VsZWN0ZWRSb290JDtcblxuICAgIHByaXZhdGUgX2NydW1iczogQnJlYWRjcnVtYltdID0gW107XG4gICAgcHJpdmF0ZSBfZmFtaWx5QmFja2dyb3VuZDogc3RyaW5nO1xuICAgIHByaXZhdGUgX2ZhbWlseUZvcmVncm91bmQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbG9yU2VydmljZTogQ29sb3JTZXJ2aWNlLCBwcml2YXRlIF9wYWdlSGVhZGVyU2VydmljZTogUGFnZUhlYWRlclNlcnZpY2UpIHsgfVxuXG4gICAgZ29CYWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJhY2tDbGljay5lbWl0KCk7XG4gICAgfVxuXG4gICAgc2VsZWN0KGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3BhZ2VIZWFkZXJTZXJ2aWNlLnNlbGVjdChpdGVtKTtcbiAgICB9XG59Il19