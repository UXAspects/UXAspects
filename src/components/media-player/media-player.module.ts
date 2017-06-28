import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaPlayerComponent } from './media-player.component';
import { MediaPlayerTimelineExtensionComponent } from './extensions/timeline/timeline.component';
import { MediaPlayerBaseExtensionDirective } from './extensions/base-extension.directive';
import { MediaPlayerControlsExtensionComponent } from './extensions/controls/controls.component';
import { FrameExtractionModule } from '../../services/frame-extraction/frame-extraction.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AudioServiceModule } from '../../services/audio/index';
import { DurationPipeModule } from '../../pipes/duration/index';
import { FileSizePipeModule } from '../../pipes/file-size/index';

const DECLARATIONS = [
    MediaPlayerComponent,
    MediaPlayerTimelineExtensionComponent,
    MediaPlayerBaseExtensionDirective,
    MediaPlayerControlsExtensionComponent
];

@NgModule({
    imports: [
        CommonModule,
        FrameExtractionModule,
        TooltipModule.forRoot(),
        AudioServiceModule,
        DurationPipeModule,
        FileSizePipeModule
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS,
    providers: []
})
export class MediaPlayerModule { }
