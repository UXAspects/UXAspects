/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { MenuNavigationToggleDirective } from '../../../../directives/menu-navigation/menu-navigation-toggle.directive';
import { PageHeaderService } from '../../page-header.service';
import { PageHeaderNavigationDropdownItemComponent } from '../navigation-dropdown-item/navigation-dropdown-item.component';
var PageHeaderNavigationItemComponent = (function () {
    function PageHeaderNavigationItemComponent(elementRef, _pageHeaderService) {
        this.elementRef = elementRef;
        this._pageHeaderService = _pageHeaderService;
        this.secondary$ = this._pageHeaderService.secondary$;
    }
    /**
     * @return {?}
     */
    PageHeaderNavigationItemComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._subscription = this._pageHeaderService.selected$.subscribe(function (next) {
            // Update selected state for this item
            // Update selected state for this item
            _this._pageHeaderService.updateItem(_this.item, next);
            if (next && _this.isOpen) {
                _this.isOpen = false;
                // If menu was closed, keep focus on the toggle button
                // If menu was closed, keep focus on the toggle button
                _this.button.focus();
            }
        });
        if (this.menu) {
            this._subscription.add(this.menu.onHidden.subscribe(function () { return _this.dropdowns.forEach(function (dropdown) { return dropdown.close(); }); }));
        }
    };
    /**
     * @return {?}
     */
    PageHeaderNavigationItemComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    PageHeaderNavigationItemComponent.prototype.select = /**
     * @return {?}
     */
    function () {
        // if the item has children then do nothing at this stage
        if (this.item.children && this._pageHeaderService.secondary$.getValue() === false) {
            return;
        }
        // otherwise select the current item
        this._pageHeaderService.select(this.item);
    };
    PageHeaderNavigationItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-page-header-horizontal-navigation-item',
                    template: "<div *ngIf=\"item.children && item.children.length > 0 && !(secondary$ | async)\"\n    dropdown\n    #menu=\"bs-dropdown\"\n    [(isOpen)]=\"isOpen\"\n    container=\"body\"\n    placement=\"bottom left\">\n\n    <button role=\"menuitem\"\n        class=\"horizontal-navigation-button\"\n        [class.selected]=\"item.selected\"\n        [class.open]=\"isOpen\"\n        aria-haspopup=\"true\"\n        [attr.aria-expanded]=\"isOpen\"\n        [attr.aria-selected]=\"item.selected\"\n        dropdownToggle\n        uxMenuNavigationToggle\n        #button=\"uxMenuNavigationToggle\"\n        [(menuOpen)]=\"isOpen\">\n\n        <span class=\"hpe-icon navigation-item-icon\" *ngIf=\"item.icon\" [ngClass]=\"item?.icon\"></span>\n        <span class=\"navigation-item-label\">{{ item?.title }}</span>\n        <span class=\"hpe-icon hpe-down\"></span>\n\n    </button>\n\n    <div *dropdownMenu\n        role=\"menu\"\n        class=\"dropdown-menu horizontal-navigation-dropdown-menu\"\n        uxMenuNavigation\n        [toggleButton]=\"button\"\n        toggleButtonPosition=\"top\">\n\n        <div *ngFor=\"let item of item?.children\" uxMenuNavigationItem (activated)=\"dropdownItem.focus()\">\n            <ux-page-header-horizontal-navigation-dropdown-item\n                #dropdownItem=\"ux-page-header-horizontal-navigation-dropdown-item\"\n                [item]=\"item\">\n            </ux-page-header-horizontal-navigation-dropdown-item>\n        </div>\n\n    </div>\n\n</div>\n\n<button *ngIf=\"!item.children || item.children.length === 0 || (secondary$ | async)\"\n    role=\"menuitem\"\n    class=\"horizontal-navigation-button\"\n    [class.selected]=\"item.selected\"\n    [attr.aria-selected]=\"item.selected\"\n    (click)=\"select()\">\n\n    <span class=\"hpe-icon navigation-item-icon\" *ngIf=\"item.icon\" [ngClass]=\"item?.icon\"></span>\n    <span class=\"navigation-item-label\">{{ item?.title }}</span>\n\n</button>"
                },] },
    ];
    /** @nocollapse */
    PageHeaderNavigationItemComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: PageHeaderService, },
    ]; };
    PageHeaderNavigationItemComponent.propDecorators = {
        "button": [{ type: ViewChild, args: ['button',] },],
        "menu": [{ type: ViewChild, args: ['menu',] },],
        "dropdowns": [{ type: ViewChildren, args: [PageHeaderNavigationDropdownItemComponent,] },],
        "item": [{ type: Input },],
    };
    return PageHeaderNavigationItemComponent;
}());
export { PageHeaderNavigationItemComponent };
function PageHeaderNavigationItemComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PageHeaderNavigationItemComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PageHeaderNavigationItemComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    PageHeaderNavigationItemComponent.propDecorators;
    /** @type {?} */
    PageHeaderNavigationItemComponent.prototype.button;
    /** @type {?} */
    PageHeaderNavigationItemComponent.prototype.menu;
    /** @type {?} */
    PageHeaderNavigationItemComponent.prototype.dropdowns;
    /** @type {?} */
    PageHeaderNavigationItemComponent.prototype.item;
    /** @type {?} */
    PageHeaderNavigationItemComponent.prototype.secondary$;
    /** @type {?} */
    PageHeaderNavigationItemComponent.prototype.isOpen;
    /** @type {?} */
    PageHeaderNavigationItemComponent.prototype._subscription;
    /** @type {?} */
    PageHeaderNavigationItemComponent.prototype.elementRef;
    /** @type {?} */
    PageHeaderNavigationItemComponent.prototype._pageHeaderService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3BhZ2UtaGVhZGVyL25hdmlnYXRpb24vbmF2aWdhdGlvbi1pdGVtL25hdmlnYXRpb24taXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBcUIsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEgsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHN0QsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0seUVBQXlFLENBQUM7QUFDeEgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHlDQUF5QyxFQUFFLE1BQU0sZ0VBQWdFLENBQUM7O0lBMEV2SCwyQ0FDVyxZQUNDO1FBREQsZUFBVSxHQUFWLFVBQVU7UUFDVCx1QkFBa0IsR0FBbEIsa0JBQWtCOzBCQVJTLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVO0tBU3BFOzs7O0lBRUwsb0RBQVE7OztJQUFSO1FBQUEsaUJBb0JDO1FBbEJHLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJOztZQUdqRSxBQURBLHNDQUFzQztZQUN0QyxLQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFcEQsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzs7Z0JBR3BCLEFBREEsc0RBQXNEO2dCQUN0RCxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3ZCO1NBQ0osQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBaEIsQ0FBZ0IsQ0FBQyxFQUFwRCxDQUFvRCxDQUFDLENBQzNGLENBQUM7U0FDTDtLQUNKOzs7O0lBRUQsdURBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQzs7OztJQUVELGtEQUFNOzs7SUFBTjs7UUFHSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDaEYsTUFBTSxDQUFDO1NBQ1Y7O1FBR0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDN0M7O2dCQS9HSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDJDQUEyQztvQkFDckQsUUFBUSxFQUFFLDQ1REFxREo7aUJBQ1Q7Ozs7Z0JBakVtQixVQUFVO2dCQUtyQixpQkFBaUI7OzsyQkErRHJCLFNBQVMsU0FBQyxRQUFRO3lCQUNsQixTQUFTLFNBQUMsTUFBTTs4QkFDaEIsWUFBWSxTQUFDLHlDQUF5Qzt5QkFFdEQsS0FBSzs7NENBeEVWOztTQWtFYSxpQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGQsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnNEcm9wZG93bkRpcmVjdGl2ZSB9IGZyb20gJ25neC1ib290c3RyYXAvZHJvcGRvd24nO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgTWVudU5hdmlnYXRpb25Ub2dnbGVEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi8uLi8uLi9kaXJlY3RpdmVzL21lbnUtbmF2aWdhdGlvbi9tZW51LW5hdmlnYXRpb24tdG9nZ2xlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQYWdlSGVhZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3BhZ2UtaGVhZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW1Db21wb25lbnQgfSBmcm9tICcuLi9uYXZpZ2F0aW9uLWRyb3Bkb3duLWl0ZW0vbmF2aWdhdGlvbi1kcm9wZG93bi1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0gfSBmcm9tICcuLi9uYXZpZ2F0aW9uLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtcGFnZS1oZWFkZXItaG9yaXpvbnRhbC1uYXZpZ2F0aW9uLWl0ZW0nLFxuICAgIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cIml0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwICYmICEoc2Vjb25kYXJ5JCB8IGFzeW5jKVwiXG4gICAgZHJvcGRvd25cbiAgICAjbWVudT1cImJzLWRyb3Bkb3duXCJcbiAgICBbKGlzT3BlbildPVwiaXNPcGVuXCJcbiAgICBjb250YWluZXI9XCJib2R5XCJcbiAgICBwbGFjZW1lbnQ9XCJib3R0b20gbGVmdFwiPlxuXG4gICAgPGJ1dHRvbiByb2xlPVwibWVudWl0ZW1cIlxuICAgICAgICBjbGFzcz1cImhvcml6b250YWwtbmF2aWdhdGlvbi1idXR0b25cIlxuICAgICAgICBbY2xhc3Muc2VsZWN0ZWRdPVwiaXRlbS5zZWxlY3RlZFwiXG4gICAgICAgIFtjbGFzcy5vcGVuXT1cImlzT3BlblwiXG4gICAgICAgIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCJcbiAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJpc09wZW5cIlxuICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cIml0ZW0uc2VsZWN0ZWRcIlxuICAgICAgICBkcm9wZG93blRvZ2dsZVxuICAgICAgICB1eE1lbnVOYXZpZ2F0aW9uVG9nZ2xlXG4gICAgICAgICNidXR0b249XCJ1eE1lbnVOYXZpZ2F0aW9uVG9nZ2xlXCJcbiAgICAgICAgWyhtZW51T3BlbildPVwiaXNPcGVuXCI+XG5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJocGUtaWNvbiBuYXZpZ2F0aW9uLWl0ZW0taWNvblwiICpuZ0lmPVwiaXRlbS5pY29uXCIgW25nQ2xhc3NdPVwiaXRlbT8uaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJuYXZpZ2F0aW9uLWl0ZW0tbGFiZWxcIj57eyBpdGVtPy50aXRsZSB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJocGUtaWNvbiBocGUtZG93blwiPjwvc3Bhbj5cblxuICAgIDwvYnV0dG9uPlxuXG4gICAgPGRpdiAqZHJvcGRvd25NZW51XG4gICAgICAgIHJvbGU9XCJtZW51XCJcbiAgICAgICAgY2xhc3M9XCJkcm9wZG93bi1tZW51IGhvcml6b250YWwtbmF2aWdhdGlvbi1kcm9wZG93bi1tZW51XCJcbiAgICAgICAgdXhNZW51TmF2aWdhdGlvblxuICAgICAgICBbdG9nZ2xlQnV0dG9uXT1cImJ1dHRvblwiXG4gICAgICAgIHRvZ2dsZUJ1dHRvblBvc2l0aW9uPVwidG9wXCI+XG5cbiAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtPy5jaGlsZHJlblwiIHV4TWVudU5hdmlnYXRpb25JdGVtIChhY3RpdmF0ZWQpPVwiZHJvcGRvd25JdGVtLmZvY3VzKClcIj5cbiAgICAgICAgICAgIDx1eC1wYWdlLWhlYWRlci1ob3Jpem9udGFsLW5hdmlnYXRpb24tZHJvcGRvd24taXRlbVxuICAgICAgICAgICAgICAgICNkcm9wZG93bkl0ZW09XCJ1eC1wYWdlLWhlYWRlci1ob3Jpem9udGFsLW5hdmlnYXRpb24tZHJvcGRvd24taXRlbVwiXG4gICAgICAgICAgICAgICAgW2l0ZW1dPVwiaXRlbVwiPlxuICAgICAgICAgICAgPC91eC1wYWdlLWhlYWRlci1ob3Jpem9udGFsLW5hdmlnYXRpb24tZHJvcGRvd24taXRlbT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cblxuPC9kaXY+XG5cbjxidXR0b24gKm5nSWY9XCIhaXRlbS5jaGlsZHJlbiB8fCBpdGVtLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCB8fCAoc2Vjb25kYXJ5JCB8IGFzeW5jKVwiXG4gICAgcm9sZT1cIm1lbnVpdGVtXCJcbiAgICBjbGFzcz1cImhvcml6b250YWwtbmF2aWdhdGlvbi1idXR0b25cIlxuICAgIFtjbGFzcy5zZWxlY3RlZF09XCJpdGVtLnNlbGVjdGVkXCJcbiAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cIml0ZW0uc2VsZWN0ZWRcIlxuICAgIChjbGljayk9XCJzZWxlY3QoKVwiPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJocGUtaWNvbiBuYXZpZ2F0aW9uLWl0ZW0taWNvblwiICpuZ0lmPVwiaXRlbS5pY29uXCIgW25nQ2xhc3NdPVwiaXRlbT8uaWNvblwiPjwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzcz1cIm5hdmlnYXRpb24taXRlbS1sYWJlbFwiPnt7IGl0ZW0/LnRpdGxlIH19PC9zcGFuPlxuXG48L2J1dHRvbj5gXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBWaWV3Q2hpbGQoJ2J1dHRvbicpIGJ1dHRvbjogTWVudU5hdmlnYXRpb25Ub2dnbGVEaXJlY3RpdmU7XG4gICAgQFZpZXdDaGlsZCgnbWVudScpIG1lbnU6IEJzRHJvcGRvd25EaXJlY3RpdmU7XG4gICAgQFZpZXdDaGlsZHJlbihQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbUNvbXBvbmVudCkgZHJvcGRvd25zOiBRdWVyeUxpc3Q8UGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW1Db21wb25lbnQ+O1xuXG4gICAgQElucHV0KCkgaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtO1xuXG4gICAgc2Vjb25kYXJ5JDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2Vjb25kYXJ5JDtcblxuICAgIGlzT3BlbjogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIF9wYWdlSGVhZGVyU2VydmljZTogUGFnZUhlYWRlclNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2VsZWN0ZWQkLnN1YnNjcmliZShuZXh0ID0+IHtcblxuICAgICAgICAgICAgLy8gVXBkYXRlIHNlbGVjdGVkIHN0YXRlIGZvciB0aGlzIGl0ZW1cbiAgICAgICAgICAgIHRoaXMuX3BhZ2VIZWFkZXJTZXJ2aWNlLnVwZGF0ZUl0ZW0odGhpcy5pdGVtLCBuZXh0KTtcblxuICAgICAgICAgICAgaWYgKG5leHQgJiYgdGhpcy5pc09wZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgbWVudSB3YXMgY2xvc2VkLCBrZWVwIGZvY3VzIG9uIHRoZSB0b2dnbGUgYnV0dG9uXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b24uZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnUub25IaWRkZW4uc3Vic2NyaWJlKCgpID0+IHRoaXMuZHJvcGRvd25zLmZvckVhY2goZHJvcGRvd24gPT4gZHJvcGRvd24uY2xvc2UoKSkpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHNlbGVjdCgpIHtcblxuICAgICAgICAvLyBpZiB0aGUgaXRlbSBoYXMgY2hpbGRyZW4gdGhlbiBkbyBub3RoaW5nIGF0IHRoaXMgc3RhZ2VcbiAgICAgICAgaWYgKHRoaXMuaXRlbS5jaGlsZHJlbiAmJiB0aGlzLl9wYWdlSGVhZGVyU2VydmljZS5zZWNvbmRhcnkkLmdldFZhbHVlKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvdGhlcndpc2Ugc2VsZWN0IHRoZSBjdXJyZW50IGl0ZW1cbiAgICAgICAgdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2VsZWN0KHRoaXMuaXRlbSk7XG4gICAgfVxufSJdfQ==