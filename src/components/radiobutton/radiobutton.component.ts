import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
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

    /** Specify a unique Id for this component */
    @Input() id: string = this._radioButtonId;

    /** Specify a form name for the input element */
    @Input() name: string | null;

    /** Specify if this is a required input */
    @Input() required: boolean;

    /** Specify the tabindex */
    @Input() tabindex: number = 0;

    /** If set to `true` the radio button will not change state when clicked. */
    @Input() clickable: boolean = true;

    /** If this value is set to `true` then the radio button will be disabled */
    @Input() disabled: boolean = false;

    /** If set to `true` the checkbox will be displayed without a border and background. */
    @Input() simplified: boolean = false;

    /**
     * This should contain the value that this radio button represents. This will be stored in the value variable when the radio button is selected.
     * No two radio buttons should have the same option value within the same group of radio buttons.
     */
    @Input() option: any;

    /** Specify an aria label for the input element */
    @Input('aria-label') ariaLabel: string = '';

    /** Specify an aria labelledby property for the input element */
    @Input('aria-labelledby') ariaLabelledby: string = null;

    /** Specify an aria describedby property for the input element */
    @Input('aria-describedby') ariaDescribedby: string = null;

    /** Emits when the value has been changed. */
    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    /** This should be a two way binding and will store the currently selected option. Each radio button in the same group should have the same value variable. */
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
