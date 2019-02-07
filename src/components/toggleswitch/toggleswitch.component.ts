import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HasFocusIndicator, HasFocusIndicatorCtor, mixinFocusIndicator, _HasFocusIndicatorInputs } from '../../common/index';

const TOGGLESWITCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleSwitchComponent),
    multi: true
};

let uniqueToggleSwitchId = 0;

// Boilerplate for applying mixins.
export class ToggleSwitchBase { }
export const _ToggleSwitchMixinBase: HasFocusIndicatorCtor & typeof ToggleSwitchBase = mixinFocusIndicator(ToggleSwitchBase);

@Component({
    selector: 'ux-toggleswitch',
    templateUrl: './toggleswitch.component.html',
    providers: [TOGGLESWITCH_VALUE_ACCESSOR],
    inputs: [..._HasFocusIndicatorInputs],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleSwitchComponent extends _ToggleSwitchMixinBase implements ControlValueAccessor, HasFocusIndicator {

    private _toggleSwitchId: string = `ux-toggleswitch-${++uniqueToggleSwitchId}`;

    /** Specify a unique id for the element. */
    @Input() id: string = this._toggleSwitchId;

    /** Specify a form name for the input element. */
    @Input() name: string | null;

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

    /** Binding for the state of the switch; `true` for "on" and `false` for "off." */
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
