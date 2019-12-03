import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';
import { DateFormatter } from './date-formatter.type';

@Pipe({
    name: 'formatDate'
})
export class DateFormatterPipe implements PipeTransform {

    transform(value: Date, formatter: string | DateFormatter): string {

        // we may not initially have  a value
        if (!value) {
            return '';
        }

        return typeof formatter === 'function' ? formatter(value) : formatDate(value, formatter, navigator.language);
    }

}