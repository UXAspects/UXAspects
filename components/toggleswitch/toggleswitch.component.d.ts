import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class ToggleSwitchComponent implements ControlValueAccessor {
    private _toggleSwitchId;
    id: string;
    name: string | null;
    tabindex: number;
    clickable: boolean;
    disabled: boolean;
    ariaLabel: string;
    ariaLabelledby: string;
    valueChange: EventEmitter<boolean>;
    value: boolean;
    readonly inputId: string;
    private _value;
    focused: boolean;
    onTouchedCallback: () => void;
    onChangeCallback: (_: any) => void;
    toggle(): void;
    writeValue(value: boolean): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
}
