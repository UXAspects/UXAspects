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

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ScrollIntoViewIfDirective } from '../../directives/scroll/scroll-into-view-if.directive';
import { TypeaheadHighlightDirective } from './typeahead-highlight.directive';
import { TypeaheadOptionApi } from './typeahead-option-api';
import { TypeaheadOptionContext } from './typeahead-option-context';
import { TypeaheadVisibleOption } from './typeahead-visible-option';

@Component({
  selector: 'ux-typeahead-options-list',
  templateUrl: 'typeahead-options-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TypeaheadHighlightDirective, ScrollIntoViewIfDirective, NgTemplateOutlet],
})
export class TypeaheadOptionsListComponent<T> {
  @Input()
  id: string;

  @Input()
  startIndex: number = 0;

  @Input()
  options: TypeaheadVisibleOption<T>[];

  @Input()
  highlighted: TypeaheadVisibleOption<T>;

  @Input()
  activeKey: string;

  @Input()
  disabledOptions: T[];

  @Input()
  isMultiselectable: boolean = false;

  @Input()
  optionTemplate: TemplateRef<TypeaheadOptionContext<T>>;

  @Input()
  optionApi: TypeaheadOptionApi;

  @Input()
  typeaheadElement: ElementRef<HTMLElement>;

  @Input()
  ariaLabel: string;

  @Output()
  optionMouseover = new EventEmitter<TypeaheadOptionDomEvent<T, MouseEvent>>();

  @Output()
  optionMousedown = new EventEmitter<TypeaheadOptionDomEvent<T, MouseEvent>>();

  @Output()
  optionClick = new EventEmitter<TypeaheadOptionDomEvent<T, MouseEvent>>();

  trackByFn(_: number, option: TypeaheadVisibleOption<T>): string {
    return option.key;
  }
}

export interface TypeaheadOptionDomEvent<T, E extends Event> {
  option: TypeaheadVisibleOption<T>;
  event: E;
}
