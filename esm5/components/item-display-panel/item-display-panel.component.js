/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Directive, Input, Output, EventEmitter, ContentChild, ElementRef } from '@angular/core';
import { SidePanelComponent } from '../side-panel/side-panel.component';
import { SidePanelService } from '../side-panel/side-panel.service';
var ItemDisplayPanelContentDirective = (function () {
    function ItemDisplayPanelContentDirective() {
    }
    ItemDisplayPanelContentDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxItemDisplayPanelContent]'
                },] },
    ];
    /** @nocollapse */
    ItemDisplayPanelContentDirective.ctorParameters = function () { return []; };
    return ItemDisplayPanelContentDirective;
}());
export { ItemDisplayPanelContentDirective };
function ItemDisplayPanelContentDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ItemDisplayPanelContentDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ItemDisplayPanelContentDirective.ctorParameters;
}
var ItemDisplayPanelFooterDirective = (function () {
    function ItemDisplayPanelFooterDirective() {
    }
    ItemDisplayPanelFooterDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxItemDisplayPanelFooter]'
                },] },
    ];
    /** @nocollapse */
    ItemDisplayPanelFooterDirective.ctorParameters = function () { return []; };
    return ItemDisplayPanelFooterDirective;
}());
export { ItemDisplayPanelFooterDirective };
function ItemDisplayPanelFooterDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ItemDisplayPanelFooterDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ItemDisplayPanelFooterDirective.ctorParameters;
}
var ItemDisplayPanelComponent = (function (_super) {
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
                    template: "<div class=\"ux-side-panel-host ux-item-display-panel\"\n    [class.box-shadow]=\"boxShadow\"\n    [style.position]=\"position\"\n    [style.width]=\"hostWidth\"\n    [style.top]=\"cssTop\">\n\n    <div class=\"ux-side-panel-header\" [class.item-display-panel-shadow]=\"shadow\">\n        <h3>{{ header }}</h3>\n        <button *ngIf=\"closeVisible\" type=\"button\" class=\"btn btn-lg btn-link btn-icon button-secondary\" (click)=\"visible = false\">\n            <i class=\"hpe-icon hpe-close\"></i>\n        </button>\n    </div>\n\n    <div class=\"ux-side-panel-content\">\n        <ng-content select=\"[uxItemDisplayPanelContent]\"></ng-content>\n    </div>\n\n    <div class=\"ux-side-panel-footer\" *ngIf=\"footer\">\n        <ng-content select=\"[uxItemDisplayPanelFooter]\"></ng-content>\n    </div>\n\n</div>\n",
                    providers: [SidePanelService],
                    host: {
                        'class': 'ux-side-panel ux-item-display-panel'
                    }
                },] },
    ];
    /** @nocollapse */
    ItemDisplayPanelComponent.ctorParameters = function () { return [
        { type: SidePanelService, },
        { type: ElementRef, },
    ]; };
    ItemDisplayPanelComponent.propDecorators = {
        "header": [{ type: Input },],
        "boxShadow": [{ type: Input },],
        "closeVisible": [{ type: Input },],
        "preventClose": [{ type: Input },],
        "shadow": [{ type: Input },],
        "footer": [{ type: ContentChild, args: [ItemDisplayPanelFooterDirective,] },],
        "visibleChange": [{ type: Output },],
        "title": [{ type: Input },],
        "visible": [{ type: Input },],
    };
    return ItemDisplayPanelComponent;
}(SidePanelComponent));
export { ItemDisplayPanelComponent };
function ItemDisplayPanelComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ItemDisplayPanelComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ItemDisplayPanelComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ItemDisplayPanelComponent.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1kaXNwbGF5LXBhbmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2l0ZW0tZGlzcGxheS1wYW5lbC9pdGVtLWRpc3BsYXktcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1RyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7Ozs7Z0JBRW5FLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsNkJBQTZCO2lCQUMxQzs7OzsyQ0FQRDs7U0FRYSxnQ0FBZ0M7Ozs7Ozs7Ozs7Ozs7O2dCQUU1QyxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDRCQUE0QjtpQkFDekM7Ozs7MENBWkQ7O1NBYWEsK0JBQStCOzs7Ozs7Ozs7OztJQWdDRyxxREFBa0I7SUFpRDdELG1DQUFZLE9BQXlCLEVBQUUsVUFBc0I7UUFBN0QsWUFDSSxrQkFBTSxPQUFPLEVBQUUsVUFBVSxDQUFDLFNBSTdCOzBCQWxENkIsSUFBSTs2QkFFRCxJQUFJO3VCQVdWLEtBQUs7OEJBSWlCLElBQUksWUFBWSxFQUFXO1FBK0J4RSxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixLQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDOztLQUNwQztJQTlDRCxzQkFBSSxtREFBWTs7OztRQUFoQjtZQUNJLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztTQUNyQzs7Ozs7a0JBR2dCLEtBQWM7WUFDM0IsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsS0FBSyxDQUFDOzs7O09BSnRDOzBCQW9CRyw0Q0FBSzs7OztRQUlUO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDdEI7Ozs7Ozs7OztrQkFOUyxLQUFhO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOzs7OzswQkFRcEIsOENBQU87Ozs7UUFJWDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3BCOzs7OztrQkFOVyxPQUFnQjtZQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQzs7Ozs7Ozs7SUFnQnhCLDRDQUFROzs7SUFBUjtRQUFBLGlCQUlDO1FBSEcsSUFBSSxDQUFDLDZCQUE2QixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQUk7WUFDbkUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakMsQ0FBQyxDQUFDO0tBQ047Ozs7SUFFRCwrQ0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsNkJBQTZCLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEQ7O2dCQTlGSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFLHV6QkFzQmI7b0JBQ0csU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7b0JBQzdCLElBQUksRUFBRTt3QkFDRixPQUFPLEVBQUUscUNBQXFDO3FCQUNqRDtpQkFDSjs7OztnQkF6Q1EsZ0JBQWdCO2dCQUhpRCxVQUFVOzs7MkJBK0MvRSxLQUFLOzhCQUVMLEtBQUs7aUNBRUwsS0FBSztpQ0FNTCxLQUFLOzJCQUtMLEtBQUs7MkJBRUwsWUFBWSxTQUFDLCtCQUErQjtrQ0FFNUMsTUFBTTswQkFRTixLQUFLOzRCQVNMLEtBQUs7O29DQW5GVjtFQTZDK0Msa0JBQWtCO1NBQXBELHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XHJcbmltcG9ydCB7IFNpZGVQYW5lbENvbXBvbmVudCB9IGZyb20gJy4uL3NpZGUtcGFuZWwvc2lkZS1wYW5lbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTaWRlUGFuZWxTZXJ2aWNlIH0gZnJvbSAnLi4vc2lkZS1wYW5lbC9zaWRlLXBhbmVsLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1t1eEl0ZW1EaXNwbGF5UGFuZWxDb250ZW50XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEl0ZW1EaXNwbGF5UGFuZWxDb250ZW50RGlyZWN0aXZlIHsgfVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1t1eEl0ZW1EaXNwbGF5UGFuZWxGb290ZXJdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgSXRlbURpc3BsYXlQYW5lbEZvb3RlckRpcmVjdGl2ZSB7IH1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd1eC1pdGVtLWRpc3BsYXktcGFuZWwnLFxyXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidXgtc2lkZS1wYW5lbC1ob3N0IHV4LWl0ZW0tZGlzcGxheS1wYW5lbFwiXHJcbiAgICBbY2xhc3MuYm94LXNoYWRvd109XCJib3hTaGFkb3dcIlxyXG4gICAgW3N0eWxlLnBvc2l0aW9uXT1cInBvc2l0aW9uXCJcclxuICAgIFtzdHlsZS53aWR0aF09XCJob3N0V2lkdGhcIlxyXG4gICAgW3N0eWxlLnRvcF09XCJjc3NUb3BcIj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwidXgtc2lkZS1wYW5lbC1oZWFkZXJcIiBbY2xhc3MuaXRlbS1kaXNwbGF5LXBhbmVsLXNoYWRvd109XCJzaGFkb3dcIj5cclxuICAgICAgICA8aDM+e3sgaGVhZGVyIH19PC9oMz5cclxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiY2xvc2VWaXNpYmxlXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1sZyBidG4tbGluayBidG4taWNvbiBidXR0b24tc2Vjb25kYXJ5XCIgKGNsaWNrKT1cInZpc2libGUgPSBmYWxzZVwiPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImhwZS1pY29uIGhwZS1jbG9zZVwiPjwvaT5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJ1eC1zaWRlLXBhbmVsLWNvbnRlbnRcIj5cclxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbdXhJdGVtRGlzcGxheVBhbmVsQ29udGVudF1cIj48L25nLWNvbnRlbnQ+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwidXgtc2lkZS1wYW5lbC1mb290ZXJcIiAqbmdJZj1cImZvb3RlclwiPlxyXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlt1eEl0ZW1EaXNwbGF5UGFuZWxGb290ZXJdXCI+PC9uZy1jb250ZW50PlxyXG4gICAgPC9kaXY+XHJcblxyXG48L2Rpdj5cclxuYCxcclxuICAgIHByb3ZpZGVyczogW1NpZGVQYW5lbFNlcnZpY2VdLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICdjbGFzcyc6ICd1eC1zaWRlLXBhbmVsIHV4LWl0ZW0tZGlzcGxheS1wYW5lbCdcclxuICAgIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIEl0ZW1EaXNwbGF5UGFuZWxDb21wb25lbnQgZXh0ZW5kcyBTaWRlUGFuZWxDb21wb25lbnQge1xyXG5cclxuICAgIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGJveFNoYWRvdzogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgY2xvc2VWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBnZXQgcHJldmVudENsb3NlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5jbG9zZU9uRXh0ZXJuYWxDbGljaztcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IHByZXZlbnRDbG9zZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuY2xvc2VPbkV4dGVybmFsQ2xpY2sgPSAhdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc2hhZG93OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZChJdGVtRGlzcGxheVBhbmVsRm9vdGVyRGlyZWN0aXZlKSBmb290ZXI6IEl0ZW1EaXNwbGF5UGFuZWxGb290ZXJEaXJlY3RpdmU7XHJcblxyXG4gICAgQE91dHB1dCgpIHZpc2libGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXByZWNhdGVkXHJcbiAgICAgKiBUaXRsZSB1c2VkIGZvciBhZGRpbmcgdG9vbHRpcHMgYW5kIHNob3VsZG4ndCBiZSB1c2VkIGFzIGFuIGlucHV0XHJcbiAgICAgKiBpbnN0ZWFkIGhlYWRlciB3aWxsIGJlIHVzZWQuIFRoaXMgaXMgaGVyZSB0byBzdXBwb3J0IGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgb25seVxyXG4gICAgICogdGhpcyBwcm9wZXJ0eSBzaG91bGQgbm90IGJlIHVzZWQuXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgdGl0bGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaGVhZGVyID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRpdGxlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlYWRlcjtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IHZpc2libGUodmlzaWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMub3BlbiA9IHZpc2libGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZpc2libGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3BlbjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pdGVtRGlzcGxheVBhbmVsU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2VydmljZTogU2lkZVBhbmVsU2VydmljZSwgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xyXG4gICAgICAgIHN1cGVyKHNlcnZpY2UsIGVsZW1lbnRSZWYpO1xyXG5cclxuICAgICAgICB0aGlzLmFuaW1hdGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNsb3NlT25FeHRlcm5hbENsaWNrID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLl9pdGVtRGlzcGxheVBhbmVsU3Vic2NyaXB0aW9uID0gdGhpcy5zZXJ2aWNlLm9wZW4kLnN1YnNjcmliZSgobmV4dCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGVDaGFuZ2UuZW1pdChuZXh0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLl9pdGVtRGlzcGxheVBhbmVsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbn0iXX0=