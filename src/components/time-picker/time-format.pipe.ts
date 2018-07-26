import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
    transform(value: number, pad: boolean): string | number {
        return value < 10 && pad ? '0' + value : value;
    }
}
