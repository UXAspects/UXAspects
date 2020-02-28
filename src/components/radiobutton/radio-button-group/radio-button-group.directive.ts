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
export class RadioButtonGroupDirective<T = any> implements ControlValueAccessor, AfterContentInit, OnDestroy  {

    /** Define the current selected value within the group */
    @Input() set value(value: T) {
        this._value = value;
        this.updateSelectedRadioButton();
    }

    /** Return the currently selected value */
    get value(): T {
        return this._value;
    }

    /** Emit when the currently selected value changes */
    @Output() valueChange = new EventEmitter<T>();

    /** Used to inform Angular forms that the component has been touched */
    onTouched: () => void = () => {};

    /** Used to inform Angular forms that the component value has changed */
    onChange: (value: any) => void = () => {};

    @ContentChildren(forwardRef(() => RadioButtonComponent), { descendants: true }) _radioButtons: QueryList<RadioButtonComponent>;

    /** Unsubscribe from all subscriptions on destroy */
    private readonly _onDestroy$ = new Subject<void>();

    /** Internally store the current value */
    private _value: T = null;

    ngAfterContentInit(): void {
        this.updateSelectedRadioButton();

        // update the selected items any time new ones are added
        this._radioButtons.changes.pipe(takeUntil(this._onDestroy$))
            .subscribe(() => this.updateSelectedRadioButton());
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** Allow Angular forms for provide us with a callback for when the input value changes */
    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    /** Allow Angular forms for provide us with a callback for when the touched state changes */
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    /** Allow Angular forms to give us the current value */
    writeValue(value: any): void {
        this.value = value;
    }

    /** Allow Angular forms to disable the component */
    setDisabledState(isDisabled: boolean): void {
        if (this._radioButtons) {
            this._radioButtons.forEach(radio => radio.setDisabledState(isDisabled));
        }
    }

    /** Emit the currently selected value */
    emitChange(value: T): void {
        this.valueChange.next(value);
        this.onChange(value);
        this.onTouched();
    }

    /** Inform all child radio buttons of the latest value */
    private updateSelectedRadioButton(): void {
        // update the selected value in all radio buttons
        if (this._radioButtons) {
            this._radioButtons.forEach(radio => radio.writeValue(this._value));
        }

    }
}