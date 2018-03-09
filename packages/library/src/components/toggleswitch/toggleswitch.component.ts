import { Component, Input, Output, forwardRef, EventEmitter, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const TOGGLESWITCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleSwitchComponent),
    multi: true
};

@Component({
    selector: 'ux-toggleswitch',
    templateUrl: './toggleswitch.component.html',
    styleUrls: ['./toggleswitch.component.less'],
    encapsulation: ViewEncapsulation.None,
    providers: [TOGGLESWITCH_VALUE_ACCESSOR],
    host: {
        '(click)': 'toggleChecked()'
    }
})
export class ToggleSwitchComponent implements ControlValueAccessor {
    @Input() name: string = '';
    @Input() disabled: boolean = false;
    @Input() clickable: boolean = true;

    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

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

    toggleChecked() {
        if (!this.disabled && this.clickable) {
            this.value = !this.value;
        }
    }

    keydown(event: any) {
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
}
