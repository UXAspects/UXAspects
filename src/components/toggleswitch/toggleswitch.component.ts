import { Component, EventEmitter, HostListener, Input, Output, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const TOGGLESWITCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleSwitchComponent),
    multi: true
};

@Component({
    selector: 'ux-toggleswitch',
    templateUrl: './toggleswitch.component.html',
    providers: [TOGGLESWITCH_VALUE_ACCESSOR],
    host: {
        'role': 'switch',
        '[attr.aria-checked]': 'value === ture'
    }
})
export class ToggleSwitchComponent implements ControlValueAccessor {

    @Input() name: string = '';
    @Input() clickable: boolean = true;
    @Input() @HostBinding('attr.aria-disabled') disabled: boolean = false;

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
    }

    private _value: boolean = false;

    onTouchedCallback: () => void = () => { };
    onChangeCallback: (_: any) => void = () => { };

    @HostListener('click')
    toggleChecked() {
        if (!this.disabled && this.clickable) {
            this.value = !this.value;
        }
    }

    keydown(event: KeyboardEvent) {
        // if spacebar is pressed toggle state
        if (event.keyCode === 32) {
            this.toggleChecked();
            event.stopPropagation();
            event.preventDefault();
        }
    }

    writeValue(value: any) {
        this.value = !!value;
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
