import { FocusOrigin } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, inject, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusIndicatorDirective } from '../../directives/accessibility';
import { FocusableItemToken } from '../menu';
import { FocusableControl } from '../menu/interfaces/focusable-control.interface';

const TOGGLESWITCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleSwitchComponent),
    multi: true
};

let uniqueToggleSwitchId = 0;

@Component({
    selector: 'ux-toggleswitch',
    templateUrl: './toggleswitch.component.html',
    providers: [TOGGLESWITCH_VALUE_ACCESSOR, {
            provide: FocusableItemToken,
            useExisting: ToggleSwitchComponent
        }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ToggleSwitchComponent implements ControlValueAccessor, FocusableControl {
    private readonly _changeDetector = inject(ChangeDetectorRef);

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

    /** Specified if this is a required input. */
    @Input() required: boolean;

    /** Emits when `value` has been changed. */
    @Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Get the focus indicator to set focus */
    @ViewChild(FocusIndicatorDirective)
    _focusIndicator?: FocusIndicatorDirective;

    /** Determine if the underlying input component has been focused with the keyboard */
    _focused: boolean = false;

    /** Used to inform Angular forms that the component has been touched */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onTouchedCallback: () => void = () => { };

    /** Used to inform Angular forms that the component value has changed */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChangeCallback: (_: unknown) => void = () => { };

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
        this._changeDetector.markForCheck();
    }

     
    registerOnChange(fn: () => void): void {
        this.onChangeCallback = fn;
    }

     
    registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this._changeDetector.markForCheck();
    }

    /** Focus the input element */
    focus(origin: FocusOrigin): void {
        this._focusIndicator.focus(origin);
    }

    setInputTabIndex(tabindex: number): void {
        this.tabindex = tabindex;
        this._changeDetector.markForCheck();
    }
}
