/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ViewChild } from '@angular/core';
import { MenuNavigationToggleDirective } from '../../../directives/menu-navigation/menu-navigation-toggle.directive';
import { PageHeaderService } from '../page-header.service';
var PageHeaderIconMenuComponent = (function () {
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
                },] },
    ];
    /** @nocollapse */
    PageHeaderIconMenuComponent.ctorParameters = function () { return [
        { type: PageHeaderService, },
    ]; };
    PageHeaderIconMenuComponent.propDecorators = {
        "menu": [{ type: Input },],
        "menuNavigationToggle": [{ type: ViewChild, args: ['menuNavigationToggle',] },],
    };
    return PageHeaderIconMenuComponent;
}());
export { PageHeaderIconMenuComponent };
function PageHeaderIconMenuComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PageHeaderIconMenuComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PageHeaderIconMenuComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    PageHeaderIconMenuComponent.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3BhZ2UtaGVhZGVyL2ljb24tbWVudS9pY29uLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBYSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sc0VBQXNFLENBQUM7QUFFckgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0lBK0V2RCxxQ0FBb0IsUUFBMkI7UUFBL0MsaUJBT0M7UUFQbUIsYUFBUSxHQUFSLFFBQVEsQ0FBbUI7UUFDM0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQUk7O1lBRXpELEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckIsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDeEI7U0FDSixDQUFDLENBQUM7S0FDTjtJQXZCRCxzQkFBSSwrQ0FBTTs7OztRQUFWO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDdkI7Ozs7O1FBRUQsVUFBVyxLQUFjO1lBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqRDtTQUNKOzs7T0FQQTs7OztJQXVCRCxpREFBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7OztJQUVELDRDQUFNOzs7O0lBQU4sVUFBTyxJQUF5RDtRQUM1RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNoQztLQUNKOzs7Ozs7SUFFRCxvREFBYzs7Ozs7SUFBZCxVQUFlLElBQXlELEVBQUUsS0FBb0I7UUFFMUYsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDaEIsS0FBSyxPQUFPLENBQUM7WUFDYixLQUFLLEdBQUc7Z0JBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDbEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQztTQUNiO0tBQ0o7O2dCQTVHSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsUUFBUSxFQUFFLDJ2REFxRFA7aUJBQ047Ozs7Z0JBMURRLGlCQUFpQjs7O3lCQTZEckIsS0FBSzt5Q0FhTCxTQUFTLFNBQUMsc0JBQXNCOztzQ0E5RXJDOztTQStEYSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgTWVudU5hdmlnYXRpb25Ub2dnbGVEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi8uLi9kaXJlY3RpdmVzL21lbnUtbmF2aWdhdGlvbi9tZW51LW5hdmlnYXRpb24tdG9nZ2xlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQYWdlSGVhZGVySWNvbk1lbnUsIFBhZ2VIZWFkZXJJY29uTWVudURyb3Bkb3duSXRlbSB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgUGFnZUhlYWRlclNlcnZpY2UgfSBmcm9tICcuLi9wYWdlLWhlYWRlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1wYWdlLWhlYWRlci1pY29uLW1lbnUnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyLWljb24tbWVudVwiXG4gICAgZHJvcGRvd25cbiAgICBwbGFjZW1lbnQ9XCJib3R0b20gcmlnaHRcIlxuICAgIFsoaXNPcGVuKV09XCJpc09wZW5cIj5cblxuICAgIDxhIHJvbGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzcz1cInBhZ2UtaGVhZGVyLWljb24tbWVudS1idXR0b25cIlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm1lbnUubGFiZWxcIlxuICAgICAgICBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiXG4gICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgIChjbGljayk9XCJzZWxlY3QobWVudSlcIlxuICAgICAgICBkcm9wZG93blRvZ2dsZVxuICAgICAgICB1eE1lbnVOYXZpZ2F0aW9uVG9nZ2xlXG4gICAgICAgICNtZW51TmF2aWdhdGlvblRvZ2dsZT1cInV4TWVudU5hdmlnYXRpb25Ub2dnbGVcIlxuICAgICAgICBbKG1lbnVPcGVuKV09XCJpc09wZW5cIj5cblxuICAgICAgICA8aSBjbGFzcz1cImhwZS1pY29uXCIgW25nQ2xhc3NdPVwibWVudS5pY29uXCI+PC9pPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImxhYmVsIGxhYmVsLXByaW1hcnlcIiAqbmdJZj1cIm1lbnU/LmJhZGdlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+e3sgbWVudS5iYWRnZSB9fTwvc3Bhbj5cblxuICAgIDwvYT5cblxuICAgIDx1bCAqZHJvcGRvd25NZW51XG4gICAgICAgIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiXG4gICAgICAgIHJvbGU9XCJtZW51XCJcbiAgICAgICAgdXhNZW51TmF2aWdhdGlvblxuICAgICAgICBbdG9nZ2xlQnV0dG9uXT1cIm1lbnVOYXZpZ2F0aW9uVG9nZ2xlXCI+XG5cbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBkcm9wZG93biBvZiBtZW51Py5kcm9wZG93blwiXG4gICAgICAgICAgICByb2xlPVwibm9uZVwiXG4gICAgICAgICAgICBbY2xhc3MuZHJvcGRvd24taGVhZGVyXT1cImRyb3Bkb3duLmhlYWRlclwiXG4gICAgICAgICAgICBbY2xhc3MuZHJvcGRvd24tZGl2aWRlcl09XCJkcm9wZG93bi5kaXZpZGVyXCI+XG5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9udC1ib2xkXCIgKm5nSWY9XCJkcm9wZG93bi5oZWFkZXJcIj57eyBkcm9wZG93bi50aXRsZSB9fTwvc3Bhbj5cblxuICAgICAgICAgICAgPGEgKm5nSWY9XCIhZHJvcGRvd24uaGVhZGVyXCJcbiAgICAgICAgICAgICAgICByb2xlPVwibWVudWl0ZW1cIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdChkcm9wZG93bilcIlxuICAgICAgICAgICAgICAgIChrZXlkb3duKT1cImtleWRvd25IYW5kbGVyKGRyb3Bkb3duLCAkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICB1eE1lbnVOYXZpZ2F0aW9uSXRlbT5cblxuXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkcm9wZG93bi1pdGVtLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiaHBlLWljb24gaHBlLWZ3XCIgW25nQ2xhc3NdPVwiZHJvcGRvd24uaWNvblwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAge3sgZHJvcGRvd24udGl0bGUgfX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJkcm9wZG93bi5zdWJ0aXRsZVwiIGNsYXNzPVwiZHJvcGRvd24taXRlbS1zdWJ0aXRsZVwiPnt7IGRyb3Bkb3duLnN1YnRpdGxlIH19PC9zcGFuPlxuXG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG5cbiAgICA8L3VsPlxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBQYWdlSGVhZGVySWNvbk1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgbWVudTogUGFnZUhlYWRlckljb25NZW51O1xuXG4gICAgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzT3BlbjtcbiAgICB9XG5cbiAgICBzZXQgaXNPcGVuKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2lzT3BlbiA9IHZhbHVlO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UuYWN0aXZlSWNvbk1lbnUkLm5leHQodGhpcy5tZW51KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoJ21lbnVOYXZpZ2F0aW9uVG9nZ2xlJykgbWVudU5hdmlnYXRpb25Ub2dnbGU6IE1lbnVOYXZpZ2F0aW9uVG9nZ2xlRGlyZWN0aXZlO1xuXG4gICAgcHJpdmF0ZSBfaXNPcGVuOiBib29sZWFuO1xuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogUGFnZUhlYWRlclNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gX3NlcnZpY2UuYWN0aXZlSWNvbk1lbnUkLnN1YnNjcmliZSgobmV4dCkgPT4ge1xuICAgICAgICAgICAgLy8gQ2xvc2UgYWxsIGJ1dCB0aGUgbW9zdCByZWNlbnRseSBvcGVuZWQgbWVudVxuICAgICAgICAgICAgaWYgKG5leHQgIT09IHRoaXMubWVudSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0KGl0ZW06IFBhZ2VIZWFkZXJJY29uTWVudSB8IFBhZ2VIZWFkZXJJY29uTWVudURyb3Bkb3duSXRlbSkge1xuICAgICAgICBpZiAoaXRlbS5zZWxlY3QpIHtcbiAgICAgICAgICAgIGl0ZW0uc2VsZWN0LmNhbGwoaXRlbSwgaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBrZXlkb3duSGFuZGxlcihpdGVtOiBQYWdlSGVhZGVySWNvbk1lbnUgfCBQYWdlSGVhZGVySWNvbk1lbnVEcm9wZG93bkl0ZW0sIGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGNhc2UgJyAnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KGl0ZW0pO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5tZW51TmF2aWdhdGlvblRvZ2dsZS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59Il19