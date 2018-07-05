/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Convert a single dimension array to a double dimension array
 * @template T
 * @param {?} items the single dimension array to convert
 * @param {?} columns the number of items each array should have
 * @return {?}
 */
export function gridify(items, columns) {
    // create a copy of array so not to effect the original
    items = items.slice(0);
    var /** @type {?} */ grid = [];
    while (items.length) {
        grid.push(items.splice(0, columns));
    }
    return grid;
}
/**
 * Create an array of numbers between two limits
 * @param {?} start the lower limit
 * @param {?} end the upper limit
 * @return {?}
 */
export function range(start, end) {
    var /** @type {?} */ list = [];
    for (var /** @type {?} */ idx = start; idx <= end; idx++) {
        list.push(idx);
    }
    return list;
}
/**
 * Create an array of dates between two points
 * @param {?} start the date to start the array
 * @param {?} end the date to end the array
 * @return {?}
 */
export function dateRange(start, end) {
    var /** @type {?} */ dates = [];
    // loop through all the days between the date range
    while (start <= end) {
        // add the date to the array
        dates.push(new Date(start));
        // move to the next day
        start.setDate(start.getDate() + 1);
    }
    return dates;
}
/**
 * Compare two dates to see if they are on the same day
 * @param {?} day1 the first date to compare
 * @param {?} day2 the second date to compare
 * @return {?}
 */
export function compareDays(day1, day2) {
    return day1.getDate() === day2.getDate() &&
        day1.getMonth() === day2.getMonth() &&
        day1.getFullYear() === day2.getFullYear();
}
/**
 * Date comparison for use primarily with distinctUntilChanged
 * @param {?} dateOne
 * @param {?} dateTwo
 * @return {?}
 */
export function dateComparator(dateOne, dateTwo) {
    return dateOne.getTime() === dateTwo.getTime();
}
/**
 * Timezone comparison for use primarily with distinctUntilChanged
 * @param {?} zoneOne
 * @param {?} zoneTwo
 * @return {?}
 */
export function timezoneComparator(zoneOne, zoneTwo) {
    return zoneOne.name === zoneTwo.name && zoneOne.offset === zoneTwo.offset;
}
/**
 * Export an array of all the available months
 */
export var /** @type {?} */ months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export var /** @type {?} */ monthsShort = months.map(function (month) { return month.substring(0, 3); });
/**
 * Export an array of all the available days of the week
 */
