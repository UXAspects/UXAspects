/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
import { DatePickerMode, DateTimePickerService } from '../date-time-picker.service';
var HeaderComponent = (function () {
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
                },] },
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return [
        { type: DateTimePickerService, },
    ]; };
    return HeaderComponent;
}());
export { HeaderComponent };
function HeaderComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    HeaderComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    HeaderComponent.ctorParameters;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvaGVhZGVyL2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxjQUFjLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7SUFnRmhGLHlCQUFtQixVQUFpQztRQUFqQyxlQUFVLEdBQVYsVUFBVSxDQUF1QjswQkE5Q2xCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLEtBQUssY0FBYyxDQUFDLElBQUksRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDO3FCQUUzRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTtZQUMzRCxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNYLEtBQUssY0FBYyxDQUFDLEdBQUc7b0JBQ25CLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ2pCLEtBQUssY0FBYyxDQUFDLEtBQUs7b0JBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUM7Z0JBQ25CLEtBQUssY0FBYyxDQUFDLElBQUk7b0JBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUM7YUFDckI7U0FDSixDQUFDLENBQUM7MkJBRStCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJO1lBQ2pFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsS0FBSyxjQUFjLENBQUMsR0FBRztvQkFDbkIsTUFBTSxDQUFDLG1DQUFtQyxDQUFDO2dCQUMvQyxLQUFLLGNBQWMsQ0FBQyxLQUFLO29CQUNyQixNQUFNLENBQUMsb0NBQW9DLENBQUM7Z0JBQ2hELEtBQUssY0FBYyxDQUFDLElBQUk7b0JBQ3BCLE1BQU0sQ0FBQyxFQUFFLENBQUM7YUFDakI7U0FDSixDQUFDLENBQUM7NkJBRWlDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJO1lBQ25FLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsS0FBSyxjQUFjLENBQUMsR0FBRztvQkFDbkIsTUFBTSxDQUFDLGdCQUFnQixDQUFDO2dCQUM1QixLQUFLLGNBQWMsQ0FBQyxLQUFLO29CQUNyQixNQUFNLENBQUMsZUFBZSxDQUFDO2dCQUMzQixLQUFLLGNBQWMsQ0FBQyxJQUFJO29CQUNwQixNQUFNLENBQUMsaUJBQWlCLENBQUM7YUFDaEM7U0FDSixDQUFDLENBQUM7eUJBRTZCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJO1lBQy9ELE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsS0FBSyxjQUFjLENBQUMsR0FBRztvQkFDbkIsTUFBTSxDQUFDLFlBQVksQ0FBQztnQkFDeEIsS0FBSyxjQUFjLENBQUMsS0FBSztvQkFDckIsTUFBTSxDQUFDLFdBQVcsQ0FBQztnQkFDdkIsS0FBSyxjQUFjLENBQUMsSUFBSTtvQkFDcEIsTUFBTSxDQUFDLGFBQWEsQ0FBQzthQUM1QjtTQUNKLENBQUMsQ0FBQztLQUVzRDs7OztJQUV6RCxrQ0FBUTs7O0lBQVI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ2xDOzs7O0lBRUQsZ0NBQU07OztJQUFOO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNwQzs7OztJQUVELDhCQUFJOzs7SUFBSjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7O2dCQTFGSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsUUFBUSxFQUFFLG16QkF5Qko7b0JBQ04sZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2xEOzs7O2dCQS9Cd0IscUJBQXFCOzswQkFIOUM7O1NBbUNhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERhdGVQaWNrZXJNb2RlLCBEYXRlVGltZVBpY2tlclNlcnZpY2UgfSBmcm9tICcuLi9kYXRlLXRpbWUtcGlja2VyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWRhdGUtdGltZS1waWNrZXItaGVhZGVyJyxcbiAgICB0ZW1wbGF0ZTogYDxoZWFkZXIgY2xhc3M9XCJoZWFkZXJcIj5cblxuICA8YnV0dG9uIGNsYXNzPVwiaGVhZGVyLW5hdmlnYXRpb25cIlxuICAgICAgICAgIChjbGljayk9XCJwcmV2aW91cygpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIlxuICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwicHJldmlvdXNBcmlhJCB8IGFzeW5jXCJcbiAgICAgICAgICB0YWJpbmRleD1cIjBcIj5cblxuICAgIDxpIGNsYXNzPVwiaHBlLWljb24gaHBlLXByZXZpb3VzXCI+PC9pPlxuICA8L2J1dHRvbj5cblxuICA8YnV0dG9uIGNsYXNzPVwiaGVhZGVyLXRpdGxlXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImhlYWRlckFyaWEkIHwgYXN5bmNcIlxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiY2FuQXNjZW5kJCB8IGFzeW5jXCJcbiAgICAgICAgICAoY2xpY2spPVwiYXNjZW5kKCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiXG4gICAgICAgICAgW3RhYmluZGV4XT1cIihjYW5Bc2NlbmQkIHwgYXN5bmMpID8gMCA6IC0xXCI+XG4gICAgICAge3sgZGF0ZXBpY2tlci5oZWFkZXIkIHwgYXN5bmMgfX1cbiAgPC9idXR0b24+XG5cbiAgPGJ1dHRvbiBjbGFzcz1cImhlYWRlci1uYXZpZ2F0aW9uXCJcbiAgICAgICAgICAoY2xpY2spPVwibmV4dCgpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIlxuICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibmV4dEFyaWEkIHwgYXN5bmNcIlxuICAgICAgICAgIHRhYmluZGV4PVwiMFwiPlxuXG4gICAgPGkgY2xhc3M9XCJocGUtaWNvbiBocGUtbmV4dFwiPjwvaT5cbiAgPC9idXR0b24+XG48L2hlYWRlcj5gLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEhlYWRlckNvbXBvbmVudCB7XG5cbiAgICBjYW5Bc2NlbmQkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy5kYXRlcGlja2VyLm1vZGUkLnBpcGUobWFwKG1vZGUgPT4gbW9kZSAhPT0gRGF0ZVBpY2tlck1vZGUuWWVhcikpO1xuICAgIFxuICAgIG1vZGUkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmRhdGVwaWNrZXIubW9kZSQucGlwZShtYXAobW9kZSA9PiB7XG4gICAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyTW9kZS5EYXk6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdEYXknO1xuICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyTW9kZS5Nb250aDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ01vbnRoJztcbiAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlck1vZGUuWWVhcjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1llYXInO1xuICAgICAgICB9XG4gICAgfSkpO1xuXG4gICAgaGVhZGVyQXJpYSQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuZGF0ZXBpY2tlci5tb2RlJC5waXBlKG1hcChtb2RlID0+IHtcbiAgICAgICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJNb2RlLkRheTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1N3aXRjaCB0byBzaG93IG1vbnRocyBpbiB0aGUgeWVhcic7XG4gICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJNb2RlLk1vbnRoOlxuICAgICAgICAgICAgICAgIHJldHVybiAnU3dpdGNoIHRvIHNob3cgeWVhcnMgaW4gdGhlIGRlY2FkZSc7XG4gICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJNb2RlLlllYXI6XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgfSkpO1xuXG4gICAgcHJldmlvdXNBcmlhJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5kYXRlcGlja2VyLm1vZGUkLnBpcGUobWFwKG1vZGUgPT4ge1xuICAgICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlck1vZGUuRGF5OlxuICAgICAgICAgICAgICAgIHJldHVybiAnUHJldmlvdXMgbW9udGgnO1xuICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyTW9kZS5Nb250aDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1ByZXZpb3VzIHllYXInO1xuICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyTW9kZS5ZZWFyOlxuICAgICAgICAgICAgICAgIHJldHVybiAnUHJldmlvdXMgZGVjYWRlJztcbiAgICAgICAgfVxuICAgIH0pKTtcblxuICAgIG5leHRBcmlhJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5kYXRlcGlja2VyLm1vZGUkLnBpcGUobWFwKG1vZGUgPT4ge1xuICAgICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlck1vZGUuRGF5OlxuICAgICAgICAgICAgICAgIHJldHVybiAnTmV4dCBtb250aCc7XG4gICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJNb2RlLk1vbnRoOlxuICAgICAgICAgICAgICAgIHJldHVybiAnTmV4dCB5ZWFyJztcbiAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlck1vZGUuWWVhcjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ05leHQgZGVjYWRlJztcbiAgICAgICAgfVxuICAgIH0pKTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRlcGlja2VyOiBEYXRlVGltZVBpY2tlclNlcnZpY2UpIHsgfVxuXG4gICAgcHJldmlvdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0ZXBpY2tlci5nb1RvUHJldmlvdXMoKTtcbiAgICB9XG5cbiAgICBhc2NlbmQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0ZXBpY2tlci5nb1RvUGFyZW50TW9kZSgpO1xuICAgIH1cblxuICAgIG5leHQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0ZXBpY2tlci5nb1RvTmV4dCgpO1xuICAgIH1cbn0iXX0=