import { PipeTransform } from '@angular/core';
export declare class DurationPipe implements PipeTransform {
    transform(seconds: number): any;
    pad(value: number): string;
}
