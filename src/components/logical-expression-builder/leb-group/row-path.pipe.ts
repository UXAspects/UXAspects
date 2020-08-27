import { Pipe, PipeTransform } from '@angular/core';

/** Simple pipe that generates a path based on the parent's path and the child's id */
@Pipe({
    name: 'rowPath'
})
export class RowPathPipe implements PipeTransform {
    transform(index: number, parentPath: number[]): number[] {
        return [...parentPath, index];
    }
}
