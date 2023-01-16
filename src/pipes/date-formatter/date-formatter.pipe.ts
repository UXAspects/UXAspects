import { formatDate } from '@angular/common';
import { inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DateFormatter } from './date-formatter.type';

@Pipe({
    name: 'formatDate'
})
export class DateFormatterPipe implements PipeTransform {

    private readonly _locale = inject<string>(LOCALE_ID);

    transform(value: Date, formatter: string | DateFormatter): string {

        // we may not initially have  a value
        if (!value) {
            return '';
        }

        return typeof formatter === 'function' ? formatter(value) : formatDate(value, formatter, this._locale);
    }

}