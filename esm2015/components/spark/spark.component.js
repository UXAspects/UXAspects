/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ColorService } from '../../services/color/index';
export class SparkComponent {
    /**
     * @param {?} _colorService
     */
    constructor(_colorService) {
        this._colorService = _colorService;
        this.values = [];
        this.barHeight = 10;
        this._theme = 'primary';
        this._barColor = [];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set theme(value) {
        this._theme = this._colorService.resolveColorName(value);
    }
    /**
     * @return {?}
     */
    get theme() {
        return this._theme;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set trackColor(value) {
        this._trackColor = this._colorService.resolve(value);
    }
    /**
     * @return {?}
     */
    get trackColor() {
        return this._trackColor;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set barColor(value) {
        if (Array.isArray(value)) {
            this._barColor = value.map(color => this._colorService.resolve(color));
        }
        else {
            this._barColor = [this._colorService.resolve(value)];
        }
    }
    /**
     * @return {?}
     */
    get barColor() {
        return this._barColor;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        // ensure 'value' is an array at this point
        const /** @type {?} */ values = Array.isArray(value) ? value : [value];
        // get the total value of all lines
        const /** @type {?} */ total = Math.max(values.reduce((previous, current) => previous + current, 0), 100);
        // figure out the percentages for each spark line
        this.values = values.map(val => (val / total) * 100);
    }
    /**
     * @return {?}
     */
    get value() {
        return this.values;
    }
}
SparkComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-spark',
                template: "<!-- Inline Spark Chart -->\n<div *ngIf=\"inlineLabel\" class=\"ux-spark-inline-label-container\">\n\n    <div class=\"ux-spark-inline-label-left\" [innerHtml]=\"inlineLabel\"></div>\n\n    <div class=\"ux-spark-line\">\n\n        <div class=\"ux-spark-top-container\" *ngIf=\"topLeftLabel || topRightLabel\">\n            <div class=\"ux-spark-label-top-left\" *ngIf=\"topLeftLabel\" [innerHtml]=\"topLeftLabel\"></div>\n            <div class=\"ux-spark-label-top-right\" *ngIf=\"topRightLabel\" [innerHtml]=\"topRightLabel\"></div>\n        </div>\n\n        <div role=\"progressbar\"\n            [attr.aria-label]=\"ariaLabel || tooltip\"\n            [attr.aria-description]=\"ariaDescription\"\n            aria-valuemin=\"0\"\n            aria-valuemax=\"100\"\n            [attr.aria-valuenow]=\"values.length === 1 ? values[0] : undefined\"\n            class=\"ux-spark ux-inline ux-spark-theme-{{theme}}\"\n            [style.height.px]=\"barHeight\"\n            [style.backgroundColor]=\"trackColor\"\n            [uxTooltip]=\"tooltip\">\n            <div class=\"ux-spark-bar\" *ngFor=\"let line of values; let idx = index;\" [style.width.%]=\"line\" [style.backgroundColor]=\"barColor[idx]\"></div>\n        </div>\n\n        <div class=\"ux-spark-bottom-container\" *ngIf=\"bottomLeftLabel || bottomRightLabel\">\n            <div class=\"ux-spark-label-bottom-left\" *ngIf=\"bottomLeftLabel\" [innerHtml]=\"bottomLeftLabel\"></div>\n            <div class=\"ux-spark-label-bottom-right\" *ngIf=\"bottomRightLabel\" [innerHtml]=\"bottomRightLabel\"></div>\n        </div>\n\n    </div>\n</div>\n\n<!-- End Inline Spark Chart -->\n\n\n<!-- Non Inline Spark Chart -->\n<div *ngIf=\"!inlineLabel\" [attr.aria-label]=\"ariaLabel\" [attr.aria-description]=\"ariaDescription\">\n\n    <div class=\"ux-spark-top-container\" *ngIf=\"topLeftLabel || topRightLabel\">\n        <div class=\"ux-spark-label-top-left\" *ngIf=\"topLeftLabel\" [innerHtml]=\"topLeftLabel\"></div>\n        <div class=\"ux-spark-label-top-right\" *ngIf=\"topRightLabel\" [innerHtml]=\"topRightLabel\"></div>\n    </div>\n\n    <div role=\"progressbar\"\n        [attr.aria-label]=\"ariaLabel || tooltip\"\n        [attr.aria-description]=\"ariaDescription\"\n        aria-valuemin=\"0\"\n        aria-valuemax=\"100\"\n        [attr.aria-valuenow]=\"values.length === 1 ? values[0] : undefined\"\n        class=\"ux-spark ux-spark-theme-{{theme}}\"\n        [class.ux-spark-multi-value]=\"values.length > 1\"\n        [style.height.px]=\"barHeight\"\n        [style.backgroundColor]=\"trackColor\"\n        [uxTooltip]=\"tooltip\">\n        <div class=\"ux-spark-bar\" *ngFor=\"let line of value; let idx = index;\" [style.width.%]=\"line\" [style.backgroundColor]=\"barColor[idx]\"></div>\n    </div>\n\n    <div class=\"ux-spark-bottom-container\" *ngIf=\"bottomLeftLabel || bottomRightLabel\">\n        <div class=\"ux-spark-label-bottom-left\" *ngIf=\"bottomLeftLabel\" [innerHtml]=\"bottomLeftLabel\"></div>\n        <div class=\"ux-spark-label-bottom-right\" *ngIf=\"bottomRightLabel\" [innerHtml]=\"bottomRightLabel\"></div>\n    </div>\n</div>\n\n<!-- End Non Inline Spark Chart -->",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
SparkComponent.ctorParameters = () => [
    { type: ColorService }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhcmsuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc3Bhcmsvc3BhcmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFRMUQsTUFBTTs7OztJQW1FRixZQUFvQixhQUEyQjtRQUEzQixrQkFBYSxHQUFiLGFBQWEsQ0FBYztzQkFqRTVCLEVBQUU7eUJBRVEsRUFBRTtzQkFXRyxTQUFTO3lCQUNKLEVBQUU7S0FtRFc7Ozs7O0lBakRwRCxJQUNJLEtBQUssQ0FBQyxLQUFhO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM1RDs7OztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ3RCOzs7OztJQUVELElBQ0ksVUFBVSxDQUFDLEtBQWE7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN4RDs7OztJQUVELElBQUksVUFBVTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0tBQzNCOzs7OztJQUVELElBQ0ksUUFBUSxDQUFDLEtBQXdCO1FBRWpDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDMUU7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3hEO0tBQ0o7Ozs7SUFFRCxJQUFJLFFBQVE7UUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUN6Qjs7Ozs7SUFFRCxJQUNJLEtBQUssQ0FBQyxLQUF3Qjs7UUFHOUIsdUJBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7UUFHdEQsdUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLFFBQVEsR0FBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7O1FBR3pGLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0tBQ3hEOzs7O0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDdEI7OztZQXRFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLG1uR0FBcUM7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2xEOzs7O1lBUFEsWUFBWTs7O3dCQVloQixLQUFLOzBCQUNMLEtBQUs7MkJBQ0wsS0FBSzs0QkFDTCxLQUFLOzhCQUNMLEtBQUs7K0JBQ0wsS0FBSztzQkFDTCxLQUFLO3dCQUNMLEtBQUssU0FBQyxZQUFZOzhCQUNsQixLQUFLLFNBQUMsa0JBQWtCO29CQU14QixLQUFLO3lCQVNMLEtBQUs7dUJBU0wsS0FBSztvQkFjTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbG9yU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbG9yL2luZGV4JztcbmltcG9ydCB7IENvbG9ySWRlbnRpZmllciB9IGZyb20gJy4uLy4uL2luZGV4JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1zcGFyaycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NwYXJrLmNvbXBvbmVudC5odG1sJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBTcGFya0NvbXBvbmVudCB7XG5cbiAgICB2YWx1ZXM6IG51bWJlcltdID0gW107XG5cbiAgICBASW5wdXQoKSBiYXJIZWlnaHQ6IG51bWJlciA9IDEwO1xuICAgIEBJbnB1dCgpIGlubGluZUxhYmVsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgdG9wTGVmdExhYmVsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgdG9wUmlnaHRMYWJlbDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGJvdHRvbUxlZnRMYWJlbDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGJvdHRvbVJpZ2h0TGFiZWw6IHN0cmluZztcbiAgICBASW5wdXQoKSB0b29sdGlwOiBzdHJpbmc7XG4gICAgQElucHV0KCdhcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmc7XG4gICAgQElucHV0KCdhcmlhLWRlc2NyaXB0aW9uJykgYXJpYURlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIF90cmFja0NvbG9yOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfdGhlbWU6IENvbG9ySWRlbnRpZmllciA9ICdwcmltYXJ5JztcbiAgICBwcml2YXRlIF9iYXJDb2xvcjogc3RyaW5nIHwgc3RyaW5nW10gPSBbXTtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHRoZW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fdGhlbWUgPSB0aGlzLl9jb2xvclNlcnZpY2UucmVzb2x2ZUNvbG9yTmFtZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0IHRoZW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aGVtZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCB0cmFja0NvbG9yKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fdHJhY2tDb2xvciA9IHRoaXMuX2NvbG9yU2VydmljZS5yZXNvbHZlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXQgdHJhY2tDb2xvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fdHJhY2tDb2xvcjtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBiYXJDb2xvcih2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW10pIHtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2JhckNvbG9yID0gdmFsdWUubWFwKGNvbG9yID0+IHRoaXMuX2NvbG9yU2VydmljZS5yZXNvbHZlKGNvbG9yKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9iYXJDb2xvciA9IFt0aGlzLl9jb2xvclNlcnZpY2UucmVzb2x2ZSh2YWx1ZSldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGJhckNvbG9yKCk6IHN0cmluZyB8IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JhckNvbG9yO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBudW1iZXIgfCBudW1iZXJbXSkge1xuXG4gICAgICAgIC8vIGVuc3VyZSAndmFsdWUnIGlzIGFuIGFycmF5IGF0IHRoaXMgcG9pbnRcbiAgICAgICAgY29uc3QgdmFsdWVzID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV07XG5cbiAgICAgICAgLy8gZ2V0IHRoZSB0b3RhbCB2YWx1ZSBvZiBhbGwgbGluZXNcbiAgICAgICAgY29uc3QgdG90YWwgPSBNYXRoLm1heCh2YWx1ZXMucmVkdWNlKChwcmV2aW91cywgY3VycmVudCkgPT4gcHJldmlvdXMgKyBjdXJyZW50LCAwKSwgMTAwKTtcblxuICAgICAgICAvLyBmaWd1cmUgb3V0IHRoZSBwZXJjZW50YWdlcyBmb3IgZWFjaCBzcGFyayBsaW5lXG4gICAgICAgIHRoaXMudmFsdWVzID0gdmFsdWVzLm1hcCh2YWwgPT4gKHZhbCAvIHRvdGFsKSAqIDEwMCk7XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZXM7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY29sb3JTZXJ2aWNlOiBDb2xvclNlcnZpY2UpIHsgfVxufSJdfQ==