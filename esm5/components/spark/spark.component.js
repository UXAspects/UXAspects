/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ColorService } from '../../services/color/index';
var SparkComponent = /** @class */ (function () {
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
                    template: "<!-- Inline Spark Chart -->\n<div *ngIf=\"inlineLabel\" class=\"ux-spark-inline-label-container\">\n\n    <div class=\"ux-spark-inline-label-left\" [innerHtml]=\"inlineLabel\"></div>\n\n    <div class=\"ux-spark-line\">\n\n        <div class=\"ux-spark-top-container\" *ngIf=\"topLeftLabel || topRightLabel\">\n            <div class=\"ux-spark-label-top-left\" *ngIf=\"topLeftLabel\" [innerHtml]=\"topLeftLabel\"></div>\n            <div class=\"ux-spark-label-top-right\" *ngIf=\"topRightLabel\" [innerHtml]=\"topRightLabel\"></div>\n        </div>\n\n        <div role=\"progressbar\"\n            [attr.aria-label]=\"ariaLabel || tooltip\"\n            [attr.aria-description]=\"ariaDescription\"\n            aria-valuemin=\"0\"\n            aria-valuemax=\"100\"\n            [attr.aria-valuenow]=\"values.length === 1 ? values[0] : undefined\"\n            class=\"ux-spark ux-inline ux-spark-theme-{{theme}}\"\n            [style.height.px]=\"barHeight\"\n            [style.backgroundColor]=\"trackColor\"\n            [uxTooltip]=\"tooltip\">\n            <div class=\"ux-spark-bar\" *ngFor=\"let line of values; let idx = index;\" [style.width.%]=\"line\" [style.backgroundColor]=\"barColor[idx]\"></div>\n        </div>\n\n        <div class=\"ux-spark-bottom-container\" *ngIf=\"bottomLeftLabel || bottomRightLabel\">\n            <div class=\"ux-spark-label-bottom-left\" *ngIf=\"bottomLeftLabel\" [innerHtml]=\"bottomLeftLabel\"></div>\n            <div class=\"ux-spark-label-bottom-right\" *ngIf=\"bottomRightLabel\" [innerHtml]=\"bottomRightLabel\"></div>\n        </div>\n\n    </div>\n</div>\n\n<!-- End Inline Spark Chart -->\n\n\n<!-- Non Inline Spark Chart -->\n<div *ngIf=\"!inlineLabel\" [attr.aria-label]=\"ariaLabel\" [attr.aria-description]=\"ariaDescription\">\n\n    <div class=\"ux-spark-top-container\" *ngIf=\"topLeftLabel || topRightLabel\">\n        <div class=\"ux-spark-label-top-left\" *ngIf=\"topLeftLabel\" [innerHtml]=\"topLeftLabel\"></div>\n        <div class=\"ux-spark-label-top-right\" *ngIf=\"topRightLabel\" [innerHtml]=\"topRightLabel\"></div>\n    </div>\n\n    <div role=\"progressbar\"\n        [attr.aria-label]=\"ariaLabel || tooltip\"\n        [attr.aria-description]=\"ariaDescription\"\n        aria-valuemin=\"0\"\n        aria-valuemax=\"100\"\n        [attr.aria-valuenow]=\"values.length === 1 ? values[0] : undefined\"\n        class=\"ux-spark ux-spark-theme-{{theme}}\"\n        [class.ux-spark-multi-value]=\"values.length > 1\"\n        [style.height.px]=\"barHeight\"\n        [style.backgroundColor]=\"trackColor\"\n        [uxTooltip]=\"tooltip\">\n        <div class=\"ux-spark-bar\" *ngFor=\"let line of value; let idx = index;\" [style.width.%]=\"line\" [style.backgroundColor]=\"barColor[idx]\"></div>\n    </div>\n\n    <div class=\"ux-spark-bottom-container\" *ngIf=\"bottomLeftLabel || bottomRightLabel\">\n        <div class=\"ux-spark-label-bottom-left\" *ngIf=\"bottomLeftLabel\" [innerHtml]=\"bottomLeftLabel\"></div>\n        <div class=\"ux-spark-label-bottom-right\" *ngIf=\"bottomRightLabel\" [innerHtml]=\"bottomRightLabel\"></div>\n    </div>\n</div>\n\n<!-- End Non Inline Spark Chart -->",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    SparkComponent.ctorParameters = function () { return [
        { type: ColorService }
    ]; };
    SparkComponent.propDecorators = {
        barHeight: [{ type: Input }],
        inlineLabel: [{ type: Input }],
        topLeftLabel: [{ type: Input }],
        topRightLabel: [{ type: Input }],
        bottomLeftLabel: [{ type: Input }],
        bottomRightLabel: [{ type: Input }],
        tooltip: [{ type: Input }],
        ariaLabel: [{ type: Input, args: ['aria-label',] }],
        ariaDescription: [{ type: Input, args: ['aria-description',] }],
        theme: [{ type: Input }],
        trackColor: [{ type: Input }],
        barColor: [{ type: Input }],
        value: [{ type: Input }]
    };
    return SparkComponent;
}());
export { SparkComponent };
function SparkComponent_tsickle_Closure_declarations() {
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
    SparkComponent.prototype.ariaLabel;
    /** @type {?} */
    SparkComponent.prototype.ariaDescription;
    /** @type {?} */
    SparkComponent.prototype._trackColor;
    /** @type {?} */
    SparkComponent.prototype._theme;
    /** @type {?} */
    SparkComponent.prototype._barColor;
    /** @type {?} */
    SparkComponent.prototype._colorService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhcmsuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc3Bhcmsvc3BhcmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0lBMkV0RCx3QkFBb0IsYUFBMkI7UUFBM0Isa0JBQWEsR0FBYixhQUFhLENBQWM7c0JBakU1QixFQUFFO3lCQUVRLEVBQUU7c0JBV0csU0FBUzt5QkFDSixFQUFFO0tBbURXO0lBakRwRCxzQkFDSSxpQ0FBSzs7OztRQUlUO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDdEI7Ozs7O1FBUEQsVUFDVSxLQUFhO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1RDs7O09BQUE7SUFNRCxzQkFDSSxzQ0FBVTs7OztRQUlkO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDM0I7Ozs7O1FBUEQsVUFDZSxLQUFhO1lBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEQ7OztPQUFBO0lBTUQsc0JBQ0ksb0NBQVE7Ozs7UUFTWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3pCOzs7OztRQVpELFVBQ2EsS0FBd0I7WUFEckMsaUJBUUM7WUFMRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQzthQUMxRTtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3hEO1NBQ0o7OztPQUFBO0lBTUQsc0JBQ0ksaUNBQUs7Ozs7UUFZVDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3RCOzs7OztRQWZELFVBQ1UsS0FBd0I7O1lBRzlCLHFCQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7O1lBR3RELHFCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQyxRQUFRLEVBQUUsT0FBTyxJQUFLLE9BQUEsUUFBUSxHQUFHLE9BQU8sRUFBbEIsQ0FBa0IsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQzs7WUFHekYsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxFQUFuQixDQUFtQixDQUFDLENBQUM7U0FDeEQ7OztPQUFBOztnQkFsRUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxVQUFVO29CQUNwQixtbkdBQXFDO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDbEQ7Ozs7Z0JBUFEsWUFBWTs7OzRCQVloQixLQUFLOzhCQUNMLEtBQUs7K0JBQ0wsS0FBSztnQ0FDTCxLQUFLO2tDQUNMLEtBQUs7bUNBQ0wsS0FBSzswQkFDTCxLQUFLOzRCQUNMLEtBQUssU0FBQyxZQUFZO2tDQUNsQixLQUFLLFNBQUMsa0JBQWtCO3dCQU14QixLQUFLOzZCQVNMLEtBQUs7MkJBU0wsS0FBSzt3QkFjTCxLQUFLOzt5QkEzRFY7O1NBU2EsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb2xvclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb2xvci9pbmRleCc7XG5pbXBvcnQgeyBDb2xvcklkZW50aWZpZXIgfSBmcm9tICcuLi8uLi9pbmRleCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtc3BhcmsnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zcGFyay5jb21wb25lbnQuaHRtbCcsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgU3BhcmtDb21wb25lbnQge1xuXG4gICAgdmFsdWVzOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgQElucHV0KCkgYmFySGVpZ2h0OiBudW1iZXIgPSAxMDtcbiAgICBASW5wdXQoKSBpbmxpbmVMYWJlbDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHRvcExlZnRMYWJlbDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHRvcFJpZ2h0TGFiZWw6IHN0cmluZztcbiAgICBASW5wdXQoKSBib3R0b21MZWZ0TGFiZWw6IHN0cmluZztcbiAgICBASW5wdXQoKSBib3R0b21SaWdodExhYmVsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgdG9vbHRpcDogc3RyaW5nO1xuICAgIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nO1xuICAgIEBJbnB1dCgnYXJpYS1kZXNjcmlwdGlvbicpIGFyaWFEZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBfdHJhY2tDb2xvcjogc3RyaW5nO1xuICAgIHByaXZhdGUgX3RoZW1lOiBDb2xvcklkZW50aWZpZXIgPSAncHJpbWFyeSc7XG4gICAgcHJpdmF0ZSBfYmFyQ29sb3I6IHN0cmluZyB8IHN0cmluZ1tdID0gW107XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCB0aGVtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3RoZW1lID0gdGhpcy5fY29sb3JTZXJ2aWNlLnJlc29sdmVDb2xvck5hbWUodmFsdWUpO1xuICAgIH1cblxuICAgIGdldCB0aGVtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGhlbWU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgdHJhY2tDb2xvcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3RyYWNrQ29sb3IgPSB0aGlzLl9jb2xvclNlcnZpY2UucmVzb2x2ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0IHRyYWNrQ29sb3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYWNrQ29sb3I7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgYmFyQ29sb3IodmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdKSB7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLl9iYXJDb2xvciA9IHZhbHVlLm1hcChjb2xvciA9PiB0aGlzLl9jb2xvclNlcnZpY2UucmVzb2x2ZShjb2xvcikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYmFyQ29sb3IgPSBbdGhpcy5fY29sb3JTZXJ2aWNlLnJlc29sdmUodmFsdWUpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBiYXJDb2xvcigpOiBzdHJpbmcgfCBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iYXJDb2xvcjtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCB2YWx1ZSh2YWx1ZTogbnVtYmVyIHwgbnVtYmVyW10pIHtcblxuICAgICAgICAvLyBlbnN1cmUgJ3ZhbHVlJyBpcyBhbiBhcnJheSBhdCB0aGlzIHBvaW50XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xuXG4gICAgICAgIC8vIGdldCB0aGUgdG90YWwgdmFsdWUgb2YgYWxsIGxpbmVzXG4gICAgICAgIGNvbnN0IHRvdGFsID0gTWF0aC5tYXgodmFsdWVzLnJlZHVjZSgocHJldmlvdXMsIGN1cnJlbnQpID0+IHByZXZpb3VzICsgY3VycmVudCwgMCksIDEwMCk7XG5cbiAgICAgICAgLy8gZmlndXJlIG91dCB0aGUgcGVyY2VudGFnZXMgZm9yIGVhY2ggc3BhcmsgbGluZVxuICAgICAgICB0aGlzLnZhbHVlcyA9IHZhbHVlcy5tYXAodmFsID0+ICh2YWwgLyB0b3RhbCkgKiAxMDApO1xuICAgIH1cblxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbG9yU2VydmljZTogQ29sb3JTZXJ2aWNlKSB7IH1cbn0iXX0=