export var /** @type {?} */ weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export var /** @type {?} */ weekdaysShort = weekdays.map(function (weekday) { return weekday.substring(0, 3); });

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF0ZS10aW1lLXBpY2tlci51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE1BQU0sa0JBQXFCLEtBQVUsRUFBRSxPQUFlOztJQUdsRCxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV2QixxQkFBTSxJQUFJLEdBQVUsRUFBRSxDQUFDO0lBRXZCLE9BQU8sS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUN2QztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7Q0FDZjs7Ozs7OztBQU9ELE1BQU0sZ0JBQWdCLEtBQWEsRUFBRSxHQUFXO0lBQzVDLHFCQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsR0FBRyxDQUFDLENBQUMscUJBQUksR0FBRyxHQUFHLEtBQUssRUFBRSxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsQjtJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7Q0FDZjs7Ozs7OztBQU9ELE1BQU0sb0JBQW9CLEtBQVcsRUFBRSxHQUFTO0lBRTVDLHFCQUFJLEtBQUssR0FBVyxFQUFFLENBQUM7O0lBR3ZCLE9BQU8sS0FBSyxJQUFJLEdBQUcsRUFBRSxDQUFDOztRQUdsQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7O1FBRzVCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3RDO0lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztDQUNoQjs7Ozs7OztBQU9ELE1BQU0sc0JBQXNCLElBQVUsRUFBRSxJQUFVO0lBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNwQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNuQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0NBQ2pEOzs7Ozs7O0FBS0QsTUFBTSx5QkFBeUIsT0FBYSxFQUFFLE9BQWE7SUFDdkQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7Q0FDbEQ7Ozs7Ozs7QUFLRCxNQUFNLDZCQUE2QixPQUErQixFQUFFLE9BQStCO0lBQy9GLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDO0NBQzdFOzs7O0FBS0QsTUFBTSxDQUFDLHFCQUFNLE1BQU0sR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDakosTUFBTSxDQUFDLHFCQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQXJCLENBQXFCLENBQUMsQ0FBQzs7OztBQUt0RSxNQUFNLENBQUMscUJBQU0sUUFBUSxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDdkcsTUFBTSxDQUFDLHFCQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQXZCLENBQXVCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGVUaW1lUGlja2VyVGltZXpvbmUgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXIuc2VydmljZSc7XG5cblxuLyoqXG4gKiBDb252ZXJ0IGEgc2luZ2xlIGRpbWVuc2lvbiBhcnJheSB0byBhIGRvdWJsZSBkaW1lbnNpb24gYXJyYXlcbiAqIEBwYXJhbSBpdGVtcyB0aGUgc2luZ2xlIGRpbWVuc2lvbiBhcnJheSB0byBjb252ZXJ0XG4gKiBAcGFyYW0gY29sdW1ucyB0aGUgbnVtYmVyIG9mIGl0ZW1zIGVhY2ggYXJyYXkgc2hvdWxkIGhhdmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdyaWRpZnk8VD4oaXRlbXM6IFRbXSwgY29sdW1uczogbnVtYmVyKTogVFtdW10ge1xuXG4gICAgLy8gY3JlYXRlIGEgY29weSBvZiBhcnJheSBzbyBub3QgdG8gZWZmZWN0IHRoZSBvcmlnaW5hbFxuICAgIGl0ZW1zID0gaXRlbXMuc2xpY2UoMCk7XG5cbiAgICBjb25zdCBncmlkOiBUW11bXSA9IFtdO1xuXG4gICAgd2hpbGUgKGl0ZW1zLmxlbmd0aCkge1xuICAgICAgICBncmlkLnB1c2goaXRlbXMuc3BsaWNlKDAsIGNvbHVtbnMpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ3JpZDtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYW4gYXJyYXkgb2YgbnVtYmVycyBiZXR3ZWVuIHR3byBsaW1pdHNcbiAqIEBwYXJhbSBzdGFydCB0aGUgbG93ZXIgbGltaXRcbiAqIEBwYXJhbSBlbmQgdGhlIHVwcGVyIGxpbWl0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5nZShzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcik6IG51bWJlcltdIHtcbiAgICBjb25zdCBsaXN0OiBudW1iZXJbXSA9IFtdO1xuXG4gICAgZm9yIChsZXQgaWR4ID0gc3RhcnQ7IGlkeCA8PSBlbmQ7IGlkeCsrKSB7XG4gICAgICAgIGxpc3QucHVzaChpZHgpO1xuICAgIH1cblxuICAgIHJldHVybiBsaXN0O1xufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBhcnJheSBvZiBkYXRlcyBiZXR3ZWVuIHR3byBwb2ludHNcbiAqIEBwYXJhbSBzdGFydCB0aGUgZGF0ZSB0byBzdGFydCB0aGUgYXJyYXlcbiAqIEBwYXJhbSBlbmQgdGhlIGRhdGUgdG8gZW5kIHRoZSBhcnJheVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGF0ZVJhbmdlKHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUpOiBEYXRlW10ge1xuXG4gICAgbGV0IGRhdGVzOiBEYXRlW10gPSBbXTtcblxuICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgdGhlIGRheXMgYmV0d2VlbiB0aGUgZGF0ZSByYW5nZVxuICAgIHdoaWxlIChzdGFydCA8PSBlbmQpIHtcblxuICAgICAgICAvLyBhZGQgdGhlIGRhdGUgdG8gdGhlIGFycmF5XG4gICAgICAgIGRhdGVzLnB1c2gobmV3IERhdGUoc3RhcnQpKTtcblxuICAgICAgICAvLyBtb3ZlIHRvIHRoZSBuZXh0IGRheVxuICAgICAgICBzdGFydC5zZXREYXRlKHN0YXJ0LmdldERhdGUoKSArIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRlcztcbn1cblxuLyoqXG4gKiBDb21wYXJlIHR3byBkYXRlcyB0byBzZWUgaWYgdGhleSBhcmUgb24gdGhlIHNhbWUgZGF5XG4gKiBAcGFyYW0gZGF5MSB0aGUgZmlyc3QgZGF0ZSB0byBjb21wYXJlXG4gKiBAcGFyYW0gZGF5MiB0aGUgc2Vjb25kIGRhdGUgdG8gY29tcGFyZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZURheXMoZGF5MTogRGF0ZSwgZGF5MjogRGF0ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBkYXkxLmdldERhdGUoKSA9PT0gZGF5Mi5nZXREYXRlKCkgJiZcbiAgICAgICAgZGF5MS5nZXRNb250aCgpID09PSBkYXkyLmdldE1vbnRoKCkgJiZcbiAgICAgICAgZGF5MS5nZXRGdWxsWWVhcigpID09PSBkYXkyLmdldEZ1bGxZZWFyKCk7XG59XG5cbi8qKlxuICogRGF0ZSBjb21wYXJpc29uIGZvciB1c2UgcHJpbWFyaWx5IHdpdGggZGlzdGluY3RVbnRpbENoYW5nZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRhdGVDb21wYXJhdG9yKGRhdGVPbmU6IERhdGUsIGRhdGVUd286IERhdGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZGF0ZU9uZS5nZXRUaW1lKCkgPT09IGRhdGVUd28uZ2V0VGltZSgpO1xufVxuXG4vKipcbiAqIFRpbWV6b25lIGNvbXBhcmlzb24gZm9yIHVzZSBwcmltYXJpbHkgd2l0aCBkaXN0aW5jdFVudGlsQ2hhbmdlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gdGltZXpvbmVDb21wYXJhdG9yKHpvbmVPbmU6IERhdGVUaW1lUGlja2VyVGltZXpvbmUsIHpvbmVUd286IERhdGVUaW1lUGlja2VyVGltZXpvbmUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gem9uZU9uZS5uYW1lID09PSB6b25lVHdvLm5hbWUgJiYgem9uZU9uZS5vZmZzZXQgPT09IHpvbmVUd28ub2Zmc2V0O1xufVxuXG4vKipcbiAqIEV4cG9ydCBhbiBhcnJheSBvZiBhbGwgdGhlIGF2YWlsYWJsZSBtb250aHNcbiAqL1xuZXhwb3J0IGNvbnN0IG1vbnRocyA9IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddO1xuZXhwb3J0IGNvbnN0IG1vbnRoc1Nob3J0ID0gbW9udGhzLm1hcChtb250aCA9PiBtb250aC5zdWJzdHJpbmcoMCwgMykpO1xuXG4vKipcbiAqIEV4cG9ydCBhbiBhcnJheSBvZiBhbGwgdGhlIGF2YWlsYWJsZSBkYXlzIG9mIHRoZSB3ZWVrXG4gKi9cbmV4cG9ydCBjb25zdCB3ZWVrZGF5cyA9IFsnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheScsICdTdW5kYXknXTtcbmV4cG9ydCBjb25zdCB3ZWVrZGF5c1Nob3J0ID0gd2Vla2RheXMubWFwKHdlZWtkYXkgPT4gd2Vla2RheS5zdWJzdHJpbmcoMCwgMykpOyJdfQ==