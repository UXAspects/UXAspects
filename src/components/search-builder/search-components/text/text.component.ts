import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FocusIfDirective } from '../../../../directives/focus-if/focus-if.directive';
import { BaseSearchComponent, BaseSearchComponentConfig } from '../base-search.component';

@Component({
  selector: 'ux-search-text',
  templateUrl: './text.component.html',
  imports: [FormsModule, FocusIfDirective],
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
