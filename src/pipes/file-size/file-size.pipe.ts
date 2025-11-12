import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fileSize' })
export class FileSizePipe implements PipeTransform {
  transform(value: number): string | number {
    // allow for async values
    if (!value) {
      return value;
    }

    const units = ['B', 'KB', 'MB', 'GB', 'TB'];

    // calculate the which unit bracket the values should be a part of
    const idx = Math.floor(Math.log(value) / Math.log(1024));
    const formattedValue = value / Math.pow(1024, idx);

    return `${formattedValue.toFixed(2)} ${units[idx]}`;
  }
}
