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
export const /** @type {?} */ weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const /** @type {?} */ weekdaysShort = weekdays.map(weekday => weekday.substring(0, 3));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF0ZS10aW1lLXBpY2tlci51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE1BQU0sa0JBQXFCLEtBQVUsRUFBRSxPQUFlOztJQUdsRCxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV2Qix1QkFBTSxJQUFJLEdBQVUsRUFBRSxDQUFDO0lBRXZCLE9BQU8sS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUN2QztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7Q0FDZjs7Ozs7OztBQU9ELE1BQU0sZ0JBQWdCLEtBQWEsRUFBRSxHQUFXO0lBQzVDLHVCQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsR0FBRyxDQUFDLENBQUMscUJBQUksR0FBRyxHQUFHLEtBQUssRUFBRSxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsQjtJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7Q0FDZjs7Ozs7OztBQU9ELE1BQU0sb0JBQW9CLEtBQVcsRUFBRSxHQUFTO0lBRTVDLHFCQUFJLEtBQUssR0FBVyxFQUFFLENBQUM7O0lBR3ZCLE9BQU8sS0FBSyxJQUFJLEdBQUcsRUFBRSxDQUFDOztRQUdsQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7O1FBRzVCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3RDO0lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztDQUNoQjs7Ozs7OztBQU9ELE1BQU0sc0JBQXNCLElBQVUsRUFBRSxJQUFVO0lBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNwQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNuQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0NBQ2pEOzs7Ozs7O0FBS0QsTUFBTSx5QkFBeUIsT0FBYSxFQUFFLE9BQWE7SUFDdkQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7Q0FDbEQ7Ozs7Ozs7QUFLRCxNQUFNLDZCQUE2QixPQUErQixFQUFFLE9BQStCO0lBQy9GLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDO0NBQzdFOzs7O0FBS0QsTUFBTSxDQUFDLHVCQUFNLE1BQU0sR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDakosTUFBTSxDQUFDLHVCQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0FBS3RFLE1BQU0sQ0FBQyx1QkFBTSxRQUFRLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN2RyxNQUFNLENBQUMsdUJBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRlVGltZVBpY2tlclRpbWV6b25lIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLnNlcnZpY2UnO1xuXG5cbi8qKlxuICogQ29udmVydCBhIHNpbmdsZSBkaW1lbnNpb24gYXJyYXkgdG8gYSBkb3VibGUgZGltZW5zaW9uIGFycmF5XG4gKiBAcGFyYW0gaXRlbXMgdGhlIHNpbmdsZSBkaW1lbnNpb24gYXJyYXkgdG8gY29udmVydFxuICogQHBhcmFtIGNvbHVtbnMgdGhlIG51bWJlciBvZiBpdGVtcyBlYWNoIGFycmF5IHNob3VsZCBoYXZlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBncmlkaWZ5PFQ+KGl0ZW1zOiBUW10sIGNvbHVtbnM6IG51bWJlcik6IFRbXVtdIHtcblxuICAgIC8vIGNyZWF0ZSBhIGNvcHkgb2YgYXJyYXkgc28gbm90IHRvIGVmZmVjdCB0aGUgb3JpZ2luYWxcbiAgICBpdGVtcyA9IGl0ZW1zLnNsaWNlKDApO1xuXG4gICAgY29uc3QgZ3JpZDogVFtdW10gPSBbXTtcblxuICAgIHdoaWxlIChpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgZ3JpZC5wdXNoKGl0ZW1zLnNwbGljZSgwLCBjb2x1bW5zKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdyaWQ7XG59XG5cbi8qKlxuICogQ3JlYXRlIGFuIGFycmF5IG9mIG51bWJlcnMgYmV0d2VlbiB0d28gbGltaXRzXG4gKiBAcGFyYW0gc3RhcnQgdGhlIGxvd2VyIGxpbWl0XG4gKiBAcGFyYW0gZW5kIHRoZSB1cHBlciBsaW1pdFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZ2Uoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpOiBudW1iZXJbXSB7XG4gICAgY29uc3QgbGlzdDogbnVtYmVyW10gPSBbXTtcblxuICAgIGZvciAobGV0IGlkeCA9IHN0YXJ0OyBpZHggPD0gZW5kOyBpZHgrKykge1xuICAgICAgICBsaXN0LnB1c2goaWR4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGlzdDtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYW4gYXJyYXkgb2YgZGF0ZXMgYmV0d2VlbiB0d28gcG9pbnRzXG4gKiBAcGFyYW0gc3RhcnQgdGhlIGRhdGUgdG8gc3RhcnQgdGhlIGFycmF5XG4gKiBAcGFyYW0gZW5kIHRoZSBkYXRlIHRvIGVuZCB0aGUgYXJyYXlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRhdGVSYW5nZShzdGFydDogRGF0ZSwgZW5kOiBEYXRlKTogRGF0ZVtdIHtcblxuICAgIGxldCBkYXRlczogRGF0ZVtdID0gW107XG5cbiAgICAvLyBsb29wIHRocm91Z2ggYWxsIHRoZSBkYXlzIGJldHdlZW4gdGhlIGRhdGUgcmFuZ2VcbiAgICB3aGlsZSAoc3RhcnQgPD0gZW5kKSB7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBkYXRlIHRvIHRoZSBhcnJheVxuICAgICAgICBkYXRlcy5wdXNoKG5ldyBEYXRlKHN0YXJ0KSk7XG5cbiAgICAgICAgLy8gbW92ZSB0byB0aGUgbmV4dCBkYXlcbiAgICAgICAgc3RhcnQuc2V0RGF0ZShzdGFydC5nZXREYXRlKCkgKyAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0ZXM7XG59XG5cbi8qKlxuICogQ29tcGFyZSB0d28gZGF0ZXMgdG8gc2VlIGlmIHRoZXkgYXJlIG9uIHRoZSBzYW1lIGRheVxuICogQHBhcmFtIGRheTEgdGhlIGZpcnN0IGRhdGUgdG8gY29tcGFyZVxuICogQHBhcmFtIGRheTIgdGhlIHNlY29uZCBkYXRlIHRvIGNvbXBhcmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmVEYXlzKGRheTE6IERhdGUsIGRheTI6IERhdGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZGF5MS5nZXREYXRlKCkgPT09IGRheTIuZ2V0RGF0ZSgpICYmXG4gICAgICAgIGRheTEuZ2V0TW9udGgoKSA9PT0gZGF5Mi5nZXRNb250aCgpICYmXG4gICAgICAgIGRheTEuZ2V0RnVsbFllYXIoKSA9PT0gZGF5Mi5nZXRGdWxsWWVhcigpO1xufVxuXG4vKipcbiAqIERhdGUgY29tcGFyaXNvbiBmb3IgdXNlIHByaW1hcmlseSB3aXRoIGRpc3RpbmN0VW50aWxDaGFuZ2VkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkYXRlQ29tcGFyYXRvcihkYXRlT25lOiBEYXRlLCBkYXRlVHdvOiBEYXRlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGRhdGVPbmUuZ2V0VGltZSgpID09PSBkYXRlVHdvLmdldFRpbWUoKTtcbn1cblxuLyoqXG4gKiBUaW1lem9uZSBjb21wYXJpc29uIGZvciB1c2UgcHJpbWFyaWx5IHdpdGggZGlzdGluY3RVbnRpbENoYW5nZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRpbWV6b25lQ29tcGFyYXRvcih6b25lT25lOiBEYXRlVGltZVBpY2tlclRpbWV6b25lLCB6b25lVHdvOiBEYXRlVGltZVBpY2tlclRpbWV6b25lKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHpvbmVPbmUubmFtZSA9PT0gem9uZVR3by5uYW1lICYmIHpvbmVPbmUub2Zmc2V0ID09PSB6b25lVHdvLm9mZnNldDtcbn1cblxuLyoqXG4gKiBFeHBvcnQgYW4gYXJyYXkgb2YgYWxsIHRoZSBhdmFpbGFibGUgbW9udGhzXG4gKi9cbmV4cG9ydCBjb25zdCBtb250aHMgPSBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXTtcbmV4cG9ydCBjb25zdCBtb250aHNTaG9ydCA9IG1vbnRocy5tYXAobW9udGggPT4gbW9udGguc3Vic3RyaW5nKDAsIDMpKTtcblxuLyoqXG4gKiBFeHBvcnQgYW4gYXJyYXkgb2YgYWxsIHRoZSBhdmFpbGFibGUgZGF5cyBvZiB0aGUgd2Vla1xuICovXG5leHBvcnQgY29uc3Qgd2Vla2RheXMgPSBbJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknLCAnU3VuZGF5J107XG5leHBvcnQgY29uc3Qgd2Vla2RheXNTaG9ydCA9IHdlZWtkYXlzLm1hcCh3ZWVrZGF5ID0+IHdlZWtkYXkuc3Vic3RyaW5nKDAsIDMpKTsiXX0=