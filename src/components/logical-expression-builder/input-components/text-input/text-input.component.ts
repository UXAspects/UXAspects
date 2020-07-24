import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ux-text-input',
    templateUrl: './text-input.component.html'
})
export class TextInputComponent {
    @Input()
    set value(value: string) {
        this._value = value ?? '';
        this.valueChange.emit(this.value);
    }

    get value() { return this._value; }

    _value: string;

    @Input() data: object;
    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
}
