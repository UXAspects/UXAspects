import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class ToggleSwitchComponent implements ControlValueAccessor {
    name: string;
    disabled: boolean;
    clickable: boolean;
    valueChange: EventEmitter<boolean>;
    value: boolean;
    private _value;
    onTouchedCallback: () => void;
    onChangeCallback: (_: any) => void;
    toggleChecked(): void;
    keydown(event: KeyboardEvent): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
}
