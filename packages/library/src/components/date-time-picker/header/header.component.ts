import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ux-date-time-picker-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class DateTimePickerHeaderComponent {

    @Input() header: string;
    @Input() canAscend: boolean = true;

    @Output() next: EventEmitter<void> = new EventEmitter<void>();
    @Output() previous: EventEmitter<void> = new EventEmitter<void>();
    @Output() ascend: EventEmitter<void> = new EventEmitter<void>();
}