import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';
import { DateLocalizationFormatter } from './date-localization-formatter.type';

@Pipe({
    name: 'dateLocale'
})
export class DateLocalizationPipe implements PipeTransform {

    constructor(@Inject(LOCALE_ID) private locale: string) {}

    transform(value: Date, formatter: string | DateLocalizationFormatter): string {
        return typeof formatter === 'function' ? formatter(value) : formatDate(value, formatter, this.locale);
    }

}