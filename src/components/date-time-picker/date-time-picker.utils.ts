/**
 * Convert a single dimension array to a double dimension array
 * @param items the single dimension array to convert
 * @param columns the number of items each array should have
 */
export function gridify<T>(items: T[], columns: number): T[][] {

    const grid: T[][] = [];

    while (items.length) {
        grid.push(items.splice(0, columns));
    }

    return grid;
}

/**
 * Create an array of numbers between two limits
 * @param start the lower limit
 * @param end the upper limit
 */
export function range(start: number, end: number): number[] {
    const list: number[] = [];

    for (let idx = start; idx <= end; idx++) {
        list.push(idx);
    }

    return list;
}

/**
 * Create an array of dates between two points
 * @param start the date to start the array
 * @param end the date to end the array
 */
export function dateRange(start: Date, end: Date): Date[] {

    let dates: Date[] = [];

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
 * @param day1 the first date to compare
 * @param day2 the second date to compare
 */
export function compareDays(day1: Date, day2: Date): boolean {
    return day1.getDate() === day2.getDate() &&
        day1.getMonth() === day2.getMonth() &&
        day1.getFullYear() === day2.getFullYear();
}

/**
 * Date comparison for use primarily with distinctUntilChanged
 */
export function dateComparator(dateOne: Date, dateTwo: Date): boolean {
    return dateOne.getTime() === dateTwo.getTime();
}

/**
 * Export an array of all the available months
 */
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const monthsShort = months.map(month => month.substring(0, 3));

/**
 * Export an array of all the available days of the week
 */
export const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const weekdaysShort = weekdays.map(weekday => weekday.substring(0, 3));