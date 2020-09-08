import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-textarea-input',
    templateUrl: './textarea-input.component.html'
})
export class TextareaInputComponent {
    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() valid: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    set configuration(config: { maxHeight: number, validateFunction: (value: string) => boolean }) {
        this._maxHeight = config.maxHeight;
        this.validate = config.validateFunction;
    }

    @Input()
    set value(value: string) {
        this._value = value ?? '';
        this.valueChange.emit(this._value);
        this.valid.emit(this.validate(this._value));
    }

    get value() { return this._value; }

    _value: string;
    _maxHeight: number = 75;
    private validate: (value: string) => boolean = () => true;
}
