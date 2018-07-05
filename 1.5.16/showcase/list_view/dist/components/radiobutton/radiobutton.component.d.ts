import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const RADIOBUTTON_VALUE_ACCESSOR: any;
export declare class RadioButtonComponent implements ControlValueAccessor {
    private _radioButtonId;
    id: string;
    name: string | null;
    required: boolean;
    tabindex: number;
    clickable: boolean;
    disabled: boolean;
    simplified: boolean;
    option: any;
    ariaLabel: string;
    ariaLabelledby: string;
    ariaDescribedby: string;
    valueChange: EventEmitter<any>;
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
