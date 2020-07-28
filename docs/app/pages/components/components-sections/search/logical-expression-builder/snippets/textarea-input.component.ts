import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-textarea-input',
    templateUrl: './textarea-input.component.html'
})
export class TextareaInputComponent {
    @Input()
    set value(value: string) {
        this._value = value ?? '';
        this.valueChange.emit(this.value);
    }

    get value() { return this._value; }

    _value: string;
    maxHeight: number = 75;

    @Input()
    set data(data: { maxHeight: number }) {
        this.maxHeight = data.maxHeight;
    }
    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
}
