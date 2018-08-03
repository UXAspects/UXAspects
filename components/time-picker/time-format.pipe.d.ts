import { PipeTransform } from '@angular/core';
export declare class TimeFormatPipe implements PipeTransform {
    transform(value: number, pad: boolean): string | number;
}
