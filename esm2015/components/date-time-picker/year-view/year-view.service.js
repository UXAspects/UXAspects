/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { DatePickerHeaderEvent, DateTimePickerService } from '../date-time-picker.service';
import { gridify, range } from '../date-time-picker.utils';
export class YearViewService {
    /**
     * @param {?} _datepicker
     */
    constructor(_datepicker) {
        this._datepicker = _datepicker;
        this.grid$ = new BehaviorSubject([[]]);
        this.focused$ = new BehaviorSubject(null);
        this._year = new Date().getFullYear();
        this._subscription = new Subscription();
        const /** @type {?} */ year = _datepicker.year$.subscribe(_year => this.createYearGrid(_year));
        const /** @type {?} */ event = _datepicker.headerEvent$
            .subscribe(_event => _event === DatePickerHeaderEvent.Next ? this.goToNextDecade() : this.goToPreviousDecade());
        this._subscription.add(year);
        this._subscription.add(event);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @param {?} year
     * @return {?}
     */
    setFocus(year) {
        this.focused$.next(year);
        this.createYearGrid(year);
    }
    /**
     * @return {?}
     */
    goToPreviousDecade() {
        this.createYearGrid(this._year - 10);
    }
    /**
     * @return {?}
     */
    goToNextDecade() {
        this.createYearGrid(this._year + 10);
    }
    /**
     * @param {?=} year
     * @return {?}
     */
    createYearGrid(year = this._year) {
        this._year = year;
        // get the years to display
        const /** @type {?} */ decade = this.getDecade(year);
        const /** @type {?} */ currentYear = new Date().getFullYear();
        // produce items in the correct format
        const /** @type {?} */ items = decade.range.map(_year => {
            return {
                year: _year,
                isCurrentYear: _year === currentYear,
                isActiveYear: _year === this._datepicker.year$.value
            };
        });
        // update the header text
        this._datepicker.setHeader(decade.start + ' - ' + decade.end);
        // create the grid
        this.grid$.next(gridify(items, 4));
    }
    /**
     * Get the years in the current decade to display
     * @param {?} year
     * @return {?}
     */
    getDecade(year) {
        // figure the start and end points
        const /** @type {?} */ start = (year - (year % 10));
        const /** @type {?} */ end = start + 9;
        // create an array containing all the numbers between the start and end points
        return { start: start, end: end, range: range(start, end) };
    }
}
YearViewService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
YearViewService.ctorParameters = () => [
    { type: DateTimePickerService, },
];
function YearViewService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    YearViewService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    YearViewService.ctorParameters;
    /** @type {?} */
    YearViewService.prototype.grid$;
    /** @type {?} */
    YearViewService.prototype.focused$;
    /** @type {?} */
    YearViewService.prototype._year;
    /** @type {?} */
    YearViewService.prototype._subscription;
    /** @type {?} */
    YearViewService.prototype._datepicker;
}
/**
 * @record
 */
export function YearRange() { }
function YearRange_tsickle_Closure_declarations() {
    /** @type {?} */
    YearRange.prototype.start;
    /** @type {?} */
    YearRange.prototype.end;
    /** @type {?} */
    YearRange.prototype.range;
}
/**
 * @record
 */
