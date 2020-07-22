import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ux-number-input',
    templateUrl: './number-input.component.html',
    // styleUrls: ['']
})
export class NumberInputComponent {
    @Input()
    set value(value: number) {
        this._value = value ?? 0;
        this.valueChange.emit(this._value);
    }

    get value() { return this._value; }

    @Input()
    set data(data: NumberInputOptions) {
        this.step = data?.step ?? 1;
        this.min = data?.min ?? -Infinity;
        this.max = data?.max ?? Infinity;
    }
    @Output() valueChange = new EventEmitter<number>();

    _value: number;

    step: number;
    min: number;
    max: number;
}

interface NumberInputOptions {
    step?: number;
    min?: number;
    max?: number;
}
