/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ViewChild } from '@angular/core';
import { MenuNavigationToggleDirective } from '../../../directives/menu-navigation/menu-navigation-toggle.directive';
import { PageHeaderService } from '../page-header.service';
var PageHeaderIconMenuComponent = /** @class */ (function () {
    function PageHeaderIconMenuComponent(_service) {
        var _this = this;
        this._service = _service;
        this._subscription = _service.activeIconMenu$.subscribe(function (next) {
            // Close all but the most recently opened menu
            if (next !== _this.menu) {
                _this._isOpen = false;
            }
        });
    }
    Object.defineProperty(PageHeaderIconMenuComponent.prototype, "isOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isOpen;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._isOpen = value;
            if (value) {
                this._service.activeIconMenu$.next(this.menu);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PageHeaderIconMenuComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    PageHeaderIconMenuComponent.prototype.select = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (item.select) {
            item.select.call(item, item);
        }
    };
    /**
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    PageHeaderIconMenuComponent.prototype.keydownHandler = /**
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    function (item, event) {
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
    };
    PageHeaderIconMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-page-header-icon-menu',
                    template: "<div class=\"page-header-icon-menu\"\n    dropdown\n    placement=\"bottom right\"\n    [(isOpen)]=\"isOpen\">\n\n    <a role=\"button\"\n        class=\"page-header-icon-menu-button\"\n        [attr.aria-label]=\"menu.label\"\n        aria-haspopup=\"true\"\n        tabindex=\"0\"\n        (click)=\"select(menu)\"\n        dropdownToggle\n        uxMenuNavigationToggle\n        #menuNavigationToggle=\"uxMenuNavigationToggle\"\n        [(menuOpen)]=\"isOpen\">\n\n        <i class=\"hpe-icon\" [ngClass]=\"menu.icon\"></i>\n        <span class=\"label label-primary\" *ngIf=\"menu?.badge\" aria-hidden=\"true\">{{ menu.badge }}</span>\n\n    </a>\n\n    <ul *dropdownMenu\n        class=\"dropdown-menu\"\n        role=\"menu\"\n        uxMenuNavigation\n        [toggleButton]=\"menuNavigationToggle\">\n\n        <li *ngFor=\"let dropdown of menu?.dropdown\"\n            role=\"none\"\n            [class.dropdown-header]=\"dropdown.header\"\n            [class.dropdown-divider]=\"dropdown.divider\">\n\n            <span class=\"font-bold\" *ngIf=\"dropdown.header\">{{ dropdown.title }}</span>\n\n            <a *ngIf=\"!dropdown.header\"\n                role=\"menuitem\"\n                class=\"dropdown-item\"\n                tabindex=\"-1\"\n                (click)=\"select(dropdown)\"\n                (keydown)=\"keydownHandler(dropdown, $event)\"\n                uxMenuNavigationItem>\n\n\n                <span class=\"dropdown-item-title\">\n                    <i class=\"hpe-icon hpe-fw\" [ngClass]=\"dropdown.icon\"></i>\n                    {{ dropdown.title }}\n                </span>\n                <span *ngIf=\"dropdown.subtitle\" class=\"dropdown-item-subtitle\">{{ dropdown.subtitle }}</span>\n\n            </a>\n        </li>\n\n    </ul>\n</div>"
                }] }
    ];
    /** @nocollapse */
    PageHeaderIconMenuComponent.ctorParameters = function () { return [
        { type: PageHeaderService }
    ]; };
    PageHeaderIconMenuComponent.propDecorators = {
        menu: [{ type: Input }],
        menuNavigationToggle: [{ type: ViewChild, args: ['menuNavigationToggle',] }]
    };
    return PageHeaderIconMenuComponent;
}());
export { PageHeaderIconMenuComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3BhZ2UtaGVhZGVyL2ljb24tbWVudS9pY29uLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBYSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sc0VBQXNFLENBQUM7QUFFckgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0lBMEJ2RCxxQ0FBb0IsUUFBMkI7UUFBL0MsaUJBT0M7UUFQbUIsYUFBUSxHQUFSLFFBQVEsQ0FBbUI7UUFDM0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQUk7O1lBRXpELEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckIsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDeEI7U0FDSixDQUFDLENBQUM7S0FDTjtJQXZCRCxzQkFBSSwrQ0FBTTs7OztRQUFWO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDdkI7Ozs7O1FBRUQsVUFBVyxLQUFjO1lBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqRDtTQUNKOzs7T0FQQTs7OztJQXVCRCxpREFBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7OztJQUVELDRDQUFNOzs7O0lBQU4sVUFBTyxJQUF5RDtRQUM1RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNoQztLQUNKOzs7Ozs7SUFFRCxvREFBYzs7Ozs7SUFBZCxVQUFlLElBQXlELEVBQUUsS0FBb0I7UUFFMUYsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDaEIsS0FBSyxPQUFPLENBQUM7WUFDYixLQUFLLEdBQUc7Z0JBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDbEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQztTQUNiO0tBQ0o7O2dCQXZESixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMscXdEQUF5QztpQkFDNUM7Ozs7Z0JBTFEsaUJBQWlCOzs7dUJBUXJCLEtBQUs7dUNBYUwsU0FBUyxTQUFDLHNCQUFzQjs7c0NBekJyQzs7U0FVYSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgTWVudU5hdmlnYXRpb25Ub2dnbGVEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi8uLi9kaXJlY3RpdmVzL21lbnUtbmF2aWdhdGlvbi9tZW51LW5hdmlnYXRpb24tdG9nZ2xlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQYWdlSGVhZGVySWNvbk1lbnUsIFBhZ2VIZWFkZXJJY29uTWVudURyb3Bkb3duSXRlbSB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgUGFnZUhlYWRlclNlcnZpY2UgfSBmcm9tICcuLi9wYWdlLWhlYWRlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1wYWdlLWhlYWRlci1pY29uLW1lbnUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9pY29uLW1lbnUuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2VIZWFkZXJJY29uTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBtZW51OiBQYWdlSGVhZGVySWNvbk1lbnU7XG5cbiAgICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNPcGVuO1xuICAgIH1cblxuICAgIHNldCBpc09wZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faXNPcGVuID0gdmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fc2VydmljZS5hY3RpdmVJY29uTWVudSQubmV4dCh0aGlzLm1lbnUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQFZpZXdDaGlsZCgnbWVudU5hdmlnYXRpb25Ub2dnbGUnKSBtZW51TmF2aWdhdGlvblRvZ2dsZTogTWVudU5hdmlnYXRpb25Ub2dnbGVEaXJlY3RpdmU7XG5cbiAgICBwcml2YXRlIF9pc09wZW46IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBQYWdlSGVhZGVyU2VydmljZSkge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBfc2VydmljZS5hY3RpdmVJY29uTWVudSQuc3Vic2NyaWJlKChuZXh0KSA9PiB7XG4gICAgICAgICAgICAvLyBDbG9zZSBhbGwgYnV0IHRoZSBtb3N0IHJlY2VudGx5IG9wZW5lZCBtZW51XG4gICAgICAgICAgICBpZiAobmV4dCAhPT0gdGhpcy5tZW51KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBzZWxlY3QoaXRlbTogUGFnZUhlYWRlckljb25NZW51IHwgUGFnZUhlYWRlckljb25NZW51RHJvcGRvd25JdGVtKSB7XG4gICAgICAgIGlmIChpdGVtLnNlbGVjdCkge1xuICAgICAgICAgICAgaXRlbS5zZWxlY3QuY2FsbChpdGVtLCBpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGtleWRvd25IYW5kbGVyKGl0ZW06IFBhZ2VIZWFkZXJJY29uTWVudSB8IFBhZ2VIZWFkZXJJY29uTWVudURyb3Bkb3duSXRlbSwgZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgY2FzZSAnICc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QoaXRlbSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVOYXZpZ2F0aW9uVG9nZ2xlLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=