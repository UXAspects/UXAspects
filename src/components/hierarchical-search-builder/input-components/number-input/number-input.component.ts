import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ux-number-input',
    templateUrl: './number-input.component.html',
    // styleUrls: ['']
})
export class NumberInputComponent {
    @Input() value: number = 0;
    @Input() data: object;
    @Output() valueChange = new EventEmitter<number>();

    handleValueChange(value: number) {
        this.valueChange.emit(value);
    }
}
