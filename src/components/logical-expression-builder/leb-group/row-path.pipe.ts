import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rowPath'
})
export class RowPathPipe implements PipeTransform {
    transform(index: number, parentPath: number[]): number[] {
        return [...parentPath, index];
    }
}
