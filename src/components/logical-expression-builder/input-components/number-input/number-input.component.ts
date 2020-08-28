import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ux-number-input',
    templateUrl: './number-input.component.html'
})
export class NumberInputComponent {
    @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() valid: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    set value(value: number) {
        this._value = value ?? 0;
        this.valueChange.emit(this._value);
        this._valid = this.validate(this._value);
        this.valid.emit(this._valid);
    }

    get value() { return this._value; }

    @Input()
    set data(data: NumberInputOptions) {
        this._min = data?.min ?? this._min;
        this._max = data?.max ?? this._max;
        this.validate = data?.validateFunction ?? this.validate;
    }

    private _value: number;
    _valid: boolean;

    _min: number = -Infinity;
    _max: number = Infinity;

    private validate: (value: number) => boolean = () => true;
}

interface NumberInputOptions {
    min?: number;
    max?: number;
    validateFunction?: (value: number) => boolean;
}
