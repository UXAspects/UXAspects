import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
    transform(value: number, pad: boolean, showMeridian: boolean, meridian: string): string | number {

        // if we are showing the meridian and we are A.M we should show midnight as 12 instead of 0
        if (value === 0 && showMeridian && meridian === 'AM') {
            return 12;
        }

        return value < 10 && pad ? '0' + value : value;
    }
}
