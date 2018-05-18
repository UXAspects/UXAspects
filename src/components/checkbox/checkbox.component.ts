import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CHECKBOX_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
};

let uniqueCheckboxId = 0;

@Component({
    selector: 'ux-checkbox',
    templateUrl: './checkbox.component.html',
    providers: [CHECKBOX_VALUE_ACCESSOR]
})
export class CheckboxComponent implements ControlValueAccessor {

    private _checkboxId: string = `ux-checkbox-${++uniqueCheckboxId}`;

    @Input() id: string = this._checkboxId;
    @Input() name: string | null;
    @Input() required: boolean;
    @Input() tabindex: number = 0;
    @Input() clickable: boolean = true;
    @Input() simplified: boolean = false;
    @Input() indeterminateValue: any = -1;
    @Input() disabled: boolean = false;
    @Input('aria-label') ariaLabel: string = '';
    @Input('aria-labelledby') ariaLabelledby: string = null;

    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    get value() {
        return this._value;
    }

    set value(value: any) {
        this._value = value;

        // determine if it is in the indeterminate state
        this.indeterminate = this._value === this.indeterminateValue;

        // determine the checked state
        this.ariaChecked = this.indeterminate ? 'mixed' : this._value;

        // invoke change event
        this.valueChange.emit(this._value);

        // call callback
        this.onChangeCallback(this._value);
        this.onTouchedCallback();
    }

    get inputId(): string { 
        return `${this.id || this._checkboxId}-input`;
    }

    private _value: any = false;

    indeterminate: boolean = false;
    ariaChecked: boolean | string;
    focused: boolean = false;

    onTouchedCallback: () => void = () => { };
    onChangeCallback: (_: any) => void = () => { };

    toggle(): void {

        if (this.disabled || !this.clickable) {
            return;
        }

        if (this.value === this.indeterminateValue) {
            this.value = true;
            return;
        }

        // toggle the checked state
        this.value = !this.value;
    }

    // Functions required to update ngModel

    writeValue(value: any): void {
        if (value !== this._value) {
            this._value = value;
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
