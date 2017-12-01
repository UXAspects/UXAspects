import { Component, OnInit } from '@angular/core';
import { BaseSearchComponent } from '../base-search.component';
import { DateTimePickerTimezone } from '../../../date-time-picker/index';

@Component({
  selector: 'ux-search-date',
  templateUrl: './date.component.html'
})
export class SearchDateComponent extends BaseSearchComponent implements OnInit {

  type: string = 'date';
  label: string;
  placeholder: string = 'Enter date';

  ngOnInit(): void {
    
    // by default set to the current date if not specified
    if (!this.value) {
      this.value = new Date();
    }

    // take into account any configuration
    this.label = this.config.label || this.label;
    this.placeholder = this.config.placeholder || this.placeholder;
  }
}