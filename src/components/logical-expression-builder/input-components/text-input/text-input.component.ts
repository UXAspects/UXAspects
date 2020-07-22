import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ux-text-input',
    templateUrl: './text-input.component.html',
    // styleUrls: ['']
})
export class TextInputComponent {
    @Input()
    set value(value: string) {
        this._value = value ?? '';
        this.valueChange.emit(this.value);
    }

    get value() { return this._value; }

    @Input() data: object;
    @Output() valueChange = new EventEmitter<string>();

    _value: string;

    handleValueChange(event: any) {
        this.value = (event.target as HTMLInputElement).value;
    }
}
