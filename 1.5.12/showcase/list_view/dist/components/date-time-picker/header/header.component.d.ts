import { EventEmitter } from '@angular/core';
export declare class DateTimePickerHeaderComponent {
    header: string;
    canAscend: boolean;
    next: EventEmitter<void>;
    previous: EventEmitter<void>;
    ascend: EventEmitter<void>;
}
