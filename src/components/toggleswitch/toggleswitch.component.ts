import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
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
    providers: [TOGGLESWITCH_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleSwitchComponent implements ControlValueAccessor {

    /** Provide a default unique id value for the toggle switch */
    _toggleSwitchId: string = `ux-toggleswitch-${++uniqueToggleSwitchId}`;

    /** Specify a unique id for the element. */
    @Input() id: string = this._toggleSwitchId;

    /** Specify a form name for the input element. */
    @Input() name: string | null;

    /** Binding for the state of the switch; `true` for "on" and `false` for "off." */
    @Input() value: boolean = false;

    /** Specify a tabindex. */
    @Input() tabindex: number = 0;

    /** If set to `false` the switch will not be updated when clicking on it, can be used if something else is updating the state of the switch. */
    @Input() clickable: boolean = true;

    /** If this value is set to `true` then the toggle switch will be disabled. */
    @Input() disabled: boolean = false;

    /** Specify an aria label for the input element */
    @Input('aria-label') ariaLabel: string = '';

    /** Specify an aria labelledby property for the input element */
    @Input('aria-labelledby') ariaLabelledby: string = null;

    /** Emits when `value` has been changed. */
    @Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Determine if the underlying input component has been focused with the keyboard */
    _focused: boolean = false;

    /** Used to inform Angular forms that the component has been touched */
    onTouchedCallback: () => void = () => { };

    /** Used to inform Angular forms that the component value has changed */
    onChangeCallback: (_: any) => void = () => { };

    toggle(): void {
        if (!this.disabled && this.clickable) {
            this.value = !this.value;

            // emit the value
            this.valueChange.emit(this.value);

            // update the value if used within a form control
            this.onChangeCallback(this.value);

            // mark the component as touched
            this.onTouchedCallback();
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
