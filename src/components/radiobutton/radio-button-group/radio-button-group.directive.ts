///
/// Copyright 2015-2026 Micro Focus or one of its affiliates.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///      http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import {
  AfterContentInit,
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  EventEmitter,
  ExistingProvider,
  forwardRef,
  inject,
  Input,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RadioButtonComponent } from '../radiobutton.component';

export const RADIO_GROUP_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioButtonGroupDirective),
  multi: true,
};

@Directive({
  selector: 'ux-radio-button-group, [uxRadioButtonGroup]',
  providers: [RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
  host: {
    role: 'radiogroup',
  },
})
export class RadioButtonGroupDirective<T = unknown>
  implements ControlValueAccessor, AfterContentInit, OnDestroy
{
  private readonly _changeDetector = inject(ChangeDetectorRef);

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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  /** Used to inform Angular forms that the component value has changed */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: any) => void = () => {};

  @ContentChildren(forwardRef(() => RadioButtonComponent), { descendants: true })
  _radioButtons: QueryList<RadioButtonComponent>;

  /** Unsubscribe from all subscriptions on destroy */
  private readonly _onDestroy$ = new Subject<void>();

  /** Internally store the current value */
  private _value: T = null;

  ngAfterContentInit(): void {
    this.updateSelectedRadioButton();

    // update the selected items any time new ones are added
    this._radioButtons.changes
      .pipe(takeUntil(this._onDestroy$))
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
    this._changeDetector.markForCheck();
  }

  /** Allow Angular forms to disable the component */
  setDisabledState(isDisabled: boolean): void {
    if (this._radioButtons) {
      this._radioButtons.forEach(radio => radio.setDisabledState(isDisabled));
      this._changeDetector.markForCheck();
    }
  }

  /** Emit the currently selected value */
  emitChange(value: T): void {
    this.valueChange.next(value);
    this.onChange(value);
    this.onTouched();
  }

  /** Determine and set the correct internal tabindex */
  determineAndSetInternalTabIndex() {
    const firstEnabled = this._radioButtons.find(radio => {
      return radio.disabled === false;
    });

    this._radioButtons.forEach(radio => {
      if (this._value !== undefined) {
        radio.setInternalTabindex(radio.option === this._value ? 0 : -1);
      } else {
        radio.setInternalTabindex(firstEnabled === radio ? 0 : -1);
      }
    });
  }

  /** Inform all child radio buttons of the latest value */
  private updateSelectedRadioButton(): void {
    // update the selected value in all radio buttons
    if (this._radioButtons) {
      this.determineAndSetInternalTabIndex();
      this._radioButtons.forEach(radio => radio.writeValue(this._value));
    }
  }
}
