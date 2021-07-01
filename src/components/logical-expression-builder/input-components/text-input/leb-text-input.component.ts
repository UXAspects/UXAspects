import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ux-text-input',
    templateUrl: './leb-text-input.component.html'
})
export class LebTextInputComponent {
    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() validChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    set value(value: string) {
        if (this._value !== value) {
            this._value = value ?? '';
            this._valid = this.validate(this.value);
            this.validChange.emit(this._valid);
        }
    }

    get value() { return this._value; }

    private _value: string;
    _valid: boolean;

    @Input()
    set configuration(config: TextInputData) {
        this.validate = config?.validateFunction ?? this.validate;
    }

    private validate: (value: string) => boolean = () => true;

    handleValueChange(newValue: string) {
        this.value = newValue;
        this.valueChange.emit(newValue);
    }
}

type TextInputData = { validateFunction?: (value: string) => boolean; };
