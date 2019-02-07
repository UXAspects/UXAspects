import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HasFocusIndicator, HasFocusIndicatorCtor, mixinFocusIndicator, _HasFocusIndicatorInputs } from '../../common/index';

export const CHECKBOX_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
};

let uniqueCheckboxId = 0;

// Boilerplate for applying mixins.
export class CheckboxBase { }

// Add all focus indicator properties to a new base class
export const _CheckboxMixinBase: HasFocusIndicatorCtor & typeof CheckboxBase = mixinFocusIndicator(CheckboxBase);

@Component({
    selector: 'ux-checkbox',
    templateUrl: './checkbox.component.html',
    providers: [CHECKBOX_VALUE_ACCESSOR],
    inputs: [..._HasFocusIndicatorInputs],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent extends _CheckboxMixinBase implements ControlValueAccessor, HasFocusIndicator {

    private _checkboxId: string = `ux-checkbox-${++uniqueCheckboxId}`;

    /** Determines if the checkbox should be checked, unchecked or indeterminate. */
    @Input() id: string = this._checkboxId;

    /** Specifies the form name of the element. */
    @Input() name: string | null;

    /** Specified if this is a required input. */
    @Input() required: boolean;

    /** Specifies the tabindex of the input. */
    @Input() tabindex: number = 0;

    /** If set to `true` the checkbox will not toggle state when clicked. */
    @Input() clickable: boolean = true;

    /** If set to `true` the checkbox will be displayed without a border and background. */
    @Input() simplified: boolean = false;

    /**
     * If `value` is set to the indeterminate value specified using this attribute, it will neither
     * display the checkbox as checked or unchecked, and will instead show the indeterminate variation.
     */
    @Input() indeterminateValue: any = -1;

    /** Specify if the checkbox should be disabled. */
    @Input() disabled: boolean = false;

    /** Provide an aria label for the checkbox. */
    @Input('aria-label') ariaLabel: string = '';

    /** Provide an aria-labelled by property for the checkbox. */
    @Input('aria-labelledby') ariaLabelledby: string = null;

    /** Emits when `value` has been changed. */
    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    /** Determines if the checkbox should be checked, unchecked or indeterminate. */
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
