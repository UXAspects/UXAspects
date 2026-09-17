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

import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { Directive, HostBinding, inject, Input } from '@angular/core';
import { TreeGridRowDirective } from './tree-grid-row.directive';

@Directive({ selector: '[uxTreeGridIndent]' })
export class TreeGridIndentDirective {
  readonly _row = inject(TreeGridRowDirective);

  /** The amount each level should be indented by */
  @Input()
  set uxTreeGridIndent(value: number | undefined) {
    this._indent = coerceNumberProperty(value, 25);
  }

  get uxTreeGridIndent(): number | undefined {
    return this._indent;
  }

  /** The padding value applied to each level */
  @HostBinding('style.padding-left.px')
  get indentation(): number {
    return this._row && this._row.item ? 7 + this._row.item.state.level * this._indent : 7;
  }

  private _indent: number;

  static ngAcceptInputType_uxTreeGridIndent: NumberInput | undefined;
}
