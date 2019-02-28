/**
 * This directive allows us to pass information down to a specific ux-date-time-picker
 * without having to expose additional inputs to the consuming application.
 *
 * For example, the day picker needs to know if it is the start or end picker
 * as the behavior will be different for each. However we don't want to expose an
 * input on the DateTimePickerComponent as this will appear in Editor Autocomplete Suggestions
 * options if the Angular Language Service is installed, and we don't want these to be public
 * options.
 */
import { Directive, Input, Self } from '@angular/core';
import { DateRangePicker } from './date-range.service';

export class DateRangeOptions {
  picker: DateRangePicker = DateRangePicker.Start;
}

@Directive({
  selector: '[uxDateRangePicker]',
  providers: [DateRangeOptions]
})
export class DateRangePickerDirective {

  @Input() set picker(picker: DateRangePicker) {
    this._options.picker = picker;
  }

  constructor(@Self() private _options: DateRangeOptions) { }

}
