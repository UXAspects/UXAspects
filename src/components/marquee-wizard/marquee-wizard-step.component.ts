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

import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { WizardStepComponent } from '../wizard/index';
import { MarqueeWizardStepIconDirective } from './marquee-wizard-step-icon.directive';

@Component({
  selector: 'ux-marquee-wizard-step',
  templateUrl: './marquee-wizard-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarqueeWizardStepComponent<TContext = unknown> extends WizardStepComponent {
  /** Define additional data that will be available within the stepTemplate context */
  @Input() context: TContext;

  /** Determine the completed state of this step */
  @Input() completed: boolean = false;

  /** Emit when the completed step changes */
  @Output() completedChange = new EventEmitter<boolean>();

  /** Detect if an icon has been defined using the directive */
  @ContentChild(MarqueeWizardStepIconDirective, { read: TemplateRef, static: false })
  _iconTemplate: TemplateRef<void>;

  /**
   * Update the completed state and emit the latest value
   * @param completed whether or not the step is completed
   */
  setCompleted(completed: boolean): void {
    this.completed = completed;
    this.completedChange.emit(completed);
  }
}
