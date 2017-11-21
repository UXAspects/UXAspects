import { Component, Input, OnInit } from '@angular/core';
import { SearchBuilderGroupService } from '../../search-builder-group/search-builder-group.service';
import { BaseSearchComponent } from '../base-search.component';

@Component({
  selector: 'ux-search-text',
  templateUrl: './search-text.component.html'
})
export class SearchTextComponent extends BaseSearchComponent implements OnInit {

  value: string;
  type: string = 'text';
  label: string;
  placeholder: string = 'Enter text';

  ngOnInit(): void {

    // set initial value if there is one
    if (this.context.value) {
      this.value = this.context.value;
    }

    // if there are no configuration options we can stop here
    if (!this.context.config) {
      return;
    }

    // if there is placeholder property then use it
    if (this.context.config.placeholder) {
      this.placeholder = this.context.config.placeholder;
    }

    // if there is label property then use it
    if (this.context.config.label) {
      this.label = this.context.config.label;
    }
  }
}
