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
    { type: Injectable }
];
/** @nocollapse */
YearViewService.ctorParameters = () => [
    { type: DateTimePickerService }
];
function YearViewService_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci12aWV3LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL3llYXItdmlldy95ZWFyLXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNGLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFHM0QsTUFBTTs7OztJQVNGLFlBQW9CLFdBQWtDO1FBQWxDLGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtxQkFQOUMsSUFBSSxlQUFlLENBQW1CLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ3hDLElBQUksZUFBZSxDQUFTLElBQUksQ0FBQztxQkFFcEIsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7NkJBRXhCLElBQUksWUFBWSxFQUFFO1FBR3RDLHVCQUFNLElBQUksR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUU5RSx1QkFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLFlBQVk7YUFDakMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxLQUFLLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO1FBRXBILElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7Ozs7O0lBRUQsUUFBUSxDQUFDLElBQVk7UUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM3Qjs7OztJQUVELGtCQUFrQjtRQUNkLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztLQUN4Qzs7OztJQUVELGNBQWM7UUFDVixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUM7S0FDeEM7Ozs7O0lBRU8sY0FBYyxDQUFDLE9BQWUsSUFBSSxDQUFDLEtBQUs7UUFFNUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7O1FBR2xCLHVCQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBDLHVCQUFNLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUc3Qyx1QkFBTSxLQUFLLEdBQW1CLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ25ELE1BQU0sQ0FBQztnQkFDSCxJQUFJLEVBQUUsS0FBSztnQkFDWCxhQUFhLEVBQUUsS0FBSyxLQUFLLFdBQVc7Z0JBQ3BDLFlBQVksRUFBRSxLQUFLLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSzthQUN2RCxDQUFDO1NBQ0wsQ0FBQyxDQUFDOztRQUdILElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7UUFHOUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0lBTS9CLFNBQVMsQ0FBQyxJQUFZOztRQUcxQix1QkFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuQyx1QkFBTSxHQUFHLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQzs7UUFHdEIsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7Ozs7WUF4RW5FLFVBQVU7Ozs7WUFIcUIscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBEYXRlUGlja2VySGVhZGVyRXZlbnQsIERhdGVUaW1lUGlja2VyU2VydmljZSB9IGZyb20gJy4uL2RhdGUtdGltZS1waWNrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBncmlkaWZ5LCByYW5nZSB9IGZyb20gJy4uL2RhdGUtdGltZS1waWNrZXIudXRpbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgWWVhclZpZXdTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIGdyaWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxZZWFyVmlld0l0ZW1bXVtdPihbW11dKTtcbiAgICBmb2N1c2VkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPihudWxsKTtcblxuICAgIHByaXZhdGUgX3llYXI6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RhdGVwaWNrZXI6IERhdGVUaW1lUGlja2VyU2VydmljZSkge1xuICAgICAgICBjb25zdCB5ZWFyID0gX2RhdGVwaWNrZXIueWVhciQuc3Vic2NyaWJlKF95ZWFyID0+IHRoaXMuY3JlYXRlWWVhckdyaWQoX3llYXIpKTtcblxuICAgICAgICBjb25zdCBldmVudCA9IF9kYXRlcGlja2VyLmhlYWRlckV2ZW50JFxuICAgICAgICAgICAgLnN1YnNjcmliZShfZXZlbnQgPT4gX2V2ZW50ID09PSBEYXRlUGlja2VySGVhZGVyRXZlbnQuTmV4dCA/IHRoaXMuZ29Ub05leHREZWNhZGUoKSA6IHRoaXMuZ29Ub1ByZXZpb3VzRGVjYWRlKCkpO1xuXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQoeWVhcik7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQoZXZlbnQpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBzZXRGb2N1cyh5ZWFyOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkJC5uZXh0KHllYXIpO1xuICAgICAgICB0aGlzLmNyZWF0ZVllYXJHcmlkKHllYXIpO1xuICAgIH1cblxuICAgIGdvVG9QcmV2aW91c0RlY2FkZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jcmVhdGVZZWFyR3JpZCh0aGlzLl95ZWFyIC0gMTApO1xuICAgIH1cblxuICAgIGdvVG9OZXh0RGVjYWRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNyZWF0ZVllYXJHcmlkKHRoaXMuX3llYXIgKyAxMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVZZWFyR3JpZCh5ZWFyOiBudW1iZXIgPSB0aGlzLl95ZWFyKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5feWVhciA9IHllYXI7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSB5ZWFycyB0byBkaXNwbGF5XG4gICAgICAgIGNvbnN0IGRlY2FkZSA9IHRoaXMuZ2V0RGVjYWRlKHllYXIpO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRZZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuXG4gICAgICAgIC8vIHByb2R1Y2UgaXRlbXMgaW4gdGhlIGNvcnJlY3QgZm9ybWF0XG4gICAgICAgIGNvbnN0IGl0ZW1zOiBZZWFyVmlld0l0ZW1bXSA9IGRlY2FkZS5yYW5nZS5tYXAoX3llYXIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB5ZWFyOiBfeWVhcixcbiAgICAgICAgICAgICAgICBpc0N1cnJlbnRZZWFyOiBfeWVhciA9PT0gY3VycmVudFllYXIsXG4gICAgICAgICAgICAgICAgaXNBY3RpdmVZZWFyOiBfeWVhciA9PT0gdGhpcy5fZGF0ZXBpY2tlci55ZWFyJC52YWx1ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBoZWFkZXIgdGV4dFxuICAgICAgICB0aGlzLl9kYXRlcGlja2VyLnNldEhlYWRlcihkZWNhZGUuc3RhcnQgKyAnIC0gJyArIGRlY2FkZS5lbmQpO1xuXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgZ3JpZFxuICAgICAgICB0aGlzLmdyaWQkLm5leHQoZ3JpZGlmeShpdGVtcywgNCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgeWVhcnMgaW4gdGhlIGN1cnJlbnQgZGVjYWRlIHRvIGRpc3BsYXlcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldERlY2FkZSh5ZWFyOiBudW1iZXIpOiBZZWFyUmFuZ2Uge1xuXG4gICAgICAgIC8vIGZpZ3VyZSB0aGUgc3RhcnQgYW5kIGVuZCBwb2ludHNcbiAgICAgICAgY29uc3Qgc3RhcnQgPSAoeWVhciAtICh5ZWFyICUgMTApKTtcbiAgICAgICAgY29uc3QgZW5kID0gc3RhcnQgKyA5O1xuXG4gICAgICAgIC8vIGNyZWF0ZSBhbiBhcnJheSBjb250YWluaW5nIGFsbCB0aGUgbnVtYmVycyBiZXR3ZWVuIHRoZSBzdGFydCBhbmQgZW5kIHBvaW50c1xuICAgICAgICByZXR1cm4geyBzdGFydDogc3RhcnQsIGVuZDogZW5kLCByYW5nZTogcmFuZ2Uoc3RhcnQsIGVuZCkgfTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBZZWFyUmFuZ2Uge1xuICAgIHN0YXJ0OiBudW1iZXI7XG4gICAgZW5kOiBudW1iZXI7XG4gICAgcmFuZ2U6IG51bWJlcltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFllYXJWaWV3SXRlbSB7XG4gICAgeWVhcjogbnVtYmVyO1xuICAgIGlzQ3VycmVudFllYXI6IGJvb2xlYW47XG4gICAgaXNBY3RpdmVZZWFyOiBib29sZWFuO1xufSJdfQ==