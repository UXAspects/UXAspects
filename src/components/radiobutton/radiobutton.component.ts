import { Component, EventEmitter, HostBinding, HostListener, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const RADIOBUTTON_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButtonComponent),
    multi: true
};

@Component({
    selector: 'ux-radio-button',
    templateUrl: './radiobutton.component.html',
    providers: [RADIOBUTTON_VALUE_ACCESSOR],
    host: {
        'role': 'radio',
        '[attr.aria-checked]': 'value === option'
    }
})
export class RadioButtonComponent implements ControlValueAccessor {

    @Input() id: string;
    @Input() simplified: boolean = false;
    @Input() name: string = '';
    @Input() clickable: boolean = true;
    @Input() option: any;
    @Input() @HostBinding('attr.aria-disabled') disabled: boolean = false;
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
    }

    private _value: any = false;

    onTouchedCallback: () => void = () => { };
    onChangeCallback: (_: any) => void = () => { };

    @HostListener('click')
    checkItem() {

        if (this.disabled === true || this.clickable === false) {
            return;
        }

        // toggle the checked state
        this.value = this.option;

        // call callback
        this.onChangeCallback(this.value);
    }

    keyDown(event: KeyboardEvent) {

        // then toggle the checkbox
        this.checkItem();

        // prevent default browser behavior
        event.stopPropagation();
        event.preventDefault();
    }

    // Functions required to update ng-model
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
