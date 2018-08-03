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
                    template: "<!-- Inline Spark Chart -->\n<div *ngIf=\"inlineLabel\" class=\"ux-spark-inline-label-container\">\n\n    <div class=\"ux-spark-inline-label-left\" [innerHtml]=\"inlineLabel\"></div>\n\n    <div class=\"ux-spark-line\">\n\n        <div class=\"ux-spark-top-container\" *ngIf=\"topLeftLabel || topRightLabel\">\n            <div class=\"ux-spark-label-top-left\" *ngIf=\"topLeftLabel\" [innerHtml]=\"topLeftLabel\"></div>\n            <div class=\"ux-spark-label-top-right\" *ngIf=\"topRightLabel\" [innerHtml]=\"topRightLabel\"></div>\n        </div>\n\n        <div class=\"ux-spark ux-inline ux-spark-theme-{{theme}}\" [style.height.px]=\"barHeight\" [style.backgroundColor]=\"trackColor\" [uxTooltip]=\"tooltip\">\n            <div class=\"ux-spark-bar\" *ngFor=\"let line of values; let idx = index;\" [style.width.%]=\"line\" [style.backgroundColor]=\"barColor[idx]\"></div>\n        </div>\n\n        <div class=\"ux-spark-bottom-container\" *ngIf=\"bottomLeftLabel || bottomRightLabel\">\n            <div class=\"ux-spark-label-bottom-left\" *ngIf=\"bottomLeftLabel\" [innerHtml]=\"bottomLeftLabel\"></div>\n            <div class=\"ux-spark-label-bottom-right\" *ngIf=\"bottomRightLabel\" [innerHtml]=\"bottomRightLabel\"></div>\n        </div>\n\n    </div>\n</div>\n\n<!-- End Inline Spark Chart -->\n\n\n<!-- Non Inline Spark Chart -->\n<div *ngIf=\"!inlineLabel\">\n\n    <div class=\"ux-spark-top-container\" *ngIf=\"topLeftLabel || topRightLabel\">\n        <div class=\"ux-spark-label-top-left\" *ngIf=\"topLeftLabel\" [innerHtml]=\"topLeftLabel\"></div>\n        <div class=\"ux-spark-label-top-right\" *ngIf=\"topRightLabel\" [innerHtml]=\"topRightLabel\"></div>\n    </div>\n\n    <div class=\"ux-spark ux-spark-theme-{{theme}}\" [class.ux-spark-multi-value]=\"values.length > 1\" [style.height.px]=\"barHeight\" [style.backgroundColor]=\"trackColor\"\n        [uxTooltip]=\"tooltip\">\n        <div class=\"ux-spark-bar\" *ngFor=\"let line of value; let idx = index;\" [style.width.%]=\"line\" [style.backgroundColor]=\"barColor[idx]\"></div>\n    </div>\n\n    <div class=\"ux-spark-bottom-container\" *ngIf=\"bottomLeftLabel || bottomRightLabel\">\n        <div class=\"ux-spark-label-bottom-left\" *ngIf=\"bottomLeftLabel\" [innerHtml]=\"bottomLeftLabel\"></div>\n        <div class=\"ux-spark-label-bottom-right\" *ngIf=\"bottomRightLabel\" [innerHtml]=\"bottomRightLabel\"></div>\n    </div>\n</div>\n\n<!-- End Non Inline Spark Chart -->",
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
    SparkComponent.prototype._trackColor;
    /** @type {?} */
    SparkComponent.prototype._theme;
    /** @type {?} */
    SparkComponent.prototype._barColor;
    /** @type {?} */
    SparkComponent.prototype._colorService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhcmsuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc3Bhcmsvc3BhcmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0lBeUV0RCx3QkFBb0IsYUFBMkI7UUFBM0Isa0JBQWEsR0FBYixhQUFhLENBQWM7c0JBL0Q1QixFQUFFO3lCQUVRLEVBQUU7c0JBU0csU0FBUzt5QkFDSixFQUFFO0tBbURXO0lBakRwRCxzQkFDSSxpQ0FBSzs7OztRQUlUO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDdEI7Ozs7O1FBUEQsVUFDVSxLQUFhO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1RDs7O09BQUE7SUFNRCxzQkFDSSxzQ0FBVTs7OztRQUlkO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDM0I7Ozs7O1FBUEQsVUFDZSxLQUFhO1lBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEQ7OztPQUFBO0lBTUQsc0JBQ0ksb0NBQVE7Ozs7UUFTWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3pCOzs7OztRQVpELFVBQ2EsS0FBd0I7WUFEckMsaUJBUUM7WUFMRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQzthQUMxRTtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3hEO1NBQ0o7OztPQUFBO0lBTUQsc0JBQ0ksaUNBQUs7Ozs7UUFZVDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3RCOzs7OztRQWZELFVBQ1UsS0FBd0I7O1lBRzlCLHFCQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7O1lBR3RELHFCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQyxRQUFRLEVBQUUsT0FBTyxJQUFLLE9BQUEsUUFBUSxHQUFHLE9BQU8sRUFBbEIsQ0FBa0IsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQzs7WUFHekYsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxFQUFuQixDQUFtQixDQUFDLENBQUM7U0FDeEQ7OztPQUFBOztnQkFoRUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxVQUFVO29CQUNwQiwyNkVBQXFDO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDbEQ7Ozs7Z0JBUFEsWUFBWTs7OzRCQVloQixLQUFLOzhCQUNMLEtBQUs7K0JBQ0wsS0FBSztnQ0FDTCxLQUFLO2tDQUNMLEtBQUs7bUNBQ0wsS0FBSzswQkFDTCxLQUFLO3dCQU1MLEtBQUs7NkJBU0wsS0FBSzsyQkFTTCxLQUFLO3dCQWNMLEtBQUs7O3lCQXpEVjs7U0FTYSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbG9yU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbG9yL2luZGV4JztcbmltcG9ydCB7IENvbG9ySWRlbnRpZmllciB9IGZyb20gJy4uLy4uL2luZGV4JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1zcGFyaycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NwYXJrLmNvbXBvbmVudC5odG1sJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBTcGFya0NvbXBvbmVudCB7XG5cbiAgICB2YWx1ZXM6IG51bWJlcltdID0gW107XG5cbiAgICBASW5wdXQoKSBiYXJIZWlnaHQ6IG51bWJlciA9IDEwO1xuICAgIEBJbnB1dCgpIGlubGluZUxhYmVsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgdG9wTGVmdExhYmVsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgdG9wUmlnaHRMYWJlbDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGJvdHRvbUxlZnRMYWJlbDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGJvdHRvbVJpZ2h0TGFiZWw6IHN0cmluZztcbiAgICBASW5wdXQoKSB0b29sdGlwOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIF90cmFja0NvbG9yOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfdGhlbWU6IENvbG9ySWRlbnRpZmllciA9ICdwcmltYXJ5JzsgICAgXG4gICAgcHJpdmF0ZSBfYmFyQ29sb3I6IHN0cmluZyB8IHN0cmluZ1tdID0gW107XG4gICAgXG4gICAgQElucHV0KCkgXG4gICAgc2V0IHRoZW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fdGhlbWUgPSB0aGlzLl9jb2xvclNlcnZpY2UucmVzb2x2ZUNvbG9yTmFtZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0IHRoZW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aGVtZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBcbiAgICBzZXQgdHJhY2tDb2xvcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3RyYWNrQ29sb3IgPSB0aGlzLl9jb2xvclNlcnZpY2UucmVzb2x2ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0IHRyYWNrQ29sb3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYWNrQ29sb3I7XG4gICAgfVxuXG4gICAgQElucHV0KCkgXG4gICAgc2V0IGJhckNvbG9yKHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5fYmFyQ29sb3IgPSB2YWx1ZS5tYXAoY29sb3IgPT4gdGhpcy5fY29sb3JTZXJ2aWNlLnJlc29sdmUoY29sb3IpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2JhckNvbG9yID0gW3RoaXMuX2NvbG9yU2VydmljZS5yZXNvbHZlKHZhbHVlKV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgYmFyQ29sb3IoKTogc3RyaW5nIHwgc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmFyQ29sb3I7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgdmFsdWUodmFsdWU6IG51bWJlciB8IG51bWJlcltdKSB7XG5cbiAgICAgICAgLy8gZW5zdXJlICd2YWx1ZScgaXMgYW4gYXJyYXkgYXQgdGhpcyBwb2ludFxuICAgICAgICBjb25zdCB2YWx1ZXMgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXTtcblxuICAgICAgICAvLyBnZXQgdGhlIHRvdGFsIHZhbHVlIG9mIGFsbCBsaW5lc1xuICAgICAgICBjb25zdCB0b3RhbCA9IE1hdGgubWF4KHZhbHVlcy5yZWR1Y2UoKHByZXZpb3VzLCBjdXJyZW50KSA9PiBwcmV2aW91cyArIGN1cnJlbnQsIDApLCAxMDApO1xuXG4gICAgICAgIC8vIGZpZ3VyZSBvdXQgdGhlIHBlcmNlbnRhZ2VzIGZvciBlYWNoIHNwYXJrIGxpbmVcbiAgICAgICAgdGhpcy52YWx1ZXMgPSB2YWx1ZXMubWFwKHZhbCA9PiAodmFsIC8gdG90YWwpICogMTAwKTtcbiAgICB9XG5cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlcztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jb2xvclNlcnZpY2U6IENvbG9yU2VydmljZSkgeyB9XG59Il19