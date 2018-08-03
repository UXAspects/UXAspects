/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Directive, Input, Output, EventEmitter, ContentChild, ElementRef } from '@angular/core';
import { SidePanelComponent } from '../side-panel/side-panel.component';
import { SidePanelService } from '../side-panel/side-panel.service';
var ItemDisplayPanelContentDirective = /** @class */ (function () {
    function ItemDisplayPanelContentDirective() {
    }
    ItemDisplayPanelContentDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxItemDisplayPanelContent]'
                },] }
    ];
    return ItemDisplayPanelContentDirective;
}());
export { ItemDisplayPanelContentDirective };
var ItemDisplayPanelFooterDirective = /** @class */ (function () {
    function ItemDisplayPanelFooterDirective() {
    }
    ItemDisplayPanelFooterDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxItemDisplayPanelFooter]'
                },] }
    ];
    return ItemDisplayPanelFooterDirective;
}());
export { ItemDisplayPanelFooterDirective };
var ItemDisplayPanelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ItemDisplayPanelComponent, _super);
    function ItemDisplayPanelComponent(service, elementRef) {
        var _this = _super.call(this, service, elementRef) || this;
        _this.boxShadow = true;
        _this.closeVisible = true;
        _this.shadow = false;
        _this.visibleChange = new EventEmitter();
        _this.animate = false;
        _this.closeOnExternalClick = true;
        return _this;
    }
    Object.defineProperty(ItemDisplayPanelComponent.prototype, "preventClose", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.closeOnExternalClick;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.closeOnExternalClick = !value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemDisplayPanelComponent.prototype, "title", {
        get: /**
         * @return {?}
         */
        function () {
            return this.header;
        },
        /**
         * @deprecated
         * Title used for adding tooltips and shouldn't be used as an input
         * instead header will be used. This is here to support backward compatibility only
         * this property should not be used.
         */
        set: /**
         * @deprecated
         * Title used for adding tooltips and shouldn't be used as an input
         * instead header will be used. This is here to support backward compatibility only
         * this property should not be used.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.header = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemDisplayPanelComponent.prototype, "visible", {
        get: /**
         * @return {?}
         */
        function () {
            return this.open;
        },
        set: /**
         * @param {?} visible
         * @return {?}
         */
        function (visible) {
            this.open = visible;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ItemDisplayPanelComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._itemDisplayPanelSubscription = this.service.open$.subscribe(function (next) {
            _this.visibleChange.emit(next);
        });
    };
    /**
     * @return {?}
     */
    ItemDisplayPanelComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._itemDisplayPanelSubscription.unsubscribe();
    };
    ItemDisplayPanelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-item-display-panel',
                    template: "<div class=\"ux-side-panel-host ux-item-display-panel\"\r\n    [class.box-shadow]=\"boxShadow\"\r\n    [style.position]=\"position\"\r\n    [style.width]=\"hostWidth\"\r\n    [style.top]=\"cssTop\">\r\n\r\n    <div class=\"ux-side-panel-header\" [class.item-display-panel-shadow]=\"shadow\">\r\n        <h3>{{ header }}</h3>\r\n        <button *ngIf=\"closeVisible\" type=\"button\" class=\"btn btn-lg btn-link btn-icon button-secondary\" (click)=\"visible = false\">\r\n            <i class=\"hpe-icon hpe-close\"></i>\r\n        </button>\r\n    </div>\r\n\r\n    <div class=\"ux-side-panel-content\">\r\n        <ng-content select=\"[uxItemDisplayPanelContent]\"></ng-content>\r\n    </div>\r\n\r\n    <div class=\"ux-side-panel-footer\" *ngIf=\"footer\">\r\n        <ng-content select=\"[uxItemDisplayPanelFooter]\"></ng-content>\r\n    </div>\r\n\r\n</div>\r\n",
                    providers: [SidePanelService],
                    host: {
                        'class': 'ux-side-panel ux-item-display-panel'
                    }
                }] }
    ];
    /** @nocollapse */
    ItemDisplayPanelComponent.ctorParameters = function () { return [
        { type: SidePanelService },
        { type: ElementRef }
    ]; };
    ItemDisplayPanelComponent.propDecorators = {
        header: [{ type: Input }],
        boxShadow: [{ type: Input }],
        closeVisible: [{ type: Input }],
        preventClose: [{ type: Input }],
        shadow: [{ type: Input }],
        footer: [{ type: ContentChild, args: [ItemDisplayPanelFooterDirective,] }],
        visibleChange: [{ type: Output }],
        title: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return ItemDisplayPanelComponent;
}(SidePanelComponent));
export { ItemDisplayPanelComponent };
function ItemDisplayPanelComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ItemDisplayPanelComponent.prototype.header;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype.boxShadow;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype.closeVisible;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype.shadow;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype.footer;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype.visibleChange;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype._itemDisplayPanelSubscription;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1kaXNwbGF5LXBhbmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2l0ZW0tZGlzcGxheS1wYW5lbC9pdGVtLWRpc3BsYXktcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1RyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7Ozs7Z0JBRW5FLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsNkJBQTZCO2lCQUMxQzs7MkNBUEQ7O1NBUWEsZ0NBQWdDOzs7OztnQkFFNUMsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSw0QkFBNEI7aUJBQ3pDOzswQ0FaRDs7U0FhYSwrQkFBK0I7O0lBVUcscURBQWtCO0lBaUQ3RCxtQ0FBWSxPQUF5QixFQUFFLFVBQXNCO1FBQTdELFlBQ0ksa0JBQU0sT0FBTyxFQUFFLFVBQVUsQ0FBQyxTQUk3QjswQkFsRDZCLElBQUk7NkJBRUQsSUFBSTt1QkFXVixLQUFLOzhCQUlpQixJQUFJLFlBQVksRUFBVztRQStCeEUsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsS0FBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQzs7S0FDcEM7SUE5Q0Qsc0JBQUksbURBQVk7Ozs7UUFBaEI7WUFDSSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUM7U0FDckM7Ozs7O1FBRUQsVUFDaUIsS0FBYztZQUMzQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxLQUFLLENBQUM7U0FDdEM7OztPQUxBO0lBbUJELHNCQUNJLDRDQUFLOzs7O1FBSVQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUN0QjtRQWJEOzs7OztXQUtHOzs7Ozs7Ozs7UUFDSCxVQUNVLEtBQWE7WUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDdkI7OztPQUFBO0lBTUQsc0JBQ0ksOENBQU87Ozs7UUFJWDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3BCOzs7OztRQVBELFVBQ1ksT0FBZ0I7WUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7U0FDdkI7OztPQUFBOzs7O0lBZUQsNENBQVE7OztJQUFSO1FBQUEsaUJBSUM7UUFIRyxJQUFJLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSTtZQUNuRSxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQyxDQUFDLENBQUM7S0FDTjs7OztJQUVELCtDQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwRDs7Z0JBeEVKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyw2MkJBQWtEO29CQUNsRCxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDN0IsSUFBSSxFQUFFO3dCQUNGLE9BQU8sRUFBRSxxQ0FBcUM7cUJBQ2pEO2lCQUNKOzs7O2dCQW5CUSxnQkFBZ0I7Z0JBSGlELFVBQVU7Ozt5QkF5Qi9FLEtBQUs7NEJBRUwsS0FBSzsrQkFFTCxLQUFLOytCQU1MLEtBQUs7eUJBS0wsS0FBSzt5QkFFTCxZQUFZLFNBQUMsK0JBQStCO2dDQUU1QyxNQUFNO3dCQVFOLEtBQUs7MEJBU0wsS0FBSzs7b0NBN0RWO0VBdUIrQyxrQkFBa0I7U0FBcEQseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBEaXJlY3RpdmUsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29udGVudENoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcclxuaW1wb3J0IHsgU2lkZVBhbmVsQ29tcG9uZW50IH0gZnJvbSAnLi4vc2lkZS1wYW5lbC9zaWRlLXBhbmVsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNpZGVQYW5lbFNlcnZpY2UgfSBmcm9tICcuLi9zaWRlLXBhbmVsL3NpZGUtcGFuZWwuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3V4SXRlbURpc3BsYXlQYW5lbENvbnRlbnRdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgSXRlbURpc3BsYXlQYW5lbENvbnRlbnREaXJlY3RpdmUgeyB9XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3V4SXRlbURpc3BsYXlQYW5lbEZvb3Rlcl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJdGVtRGlzcGxheVBhbmVsRm9vdGVyRGlyZWN0aXZlIHsgfVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3V4LWl0ZW0tZGlzcGxheS1wYW5lbCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vaXRlbS1kaXNwbGF5LXBhbmVsLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHByb3ZpZGVyczogW1NpZGVQYW5lbFNlcnZpY2VdLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICdjbGFzcyc6ICd1eC1zaWRlLXBhbmVsIHV4LWl0ZW0tZGlzcGxheS1wYW5lbCdcclxuICAgIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIEl0ZW1EaXNwbGF5UGFuZWxDb21wb25lbnQgZXh0ZW5kcyBTaWRlUGFuZWxDb21wb25lbnQge1xyXG5cclxuICAgIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGJveFNoYWRvdzogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgY2xvc2VWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBnZXQgcHJldmVudENsb3NlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5jbG9zZU9uRXh0ZXJuYWxDbGljaztcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IHByZXZlbnRDbG9zZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuY2xvc2VPbkV4dGVybmFsQ2xpY2sgPSAhdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc2hhZG93OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZChJdGVtRGlzcGxheVBhbmVsRm9vdGVyRGlyZWN0aXZlKSBmb290ZXI6IEl0ZW1EaXNwbGF5UGFuZWxGb290ZXJEaXJlY3RpdmU7XHJcblxyXG4gICAgQE91dHB1dCgpIHZpc2libGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXByZWNhdGVkXHJcbiAgICAgKiBUaXRsZSB1c2VkIGZvciBhZGRpbmcgdG9vbHRpcHMgYW5kIHNob3VsZG4ndCBiZSB1c2VkIGFzIGFuIGlucHV0XHJcbiAgICAgKiBpbnN0ZWFkIGhlYWRlciB3aWxsIGJlIHVzZWQuIFRoaXMgaXMgaGVyZSB0byBzdXBwb3J0IGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgb25seVxyXG4gICAgICogdGhpcyBwcm9wZXJ0eSBzaG91bGQgbm90IGJlIHVzZWQuXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgdGl0bGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaGVhZGVyID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRpdGxlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlYWRlcjtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IHZpc2libGUodmlzaWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMub3BlbiA9IHZpc2libGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZpc2libGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3BlbjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pdGVtRGlzcGxheVBhbmVsU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2VydmljZTogU2lkZVBhbmVsU2VydmljZSwgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xyXG4gICAgICAgIHN1cGVyKHNlcnZpY2UsIGVsZW1lbnRSZWYpO1xyXG5cclxuICAgICAgICB0aGlzLmFuaW1hdGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNsb3NlT25FeHRlcm5hbENsaWNrID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLl9pdGVtRGlzcGxheVBhbmVsU3Vic2NyaXB0aW9uID0gdGhpcy5zZXJ2aWNlLm9wZW4kLnN1YnNjcmliZSgobmV4dCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGVDaGFuZ2UuZW1pdChuZXh0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLl9pdGVtRGlzcGxheVBhbmVsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbn0iXX0=