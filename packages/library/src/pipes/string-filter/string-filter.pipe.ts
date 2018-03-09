import { Pipe, Injectable, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stringFilter'
})
@Injectable()
export class StringFilterPipe implements PipeTransform {
    transform(items: any[], value: string): any[] {  
        if (!items) {
            return [];
        }
        return items.filter(it => it.toLowerCase().indexOf(value.toLowerCase()) >= 0);
    }
}