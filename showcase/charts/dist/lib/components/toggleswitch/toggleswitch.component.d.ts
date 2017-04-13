import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class ToggleSwitchComponent implements ControlValueAccessor {
    name: string;
    disabled: boolean;
    clickable: boolean;
    valueChange: EventEmitter<any>;
    value: boolean;
    private _value;
    private onTouchedCallback;
    private onChangeCallback;
    toggleChecked(): void;
    keydown(event: any): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
