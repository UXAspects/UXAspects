/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ColorService } from '../../services/color/index';
var SparkComponent = (function () {
    function SparkComponent(_colorService) {
        this._colorService = _colorService;
        this.values = [];
        this.barHeight = 10;
        this._theme = 'primary';
        this._barColor = [];
    }
    Object.defineProperty(SparkComponent.prototype, "theme", {
        get: /**
         * @return {?}
         */
        function () {
            return this._theme;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._theme = this._colorService.resolveColorName(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SparkComponent.prototype, "trackColor", {
        get: /**
         * @return {?}
         */
        function () {
            return this._trackColor;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._trackColor = this._colorService.resolve(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SparkComponent.prototype, "barColor", {
        get: /**
         * @return {?}
         */
        function () {
            return this._barColor;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (Array.isArray(value)) {
                this._barColor = value.map(function (color) { return _this._colorService.resolve(color); });
            }
            else {
                this._barColor = [this._colorService.resolve(value)];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SparkComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.values;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // ensure 'value' is an array at this point
            var /** @type {?} */ values = Array.isArray(value) ? value : [value];
            // get the total value of all lines
            var /** @type {?} */ total = Math.max(values.reduce(function (previous, current) { return previous + current; }, 0), 100);
            // figure out the percentages for each spark line
            this.values = values.map(function (val) { return (val / total) * 100; });
        },
        enumerable: true,
        configurable: true
    });
    SparkComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-spark',
                    template: "<!-- Inline Spark Chart -->\n<div *ngIf=\"inlineLabel\" class=\"ux-spark-inline-label-container\">\n\n    <div class=\"ux-spark-inline-label-left\" [innerHtml]=\"inlineLabel\"></div>\n\n    <div class=\"ux-spark-line\">\n\n        <div class=\"ux-spark-top-container\" *ngIf=\"topLeftLabel || topRightLabel\">\n            <div class=\"ux-spark-label-top-left\" *ngIf=\"topLeftLabel\" [innerHtml]=\"topLeftLabel\"></div>\n            <div class=\"ux-spark-label-top-right\" *ngIf=\"topRightLabel\" [innerHtml]=\"topRightLabel\"></div>\n        </div>\n\n        <div class=\"ux-spark ux-inline ux-spark-theme-{{theme}}\" [style.height.px]=\"barHeight\" [style.backgroundColor]=\"trackColor\" [uxTooltip]=\"tooltip\">\n            <div class=\"ux-spark-bar\" *ngFor=\"let line of values; let idx = index;\" [style.width.%]=\"line\" [style.backgroundColor]=\"barColor[idx]\"></div>\n        </div>\n\n        <div class=\"ux-spark-bottom-container\" *ngIf=\"bottomLeftLabel || bottomRightLabel\">\n            <div class=\"ux-spark-label-bottom-left\" *ngIf=\"bottomLeftLabel\" [innerHtml]=\"bottomLeftLabel\"></div>\n            <div class=\"ux-spark-label-bottom-right\" *ngIf=\"bottomRightLabel\" [innerHtml]=\"bottomRightLabel\"></div>\n        </div>\n\n    </div>\n</div>\n\n<!-- End Inline Spark Chart -->\n\n\n<!-- Non Inline Spark Chart -->\n<div *ngIf=\"!inlineLabel\">\n\n    <div class=\"ux-spark-top-container\" *ngIf=\"topLeftLabel || topRightLabel\">\n        <div class=\"ux-spark-label-top-left\" *ngIf=\"topLeftLabel\" [innerHtml]=\"topLeftLabel\"></div>\n        <div class=\"ux-spark-label-top-right\" *ngIf=\"topRightLabel\" [innerHtml]=\"topRightLabel\"></div>\n    </div>\n\n    <div class=\"ux-spark ux-spark-theme-{{theme}}\" [class.ux-spark-multi-value]=\"values.length > 1\" [style.height.px]=\"barHeight\" [style.backgroundColor]=\"trackColor\"\n        [uxTooltip]=\"tooltip\">\n        <div class=\"ux-spark-bar\" *ngFor=\"let line of value; let idx = index;\" [style.width.%]=\"line\" [style.backgroundColor]=\"barColor[idx]\"></div>\n    </div>\n\n    <div class=\"ux-spark-bottom-container\" *ngIf=\"bottomLeftLabel || bottomRightLabel\">\n        <div class=\"ux-spark-label-bottom-left\" *ngIf=\"bottomLeftLabel\" [innerHtml]=\"bottomLeftLabel\"></div>\n        <div class=\"ux-spark-label-bottom-right\" *ngIf=\"bottomRightLabel\" [innerHtml]=\"bottomRightLabel\"></div>\n    </div>\n</div>\n\n<!-- End Non Inline Spark Chart -->",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    SparkComponent.ctorParameters = function () { return [
        { type: ColorService, },
    ]; };
    SparkComponent.propDecorators = {
        "barHeight": [{ type: Input },],
        "inlineLabel": [{ type: Input },],
        "topLeftLabel": [{ type: Input },],
        "topRightLabel": [{ type: Input },],
        "bottomLeftLabel": [{ type: Input },],
        "bottomRightLabel": [{ type: Input },],
        "tooltip": [{ type: Input },],
        "theme": [{ type: Input },],
        "trackColor": [{ type: Input },],
        "barColor": [{ type: Input },],
        "value": [{ type: Input },],
    };
    return SparkComponent;
}());
export { SparkComponent };
function SparkComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SparkComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SparkComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    SparkComponent.propDecorators;
    /** @type {?} */
    SparkComponent.prototype.values;
    /** @type {?} */
    SparkComponent.prototype.barHeight;
    /** @type {?} */
    SparkComponent.prototype.inlineLabel;
    /** @type {?} */
    SparkComponent.prototype.topLeftLabel;
    /** @type {?} */
    SparkComponent.prototype.topRightLabel;
    /** @type {?} */
    SparkComponent.prototype.bottomLeftLabel;
    /** @type {?} */
    SparkComponent.prototype.bottomRightLabel;
    /** @type {?} */
    SparkComponent.prototype.tooltip;
    /** @type {?} */
    SparkComponent.prototype._trackColor;
    /** @type {?} */
    SparkComponent.prototype._theme;
    /** @type {?} */
    SparkComponent.prototype._barColor;
    /** @type {?} */
    SparkComponent.prototype._colorService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhcmsuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc3Bhcmsvc3BhcmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0lBdUh0RCx3QkFBb0IsYUFBMkI7UUFBM0Isa0JBQWEsR0FBYixhQUFhLENBQWM7c0JBL0Q1QixFQUFFO3lCQUVRLEVBQUU7c0JBU0csU0FBUzt5QkFDSixFQUFFO0tBbURXOzBCQWhEaEQsaUNBQUs7Ozs7UUFJVDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3RCOzs7OztrQkFOUyxLQUFhO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7MEJBUXpELHNDQUFVOzs7O1FBSWQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUMzQjs7Ozs7a0JBTmMsS0FBYTtZQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OzswQkFRckQsb0NBQVE7Ozs7UUFTWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3pCOzs7OztrQkFYWSxLQUF3Qjs7WUFFakMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFqQyxDQUFpQyxDQUFDLENBQUM7YUFDMUU7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUN4RDs7Ozs7MEJBUUQsaUNBQUs7Ozs7UUFZVDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3RCOzs7OztrQkFkUyxLQUF3Qjs7WUFHOUIscUJBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7O1lBR3RELHFCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQyxRQUFRLEVBQUUsT0FBTyxJQUFLLE9BQUEsUUFBUSxHQUFHLE9BQU8sRUFBbEIsQ0FBa0IsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQzs7WUFHekYsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxFQUFuQixDQUFtQixDQUFDLENBQUM7Ozs7OztnQkE3RzVELFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsUUFBUSxFQUFFLGk2RUE4Q3NCO29CQUNoQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDbEQ7Ozs7Z0JBckRRLFlBQVk7Ozs4QkEwRGhCLEtBQUs7Z0NBQ0wsS0FBSztpQ0FDTCxLQUFLO2tDQUNMLEtBQUs7b0NBQ0wsS0FBSztxQ0FDTCxLQUFLOzRCQUNMLEtBQUs7MEJBTUwsS0FBSzsrQkFTTCxLQUFLOzZCQVNMLEtBQUs7MEJBY0wsS0FBSzs7eUJBdkdWOztTQXVEYSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbG9yU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbG9yL2luZGV4JztcbmltcG9ydCB7IENvbG9ySWRlbnRpZmllciB9IGZyb20gJy4uLy4uL2luZGV4JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1zcGFyaycsXG4gICAgdGVtcGxhdGU6IGA8IS0tIElubGluZSBTcGFyayBDaGFydCAtLT5cbjxkaXYgKm5nSWY9XCJpbmxpbmVMYWJlbFwiIGNsYXNzPVwidXgtc3BhcmstaW5saW5lLWxhYmVsLWNvbnRhaW5lclwiPlxuXG4gICAgPGRpdiBjbGFzcz1cInV4LXNwYXJrLWlubGluZS1sYWJlbC1sZWZ0XCIgW2lubmVySHRtbF09XCJpbmxpbmVMYWJlbFwiPjwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInV4LXNwYXJrLWxpbmVcIj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwidXgtc3BhcmstdG9wLWNvbnRhaW5lclwiICpuZ0lmPVwidG9wTGVmdExhYmVsIHx8IHRvcFJpZ2h0TGFiZWxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1eC1zcGFyay1sYWJlbC10b3AtbGVmdFwiICpuZ0lmPVwidG9wTGVmdExhYmVsXCIgW2lubmVySHRtbF09XCJ0b3BMZWZ0TGFiZWxcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1eC1zcGFyay1sYWJlbC10b3AtcmlnaHRcIiAqbmdJZj1cInRvcFJpZ2h0TGFiZWxcIiBbaW5uZXJIdG1sXT1cInRvcFJpZ2h0TGFiZWxcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInV4LXNwYXJrIHV4LWlubGluZSB1eC1zcGFyay10aGVtZS17e3RoZW1lfX1cIiBbc3R5bGUuaGVpZ2h0LnB4XT1cImJhckhlaWdodFwiIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwidHJhY2tDb2xvclwiIFt1eFRvb2x0aXBdPVwidG9vbHRpcFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInV4LXNwYXJrLWJhclwiICpuZ0Zvcj1cImxldCBsaW5lIG9mIHZhbHVlczsgbGV0IGlkeCA9IGluZGV4O1wiIFtzdHlsZS53aWR0aC4lXT1cImxpbmVcIiBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cImJhckNvbG9yW2lkeF1cIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInV4LXNwYXJrLWJvdHRvbS1jb250YWluZXJcIiAqbmdJZj1cImJvdHRvbUxlZnRMYWJlbCB8fCBib3R0b21SaWdodExhYmVsXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidXgtc3BhcmstbGFiZWwtYm90dG9tLWxlZnRcIiAqbmdJZj1cImJvdHRvbUxlZnRMYWJlbFwiIFtpbm5lckh0bWxdPVwiYm90dG9tTGVmdExhYmVsXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidXgtc3BhcmstbGFiZWwtYm90dG9tLXJpZ2h0XCIgKm5nSWY9XCJib3R0b21SaWdodExhYmVsXCIgW2lubmVySHRtbF09XCJib3R0b21SaWdodExhYmVsXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPCEtLSBFbmQgSW5saW5lIFNwYXJrIENoYXJ0IC0tPlxuXG5cbjwhLS0gTm9uIElubGluZSBTcGFyayBDaGFydCAtLT5cbjxkaXYgKm5nSWY9XCIhaW5saW5lTGFiZWxcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJ1eC1zcGFyay10b3AtY29udGFpbmVyXCIgKm5nSWY9XCJ0b3BMZWZ0TGFiZWwgfHwgdG9wUmlnaHRMYWJlbFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidXgtc3BhcmstbGFiZWwtdG9wLWxlZnRcIiAqbmdJZj1cInRvcExlZnRMYWJlbFwiIFtpbm5lckh0bWxdPVwidG9wTGVmdExhYmVsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1eC1zcGFyay1sYWJlbC10b3AtcmlnaHRcIiAqbmdJZj1cInRvcFJpZ2h0TGFiZWxcIiBbaW5uZXJIdG1sXT1cInRvcFJpZ2h0TGFiZWxcIj48L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJ1eC1zcGFyayB1eC1zcGFyay10aGVtZS17e3RoZW1lfX1cIiBbY2xhc3MudXgtc3BhcmstbXVsdGktdmFsdWVdPVwidmFsdWVzLmxlbmd0aCA+IDFcIiBbc3R5bGUuaGVpZ2h0LnB4XT1cImJhckhlaWdodFwiIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwidHJhY2tDb2xvclwiXG4gICAgICAgIFt1eFRvb2x0aXBdPVwidG9vbHRpcFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidXgtc3BhcmstYmFyXCIgKm5nRm9yPVwibGV0IGxpbmUgb2YgdmFsdWU7IGxldCBpZHggPSBpbmRleDtcIiBbc3R5bGUud2lkdGguJV09XCJsaW5lXCIgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJiYXJDb2xvcltpZHhdXCI+PC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwidXgtc3BhcmstYm90dG9tLWNvbnRhaW5lclwiICpuZ0lmPVwiYm90dG9tTGVmdExhYmVsIHx8IGJvdHRvbVJpZ2h0TGFiZWxcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInV4LXNwYXJrLWxhYmVsLWJvdHRvbS1sZWZ0XCIgKm5nSWY9XCJib3R0b21MZWZ0TGFiZWxcIiBbaW5uZXJIdG1sXT1cImJvdHRvbUxlZnRMYWJlbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidXgtc3BhcmstbGFiZWwtYm90dG9tLXJpZ2h0XCIgKm5nSWY9XCJib3R0b21SaWdodExhYmVsXCIgW2lubmVySHRtbF09XCJib3R0b21SaWdodExhYmVsXCI+PC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPCEtLSBFbmQgTm9uIElubGluZSBTcGFyayBDaGFydCAtLT5gLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFNwYXJrQ29tcG9uZW50IHtcblxuICAgIHZhbHVlczogbnVtYmVyW10gPSBbXTtcblxuICAgIEBJbnB1dCgpIGJhckhlaWdodDogbnVtYmVyID0gMTA7XG4gICAgQElucHV0KCkgaW5saW5lTGFiZWw6IHN0cmluZztcbiAgICBASW5wdXQoKSB0b3BMZWZ0TGFiZWw6IHN0cmluZztcbiAgICBASW5wdXQoKSB0b3BSaWdodExhYmVsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgYm90dG9tTGVmdExhYmVsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgYm90dG9tUmlnaHRMYWJlbDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHRvb2x0aXA6IHN0cmluZztcblxuICAgIHByaXZhdGUgX3RyYWNrQ29sb3I6IHN0cmluZztcbiAgICBwcml2YXRlIF90aGVtZTogQ29sb3JJZGVudGlmaWVyID0gJ3ByaW1hcnknOyAgICBcbiAgICBwcml2YXRlIF9iYXJDb2xvcjogc3RyaW5nIHwgc3RyaW5nW10gPSBbXTtcbiAgICBcbiAgICBASW5wdXQoKSBcbiAgICBzZXQgdGhlbWUodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl90aGVtZSA9IHRoaXMuX2NvbG9yU2VydmljZS5yZXNvbHZlQ29sb3JOYW1lKHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXQgdGhlbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RoZW1lO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIFxuICAgIHNldCB0cmFja0NvbG9yKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fdHJhY2tDb2xvciA9IHRoaXMuX2NvbG9yU2VydmljZS5yZXNvbHZlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXQgdHJhY2tDb2xvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fdHJhY2tDb2xvcjtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBcbiAgICBzZXQgYmFyQ29sb3IodmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdKSB7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLl9iYXJDb2xvciA9IHZhbHVlLm1hcChjb2xvciA9PiB0aGlzLl9jb2xvclNlcnZpY2UucmVzb2x2ZShjb2xvcikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYmFyQ29sb3IgPSBbdGhpcy5fY29sb3JTZXJ2aWNlLnJlc29sdmUodmFsdWUpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBiYXJDb2xvcigpOiBzdHJpbmcgfCBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iYXJDb2xvcjtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCB2YWx1ZSh2YWx1ZTogbnVtYmVyIHwgbnVtYmVyW10pIHtcblxuICAgICAgICAvLyBlbnN1cmUgJ3ZhbHVlJyBpcyBhbiBhcnJheSBhdCB0aGlzIHBvaW50XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xuXG4gICAgICAgIC8vIGdldCB0aGUgdG90YWwgdmFsdWUgb2YgYWxsIGxpbmVzXG4gICAgICAgIGNvbnN0IHRvdGFsID0gTWF0aC5tYXgodmFsdWVzLnJlZHVjZSgocHJldmlvdXMsIGN1cnJlbnQpID0+IHByZXZpb3VzICsgY3VycmVudCwgMCksIDEwMCk7XG5cbiAgICAgICAgLy8gZmlndXJlIG91dCB0aGUgcGVyY2VudGFnZXMgZm9yIGVhY2ggc3BhcmsgbGluZVxuICAgICAgICB0aGlzLnZhbHVlcyA9IHZhbHVlcy5tYXAodmFsID0+ICh2YWwgLyB0b3RhbCkgKiAxMDApO1xuICAgIH1cblxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbG9yU2VydmljZTogQ29sb3JTZXJ2aWNlKSB7IH1cbn0iXX0=