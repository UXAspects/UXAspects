/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
import { DatePickerMode, DateTimePickerService } from '../date-time-picker.service';
export class HeaderComponent {
    /**
     * @param {?} datepicker
     */
    constructor(datepicker) {
        this.datepicker = datepicker;
        this.canAscend$ = this.datepicker.mode$.pipe(map(mode => mode !== DatePickerMode.Year));
        this.mode$ = this.datepicker.mode$.pipe(map(mode => {
            switch (mode) {
                case DatePickerMode.Day:
                    return 'Day';
                case DatePickerMode.Month:
                    return 'Month';
                case DatePickerMode.Year:
                    return 'Year';
            }
        }));
        this.headerAria$ = this.datepicker.mode$.pipe(map(mode => {
            switch (mode) {
                case DatePickerMode.Day:
                    return 'Switch to show months in the year';
                case DatePickerMode.Month:
                    return 'Switch to show years in the decade';
                case DatePickerMode.Year:
                    return '';
            }
        }));
        this.previousAria$ = this.datepicker.mode$.pipe(map(mode => {
            switch (mode) {
                case DatePickerMode.Day:
                    return 'Previous month';
                case DatePickerMode.Month:
                    return 'Previous year';
                case DatePickerMode.Year:
                    return 'Previous decade';
            }
        }));
        this.nextAria$ = this.datepicker.mode$.pipe(map(mode => {
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
    previous() {
        this.datepicker.goToPrevious();
    }
    /**
     * @return {?}
     */
    ascend() {
        this.datepicker.goToParentMode();
    }
    /**
     * @return {?}
     */
    next() {
        this.datepicker.goToNext();
    }
}
HeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-date-time-picker-header',
                template: "<header class=\"header\">\n\n  <button class=\"header-navigation\"\n          (click)=\"previous(); $event.stopPropagation()\"\n          [attr.aria-label]=\"previousAria$ | async\"\n          tabindex=\"0\">\n\n    <i class=\"hpe-icon hpe-previous\"></i>\n  </button>\n\n  <button class=\"header-title\"\n          [attr.aria-label]=\"headerAria$ | async\"\n          [class.active]=\"canAscend$ | async\"\n          (click)=\"ascend(); $event.stopPropagation()\"\n          [tabindex]=\"(canAscend$ | async) ? 0 : -1\">\n       {{ datepicker.header$ | async }}\n  </button>\n\n  <button class=\"header-navigation\"\n          (click)=\"next(); $event.stopPropagation()\"\n          [attr.aria-label]=\"nextAria$ | async\"\n          tabindex=\"0\">\n\n    <i class=\"hpe-icon hpe-next\"></i>\n  </button>\n</header>",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
HeaderComponent.ctorParameters = () => [
    { type: DateTimePickerService }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvaGVhZGVyL2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxjQUFjLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQU9wRixNQUFNOzs7O0lBZ0RGLFlBQW1CLFVBQWlDO1FBQWpDLGVBQVUsR0FBVixVQUFVLENBQXVCOzBCQTlDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBRTNFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDOUQsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDWCxLQUFLLGNBQWMsQ0FBQyxHQUFHO29CQUNuQixNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNqQixLQUFLLGNBQWMsQ0FBQyxLQUFLO29CQUNyQixNQUFNLENBQUMsT0FBTyxDQUFDO2dCQUNuQixLQUFLLGNBQWMsQ0FBQyxJQUFJO29CQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ3JCO1NBQ0osQ0FBQyxDQUFDOzJCQUUrQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsS0FBSyxjQUFjLENBQUMsR0FBRztvQkFDbkIsTUFBTSxDQUFDLG1DQUFtQyxDQUFDO2dCQUMvQyxLQUFLLGNBQWMsQ0FBQyxLQUFLO29CQUNyQixNQUFNLENBQUMsb0NBQW9DLENBQUM7Z0JBQ2hELEtBQUssY0FBYyxDQUFDLElBQUk7b0JBQ3BCLE1BQU0sQ0FBQyxFQUFFLENBQUM7YUFDakI7U0FDSixDQUFDLENBQUM7NkJBRWlDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDWCxLQUFLLGNBQWMsQ0FBQyxHQUFHO29CQUNuQixNQUFNLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzVCLEtBQUssY0FBYyxDQUFDLEtBQUs7b0JBQ3JCLE1BQU0sQ0FBQyxlQUFlLENBQUM7Z0JBQzNCLEtBQUssY0FBYyxDQUFDLElBQUk7b0JBQ3BCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQzthQUNoQztTQUNKLENBQUMsQ0FBQzt5QkFFNkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNsRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNYLEtBQUssY0FBYyxDQUFDLEdBQUc7b0JBQ25CLE1BQU0sQ0FBQyxZQUFZLENBQUM7Z0JBQ3hCLEtBQUssY0FBYyxDQUFDLEtBQUs7b0JBQ3JCLE1BQU0sQ0FBQyxXQUFXLENBQUM7Z0JBQ3ZCLEtBQUssY0FBYyxDQUFDLElBQUk7b0JBQ3BCLE1BQU0sQ0FBQyxhQUFhLENBQUM7YUFDNUI7U0FDSixDQUFDLENBQUM7S0FFc0Q7Ozs7SUFFekQsUUFBUTtRQUNKLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDbEM7Ozs7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNwQzs7OztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzlCOzs7WUFqRUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLDZ6QkFBc0M7Z0JBQ3RDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2xEOzs7O1lBTndCLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGF0ZVBpY2tlck1vZGUsIERhdGVUaW1lUGlja2VyU2VydmljZSB9IGZyb20gJy4uL2RhdGUtdGltZS1waWNrZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZGF0ZS10aW1lLXBpY2tlci1oZWFkZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEhlYWRlckNvbXBvbmVudCB7XG5cbiAgICBjYW5Bc2NlbmQkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy5kYXRlcGlja2VyLm1vZGUkLnBpcGUobWFwKG1vZGUgPT4gbW9kZSAhPT0gRGF0ZVBpY2tlck1vZGUuWWVhcikpO1xuICAgIFxuICAgIG1vZGUkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmRhdGVwaWNrZXIubW9kZSQucGlwZShtYXAobW9kZSA9PiB7XG4gICAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyTW9kZS5EYXk6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdEYXknO1xuICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyTW9kZS5Nb250aDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ01vbnRoJztcbiAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlck1vZGUuWWVhcjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1llYXInO1xuICAgICAgICB9XG4gICAgfSkpO1xuXG4gICAgaGVhZGVyQXJpYSQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuZGF0ZXBpY2tlci5tb2RlJC5waXBlKG1hcChtb2RlID0+IHtcbiAgICAgICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJNb2RlLkRheTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1N3aXRjaCB0byBzaG93IG1vbnRocyBpbiB0aGUgeWVhcic7XG4gICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJNb2RlLk1vbnRoOlxuICAgICAgICAgICAgICAgIHJldHVybiAnU3dpdGNoIHRvIHNob3cgeWVhcnMgaW4gdGhlIGRlY2FkZSc7XG4gICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJNb2RlLlllYXI6XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgfSkpO1xuXG4gICAgcHJldmlvdXNBcmlhJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5kYXRlcGlja2VyLm1vZGUkLnBpcGUobWFwKG1vZGUgPT4ge1xuICAgICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlck1vZGUuRGF5OlxuICAgICAgICAgICAgICAgIHJldHVybiAnUHJldmlvdXMgbW9udGgnO1xuICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyTW9kZS5Nb250aDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1ByZXZpb3VzIHllYXInO1xuICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyTW9kZS5ZZWFyOlxuICAgICAgICAgICAgICAgIHJldHVybiAnUHJldmlvdXMgZGVjYWRlJztcbiAgICAgICAgfVxuICAgIH0pKTtcblxuICAgIG5leHRBcmlhJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5kYXRlcGlja2VyLm1vZGUkLnBpcGUobWFwKG1vZGUgPT4ge1xuICAgICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlck1vZGUuRGF5OlxuICAgICAgICAgICAgICAgIHJldHVybiAnTmV4dCBtb250aCc7XG4gICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJNb2RlLk1vbnRoOlxuICAgICAgICAgICAgICAgIHJldHVybiAnTmV4dCB5ZWFyJztcbiAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlck1vZGUuWWVhcjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ05leHQgZGVjYWRlJztcbiAgICAgICAgfVxuICAgIH0pKTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRlcGlja2VyOiBEYXRlVGltZVBpY2tlclNlcnZpY2UpIHsgfVxuXG4gICAgcHJldmlvdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0ZXBpY2tlci5nb1RvUHJldmlvdXMoKTtcbiAgICB9XG5cbiAgICBhc2NlbmQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0ZXBpY2tlci5nb1RvUGFyZW50TW9kZSgpO1xuICAgIH1cblxuICAgIG5leHQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0ZXBpY2tlci5nb1RvTmV4dCgpO1xuICAgIH1cbn0iXX0=