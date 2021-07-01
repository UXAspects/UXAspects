import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ux-number-input',
    templateUrl: './leb-number-input.component.html'
})
export class LebNumberInputComponent {
    @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() validChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    set value(value: number) {
        if (this._value !== value) {
            this._value = value ?? 0;
            this._valid = this.validate(this._value);
            this.validChange.emit(this._valid);
        }
    }

    get value() { return this._value; }

    @Input()
    set configuration(config: NumberInputOptions) {
        this._min = config?.min ?? this._min;
        this._max = config?.max ?? this._max;
        this.validate = config?.validateFunction ?? this.validate;
    }

    private _value: number;
    _valid: boolean;

    _min: number = -Infinity;
    _max: number = Infinity;

    private validate: (value: number) => boolean = () => true;

    handleValueChange(newValue: number) {
        this.value = newValue;
        this.valueChange.emit(newValue);
    }
}

interface NumberInputOptions {
    min?: number;
    max?: number;
    validateFunction?: (value: number) => boolean;
}
