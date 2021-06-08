import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DateFormatter } from './date-formatter.type';

@Pipe({
    name: 'formatDate'
})
export class DateFormatterPipe implements PipeTransform {

    constructor(@Inject(LOCALE_ID) private _locale: string) { }

    transform(value: Date, formatter: string | DateFormatter): string {

        // we may not initially have  a value
        if (!value) {
            return '';
        }

        return typeof formatter === 'function' ? formatter(value) : formatDate(value, formatter, this._locale);
    }

}