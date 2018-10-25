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
    const /** @type {?} */ grid = [];
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
    const /** @type {?} */ list = [];
    for (let /** @type {?} */ idx = start; idx <= end; idx++) {
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
    let /** @type {?} */ dates = [];
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
export const /** @type {?} */ months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const /** @type {?} */ monthsShort = months.map(month => month.substring(0, 3));
/**
 * Export an array of all the available days of the week
 */
export const /** @type {?} */ weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const /** @type {?} */ weekdaysShort = weekdays.map(weekday => weekday.substring(0, 3));
/**
 * Export the default set of time zone
 */
export const /** @type {?} */ timezones = [
    { name: 'GMT-11', offset: 660 },
    { name: 'GMT-10', offset: 600 },
    { name: 'GMT-9', offset: 540 },
    { name: 'GMT-8', offset: 480 },
    { name: 'GMT-7', offset: 420 },
    { name: 'GMT-6', offset: 360 },
    { name: 'GMT-5', offset: 300 },
    { name: 'GMT-4', offset: 240 },
    { name: 'GMT-3', offset: 180 },
    { name: 'GMT-2', offset: 120 },
    { name: 'GMT-1', offset: 60 },
    { name: 'GMT', offset: 0 },
    { name: 'GMT+1', offset: -60 },
    { name: 'GMT+2', offset: -120 },
    { name: 'GMT+3', offset: -180 },
    { name: 'GMT+4', offset: -240 },
    { name: 'GMT+5', offset: -300 },
    { name: 'GMT+6', offset: -360 },
    { name: 'GMT+7', offset: -420 },
    { name: 'GMT+8', offset: -480 },
    { name: 'GMT+9', offset: -540 },
    { name: 'GMT+10', offset: -600 },
    { name: 'GMT+11', offset: -660 },
    { name: 'GMT+12', offset: -720 }
];
/**
 * @record
 */
export function DateTimePickerTimezone() { }
function DateTimePickerTimezone_tsickle_Closure_declarations() {
    /** @type {?} */
    DateTimePickerTimezone.prototype.name;
    /** @type {?} */
    DateTimePickerTimezone.prototype.offset;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF0ZS10aW1lLXBpY2tlci51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUtBLE1BQU0sa0JBQXFCLEtBQVUsRUFBRSxPQUFlOztJQUdsRCxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV2Qix1QkFBTSxJQUFJLEdBQVUsRUFBRSxDQUFDO0lBRXZCLE9BQU8sS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUN2QztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7Q0FDZjs7Ozs7OztBQU9ELE1BQU0sZ0JBQWdCLEtBQWEsRUFBRSxHQUFXO0lBQzVDLHVCQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsR0FBRyxDQUFDLENBQUMscUJBQUksR0FBRyxHQUFHLEtBQUssRUFBRSxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsQjtJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7Q0FDZjs7Ozs7OztBQU9ELE1BQU0sb0JBQW9CLEtBQVcsRUFBRSxHQUFTO0lBRTVDLHFCQUFJLEtBQUssR0FBVyxFQUFFLENBQUM7O0lBR3ZCLE9BQU8sS0FBSyxJQUFJLEdBQUcsRUFBRSxDQUFDOztRQUdsQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7O1FBRzVCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3RDO0lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztDQUNoQjs7Ozs7OztBQU9ELE1BQU0sc0JBQXNCLElBQVUsRUFBRSxJQUFVO0lBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNwQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNuQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0NBQ2pEOzs7Ozs7O0FBS0QsTUFBTSx5QkFBeUIsT0FBYSxFQUFFLE9BQWE7SUFDdkQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7Q0FDbEQ7Ozs7Ozs7QUFLRCxNQUFNLDZCQUE2QixPQUErQixFQUFFLE9BQStCO0lBQy9GLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDO0NBQzdFOzs7O0FBS0QsTUFBTSxDQUFDLHVCQUFNLE1BQU0sR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDakosTUFBTSxDQUFDLHVCQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztBQUt0RSxNQUFNLENBQUMsdUJBQU0sUUFBUSxHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDdkcsTUFBTSxDQUFDLHVCQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztBQUc5RSxNQUFNLENBQUMsdUJBQU0sU0FBUyxHQUE2QjtJQUMvQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUMvQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUMvQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUM5QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUM5QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUM5QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUM5QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUM5QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUM5QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUM5QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUM5QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtJQUM3QixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtJQUMxQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzlCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUU7SUFDL0IsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRTtJQUMvQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFO0lBQy9CLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUU7SUFDL0IsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRTtJQUMvQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFO0lBQy9CLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUU7SUFDL0IsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRTtJQUMvQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFO0lBQ2hDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUU7SUFDaEMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRTtDQUNuQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb252ZXJ0IGEgc2luZ2xlIGRpbWVuc2lvbiBhcnJheSB0byBhIGRvdWJsZSBkaW1lbnNpb24gYXJyYXlcbiAqIEBwYXJhbSBpdGVtcyB0aGUgc2luZ2xlIGRpbWVuc2lvbiBhcnJheSB0byBjb252ZXJ0XG4gKiBAcGFyYW0gY29sdW1ucyB0aGUgbnVtYmVyIG9mIGl0ZW1zIGVhY2ggYXJyYXkgc2hvdWxkIGhhdmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdyaWRpZnk8VD4oaXRlbXM6IFRbXSwgY29sdW1uczogbnVtYmVyKTogVFtdW10ge1xuXG4gICAgLy8gY3JlYXRlIGEgY29weSBvZiBhcnJheSBzbyBub3QgdG8gZWZmZWN0IHRoZSBvcmlnaW5hbFxuICAgIGl0ZW1zID0gaXRlbXMuc2xpY2UoMCk7XG5cbiAgICBjb25zdCBncmlkOiBUW11bXSA9IFtdO1xuXG4gICAgd2hpbGUgKGl0ZW1zLmxlbmd0aCkge1xuICAgICAgICBncmlkLnB1c2goaXRlbXMuc3BsaWNlKDAsIGNvbHVtbnMpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ3JpZDtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYW4gYXJyYXkgb2YgbnVtYmVycyBiZXR3ZWVuIHR3byBsaW1pdHNcbiAqIEBwYXJhbSBzdGFydCB0aGUgbG93ZXIgbGltaXRcbiAqIEBwYXJhbSBlbmQgdGhlIHVwcGVyIGxpbWl0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5nZShzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcik6IG51bWJlcltdIHtcbiAgICBjb25zdCBsaXN0OiBudW1iZXJbXSA9IFtdO1xuXG4gICAgZm9yIChsZXQgaWR4ID0gc3RhcnQ7IGlkeCA8PSBlbmQ7IGlkeCsrKSB7XG4gICAgICAgIGxpc3QucHVzaChpZHgpO1xuICAgIH1cblxuICAgIHJldHVybiBsaXN0O1xufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBhcnJheSBvZiBkYXRlcyBiZXR3ZWVuIHR3byBwb2ludHNcbiAqIEBwYXJhbSBzdGFydCB0aGUgZGF0ZSB0byBzdGFydCB0aGUgYXJyYXlcbiAqIEBwYXJhbSBlbmQgdGhlIGRhdGUgdG8gZW5kIHRoZSBhcnJheVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGF0ZVJhbmdlKHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUpOiBEYXRlW10ge1xuXG4gICAgbGV0IGRhdGVzOiBEYXRlW10gPSBbXTtcblxuICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgdGhlIGRheXMgYmV0d2VlbiB0aGUgZGF0ZSByYW5nZVxuICAgIHdoaWxlIChzdGFydCA8PSBlbmQpIHtcblxuICAgICAgICAvLyBhZGQgdGhlIGRhdGUgdG8gdGhlIGFycmF5XG4gICAgICAgIGRhdGVzLnB1c2gobmV3IERhdGUoc3RhcnQpKTtcblxuICAgICAgICAvLyBtb3ZlIHRvIHRoZSBuZXh0IGRheVxuICAgICAgICBzdGFydC5zZXREYXRlKHN0YXJ0LmdldERhdGUoKSArIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRlcztcbn1cblxuLyoqXG4gKiBDb21wYXJlIHR3byBkYXRlcyB0byBzZWUgaWYgdGhleSBhcmUgb24gdGhlIHNhbWUgZGF5XG4gKiBAcGFyYW0gZGF5MSB0aGUgZmlyc3QgZGF0ZSB0byBjb21wYXJlXG4gKiBAcGFyYW0gZGF5MiB0aGUgc2Vjb25kIGRhdGUgdG8gY29tcGFyZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZURheXMoZGF5MTogRGF0ZSwgZGF5MjogRGF0ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBkYXkxLmdldERhdGUoKSA9PT0gZGF5Mi5nZXREYXRlKCkgJiZcbiAgICAgICAgZGF5MS5nZXRNb250aCgpID09PSBkYXkyLmdldE1vbnRoKCkgJiZcbiAgICAgICAgZGF5MS5nZXRGdWxsWWVhcigpID09PSBkYXkyLmdldEZ1bGxZZWFyKCk7XG59XG5cbi8qKlxuICogRGF0ZSBjb21wYXJpc29uIGZvciB1c2UgcHJpbWFyaWx5IHdpdGggZGlzdGluY3RVbnRpbENoYW5nZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRhdGVDb21wYXJhdG9yKGRhdGVPbmU6IERhdGUsIGRhdGVUd286IERhdGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZGF0ZU9uZS5nZXRUaW1lKCkgPT09IGRhdGVUd28uZ2V0VGltZSgpO1xufVxuXG4vKipcbiAqIFRpbWV6b25lIGNvbXBhcmlzb24gZm9yIHVzZSBwcmltYXJpbHkgd2l0aCBkaXN0aW5jdFVudGlsQ2hhbmdlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gdGltZXpvbmVDb21wYXJhdG9yKHpvbmVPbmU6IERhdGVUaW1lUGlja2VyVGltZXpvbmUsIHpvbmVUd286IERhdGVUaW1lUGlja2VyVGltZXpvbmUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gem9uZU9uZS5uYW1lID09PSB6b25lVHdvLm5hbWUgJiYgem9uZU9uZS5vZmZzZXQgPT09IHpvbmVUd28ub2Zmc2V0O1xufVxuXG4vKipcbiAqIEV4cG9ydCBhbiBhcnJheSBvZiBhbGwgdGhlIGF2YWlsYWJsZSBtb250aHNcbiAqL1xuZXhwb3J0IGNvbnN0IG1vbnRocyA9IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddO1xuZXhwb3J0IGNvbnN0IG1vbnRoc1Nob3J0ID0gbW9udGhzLm1hcChtb250aCA9PiBtb250aC5zdWJzdHJpbmcoMCwgMykpO1xuXG4vKipcbiAqIEV4cG9ydCBhbiBhcnJheSBvZiBhbGwgdGhlIGF2YWlsYWJsZSBkYXlzIG9mIHRoZSB3ZWVrXG4gKi9cbmV4cG9ydCBjb25zdCB3ZWVrZGF5cyA9IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXTtcbmV4cG9ydCBjb25zdCB3ZWVrZGF5c1Nob3J0ID0gd2Vla2RheXMubWFwKHdlZWtkYXkgPT4gd2Vla2RheS5zdWJzdHJpbmcoMCwgMykpO1xuXG4vKiogRXhwb3J0IHRoZSBkZWZhdWx0IHNldCBvZiB0aW1lIHpvbmUgKi9cbmV4cG9ydCBjb25zdCB0aW1lem9uZXM6IERhdGVUaW1lUGlja2VyVGltZXpvbmVbXSA9IFtcbiAgICB7IG5hbWU6ICdHTVQtMTEnLCBvZmZzZXQ6IDY2MCB9LFxuICAgIHsgbmFtZTogJ0dNVC0xMCcsIG9mZnNldDogNjAwIH0sXG4gICAgeyBuYW1lOiAnR01ULTknLCBvZmZzZXQ6IDU0MCB9LFxuICAgIHsgbmFtZTogJ0dNVC04Jywgb2Zmc2V0OiA0ODAgfSxcbiAgICB7IG5hbWU6ICdHTVQtNycsIG9mZnNldDogNDIwIH0sXG4gICAgeyBuYW1lOiAnR01ULTYnLCBvZmZzZXQ6IDM2MCB9LFxuICAgIHsgbmFtZTogJ0dNVC01Jywgb2Zmc2V0OiAzMDAgfSxcbiAgICB7IG5hbWU6ICdHTVQtNCcsIG9mZnNldDogMjQwIH0sXG4gICAgeyBuYW1lOiAnR01ULTMnLCBvZmZzZXQ6IDE4MCB9LFxuICAgIHsgbmFtZTogJ0dNVC0yJywgb2Zmc2V0OiAxMjAgfSxcbiAgICB7IG5hbWU6ICdHTVQtMScsIG9mZnNldDogNjAgfSxcbiAgICB7IG5hbWU6ICdHTVQnLCBvZmZzZXQ6IDAgfSxcbiAgICB7IG5hbWU6ICdHTVQrMScsIG9mZnNldDogLTYwIH0sXG4gICAgeyBuYW1lOiAnR01UKzInLCBvZmZzZXQ6IC0xMjAgfSxcbiAgICB7IG5hbWU6ICdHTVQrMycsIG9mZnNldDogLTE4MCB9LFxuICAgIHsgbmFtZTogJ0dNVCs0Jywgb2Zmc2V0OiAtMjQwIH0sXG4gICAgeyBuYW1lOiAnR01UKzUnLCBvZmZzZXQ6IC0zMDAgfSxcbiAgICB7IG5hbWU6ICdHTVQrNicsIG9mZnNldDogLTM2MCB9LFxuICAgIHsgbmFtZTogJ0dNVCs3Jywgb2Zmc2V0OiAtNDIwIH0sXG4gICAgeyBuYW1lOiAnR01UKzgnLCBvZmZzZXQ6IC00ODAgfSxcbiAgICB7IG5hbWU6ICdHTVQrOScsIG9mZnNldDogLTU0MCB9LFxuICAgIHsgbmFtZTogJ0dNVCsxMCcsIG9mZnNldDogLTYwMCB9LFxuICAgIHsgbmFtZTogJ0dNVCsxMScsIG9mZnNldDogLTY2MCB9LFxuICAgIHsgbmFtZTogJ0dNVCsxMicsIG9mZnNldDogLTcyMCB9XG5dO1xuXG5leHBvcnQgaW50ZXJmYWNlIERhdGVUaW1lUGlja2VyVGltZXpvbmUge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBvZmZzZXQ6IG51bWJlcjtcbn0iXX0=