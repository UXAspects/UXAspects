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

import { FocusableOption } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FocusIndicatorDirective } from '../../../../directives/accessibility/focus-indicator/focus-indicator.directive';
import { CheckboxComponent } from '../../../checkbox/checkbox.component';
import { Facet } from '../../models/facet';

@Component({
  selector: 'ux-facet-check-list-item',
  templateUrl: './facet-check-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  imports: [FocusIndicatorDirective, CheckboxComponent],
})
export class FacetCheckListItemComponent implements FocusableOption {
  @Input()
  @HostBinding()
  id: string;

  @Input() facet: Facet = null;
  @Input() selected: boolean = false;
  @Input() tabbable: boolean = false;
  @Input() simplified: boolean = false;
  @Output() selectedChange = new EventEmitter<Facet>();
  @Output() itemFocus = new EventEmitter<void>();
  @Output() itemBlur = new EventEmitter<void>();
  @ViewChild('option', { static: true }) option: ElementRef;

  get disabled(): boolean {
    return this.facet && this.facet.disabled;
  }

  getLabel(): string {
    return this.facet ? this.facet.title : '';
  }

  focus(): void {
    this.option.nativeElement.focus();
  }
}
