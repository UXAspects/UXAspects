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

import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

let uniqueId: number = 0;

@Component({
  selector: 'ux-timeline-event',
  templateUrl: './timeline-event.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
})
export class TimelineEventComponent {
  /** Define the id for the event */
  @Input() id: string = `ux-timeline-event-${uniqueId++}`;

  /** Define the badge color */
  @Input() badgeColor: string;

  /** Define the title to display in the badge */
  @Input() badgeTitle: string;
}
