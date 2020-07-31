import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ux-text-input',
    templateUrl: './text-input.component.html'
})
export class TextInputComponent {
    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() valid: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    set value(value: string) {
        this._value = value ?? '';
        this.valueChange.emit(this.value);
        this._valid = this._validate(this.value);
        this.valid.emit(this._valid);
    }

    get value() { return this._value; }

    private _value: string;
    public _valid: boolean;

    @Input()
    set data(data: TextInputData) {
        this._validate = data?.validateFunction ?? this._validate;
    }

    private _validate: (value: string) => boolean = () => true;
}

type TextInputData = { validateFunction?: (value: any) => boolean; };
