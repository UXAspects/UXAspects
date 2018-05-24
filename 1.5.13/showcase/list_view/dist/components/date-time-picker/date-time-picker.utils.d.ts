import { DateTimePickerTimezone } from './date-time-picker.service';
/**
 * Convert a single dimension array to a double dimension array
 * @param items the single dimension array to convert
 * @param columns the number of items each array should have
 */
export declare function gridify<T>(items: T[], columns: number): T[][];
/**
 * Create an array of numbers between two limits
 * @param start the lower limit
 * @param end the upper limit
 */
export declare function range(start: number, end: number): number[];
/**
 * Create an array of dates between two points
 * @param start the date to start the array
 * @param end the date to end the array
 */
export declare function dateRange(start: Date, end: Date): Date[];
/**
 * Compare two dates to see if they are on the same day
 * @param day1 the first date to compare
 * @param day2 the second date to compare
 */
export declare function compareDays(day1: Date, day2: Date): boolean;
/**
 * Date comparison for use primarily with distinctUntilChanged
 */
export declare function dateComparator(dateOne: Date, dateTwo: Date): boolean;
/**
 * Timezone comparison for use primarily with distinctUntilChanged
 */
export declare function timezoneComparator(zoneOne: DateTimePickerTimezone, zoneTwo: DateTimePickerTimezone): boolean;
/**
 * Export an array of all the available months
 */
export declare const months: string[];
export declare const monthsShort: string[];
/**
 * Export an array of all the available days of the week
 */
export declare const weekdays: string[];
export declare const weekdaysShort: string[];
