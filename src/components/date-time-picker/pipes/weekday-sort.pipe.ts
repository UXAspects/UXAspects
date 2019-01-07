import { WeekDay } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'weekDaySort'
})
export class WeekDaySortPipe implements PipeTransform {

    transform(value: string[], startOfWeek: WeekDay): string[] {

        // ensure start of week is in range
        startOfWeek = Math.max(WeekDay.Sunday, Math.min(WeekDay.Saturday, startOfWeek));

        // create a new array to avoid altering the original
        const weekdays = [...value];

        for (let idx = 0; idx < startOfWeek; idx++) {
            weekdays.push(weekdays.shift());
        }

        return weekdays;
    }
}