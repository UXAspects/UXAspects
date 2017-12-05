import { Component, OnInit } from '@angular/core';
import { BaseSearchComponent, BaseSearchComponentConfig } from '../base-search.component';
import { DateTimePickerTimezone } from '../../../date-time-picker/index';

@Component({
  selector: 'ux-search-date',
  templateUrl: './date.component.html'
})
export class SearchDateComponent extends BaseSearchComponent implements OnInit {

  type: string = 'date';

  get label(): string {
    return this.config.label;
  }

  get placeholder(): string {
    return this.config.placeholder || 'Enter date';
  }

  ngOnInit(): void {

    // by default set to the current date if not specified
    if (!this.value) {
      this.value = new Date();
    }
  }
}

export interface SearchDateConfig extends BaseSearchComponentConfig { }