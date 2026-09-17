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

import { Component } from '@angular/core';
import { FocusIfDirective } from '../../../../directives/focus-if/focus-if.directive';
import { InfiniteScrollLoadFunction } from '../../../../directives/infinite-scroll/index';
import { SelectComponent } from '../../../select/select.component';
import { BaseSearchComponent, BaseSearchComponentConfig } from '../base-search.component';

@Component({
  selector: 'ux-search-select',
  templateUrl: './select.component.html',
  imports: [SelectComponent, FocusIfDirective],
})
export class SearchSelectComponent extends BaseSearchComponent {
  type: string = 'select';

  /**
   * Provide defaults for undefined properties
   */
  get label(): string {
    return this.config.label;
  }

  get options() {
    return this.config.options || [];
  }

  get multiple(): boolean {
    return this.config.multiple || false;
  }

  get placeholder(): string {
    return this.config.placeholder || 'Select item';
  }

  get dropDirection(): 'auto' | 'up' | 'down' {
    return this.config.dropDirection || 'down';
  }

  get allowNull(): boolean {
    return this.config.allowNull || false;
  }

  get disabled(): boolean {
    return this.config.disabled || false;
  }

  get maxHeight(): string {
    return this.config.maxHeight || '250px';
  }

  get pageSize(): number {
    return this.config.pageSize || 20;
  }
}

export interface SearchSelectConfig extends BaseSearchComponentConfig {
  options?: any[] | InfiniteScrollLoadFunction;
  multiple?: boolean;
  dropDirection?: 'up' | 'down';
  allowNull?: boolean;
  disabled?: boolean;
  maxHeight?: string;
  pageSize?: number;
}
