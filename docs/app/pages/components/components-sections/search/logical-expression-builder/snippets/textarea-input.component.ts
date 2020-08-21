import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-textarea-input',
    templateUrl: './textarea-input.component.html'
})
export class TextareaInputComponent {
    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() valid: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    set data(data: { maxHeight: number, validateFunction: (value: string) => boolean }) {
        this._maxHeight = data.maxHeight;
        this._validate = data.validateFunction;
    }

    @Input()
    set value(value: string) {
        this._value = value ?? '';
        this.valueChange.emit(this._value);
        this.valid.emit(this._validate(this._value));
    }

    get value() { return this._value; }

    public _value: string;
    public _maxHeight: number = 75;
    private _validate: (value: string) => boolean = () => true;
}
