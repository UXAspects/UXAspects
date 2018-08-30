/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, Directive, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
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
        this.service.open$.pipe(distinctUntilChanged(), takeUntil(this._onDestroy)).subscribe(function (isVisible) { return _this.visibleChange.emit(isVisible); });
    };
    /**
     * @return {?}
     */
    ItemDisplayPanelComponent.prototype.focus = /**
     * @return {?}
     */
    function () {
        if (this.panel) {
            this.panel.nativeElement.focus();
        }
    };
    ItemDisplayPanelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-item-display-panel',
                    template: "<div class=\"ux-side-panel-host ux-item-display-panel\" #panel\n    [class.box-shadow]=\"boxShadow\"\n    [style.position]=\"position\"\n    [style.width]=\"hostWidth\"\n    [style.top]=\"cssTop\"\n    [tabindex]=\"open ? 0 : -1\"\n    [focusIf]=\"open && focusOnShow\">\n\n    <div class=\"ux-side-panel-header\" [class.item-display-panel-shadow]=\"shadow\">\n        <h3>{{ header }}</h3>\n        <button *ngIf=\"closeVisible\" aria-label=\"Close\" i18n-aria-label type=\"button\" class=\"btn btn-lg btn-link btn-icon button-secondary\" (click)=\"visible = false\">\n            <i class=\"hpe-icon hpe-close\"></i>\n        </button>\n    </div>\n\n    <div class=\"ux-side-panel-content\">\n        <ng-content select=\"[uxItemDisplayPanelContent]\"></ng-content>\n    </div>\n\n    <div class=\"ux-side-panel-footer\" *ngIf=\"footer\">\n        <ng-content select=\"[uxItemDisplayPanelFooter]\"></ng-content>\n    </div>\n\n</div>\n",
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
        visibleChange: [{ type: Output }],
        footer: [{ type: ContentChild, args: [ItemDisplayPanelFooterDirective,] }],
        panel: [{ type: ViewChild, args: ['panel',] }],
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
    ItemDisplayPanelComponent.prototype.visibleChange;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype.footer;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype.panel;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1kaXNwbGF5LXBhbmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2l0ZW0tZGlzcGxheS1wYW5lbC9pdGVtLWRpc3BsYXktcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0gsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOzs7OztnQkFFbkUsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSw2QkFBNkI7aUJBQzFDOzsyQ0FQRDs7U0FRYSxnQ0FBZ0M7Ozs7O2dCQUU1QyxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDRCQUE0QjtpQkFDekM7OzBDQVpEOztTQWFhLCtCQUErQjs7SUFVRyxxREFBa0I7SUFnRDdELG1DQUFZLE9BQXlCLEVBQUUsVUFBc0I7UUFBN0QsWUFDSSxrQkFBTSxPQUFPLEVBQUUsVUFBVSxDQUFDLFNBSTdCOzBCQWpENkIsSUFBSTs2QkFFRCxJQUFJO3VCQVdWLEtBQUs7OEJBRWlCLElBQUksWUFBWSxFQUFXO1FBZ0N4RSxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixLQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDOztLQUNwQztJQTdDRCxzQkFBSSxtREFBWTs7OztRQUFoQjtZQUNJLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztTQUNyQzs7Ozs7UUFFRCxVQUNpQixLQUFjO1lBQzNCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLEtBQUssQ0FBQztTQUN0Qzs7O09BTEE7SUFvQkQsc0JBQ0ksNENBQUs7Ozs7UUFJVDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3RCO1FBYkQ7Ozs7O1dBS0c7Ozs7Ozs7OztRQUNILFVBQ1UsS0FBYTtZQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUN2Qjs7O09BQUE7SUFNRCxzQkFDSSw4Q0FBTzs7OztRQUlYO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDcEI7Ozs7O1FBUEQsVUFDWSxPQUFnQjtZQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztTQUN2Qjs7O09BQUE7Ozs7SUFhRCw0Q0FBUTs7O0lBQVI7UUFBQSxpQkFFQztRQURHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxTQUFTLElBQUksT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDO0tBQzFJOzs7O0lBRUQseUNBQUs7OztJQUFMO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNwQztLQUNKOztnQkF2RUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLHM3QkFBa0Q7b0JBQ2xELFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO29CQUM3QixJQUFJLEVBQUU7d0JBQ0YsT0FBTyxFQUFFLHFDQUFxQztxQkFDakQ7aUJBQ0o7Ozs7Z0JBbkJRLGdCQUFnQjtnQkFIb0IsVUFBVTs7O3lCQXlCbEQsS0FBSzs0QkFFTCxLQUFLOytCQUVMLEtBQUs7K0JBTUwsS0FBSzt5QkFLTCxLQUFLO2dDQUVMLE1BQU07eUJBRU4sWUFBWSxTQUFDLCtCQUErQjt3QkFDNUMsU0FBUyxTQUFDLE9BQU87d0JBUWpCLEtBQUs7MEJBU0wsS0FBSzs7b0NBOURWO0VBdUIrQyxrQkFBa0I7U0FBcEQseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFNpZGVQYW5lbENvbXBvbmVudCB9IGZyb20gJy4uL3NpZGUtcGFuZWwvc2lkZS1wYW5lbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2lkZVBhbmVsU2VydmljZSB9IGZyb20gJy4uL3NpZGUtcGFuZWwvc2lkZS1wYW5lbC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhJdGVtRGlzcGxheVBhbmVsQ29udGVudF0nXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1EaXNwbGF5UGFuZWxDb250ZW50RGlyZWN0aXZlIHsgfVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eEl0ZW1EaXNwbGF5UGFuZWxGb290ZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBJdGVtRGlzcGxheVBhbmVsRm9vdGVyRGlyZWN0aXZlIHsgfVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWl0ZW0tZGlzcGxheS1wYW5lbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2l0ZW0tZGlzcGxheS1wYW5lbC5jb21wb25lbnQuaHRtbCcsXG4gICAgcHJvdmlkZXJzOiBbU2lkZVBhbmVsU2VydmljZV0sXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAndXgtc2lkZS1wYW5lbCB1eC1pdGVtLWRpc3BsYXktcGFuZWwnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBJdGVtRGlzcGxheVBhbmVsQ29tcG9uZW50IGV4dGVuZHMgU2lkZVBhbmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYm94U2hhZG93OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGNsb3NlVmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBnZXQgcHJldmVudENsb3NlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuY2xvc2VPbkV4dGVybmFsQ2xpY2s7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgcHJldmVudENsb3NlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuY2xvc2VPbkV4dGVybmFsQ2xpY2sgPSAhdmFsdWU7XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2hhZG93OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgdmlzaWJsZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgQENvbnRlbnRDaGlsZChJdGVtRGlzcGxheVBhbmVsRm9vdGVyRGlyZWN0aXZlKSBmb290ZXI6IEl0ZW1EaXNwbGF5UGFuZWxGb290ZXJEaXJlY3RpdmU7XG4gICAgQFZpZXdDaGlsZCgncGFuZWwnKSBwYW5lbDogRWxlbWVudFJlZjtcblxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICogVGl0bGUgdXNlZCBmb3IgYWRkaW5nIHRvb2x0aXBzIGFuZCBzaG91bGRuJ3QgYmUgdXNlZCBhcyBhbiBpbnB1dFxuICAgICAqIGluc3RlYWQgaGVhZGVyIHdpbGwgYmUgdXNlZC4gVGhpcyBpcyBoZXJlIHRvIHN1cHBvcnQgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBvbmx5XG4gICAgICogdGhpcyBwcm9wZXJ0eSBzaG91bGQgbm90IGJlIHVzZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZXQgdGl0bGUodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmhlYWRlciA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCB0aXRsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhZGVyO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZpc2libGUodmlzaWJsZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLm9wZW4gPSB2aXNpYmxlO1xuICAgIH1cblxuICAgIGdldCB2aXNpYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVuO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2U6IFNpZGVQYW5lbFNlcnZpY2UsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoc2VydmljZSwgZWxlbWVudFJlZik7XG5cbiAgICAgICAgdGhpcy5hbmltYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2xvc2VPbkV4dGVybmFsQ2xpY2sgPSB0cnVlO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnNlcnZpY2Uub3BlbiQucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKGlzVmlzaWJsZSA9PiB0aGlzLnZpc2libGVDaGFuZ2UuZW1pdChpc1Zpc2libGUpKTtcbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucGFuZWwpIHtcbiAgICAgICAgICAgIHRoaXMucGFuZWwubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==