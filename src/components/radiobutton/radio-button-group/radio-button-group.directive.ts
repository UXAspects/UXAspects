import { AfterContentInit, ContentChildren, Directive, EventEmitter, ExistingProvider, forwardRef, Input, OnDestroy, Output, QueryList } from '@angular/core';
import { RadioButtonComponent } from '../radiobutton.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

export const RADIO_GROUP_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButtonGroupDirective),
    multi: true
};

@Directive({
    selector: 'ux-radio-button-group, [uxRadioButtonGroup]',
    providers: [
        RADIO_GROUP_CONTROL_VALUE_ACCESSOR
    ],
    host: {
        'role': 'radiogroup'
    }
})
export class RadioButtonGroupDirective implements ControlValueAccessor, AfterContentInit, OnDestroy  {

    @Input() set value(value: any) {
        this._value = value;
        this.updateSelectedRadioButton();
    }

    get value(): any {
        return this._value;
    }

    @Output() valueChange = new EventEmitter<any>();

    private _onDestroy = new Subject<void>();

    onTouched: () => void = () => {};
    onChange: (value: any) => void = () => {};

    @ContentChildren(forwardRef(() => RadioButtonComponent), { descendants: true }) _radioButtons: QueryList<RadioButtonComponent>;

    private _value: any = null;

    ngAfterContentInit(): void {
        this.updateSelectedRadioButton();

        // update the selected items any time new ones are added
        this._radioButtons.changes.pipe(takeUntil(this._onDestroy))
            .subscribe(() => this.updateSelectedRadioButton());
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
    }

    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    writeValue(value: any): void {
        this.value = value;
    }

    setDisabledState(isDisabled: boolean): void {
        if (this._radioButtons) {
            this._radioButtons.forEach(radio => radio.setDisabledState(isDisabled));
        }
    }

    emitChange(value: any): void {
        this.valueChange.next(value);
        this.onChange(value);
        this.onTouched();
    }

    private updateSelectedRadioButton(): void {
        // update the selected value in all radio buttons
        if (this._radioButtons) {
            this._radioButtons.forEach(radio => radio.writeValue(this._value));
        }

    }
}