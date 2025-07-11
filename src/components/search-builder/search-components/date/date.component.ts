import { Component, OnInit } from '@angular/core';
import { BaseSearchComponent, BaseSearchComponentConfig } from '../base-search.component';

@Component({
  selector: 'ux-search-date',
  templateUrl: './date.component.html',
  standalone: false,
})
export class SearchDateComponent extends BaseSearchComponent implements OnInit {
  type: string = 'date';

  get label(): string {
    return this.config.label;
  }

  get placeholder(): string {
    return this.config.placeholder || 'Enter date';
  }

  get dateInputAriaLabel(): string {
    return this.config.dateInputAriaLabel || 'Selected date';
  }

  ngOnInit(): void {
    // by default set to the current date if not specified
    if (!this.value) {
      this.value = new Date();
    }
  }
}

export interface SearchDateConfig extends BaseSearchComponentConfig {
  dateInputAriaLabel: string;
}
