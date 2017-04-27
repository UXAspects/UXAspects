import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const CHECKBOX_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
};

@Component({
    selector: 'ux-checkbox',
    templateUrl: './checkbox.component.html',
    providers: [CHECKBOX_VALUE_ACCESSOR],
    host: {
        '(click)': 'toggleChecked()'
    }
})
export class CheckboxComponent implements ControlValueAccessor {

    @Input() name: string = '';
    @Input() clickable: boolean = true;
    @Input() disabled: boolean = false;
    @Input() simplified: boolean = false;
    @Input() indeterminateValue: any = -1;
    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    get value() {
        return this._value;
    }

    set value(value: any) {
        this._value = value;

        // invoke change event
        this.valueChange.emit(this._value);

        // call callback
        this.onChangeCallback(this._value);
    }

    private _value: any = false;

    private onTouchedCallback: () => void = () => { };
    private onChangeCallback: (_: any) => void = () => { };

    constructor() { }

    toggleChecked() {

        if (this.disabled === true || this.clickable === false) {
            return;
        }

        if (this.value === this.indeterminateValue) {
            this.value = true;
            return;
        }

        // toggle the checked state
        this.value = !this.value;
    }

    keyDown(event: any) {

        // if spacebar key is pressed
        if (event.keyCode === 32) {

            // then toggle the checkbox
            this.toggleChecked();

            // prevent default browser behavior
            event.stopPropagation();
            event.preventDefault();
        }
    }

    // Functions required to update ngModel

    writeValue(value: boolean) {
        if (value !== this._value) {
            this._value = value;
        }
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}
