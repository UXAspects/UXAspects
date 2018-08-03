/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ViewChild } from '@angular/core';
import { MenuNavigationToggleDirective } from '../../../directives/menu-navigation/menu-navigation-toggle.directive';
import { PageHeaderService } from '../page-header.service';
export class PageHeaderIconMenuComponent {
    /**
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        this._subscription = _service.activeIconMenu$.subscribe((next) => {
            // Close all but the most recently opened menu
            if (next !== this.menu) {
                this._isOpen = false;
            }
        });
    }
    /**
     * @return {?}
     */
    get isOpen() {
        return this._isOpen;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isOpen(value) {
        this._isOpen = value;
        if (value) {
            this._service.activeIconMenu$.next(this.menu);
        }
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
        if (item.select) {
            item.select.call(item, item);
        }
    }
    /**
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    keydownHandler(item, event) {
        switch (event.key) {
            case 'Enter':
            case ' ':
                this.select(item);
                this.isOpen = false;
                this.menuNavigationToggle.focus();
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    }
}
PageHeaderIconMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-page-header-icon-menu',
                template: "<div class=\"page-header-icon-menu\"\n    dropdown\n    placement=\"bottom right\"\n    [(isOpen)]=\"isOpen\">\n\n    <a role=\"button\"\n        class=\"page-header-icon-menu-button\"\n        [attr.aria-label]=\"menu.label\"\n        aria-haspopup=\"true\"\n        tabindex=\"0\"\n        (click)=\"select(menu)\"\n        dropdownToggle\n        uxMenuNavigationToggle\n        #menuNavigationToggle=\"uxMenuNavigationToggle\"\n        [(menuOpen)]=\"isOpen\">\n\n        <i class=\"hpe-icon\" [ngClass]=\"menu.icon\"></i>\n        <span class=\"label label-primary\" *ngIf=\"menu?.badge\" aria-hidden=\"true\">{{ menu.badge }}</span>\n\n    </a>\n\n    <ul *dropdownMenu\n        class=\"dropdown-menu\"\n        role=\"menu\"\n        uxMenuNavigation\n        [toggleButton]=\"menuNavigationToggle\">\n\n        <li *ngFor=\"let dropdown of menu?.dropdown\"\n            role=\"none\"\n            [class.dropdown-header]=\"dropdown.header\"\n            [class.dropdown-divider]=\"dropdown.divider\">\n\n            <span class=\"font-bold\" *ngIf=\"dropdown.header\">{{ dropdown.title }}</span>\n\n            <a *ngIf=\"!dropdown.header\"\n                role=\"menuitem\"\n                class=\"dropdown-item\"\n                tabindex=\"-1\"\n                (click)=\"select(dropdown)\"\n                (keydown)=\"keydownHandler(dropdown, $event)\"\n                uxMenuNavigationItem>\n\n\n                <span class=\"dropdown-item-title\">\n                    <i class=\"hpe-icon hpe-fw\" [ngClass]=\"dropdown.icon\"></i>\n                    {{ dropdown.title }}\n                </span>\n                <span *ngIf=\"dropdown.subtitle\" class=\"dropdown-item-subtitle\">{{ dropdown.subtitle }}</span>\n\n            </a>\n        </li>\n\n    </ul>\n</div>"
            }] }
];
/** @nocollapse */
PageHeaderIconMenuComponent.ctorParameters = () => [
    { type: PageHeaderService }
];
PageHeaderIconMenuComponent.propDecorators = {
    menu: [{ type: Input }],
    menuNavigationToggle: [{ type: ViewChild, args: ['menuNavigationToggle',] }]
};
function PageHeaderIconMenuComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    PageHeaderIconMenuComponent.prototype.menu;
    /** @type {?} */
    PageHeaderIconMenuComponent.prototype.menuNavigationToggle;
    /** @type {?} */
    PageHeaderIconMenuComponent.prototype._isOpen;
    /** @type {?} */
    PageHeaderIconMenuComponent.prototype._subscription;
    /** @type {?} */
    PageHeaderIconMenuComponent.prototype._service;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3BhZ2UtaGVhZGVyL2ljb24tbWVudS9pY29uLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBYSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sc0VBQXNFLENBQUM7QUFFckgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFNM0QsTUFBTTs7OztJQW9CRixZQUFvQixRQUEyQjtRQUEzQixhQUFRLEdBQVIsUUFBUSxDQUFtQjtRQUMzQyxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7O1lBRTdELEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDeEI7U0FDSixDQUFDLENBQUM7S0FDTjs7OztJQXZCRCxJQUFJLE1BQU07UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUN2Qjs7Ozs7SUFFRCxJQUFJLE1BQU0sQ0FBQyxLQUFjO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pEO0tBQ0o7Ozs7SUFnQkQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQXlEO1FBQzVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2hDO0tBQ0o7Ozs7OztJQUVELGNBQWMsQ0FBQyxJQUF5RCxFQUFFLEtBQW9CO1FBRTFGLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxHQUFHO2dCQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2xDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN4QixLQUFLLENBQUM7U0FDYjtLQUNKOzs7WUF2REosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLHF3REFBeUM7YUFDNUM7Ozs7WUFMUSxpQkFBaUI7OzttQkFRckIsS0FBSzttQ0FhTCxTQUFTLFNBQUMsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IE1lbnVOYXZpZ2F0aW9uVG9nZ2xlRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vLi4vZGlyZWN0aXZlcy9tZW51LW5hdmlnYXRpb24vbWVudS1uYXZpZ2F0aW9uLXRvZ2dsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUGFnZUhlYWRlckljb25NZW51LCBQYWdlSGVhZGVySWNvbk1lbnVEcm9wZG93bkl0ZW0gfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IFBhZ2VIZWFkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vcGFnZS1oZWFkZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtcGFnZS1oZWFkZXItaWNvbi1tZW51JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vaWNvbi1tZW51LmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBQYWdlSGVhZGVySWNvbk1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgbWVudTogUGFnZUhlYWRlckljb25NZW51O1xuXG4gICAgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzT3BlbjtcbiAgICB9XG5cbiAgICBzZXQgaXNPcGVuKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2lzT3BlbiA9IHZhbHVlO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UuYWN0aXZlSWNvbk1lbnUkLm5leHQodGhpcy5tZW51KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoJ21lbnVOYXZpZ2F0aW9uVG9nZ2xlJykgbWVudU5hdmlnYXRpb25Ub2dnbGU6IE1lbnVOYXZpZ2F0aW9uVG9nZ2xlRGlyZWN0aXZlO1xuXG4gICAgcHJpdmF0ZSBfaXNPcGVuOiBib29sZWFuO1xuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogUGFnZUhlYWRlclNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gX3NlcnZpY2UuYWN0aXZlSWNvbk1lbnUkLnN1YnNjcmliZSgobmV4dCkgPT4ge1xuICAgICAgICAgICAgLy8gQ2xvc2UgYWxsIGJ1dCB0aGUgbW9zdCByZWNlbnRseSBvcGVuZWQgbWVudVxuICAgICAgICAgICAgaWYgKG5leHQgIT09IHRoaXMubWVudSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0KGl0ZW06IFBhZ2VIZWFkZXJJY29uTWVudSB8IFBhZ2VIZWFkZXJJY29uTWVudURyb3Bkb3duSXRlbSkge1xuICAgICAgICBpZiAoaXRlbS5zZWxlY3QpIHtcbiAgICAgICAgICAgIGl0ZW0uc2VsZWN0LmNhbGwoaXRlbSwgaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBrZXlkb3duSGFuZGxlcihpdGVtOiBQYWdlSGVhZGVySWNvbk1lbnUgfCBQYWdlSGVhZGVySWNvbk1lbnVEcm9wZG93bkl0ZW0sIGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGNhc2UgJyAnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KGl0ZW0pO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5tZW51TmF2aWdhdGlvblRvZ2dsZS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59Il19