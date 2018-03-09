import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

    transform(value: number): any {

        // allow for async values
        if (!value) {
            return value;
        }
        
        let units = ['B', 'KB', 'MB', 'GB', 'TB'];

        // calculate the which unit bracket the values should be a part of
        let idx = Math.floor(Math.log(value) / Math.log(1024));
        let formattedValue = value / Math.pow(1024, idx);
        
        return `${formattedValue.toFixed(2)} ${units[idx]}`;
    }
}