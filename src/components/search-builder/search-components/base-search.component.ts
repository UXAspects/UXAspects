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

import { Component, inject, OnDestroy } from '@angular/core';
import { SearchBuilderComponentContext } from '../interfaces/component-context.interface';
import { SearchBuilderService } from '../search-builder.service';

@Component({
  selector: 'ux-base-search',
  template: '',
})
export class BaseSearchComponent implements OnDestroy {
  private readonly _searchBuilderService = inject(SearchBuilderService);

  get id(): string {
    return `ux-search-builder-search-component-${this._id}`;
  }

  type: string;

  config: any;
  context: SearchBuilderComponentContext;
  focus: boolean;

  /**
   * Get the current value of the component
   */
  get value() {
    return this.context.value;
  }

  /**
   * Set the current value of the component
   */

  set value(value: any) {
    this.context.value = value;
    this._searchBuilderService.queryHasChanged();

    // if value has been set perform validation
    this.validate();
  }

  get valid(): boolean {
    return this._valid;
  }

  set valid(valid: boolean) {
    this._valid = valid;
    this._searchBuilderService.setValid(this._id, valid);
  }

  private readonly _id: number = this._searchBuilderService.generateComponentId();
  private _valid: boolean = true;

  /**
   * Make sure we clean up after ourselves
   */
  ngOnDestroy(): void {
    this.valid = true;
  }

  /**
   * Perform any required validation on the value
   */
  validate(): void {
    // if a custom validation function has been provided then use it
    this.valid = this.config.validation ? this.config.validation(this, this.value) : true;
  }
}

export interface BaseSearchComponentConfig {
  label?: string;
  placeholder?: string;
  validation?: (value: unknown) => boolean;
}
