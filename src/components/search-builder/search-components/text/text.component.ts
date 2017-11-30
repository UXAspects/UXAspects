import { Component, OnInit } from '@angular/core';
import { BaseSearchComponent } from '../base-search.component';

@Component({
  selector: 'ux-search-text',
  templateUrl: './text.component.html'
})
export class SearchTextComponent extends BaseSearchComponent implements OnInit {

  type: string = 'text';
  label: string;
  placeholder: string = 'Enter text';

  ngOnInit(): void {

    // take into account any configuration
    this.label = this.config.label || this.label;
    this.placeholder = this.config.placeholder || this.placeholder;
  }
}
