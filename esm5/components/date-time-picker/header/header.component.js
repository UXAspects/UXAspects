/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
import { DatePickerMode, DateTimePickerService } from '../date-time-picker.service';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(datepicker) {
        this.datepicker = datepicker;
        this.canAscend$ = this.datepicker.mode$.pipe(map(function (mode) { return mode !== DatePickerMode.Year; }));
        this.mode$ = this.datepicker.mode$.pipe(map(function (mode) {
            switch (mode) {
                case DatePickerMode.Day:
                    return 'Day';
                case DatePickerMode.Month:
                    return 'Month';
                case DatePickerMode.Year:
                    return 'Year';
            }
        }));
        this.headerAria$ = this.datepicker.mode$.pipe(map(function (mode) {
            switch (mode) {
                case DatePickerMode.Day:
                    return 'Switch to show months in the year';
                case DatePickerMode.Month:
                    return 'Switch to show years in the decade';
                case DatePickerMode.Year:
                    return '';
            }
        }));
        this.previousAria$ = this.datepicker.mode$.pipe(map(function (mode) {
            switch (mode) {
                case DatePickerMode.Day:
                    return 'Previous month';
                case DatePickerMode.Month:
                    return 'Previous year';
                case DatePickerMode.Year:
                    return 'Previous decade';
            }
        }));
        this.nextAria$ = this.datepicker.mode$.pipe(map(function (mode) {
            switch (mode) {
                case DatePickerMode.Day:
                    return 'Next month';
                case DatePickerMode.Month:
                    return 'Next year';
                case DatePickerMode.Year:
                    return 'Next decade';
            }
        }));
    }
    /**
     * @return {?}
     */
    HeaderComponent.prototype.previous = /**
     * @return {?}
     */
    function () {
        this.datepicker.goToPrevious();
    };
    /**
     * @return {?}
     */
    HeaderComponent.prototype.ascend = /**
     * @return {?}
     */
    function () {
        this.datepicker.goToParentMode();
    };
    /**
     * @return {?}
     */
    HeaderComponent.prototype.next = /**
     * @return {?}
     */
    function () {
        this.datepicker.goToNext();
    };
    HeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-date-time-picker-header',
                    template: "<header class=\"header\">\n\n  <button class=\"header-navigation\"\n          (click)=\"previous(); $event.stopPropagation()\"\n          [attr.aria-label]=\"previousAria$ | async\"\n          tabindex=\"0\">\n\n    <i class=\"hpe-icon hpe-previous\"></i>\n  </button>\n\n  <button class=\"header-title\"\n          [attr.aria-label]=\"headerAria$ | async\"\n          [class.active]=\"canAscend$ | async\"\n          (click)=\"ascend(); $event.stopPropagation()\"\n          [tabindex]=\"(canAscend$ | async) ? 0 : -1\">\n       {{ datepicker.header$ | async }}\n  </button>\n\n  <button class=\"header-navigation\"\n          (click)=\"next(); $event.stopPropagation()\"\n          [attr.aria-label]=\"nextAria$ | async\"\n          tabindex=\"0\">\n\n    <i class=\"hpe-icon hpe-next\"></i>\n  </button>\n</header>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return [
        { type: DateTimePickerService }
    ]; };
    return HeaderComponent;
}());
export { HeaderComponent };
function HeaderComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    HeaderComponent.prototype.canAscend$;
    /** @type {?} */
    HeaderComponent.prototype.mode$;
    /** @type {?} */
    HeaderComponent.prototype.headerAria$;
    /** @type {?} */
    HeaderComponent.prototype.previousAria$;
    /** @type {?} */
    HeaderComponent.prototype.nextAria$;
    /** @type {?} */
    HeaderComponent.prototype.datepicker;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvaGVhZGVyL2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxjQUFjLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7SUF1RGhGLHlCQUFtQixVQUFpQztRQUFqQyxlQUFVLEdBQVYsVUFBVSxDQUF1QjswQkE5Q2xCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLEtBQUssY0FBYyxDQUFDLElBQUksRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDO3FCQUUzRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTtZQUMzRCxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNYLEtBQUssY0FBYyxDQUFDLEdBQUc7b0JBQ25CLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ2pCLEtBQUssY0FBYyxDQUFDLEtBQUs7b0JBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUM7Z0JBQ25CLEtBQUssY0FBYyxDQUFDLElBQUk7b0JBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUM7YUFDckI7U0FDSixDQUFDLENBQUM7MkJBRStCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJO1lBQ2pFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsS0FBSyxjQUFjLENBQUMsR0FBRztvQkFDbkIsTUFBTSxDQUFDLG1DQUFtQyxDQUFDO2dCQUMvQyxLQUFLLGNBQWMsQ0FBQyxLQUFLO29CQUNyQixNQUFNLENBQUMsb0NBQW9DLENBQUM7Z0JBQ2hELEtBQUssY0FBYyxDQUFDLElBQUk7b0JBQ3BCLE1BQU0sQ0FBQyxFQUFFLENBQUM7YUFDakI7U0FDSixDQUFDLENBQUM7NkJBRWlDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJO1lBQ25FLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsS0FBSyxjQUFjLENBQUMsR0FBRztvQkFDbkIsTUFBTSxDQUFDLGdCQUFnQixDQUFDO2dCQUM1QixLQUFLLGNBQWMsQ0FBQyxLQUFLO29CQUNyQixNQUFNLENBQUMsZUFBZSxDQUFDO2dCQUMzQixLQUFLLGNBQWMsQ0FBQyxJQUFJO29CQUNwQixNQUFNLENBQUMsaUJBQWlCLENBQUM7YUFDaEM7U0FDSixDQUFDLENBQUM7eUJBRTZCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJO1lBQy9ELE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsS0FBSyxjQUFjLENBQUMsR0FBRztvQkFDbkIsTUFBTSxDQUFDLFlBQVksQ0FBQztnQkFDeEIsS0FBSyxjQUFjLENBQUMsS0FBSztvQkFDckIsTUFBTSxDQUFDLFdBQVcsQ0FBQztnQkFDdkIsS0FBSyxjQUFjLENBQUMsSUFBSTtvQkFDcEIsTUFBTSxDQUFDLGFBQWEsQ0FBQzthQUM1QjtTQUNKLENBQUMsQ0FBQztLQUVzRDs7OztJQUV6RCxrQ0FBUTs7O0lBQVI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ2xDOzs7O0lBRUQsZ0NBQU07OztJQUFOO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNwQzs7OztJQUVELDhCQUFJOzs7SUFBSjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7O2dCQWpFSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsNnpCQUFzQztvQkFDdEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2xEOzs7O2dCQU53QixxQkFBcUI7OzBCQUg5Qzs7U0FVYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEYXRlUGlja2VyTW9kZSwgRGF0ZVRpbWVQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0ZS10aW1lLXBpY2tlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1kYXRlLXRpbWUtcGlja2VyLWhlYWRlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2hlYWRlci5jb21wb25lbnQuaHRtbCcsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgSGVhZGVyQ29tcG9uZW50IHtcblxuICAgIGNhbkFzY2VuZCQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLmRhdGVwaWNrZXIubW9kZSQucGlwZShtYXAobW9kZSA9PiBtb2RlICE9PSBEYXRlUGlja2VyTW9kZS5ZZWFyKSk7XG4gICAgXG4gICAgbW9kZSQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuZGF0ZXBpY2tlci5tb2RlJC5waXBlKG1hcChtb2RlID0+IHtcbiAgICAgICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJNb2RlLkRheTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ0RheSc7XG4gICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJNb2RlLk1vbnRoOlxuICAgICAgICAgICAgICAgIHJldHVybiAnTW9udGgnO1xuICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyTW9kZS5ZZWFyOlxuICAgICAgICAgICAgICAgIHJldHVybiAnWWVhcic7XG4gICAgICAgIH1cbiAgICB9KSk7XG5cbiAgICBoZWFkZXJBcmlhJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5kYXRlcGlja2VyLm1vZGUkLnBpcGUobWFwKG1vZGUgPT4ge1xuICAgICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlck1vZGUuRGF5OlxuICAgICAgICAgICAgICAgIHJldHVybiAnU3dpdGNoIHRvIHNob3cgbW9udGhzIGluIHRoZSB5ZWFyJztcbiAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlck1vZGUuTW9udGg6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdTd2l0Y2ggdG8gc2hvdyB5ZWFycyBpbiB0aGUgZGVjYWRlJztcbiAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlck1vZGUuWWVhcjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICB9KSk7XG5cbiAgICBwcmV2aW91c0FyaWEkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmRhdGVwaWNrZXIubW9kZSQucGlwZShtYXAobW9kZSA9PiB7XG4gICAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyTW9kZS5EYXk6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdQcmV2aW91cyBtb250aCc7XG4gICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJNb2RlLk1vbnRoOlxuICAgICAgICAgICAgICAgIHJldHVybiAnUHJldmlvdXMgeWVhcic7XG4gICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJNb2RlLlllYXI6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdQcmV2aW91cyBkZWNhZGUnO1xuICAgICAgICB9XG4gICAgfSkpO1xuXG4gICAgbmV4dEFyaWEkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmRhdGVwaWNrZXIubW9kZSQucGlwZShtYXAobW9kZSA9PiB7XG4gICAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyTW9kZS5EYXk6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdOZXh0IG1vbnRoJztcbiAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlck1vZGUuTW9udGg6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdOZXh0IHllYXInO1xuICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyTW9kZS5ZZWFyOlxuICAgICAgICAgICAgICAgIHJldHVybiAnTmV4dCBkZWNhZGUnO1xuICAgICAgICB9XG4gICAgfSkpO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGRhdGVwaWNrZXI6IERhdGVUaW1lUGlja2VyU2VydmljZSkgeyB9XG5cbiAgICBwcmV2aW91cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRlcGlja2VyLmdvVG9QcmV2aW91cygpO1xuICAgIH1cblxuICAgIGFzY2VuZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRlcGlja2VyLmdvVG9QYXJlbnRNb2RlKCk7XG4gICAgfVxuXG4gICAgbmV4dCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRlcGlja2VyLmdvVG9OZXh0KCk7XG4gICAgfVxufSJdfQ==