import { Component, EventEmitter, HostBinding, HostListener, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
        'role': 'checkbox',
        '[attr.aria-checked]': 'value === true'
    }
})
export class CheckboxComponent implements ControlValueAccessor {

    @Input() name: string = '';
    @Input() clickable: boolean = true;
    @Input() simplified: boolean = false;
    @Input() indeterminateValue: any = -1;
    @Input() @HostBinding('attr.aria-disabled') disabled: boolean = false;

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

    onTouchedCallback: () => void = () => { };
    onChangeCallback: (_: any) => void = () => { };

    @HostListener('click')
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

    keyDown(event: KeyboardEvent) {
        // then toggle the checkbox
        this.toggleChecked();

        // prevent default browser behavior
        event.stopPropagation();
        event.preventDefault();
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

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
