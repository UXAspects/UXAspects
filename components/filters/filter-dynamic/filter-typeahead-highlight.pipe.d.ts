import { PipeTransform } from '@angular/core';
export declare class FilterTypeaheadHighlight implements PipeTransform {
    transform(value: string, searchQuery: string): string;
}