export function YearViewItem() { }
function YearViewItem_tsickle_Closure_declarations() {
    /** @type {?} */
    YearViewItem.prototype.year;
    /** @type {?} */
    YearViewItem.prototype.isCurrentYear;
    /** @type {?} */
    YearViewItem.prototype.isActiveYear;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci12aWV3LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL3llYXItdmlldy95ZWFyLXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNGLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFHM0QsTUFBTTs7OztJQVNGLFlBQW9CLFdBQWtDO1FBQWxDLGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtxQkFQOUMsSUFBSSxlQUFlLENBQW1CLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ3hDLElBQUksZUFBZSxDQUFTLElBQUksQ0FBQztxQkFFcEIsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7NkJBRXhCLElBQUksWUFBWSxFQUFFO1FBR3RDLHVCQUFNLElBQUksR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRTlFLHVCQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsWUFBWTthQUNqQyxTQUFTLENBQUMsTUFBTSxJQUFJLE1BQU0sS0FBSyxxQkFBcUIsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7UUFFcEgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDakM7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQzs7Ozs7SUFFRCxRQUFRLENBQUMsSUFBWTtRQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzdCOzs7O0lBRUQsa0JBQWtCO1FBQ2QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0tBQ3hDOzs7O0lBRUQsY0FBYztRQUNWLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztLQUN4Qzs7Ozs7SUFFTyxjQUFjLENBQUMsT0FBZSxJQUFJLENBQUMsS0FBSztRQUU1QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzs7UUFHbEIsdUJBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFcEMsdUJBQU0sV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7O1FBRzdDLHVCQUFNLEtBQUssR0FBbUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSztZQUNoRCxNQUFNLENBQUM7Z0JBQ0gsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsYUFBYSxFQUFFLEtBQUssS0FBSyxXQUFXO2dCQUNwQyxZQUFZLEVBQUUsS0FBSyxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUs7YUFDdkQsQ0FBQztTQUNMLENBQUMsQ0FBQzs7UUFHSCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7O1FBRzlELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztJQU0vQixTQUFTLENBQUMsSUFBWTs7UUFHMUIsdUJBQU0sS0FBSyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkMsdUJBQU0sR0FBRyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7O1FBR3RCLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDOzs7O1lBeEVuRSxVQUFVOzs7O1lBSHFCLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgRGF0ZVBpY2tlckhlYWRlckV2ZW50LCBEYXRlVGltZVBpY2tlclNlcnZpY2UgfSBmcm9tICcuLi9kYXRlLXRpbWUtcGlja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgZ3JpZGlmeSwgcmFuZ2UgfSBmcm9tICcuLi9kYXRlLXRpbWUtcGlja2VyLnV0aWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFllYXJWaWV3U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBncmlkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8WWVhclZpZXdJdGVtW11bXT4oW1tdXSk7XG4gICAgZm9jdXNlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4obnVsbCk7XG5cbiAgICBwcml2YXRlIF95ZWFyOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kYXRlcGlja2VyOiBEYXRlVGltZVBpY2tlclNlcnZpY2UpIHtcbiAgICAgICAgY29uc3QgeWVhciA9IF9kYXRlcGlja2VyLnllYXIkLnN1YnNjcmliZShfeWVhciA9PiB0aGlzLmNyZWF0ZVllYXJHcmlkKF95ZWFyKSk7XG5cbiAgICAgICAgY29uc3QgZXZlbnQgPSBfZGF0ZXBpY2tlci5oZWFkZXJFdmVudCRcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoX2V2ZW50ID0+IF9ldmVudCA9PT0gRGF0ZVBpY2tlckhlYWRlckV2ZW50Lk5leHQgPyB0aGlzLmdvVG9OZXh0RGVjYWRlKCkgOiB0aGlzLmdvVG9QcmV2aW91c0RlY2FkZSgpKTtcblxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24uYWRkKHllYXIpO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24uYWRkKGV2ZW50KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMoeWVhcjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCQubmV4dCh5ZWFyKTtcbiAgICAgICAgdGhpcy5jcmVhdGVZZWFyR3JpZCh5ZWFyKTtcbiAgICB9XG5cbiAgICBnb1RvUHJldmlvdXNEZWNhZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY3JlYXRlWWVhckdyaWQodGhpcy5feWVhciAtIDEwKTtcbiAgICB9XG5cbiAgICBnb1RvTmV4dERlY2FkZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jcmVhdGVZZWFyR3JpZCh0aGlzLl95ZWFyICsgMTApO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlWWVhckdyaWQoeWVhcjogbnVtYmVyID0gdGhpcy5feWVhcik6IHZvaWQge1xuXG4gICAgICAgIHRoaXMuX3llYXIgPSB5ZWFyO1xuXG4gICAgICAgIC8vIGdldCB0aGUgeWVhcnMgdG8gZGlzcGxheVxuICAgICAgICBjb25zdCBkZWNhZGUgPSB0aGlzLmdldERlY2FkZSh5ZWFyKTtcblxuICAgICAgICBjb25zdCBjdXJyZW50WWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcblxuICAgICAgICAvLyBwcm9kdWNlIGl0ZW1zIGluIHRoZSBjb3JyZWN0IGZvcm1hdFxuICAgICAgICBjb25zdCBpdGVtczogWWVhclZpZXdJdGVtW10gPSBkZWNhZGUucmFuZ2UubWFwKF95ZWFyID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgeWVhcjogX3llYXIsXG4gICAgICAgICAgICAgICAgaXNDdXJyZW50WWVhcjogX3llYXIgPT09IGN1cnJlbnRZZWFyLFxuICAgICAgICAgICAgICAgIGlzQWN0aXZlWWVhcjogX3llYXIgPT09IHRoaXMuX2RhdGVwaWNrZXIueWVhciQudmFsdWVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgaGVhZGVyIHRleHRcbiAgICAgICAgdGhpcy5fZGF0ZXBpY2tlci5zZXRIZWFkZXIoZGVjYWRlLnN0YXJ0ICsgJyAtICcgKyBkZWNhZGUuZW5kKTtcblxuICAgICAgICAvLyBjcmVhdGUgdGhlIGdyaWRcbiAgICAgICAgdGhpcy5ncmlkJC5uZXh0KGdyaWRpZnkoaXRlbXMsIDQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHllYXJzIGluIHRoZSBjdXJyZW50IGRlY2FkZSB0byBkaXNwbGF5XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXREZWNhZGUoeWVhcjogbnVtYmVyKTogWWVhclJhbmdlIHtcblxuICAgICAgICAvLyBmaWd1cmUgdGhlIHN0YXJ0IGFuZCBlbmQgcG9pbnRzXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gKHllYXIgLSAoeWVhciAlIDEwKSk7XG4gICAgICAgIGNvbnN0IGVuZCA9IHN0YXJ0ICsgOTtcblxuICAgICAgICAvLyBjcmVhdGUgYW4gYXJyYXkgY29udGFpbmluZyBhbGwgdGhlIG51bWJlcnMgYmV0d2VlbiB0aGUgc3RhcnQgYW5kIGVuZCBwb2ludHNcbiAgICAgICAgcmV0dXJuIHsgc3RhcnQ6IHN0YXJ0LCBlbmQ6IGVuZCwgcmFuZ2U6IHJhbmdlKHN0YXJ0LCBlbmQpIH07XG4gICAgfVxufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgWWVhclJhbmdlIHtcbiAgICBzdGFydDogbnVtYmVyO1xuICAgIGVuZDogbnVtYmVyO1xuICAgIHJhbmdlOiBudW1iZXJbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBZZWFyVmlld0l0ZW0ge1xuICAgIHllYXI6IG51bWJlcjtcbiAgICBpc0N1cnJlbnRZZWFyOiBib29sZWFuO1xuICAgIGlzQWN0aXZlWWVhcjogYm9vbGVhbjtcbn0iXX0=