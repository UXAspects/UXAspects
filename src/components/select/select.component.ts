import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';

export const SELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
};

@Component({
    moduleId: module.id,
    selector: 'ux-select',
    templateUrl: 'select.component.html',
    providers: [SELECT_VALUE_ACCESSOR]
})
export class SelectComponent implements ControlValueAccessor {

    @Input()
    get value() {
        return this._value;
    }
    set value(value: any) {
        this._value = value;
        this.valueChange.emit(value);
        this.propagateChange(value);
    }

    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    @Input() source: string;
    @Input() multiple: boolean = false;
    @Input() disabled: boolean = false;
    @Input() placeholder: string;
    @Input() allowNull: boolean = false;
    @Input() scroll: boolean = false;
    @Input() pageSize: number = 20;
    @Input() dropDirection: 'up' | 'down' = 'down';

    private _value: any;
    private propagateChange = (_: any) => {};


    writeValue(obj: any): void {
        if (obj !== undefined) {
            this._value = obj;
        }
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {}

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}