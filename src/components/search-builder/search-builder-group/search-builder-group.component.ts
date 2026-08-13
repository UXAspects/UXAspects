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
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FocusIndicatorDirective } from '../../../directives/accessibility/focus-indicator/focus-indicator.directive';
import { FocusWithinDirective } from '../../../directives/accessibility/focus-within/focus-within.directive';
import { IconComponent } from '../../icon/icon.component';
import { SearchBuilderGroupQuery } from '../interfaces/group-query.interface';
import { SearchBuilderFocusService } from '../search-builder-focus.service';
import { SearchBuilderOutletDirective } from '../search-builder-outlet/search-builder-outlet.directive';
import { SearchBuilderGroupService } from './search-builder-group.service';

@Component({
  selector: 'ux-search-builder-group',
  templateUrl: './search-builder-group.component.html',
  providers: [SearchBuilderGroupService],
  imports: [
    FocusWithinDirective,
    SearchBuilderOutletDirective,
    FocusIndicatorDirective,
    IconComponent,
    NgTemplateOutlet,
  ],
})
export class SearchBuilderGroupComponent implements OnInit, OnDestroy {
  readonly searchBuilderGroupService = inject(SearchBuilderGroupService);

  private readonly _searchBuilderFocusService = inject(SearchBuilderFocusService);

  @Input() id: string;
  @Input() header: string;
  @Input() operator: SearchBuilderGroupOperator = 'and';
  @Input() addText: string = 'Add a field';
  @Input() placeholder: TemplateRef<void>;
  @Input() showPlaceholder: boolean = false;
  @Input() removeFieldButtonAriaLabel: string = 'Remove field';

  @Output() add: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() remove: EventEmitter<SearchBuilderGroupQuery> =
    new EventEmitter<SearchBuilderGroupQuery>();

  focusIndex: number = -1;

  private readonly _onDestroy = new Subject<void>();

  ngOnInit(): void {
    // ensure we have a name otherwise throw an error
    if (!this.id) {
      throw new Error('Search builder group must have an id attribute.');
    }

    // otherwise register the group
    this.searchBuilderGroupService.init(this.id);

    // Track focus for child components
    this._searchBuilderFocusService.focus$.pipe(takeUntil(this._onDestroy)).subscribe(focus => {
      this.focusIndex = focus.groupId === this.id ? focus.index : -1;
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  addField(event: MouseEvent): void {
    this.add.emit(event);
  }

  removeFieldAtIndex(index: number, field: SearchBuilderGroupQuery): void {
    this.searchBuilderGroupService.removeAtIndex(index);
    this.remove.emit(field);
  }

  setFocus(index: number): void {
    this._searchBuilderFocusService.setFocus(this.id, index);
  }

  clearFocus(): void {
    this._searchBuilderFocusService.clearFocus();
  }
}

export type SearchBuilderGroupOperator = 'and' | 'or' | 'not';
