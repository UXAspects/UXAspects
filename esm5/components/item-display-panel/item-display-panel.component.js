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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1kaXNwbGF5LXBhbmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2l0ZW0tZGlzcGxheS1wYW5lbC9pdGVtLWRpc3BsYXktcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1RyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7Ozs7Z0JBRW5FLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsNkJBQTZCO2lCQUMxQzs7MkNBUEQ7O1NBUWEsZ0NBQWdDOzs7Ozs7Ozs7Ozs7OztnQkFFNUMsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSw0QkFBNEI7aUJBQ3pDOzswQ0FaRDs7U0FhYSwrQkFBK0I7Ozs7Ozs7Ozs7O0lBZ0NHLHFEQUFrQjtJQWlEN0QsbUNBQVksT0FBeUIsRUFBRSxVQUFzQjtRQUE3RCxZQUNJLGtCQUFNLE9BQU8sRUFBRSxVQUFVLENBQUMsU0FJN0I7MEJBbEQ2QixJQUFJOzZCQUVELElBQUk7dUJBV1YsS0FBSzs4QkFJaUIsSUFBSSxZQUFZLEVBQVc7UUErQnhFLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7O0tBQ3BDO0lBOUNELHNCQUFJLG1EQUFZOzs7O1FBQWhCO1lBQ0ksTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1NBQ3JDOzs7OztrQkFHZ0IsS0FBYztZQUMzQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxLQUFLLENBQUM7Ozs7T0FKdEM7MEJBb0JHLDRDQUFLOzs7O1FBSVQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUN0Qjs7Ozs7Ozs7O2tCQU5TLEtBQWE7WUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Ozs7OzBCQVFwQiw4Q0FBTzs7OztRQUlYO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDcEI7Ozs7O2tCQU5XLE9BQWdCO1lBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDOzs7Ozs7OztJQWdCeEIsNENBQVE7OztJQUFSO1FBQUEsaUJBSUM7UUFIRyxJQUFJLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSTtZQUNuRSxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQyxDQUFDLENBQUM7S0FDTjs7OztJQUVELCtDQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwRDs7Z0JBOUZKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxRQUFRLEVBQUUsdXpCQXNCYjtvQkFDRyxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDN0IsSUFBSSxFQUFFO3dCQUNGLE9BQU8sRUFBRSxxQ0FBcUM7cUJBQ2pEO2lCQUNKOzs7O2dCQXpDUSxnQkFBZ0I7Z0JBSGlELFVBQVU7OzsyQkErQy9FLEtBQUs7OEJBRUwsS0FBSztpQ0FFTCxLQUFLO2lDQU1MLEtBQUs7MkJBS0wsS0FBSzsyQkFFTCxZQUFZLFNBQUMsK0JBQStCO2tDQUU1QyxNQUFNOzBCQVFOLEtBQUs7NEJBU0wsS0FBSzs7b0NBbkZWO0VBNkMrQyxrQkFBa0I7U0FBcEQseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBEaXJlY3RpdmUsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29udGVudENoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBTaWRlUGFuZWxDb21wb25lbnQgfSBmcm9tICcuLi9zaWRlLXBhbmVsL3NpZGUtcGFuZWwuY29tcG9uZW50JztcbmltcG9ydCB7IFNpZGVQYW5lbFNlcnZpY2UgfSBmcm9tICcuLi9zaWRlLXBhbmVsL3NpZGUtcGFuZWwuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4SXRlbURpc3BsYXlQYW5lbENvbnRlbnRdJ1xufSlcbmV4cG9ydCBjbGFzcyBJdGVtRGlzcGxheVBhbmVsQ29udGVudERpcmVjdGl2ZSB7IH1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhJdGVtRGlzcGxheVBhbmVsRm9vdGVyXSdcbn0pXG5leHBvcnQgY2xhc3MgSXRlbURpc3BsYXlQYW5lbEZvb3RlckRpcmVjdGl2ZSB7IH1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1pdGVtLWRpc3BsYXktcGFuZWwnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInV4LXNpZGUtcGFuZWwtaG9zdCB1eC1pdGVtLWRpc3BsYXktcGFuZWxcIlxuICAgIFtjbGFzcy5ib3gtc2hhZG93XT1cImJveFNoYWRvd1wiXG4gICAgW3N0eWxlLnBvc2l0aW9uXT1cInBvc2l0aW9uXCJcbiAgICBbc3R5bGUud2lkdGhdPVwiaG9zdFdpZHRoXCJcbiAgICBbc3R5bGUudG9wXT1cImNzc1RvcFwiPlxuXG4gICAgPGRpdiBjbGFzcz1cInV4LXNpZGUtcGFuZWwtaGVhZGVyXCIgW2NsYXNzLml0ZW0tZGlzcGxheS1wYW5lbC1zaGFkb3ddPVwic2hhZG93XCI+XG4gICAgICAgIDxoMz57eyBoZWFkZXIgfX08L2gzPlxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiY2xvc2VWaXNpYmxlXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1sZyBidG4tbGluayBidG4taWNvbiBidXR0b24tc2Vjb25kYXJ5XCIgKGNsaWNrKT1cInZpc2libGUgPSBmYWxzZVwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJocGUtaWNvbiBocGUtY2xvc2VcIj48L2k+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInV4LXNpZGUtcGFuZWwtY29udGVudFwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbdXhJdGVtRGlzcGxheVBhbmVsQ29udGVudF1cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwidXgtc2lkZS1wYW5lbC1mb290ZXJcIiAqbmdJZj1cImZvb3RlclwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbdXhJdGVtRGlzcGxheVBhbmVsRm9vdGVyXVwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cblxuPC9kaXY+XG5gLFxuICAgIHByb3ZpZGVyczogW1NpZGVQYW5lbFNlcnZpY2VdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2NsYXNzJzogJ3V4LXNpZGUtcGFuZWwgdXgtaXRlbS1kaXNwbGF5LXBhbmVsJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgSXRlbURpc3BsYXlQYW5lbENvbXBvbmVudCBleHRlbmRzIFNpZGVQYW5lbENvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGJveFNoYWRvdzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBjbG9zZVZpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgZ2V0IHByZXZlbnRDbG9zZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmNsb3NlT25FeHRlcm5hbENsaWNrO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHByZXZlbnRDbG9zZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmNsb3NlT25FeHRlcm5hbENsaWNrID0gIXZhbHVlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHNoYWRvdzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQENvbnRlbnRDaGlsZChJdGVtRGlzcGxheVBhbmVsRm9vdGVyRGlyZWN0aXZlKSBmb290ZXI6IEl0ZW1EaXNwbGF5UGFuZWxGb290ZXJEaXJlY3RpdmU7XG5cbiAgICBAT3V0cHV0KCkgdmlzaWJsZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWRcbiAgICAgKiBUaXRsZSB1c2VkIGZvciBhZGRpbmcgdG9vbHRpcHMgYW5kIHNob3VsZG4ndCBiZSB1c2VkIGFzIGFuIGlucHV0XG4gICAgICogaW5zdGVhZCBoZWFkZXIgd2lsbCBiZSB1c2VkLiBUaGlzIGlzIGhlcmUgdG8gc3VwcG9ydCBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IG9ubHlcbiAgICAgKiB0aGlzIHByb3BlcnR5IHNob3VsZCBub3QgYmUgdXNlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNldCB0aXRsZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHRpdGxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oZWFkZXI7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgdmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMub3BlbiA9IHZpc2libGU7XG4gICAgfVxuXG4gICAgZ2V0IHZpc2libGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXRlbURpc3BsYXlQYW5lbFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3Ioc2VydmljZTogU2lkZVBhbmVsU2VydmljZSwgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihzZXJ2aWNlLCBlbGVtZW50UmVmKTtcblxuICAgICAgICB0aGlzLmFuaW1hdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jbG9zZU9uRXh0ZXJuYWxDbGljayA9IHRydWU7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX2l0ZW1EaXNwbGF5UGFuZWxTdWJzY3JpcHRpb24gPSB0aGlzLnNlcnZpY2Uub3BlbiQuc3Vic2NyaWJlKChuZXh0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpc2libGVDaGFuZ2UuZW1pdChuZXh0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX2l0ZW1EaXNwbGF5UGFuZWxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG59Il19