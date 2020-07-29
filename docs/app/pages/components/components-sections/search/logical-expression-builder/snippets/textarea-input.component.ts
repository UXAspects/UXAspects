import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-textarea-input',
    templateUrl: './textarea-input.component.html'
})
export class TextareaInputComponent {
    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

    @Input()
    set value(value: string) {
        this._value = value ?? '';
        this.valueChange.emit(this.value);
    }

    get value() { return this._value; }

    _value: string;

    @Input()
    set data(data: { maxHeight: number }) {
        this.maxHeight = data.maxHeight;
    }

    maxHeight: number = 75;
}
