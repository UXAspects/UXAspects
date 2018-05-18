import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const RADIOBUTTON_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButtonComponent),
    multi: true
};

let uniqueRadioId = 0;

@Component({
    selector: 'ux-radio-button',
    templateUrl: './radiobutton.component.html',
    providers: [RADIOBUTTON_VALUE_ACCESSOR]
})
export class RadioButtonComponent implements ControlValueAccessor {

    private _radioButtonId: string = `ux-radio-button-${++uniqueRadioId}`;

    @Input() id: string = this._radioButtonId;
    @Input() name: string | null;
    @Input() required: boolean;
    @Input() tabindex: number = 0;
    @Input() clickable: boolean = true;
    @Input() disabled: boolean = false;
    @Input() simplified: boolean = false;
    @Input() option: any;
    @Input('aria-label') ariaLabel: string = '';
    @Input('aria-labelledby') ariaLabelledby: string = null;
    @Input('aria-describedby') ariaDescribedby: string = null;

    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    get value() {
        return this._value;
    }

    set value(value: boolean) {
        this._value = value;

        // invoke change event
        this.valueChange.emit(this._value);

        // call callback
        this.onChangeCallback(this._value);
        this.onTouchedCallback();        
    }

    get inputId(): string { 
        return `${this.id || this._radioButtonId}-input`;
    }

    private _value: any = false;

    focused: boolean = false;
    onTouchedCallback: () => void = () => { };
    onChangeCallback: (_: any) => void = () => { };

    toggle(): void {

        if (this.disabled || !this.clickable) {
            return;
        }

        // toggle the checked state
        this.value = this.option;

        // call callback
        this.onChangeCallback(this.value);
    }

    // Functions required to update ng-model
    writeValue(value: boolean): void {
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
