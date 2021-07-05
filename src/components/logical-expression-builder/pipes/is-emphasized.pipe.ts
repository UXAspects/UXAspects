import {Pipe, PipeTransform} from '@angular/core';


/** Check if a vertical line segment should be emphasized as hover effect */
@Pipe({
    name: 'isEmphasized'
})
export class IsEmphasizedPipe implements PipeTransform {
    transform(hoverPath: number[], path: number[], index: number) {
        return (index === hoverPath.length - 2) &&
            ((index === 0) || (path.slice(0, index - 1).join() === hoverPath.slice(0, index - 1).join()));
    }
}
