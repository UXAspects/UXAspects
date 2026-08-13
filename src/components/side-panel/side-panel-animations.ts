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
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export enum SidePanelAnimationState {
  Closed = 'closed',
  Open = 'open',
  OpenImmediate = 'openImmediate',
}

export const sidePanelStateAnimation: AnimationTriggerMetadata = trigger('panelState', [
  state(SidePanelAnimationState.Closed, style({ visibility: 'hidden' })),
  state(
    `${SidePanelAnimationState.Open}, ${SidePanelAnimationState.OpenImmediate}`,
    style({ visibility: 'visible', transform: 'none' })
  ),
  transition(
    `void <=> ${SidePanelAnimationState.Open}`,
    animate('0.2s cubic-bezier(0.49, 1, 0.38, 0.98)')
  ),
  transition(`void <=> ${SidePanelAnimationState.OpenImmediate}`, animate('0s')),
]);
