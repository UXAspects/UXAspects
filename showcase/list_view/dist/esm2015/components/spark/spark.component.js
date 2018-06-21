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
                template: `<!-- Inline Spark Chart -->
<div *ngIf="inlineLabel" class="ux-spark-inline-label-container">

    <div class="ux-spark-inline-label-left" [innerHtml]="inlineLabel"></div>

    <div class="ux-spark-line">

        <div class="ux-spark-top-container" *ngIf="topLeftLabel || topRightLabel">
            <div class="ux-spark-label-top-left" *ngIf="topLeftLabel" [innerHtml]="topLeftLabel"></div>
            <div class="ux-spark-label-top-right" *ngIf="topRightLabel" [innerHtml]="topRightLabel"></div>
        </div>

        <div class="ux-spark ux-inline ux-spark-theme-{{theme}}" [style.height.px]="barHeight" [style.backgroundColor]="trackColor" [uxTooltip]="tooltip">
            <div class="ux-spark-bar" *ngFor="let line of values; let idx = index;" [style.width.%]="line" [style.backgroundColor]="barColor[idx]"></div>
        </div>

        <div class="ux-spark-bottom-container" *ngIf="bottomLeftLabel || bottomRightLabel">
            <div class="ux-spark-label-bottom-left" *ngIf="bottomLeftLabel" [innerHtml]="bottomLeftLabel"></div>
            <div class="ux-spark-label-bottom-right" *ngIf="bottomRightLabel" [innerHtml]="bottomRightLabel"></div>
        </div>

    </div>
</div>

<!-- End Inline Spark Chart -->


<!-- Non Inline Spark Chart -->
<div *ngIf="!inlineLabel">

    <div class="ux-spark-top-container" *ngIf="topLeftLabel || topRightLabel">
        <div class="ux-spark-label-top-left" *ngIf="topLeftLabel" [innerHtml]="topLeftLabel"></div>
        <div class="ux-spark-label-top-right" *ngIf="topRightLabel" [innerHtml]="topRightLabel"></div>
    </div>

    <div class="ux-spark ux-spark-theme-{{theme}}" [class.ux-spark-multi-value]="values.length > 1" [style.height.px]="barHeight" [style.backgroundColor]="trackColor"
        [uxTooltip]="tooltip">
        <div class="ux-spark-bar" *ngFor="let line of value; let idx = index;" [style.width.%]="line" [style.backgroundColor]="barColor[idx]"></div>
    </div>

    <div class="ux-spark-bottom-container" *ngIf="bottomLeftLabel || bottomRightLabel">
        <div class="ux-spark-label-bottom-left" *ngIf="bottomLeftLabel" [innerHtml]="bottomLeftLabel"></div>
        <div class="ux-spark-label-bottom-right" *ngIf="bottomRightLabel" [innerHtml]="bottomRightLabel"></div>
    </div>
</div>

<!-- End Non Inline Spark Chart -->`,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
SparkComponent.ctorParameters = () => [
    { type: ColorService, },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhcmsuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc3Bhcmsvc3BhcmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFzRDFELE1BQU07Ozs7SUFpRUYsWUFBb0IsYUFBMkI7UUFBM0Isa0JBQWEsR0FBYixhQUFhLENBQWM7c0JBL0Q1QixFQUFFO3lCQUVRLEVBQUU7c0JBU0csU0FBUzt5QkFDSixFQUFFO0tBbURXOzs7OztRQWhEaEQsS0FBSyxDQUFDLEtBQWE7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OztJQUc3RCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztLQUN0Qjs7Ozs7UUFHRyxVQUFVLENBQUMsS0FBYTtRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OztJQUd6RCxJQUFJLFVBQVU7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztLQUMzQjs7Ozs7UUFHRyxRQUFRLENBQUMsS0FBd0I7UUFFakMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzFFO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUN4RDs7Ozs7SUFHTCxJQUFJLFFBQVE7UUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUN6Qjs7Ozs7UUFHRyxLQUFLLENBQUMsS0FBd0I7O1FBRzlCLHVCQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUd0RCx1QkFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLE9BQU8sS0FBSyxRQUFRLEdBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDOztRQUd6RixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDOzs7OztJQUd6RCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztLQUN0Qjs7O1lBbEhKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQThDc0I7Z0JBQ2hDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2xEOzs7O1lBckRRLFlBQVk7OzswQkEwRGhCLEtBQUs7NEJBQ0wsS0FBSzs2QkFDTCxLQUFLOzhCQUNMLEtBQUs7Z0NBQ0wsS0FBSztpQ0FDTCxLQUFLO3dCQUNMLEtBQUs7c0JBTUwsS0FBSzsyQkFTTCxLQUFLO3lCQVNMLEtBQUs7c0JBY0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb2xvclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb2xvci9pbmRleCc7XG5pbXBvcnQgeyBDb2xvcklkZW50aWZpZXIgfSBmcm9tICcuLi8uLi9pbmRleCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtc3BhcmsnLFxuICAgIHRlbXBsYXRlOiBgPCEtLSBJbmxpbmUgU3BhcmsgQ2hhcnQgLS0+XG48ZGl2ICpuZ0lmPVwiaW5saW5lTGFiZWxcIiBjbGFzcz1cInV4LXNwYXJrLWlubGluZS1sYWJlbC1jb250YWluZXJcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJ1eC1zcGFyay1pbmxpbmUtbGFiZWwtbGVmdFwiIFtpbm5lckh0bWxdPVwiaW5saW5lTGFiZWxcIj48L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJ1eC1zcGFyay1saW5lXCI+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInV4LXNwYXJrLXRvcC1jb250YWluZXJcIiAqbmdJZj1cInRvcExlZnRMYWJlbCB8fCB0b3BSaWdodExhYmVsXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidXgtc3BhcmstbGFiZWwtdG9wLWxlZnRcIiAqbmdJZj1cInRvcExlZnRMYWJlbFwiIFtpbm5lckh0bWxdPVwidG9wTGVmdExhYmVsXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidXgtc3BhcmstbGFiZWwtdG9wLXJpZ2h0XCIgKm5nSWY9XCJ0b3BSaWdodExhYmVsXCIgW2lubmVySHRtbF09XCJ0b3BSaWdodExhYmVsXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1eC1zcGFyayB1eC1pbmxpbmUgdXgtc3BhcmstdGhlbWUte3t0aGVtZX19XCIgW3N0eWxlLmhlaWdodC5weF09XCJiYXJIZWlnaHRcIiBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cInRyYWNrQ29sb3JcIiBbdXhUb29sdGlwXT1cInRvb2x0aXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1eC1zcGFyay1iYXJcIiAqbmdGb3I9XCJsZXQgbGluZSBvZiB2YWx1ZXM7IGxldCBpZHggPSBpbmRleDtcIiBbc3R5bGUud2lkdGguJV09XCJsaW5lXCIgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJiYXJDb2xvcltpZHhdXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1eC1zcGFyay1ib3R0b20tY29udGFpbmVyXCIgKm5nSWY9XCJib3R0b21MZWZ0TGFiZWwgfHwgYm90dG9tUmlnaHRMYWJlbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInV4LXNwYXJrLWxhYmVsLWJvdHRvbS1sZWZ0XCIgKm5nSWY9XCJib3R0b21MZWZ0TGFiZWxcIiBbaW5uZXJIdG1sXT1cImJvdHRvbUxlZnRMYWJlbFwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInV4LXNwYXJrLWxhYmVsLWJvdHRvbS1yaWdodFwiICpuZ0lmPVwiYm90dG9tUmlnaHRMYWJlbFwiIFtpbm5lckh0bWxdPVwiYm90dG9tUmlnaHRMYWJlbFwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbjwhLS0gRW5kIElubGluZSBTcGFyayBDaGFydCAtLT5cblxuXG48IS0tIE5vbiBJbmxpbmUgU3BhcmsgQ2hhcnQgLS0+XG48ZGl2ICpuZ0lmPVwiIWlubGluZUxhYmVsXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwidXgtc3BhcmstdG9wLWNvbnRhaW5lclwiICpuZ0lmPVwidG9wTGVmdExhYmVsIHx8IHRvcFJpZ2h0TGFiZWxcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInV4LXNwYXJrLWxhYmVsLXRvcC1sZWZ0XCIgKm5nSWY9XCJ0b3BMZWZ0TGFiZWxcIiBbaW5uZXJIdG1sXT1cInRvcExlZnRMYWJlbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidXgtc3BhcmstbGFiZWwtdG9wLXJpZ2h0XCIgKm5nSWY9XCJ0b3BSaWdodExhYmVsXCIgW2lubmVySHRtbF09XCJ0b3BSaWdodExhYmVsXCI+PC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwidXgtc3BhcmsgdXgtc3BhcmstdGhlbWUte3t0aGVtZX19XCIgW2NsYXNzLnV4LXNwYXJrLW11bHRpLXZhbHVlXT1cInZhbHVlcy5sZW5ndGggPiAxXCIgW3N0eWxlLmhlaWdodC5weF09XCJiYXJIZWlnaHRcIiBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cInRyYWNrQ29sb3JcIlxuICAgICAgICBbdXhUb29sdGlwXT1cInRvb2x0aXBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInV4LXNwYXJrLWJhclwiICpuZ0Zvcj1cImxldCBsaW5lIG9mIHZhbHVlOyBsZXQgaWR4ID0gaW5kZXg7XCIgW3N0eWxlLndpZHRoLiVdPVwibGluZVwiIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwiYmFyQ29sb3JbaWR4XVwiPjwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInV4LXNwYXJrLWJvdHRvbS1jb250YWluZXJcIiAqbmdJZj1cImJvdHRvbUxlZnRMYWJlbCB8fCBib3R0b21SaWdodExhYmVsXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1eC1zcGFyay1sYWJlbC1ib3R0b20tbGVmdFwiICpuZ0lmPVwiYm90dG9tTGVmdExhYmVsXCIgW2lubmVySHRtbF09XCJib3R0b21MZWZ0TGFiZWxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInV4LXNwYXJrLWxhYmVsLWJvdHRvbS1yaWdodFwiICpuZ0lmPVwiYm90dG9tUmlnaHRMYWJlbFwiIFtpbm5lckh0bWxdPVwiYm90dG9tUmlnaHRMYWJlbFwiPjwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbjwhLS0gRW5kIE5vbiBJbmxpbmUgU3BhcmsgQ2hhcnQgLS0+YCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBTcGFya0NvbXBvbmVudCB7XG5cbiAgICB2YWx1ZXM6IG51bWJlcltdID0gW107XG5cbiAgICBASW5wdXQoKSBiYXJIZWlnaHQ6IG51bWJlciA9IDEwO1xuICAgIEBJbnB1dCgpIGlubGluZUxhYmVsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgdG9wTGVmdExhYmVsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgdG9wUmlnaHRMYWJlbDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGJvdHRvbUxlZnRMYWJlbDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGJvdHRvbVJpZ2h0TGFiZWw6IHN0cmluZztcbiAgICBASW5wdXQoKSB0b29sdGlwOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIF90cmFja0NvbG9yOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfdGhlbWU6IENvbG9ySWRlbnRpZmllciA9ICdwcmltYXJ5JzsgICAgXG4gICAgcHJpdmF0ZSBfYmFyQ29sb3I6IHN0cmluZyB8IHN0cmluZ1tdID0gW107XG4gICAgXG4gICAgQElucHV0KCkgXG4gICAgc2V0IHRoZW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fdGhlbWUgPSB0aGlzLl9jb2xvclNlcnZpY2UucmVzb2x2ZUNvbG9yTmFtZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0IHRoZW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aGVtZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBcbiAgICBzZXQgdHJhY2tDb2xvcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3RyYWNrQ29sb3IgPSB0aGlzLl9jb2xvclNlcnZpY2UucmVzb2x2ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0IHRyYWNrQ29sb3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYWNrQ29sb3I7XG4gICAgfVxuXG4gICAgQElucHV0KCkgXG4gICAgc2V0IGJhckNvbG9yKHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5fYmFyQ29sb3IgPSB2YWx1ZS5tYXAoY29sb3IgPT4gdGhpcy5fY29sb3JTZXJ2aWNlLnJlc29sdmUoY29sb3IpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2JhckNvbG9yID0gW3RoaXMuX2NvbG9yU2VydmljZS5yZXNvbHZlKHZhbHVlKV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgYmFyQ29sb3IoKTogc3RyaW5nIHwgc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmFyQ29sb3I7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgdmFsdWUodmFsdWU6IG51bWJlciB8IG51bWJlcltdKSB7XG5cbiAgICAgICAgLy8gZW5zdXJlICd2YWx1ZScgaXMgYW4gYXJyYXkgYXQgdGhpcyBwb2ludFxuICAgICAgICBjb25zdCB2YWx1ZXMgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXTtcblxuICAgICAgICAvLyBnZXQgdGhlIHRvdGFsIHZhbHVlIG9mIGFsbCBsaW5lc1xuICAgICAgICBjb25zdCB0b3RhbCA9IE1hdGgubWF4KHZhbHVlcy5yZWR1Y2UoKHByZXZpb3VzLCBjdXJyZW50KSA9PiBwcmV2aW91cyArIGN1cnJlbnQsIDApLCAxMDApO1xuXG4gICAgICAgIC8vIGZpZ3VyZSBvdXQgdGhlIHBlcmNlbnRhZ2VzIGZvciBlYWNoIHNwYXJrIGxpbmVcbiAgICAgICAgdGhpcy52YWx1ZXMgPSB2YWx1ZXMubWFwKHZhbCA9PiAodmFsIC8gdG90YWwpICogMTAwKTtcbiAgICB9XG5cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlcztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jb2xvclNlcnZpY2U6IENvbG9yU2VydmljZSkgeyB9XG59Il19