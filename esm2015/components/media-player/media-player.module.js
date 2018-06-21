/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaPlayerComponent } from './media-player.component';
import { MediaPlayerTimelineExtensionComponent } from './extensions/timeline/timeline.component';
import { MediaPlayerBaseExtensionDirective } from './extensions/base-extension.directive';
import { MediaPlayerControlsExtensionComponent } from './extensions/controls/controls.component';
import { FrameExtractionModule } from '../../services/frame-extraction/frame-extraction.module';
import { AudioServiceModule } from '../../services/audio/index';
import { DurationPipeModule } from '../../pipes/duration/index';
import { FileSizePipeModule } from '../../pipes/file-size/index';
import { MediaPlayerService } from './media-player.service';
import { TooltipModule } from '../tooltip/index';
const /** @type {?} */ DECLARATIONS = [
    MediaPlayerComponent,
    MediaPlayerTimelineExtensionComponent,
    MediaPlayerBaseExtensionDirective,
    MediaPlayerControlsExtensionComponent
];
export class MediaPlayerModule {
}
MediaPlayerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FrameExtractionModule,
                    TooltipModule,
                    AudioServiceModule,
                    DurationPipeModule,
                    FileSizePipeModule
                ],
                exports: DECLARATIONS,
                declarations: DECLARATIONS,
                providers: [MediaPlayerService]
            },] },
];
function MediaPlayerModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MediaPlayerModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MediaPlayerModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtcGxheWVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL21lZGlhLXBsYXllci9tZWRpYS1wbGF5ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNqRyxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRixPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNqRyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUNoRyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFakQsdUJBQU0sWUFBWSxHQUFHO0lBQ2pCLG9CQUFvQjtJQUNwQixxQ0FBcUM7SUFDckMsaUNBQWlDO0lBQ2pDLHFDQUFxQztDQUN4QyxDQUFDO0FBZUYsTUFBTTs7O1lBYkwsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLHFCQUFxQjtvQkFDckIsYUFBYTtvQkFDYixrQkFBa0I7b0JBQ2xCLGtCQUFrQjtvQkFDbEIsa0JBQWtCO2lCQUNyQjtnQkFDRCxPQUFPLEVBQUUsWUFBWTtnQkFDckIsWUFBWSxFQUFFLFlBQVk7Z0JBQzFCLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO2FBQ2xDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IE1lZGlhUGxheWVyQ29tcG9uZW50IH0gZnJvbSAnLi9tZWRpYS1wbGF5ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1lZGlhUGxheWVyVGltZWxpbmVFeHRlbnNpb25Db21wb25lbnQgfSBmcm9tICcuL2V4dGVuc2lvbnMvdGltZWxpbmUvdGltZWxpbmUuY29tcG9uZW50JztcbmltcG9ydCB7IE1lZGlhUGxheWVyQmFzZUV4dGVuc2lvbkRpcmVjdGl2ZSB9IGZyb20gJy4vZXh0ZW5zaW9ucy9iYXNlLWV4dGVuc2lvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWVkaWFQbGF5ZXJDb250cm9sc0V4dGVuc2lvbkNvbXBvbmVudCB9IGZyb20gJy4vZXh0ZW5zaW9ucy9jb250cm9scy9jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRnJhbWVFeHRyYWN0aW9uTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZnJhbWUtZXh0cmFjdGlvbi9mcmFtZS1leHRyYWN0aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBBdWRpb1NlcnZpY2VNb2R1bGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdWRpby9pbmRleCc7XG5pbXBvcnQgeyBEdXJhdGlvblBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9kdXJhdGlvbi9pbmRleCc7XG5pbXBvcnQgeyBGaWxlU2l6ZVBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9maWxlLXNpemUvaW5kZXgnO1xuaW1wb3J0IHsgTWVkaWFQbGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi9tZWRpYS1wbGF5ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBUb29sdGlwTW9kdWxlIH0gZnJvbSAnLi4vdG9vbHRpcC9pbmRleCc7XG5cbmNvbnN0IERFQ0xBUkFUSU9OUyA9IFtcbiAgICBNZWRpYVBsYXllckNvbXBvbmVudCxcbiAgICBNZWRpYVBsYXllclRpbWVsaW5lRXh0ZW5zaW9uQ29tcG9uZW50LFxuICAgIE1lZGlhUGxheWVyQmFzZUV4dGVuc2lvbkRpcmVjdGl2ZSxcbiAgICBNZWRpYVBsYXllckNvbnRyb2xzRXh0ZW5zaW9uQ29tcG9uZW50XG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGcmFtZUV4dHJhY3Rpb25Nb2R1bGUsXG4gICAgICAgIFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIEF1ZGlvU2VydmljZU1vZHVsZSxcbiAgICAgICAgRHVyYXRpb25QaXBlTW9kdWxlLFxuICAgICAgICBGaWxlU2l6ZVBpcGVNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IERFQ0xBUkFUSU9OUyxcbiAgICBkZWNsYXJhdGlvbnM6IERFQ0xBUkFUSU9OUyxcbiAgICBwcm92aWRlcnM6IFtNZWRpYVBsYXllclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE1lZGlhUGxheWVyTW9kdWxlIHsgfVxuIl19