import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stringFilter',
    standalone: false
})
@Injectable()
export class StringFilterPipe implements PipeTransform {
    transform(items: string[], value: string): string[] {
        if (!items) {
            return [];
        }
        return items.filter(it => it.toLowerCase().indexOf(value.toLowerCase()) >= 0);
    }
}