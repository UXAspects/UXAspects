/* eslint-disable @angular-eslint/no-output-native */
import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  inject,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const TOOLBAR_SEARCH_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ToolbarSearchFieldDirective),
  multi: true,
};

@Directive({
  selector: '[uxToolbarSearchField]',
  providers: [TOOLBAR_SEARCH_VALUE_ACCESSOR],
  standalone: false,
})
export class ToolbarSearchFieldDirective implements ControlValueAccessor {
  private readonly _elementRef = inject(ElementRef);

  private readonly _changeDetector = inject(ChangeDetectorRef);

  /** Emit whenever the escape key is pressed */
  @Output() cancel = new EventEmitter<void>();

  /** Emit whenever the enter key is pressed */
  @Output() submitted = new EventEmitter<string>();

  /** Get the current value of the input control */
  get text(): string {
    return this._elementRef.nativeElement.value;
  }

  /** For use with the Forms and ReactiveForms */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouchedCallback: () => void = () => {};

  /** Call this function with the latest value to update ngModel or formControl name */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChangeCallback: (_: any) => void = () => {};

  focus(): void {
    // mark the control as dirty
    this.onTouchedCallback();

    // focus the input control after a delay to ensure the element is present
    requestAnimationFrame(() => this._elementRef.nativeElement.focus());
  }

  blur(): void {
    // blur the input control after a delay to ensure the element is present
    requestAnimationFrame(() => this._elementRef.nativeElement.blur());
  }

  /** Clear the input, if we have an ngModel reset its value otherwise just set the input value to empty */
  clear(): void {
    this.setValue('');
  }

  @HostListener('keydown.enter')
  onEnter(): void {
    this.submitted.emit(this.text);
  }

  @HostListener('keydown.escape')
  onEscape(): void {
    this._elementRef.nativeElement.blur();
    this.cancel.emit();
  }

  @HostListener('input')
  onInput(): void {
    this.setValue(this.text);
  }

  /** Update the input value based on ngModel or formControl */
  writeValue(value: string): void {
    this.setValue(value);
    this._changeDetector.markForCheck();
  }

  /** Register a function to update form control */

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  /** Register a function to mark form control as touched */

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  /** Update the value in all required places */
  private setValue(value: string): void {
    // ngModel/form control can set the default value to null or undefined, which can show in the input. Replace with empty string
    if (!value) {
      value = '';
    }

    // update the form value if there is one in use
    this.onChangeCallback(value);

    // update the content of the input control
    this._elementRef.nativeElement.value = value;
  }
}
