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

import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { ClickOutsideModule } from '../../directives/click-outside/index';
import { DurationPipeModule } from '../../pipes/duration/index';
import { FileSizePipeModule } from '../../pipes/file-size/index';
import { AudioServiceModule } from '../../services/audio/index';
import { IconModule } from '../icon/index';
import { SliderModule } from '../slider/index';
import { TooltipModule } from '../tooltip/index';
import { MediaPlayerBaseExtensionDirective } from './extensions/base-extension.directive';
import { MediaPlayerControlsExtensionComponent } from './extensions/controls/controls.component';
import { MediaPlayerCustomControlDirective } from './extensions/controls/custom-control/custom-control.directive';
import { MediaPlayerTimelineExtensionComponent } from './extensions/timeline/timeline.component';
import { MediaPlayerComponent } from './media-player.component';

const DECLARATIONS = [
  MediaPlayerComponent,
  MediaPlayerTimelineExtensionComponent,
  MediaPlayerBaseExtensionDirective,
  MediaPlayerControlsExtensionComponent,
  MediaPlayerCustomControlDirective,
];

@NgModule({
  imports: [
    A11yModule,
    AccessibilityModule,
    AudioServiceModule,
    ClickOutsideModule,
    CommonModule,
    DurationPipeModule,
    FileSizePipeModule,
    IconModule,
    SliderModule,
    TooltipModule,
    ...DECLARATIONS,
  ],
  exports: DECLARATIONS,
})
export class MediaPlayerModule {}
