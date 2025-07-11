import { Component } from '@angular/core';
import { BaseSearchComponent, BaseSearchComponentConfig } from '../base-search.component';

@Component({
  selector: 'ux-search-text',
  templateUrl: './text.component.html',
  standalone: false,
})
export class SearchTextComponent extends BaseSearchComponent {
  type: string = 'text';

  get label(): string {
    return this.config.label;
  }

  get placeholder(): string {
    return this.config.placeholder || 'Enter text';
  }
}

export type SearchTextConfig = BaseSearchComponentConfig;
