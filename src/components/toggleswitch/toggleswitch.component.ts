import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const TOGGLESWITCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleSwitchComponent),
    multi: true
};

let uniqueToggleSwitchId = 0;

@Component({
    selector: 'ux-toggleswitch',
    templateUrl: './toggleswitch.component.html',
    providers: [TOGGLESWITCH_VALUE_ACCESSOR]
})
export class ToggleSwitchComponent implements ControlValueAccessor {

    private _toggleSwitchId: string = `ux-toggleswitch-${++uniqueToggleSwitchId}`;

    @Input() id: string = this._toggleSwitchId;
    @Input() name: string | null;
    @Input() tabindex: number = 0;
    @Input() clickable: boolean = true;
    @Input() disabled: boolean = false;
    @Input('aria-label') ariaLabel: string = '';
    @Input('aria-labelledby') ariaLabelledby: string = null;

    @Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    get value() {
        return this._value;
    }

    set value(value: boolean) {
        this._value = value;

        // Update value output
        this.valueChange.emit(value);

        // Notify ngModel
        this.onChangeCallback(value);
        this.onTouchedCallback();
    }

    get inputId(): string {
        return `${this.id || this._toggleSwitchId}-input`;
    }

    private _value: boolean = false;

    focused: boolean = false;
    onTouchedCallback: () => void = () => { };
    onChangeCallback: (_: any) => void = () => { };

    toggle(): void {
        if (!this.disabled && this.clickable) {
            this.value = !this.value;
        }
    }

    writeValue(value: boolean): void {
        this.value = !!value;
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
