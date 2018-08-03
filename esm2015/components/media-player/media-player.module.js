/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { ClickOutsideModule } from '../../directives/click-outside/index';
import { DurationPipeModule } from '../../pipes/duration/index';
import { FileSizePipeModule } from '../../pipes/file-size/index';
import { AudioServiceModule } from '../../services/audio/index';
import { FrameExtractionModule } from '../../services/frame-extraction/frame-extraction.module';
import { SliderModule } from '../slider/index';
import { TooltipModule } from '../tooltip/index';
import { MediaPlayerBaseExtensionDirective } from './extensions/base-extension.directive';
import { MediaPlayerControlsExtensionComponent } from './extensions/controls/controls.component';
import { MediaPlayerCustomControlDirective } from './extensions/controls/custom-control/custom-control.directive';
import { MediaPlayerTimelineExtensionComponent } from './extensions/timeline/timeline.component';
import { MediaPlayerComponent } from './media-player.component';
const /** @type {?} */ DECLARATIONS = [
    MediaPlayerComponent,
    MediaPlayerTimelineExtensionComponent,
    MediaPlayerBaseExtensionDirective,
    MediaPlayerControlsExtensionComponent,
    MediaPlayerCustomControlDirective
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
                    FileSizePipeModule,
                    SliderModule,
                    AccessibilityModule,
                    A11yModule,
                    ClickOutsideModule
                ],
                exports: DECLARATIONS,
                declarations: DECLARATIONS
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtcGxheWVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL21lZGlhLXBsYXllci9tZWRpYS1wbGF5ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDaEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRixPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNqRyxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSwrREFBK0QsQ0FBQztBQUNsSCxPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNqRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVoRSx1QkFBTSxZQUFZLEdBQUc7SUFDakIsb0JBQW9CO0lBQ3BCLHFDQUFxQztJQUNyQyxpQ0FBaUM7SUFDakMscUNBQXFDO0lBQ3JDLGlDQUFpQztDQUNwQyxDQUFDO0FBa0JGLE1BQU07OztZQWhCTCxRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1oscUJBQXFCO29CQUNyQixhQUFhO29CQUNiLGtCQUFrQjtvQkFDbEIsa0JBQWtCO29CQUNsQixrQkFBa0I7b0JBQ2xCLFlBQVk7b0JBQ1osbUJBQW1CO29CQUNuQixVQUFVO29CQUNWLGtCQUFrQjtpQkFDckI7Z0JBQ0QsT0FBTyxFQUFFLFlBQVk7Z0JBQ3JCLFlBQVksRUFBRSxZQUFZO2FBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWNjZXNzaWJpbGl0eU1vZHVsZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvYWNjZXNzaWJpbGl0eS9pbmRleCc7XG5pbXBvcnQgeyBDbGlja091dHNpZGVNb2R1bGUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2NsaWNrLW91dHNpZGUvaW5kZXgnO1xuaW1wb3J0IHsgRHVyYXRpb25QaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vcGlwZXMvZHVyYXRpb24vaW5kZXgnO1xuaW1wb3J0IHsgRmlsZVNpemVQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vcGlwZXMvZmlsZS1zaXplL2luZGV4JztcbmltcG9ydCB7IEF1ZGlvU2VydmljZU1vZHVsZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1ZGlvL2luZGV4JztcbmltcG9ydCB7IEZyYW1lRXh0cmFjdGlvbk1vZHVsZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2ZyYW1lLWV4dHJhY3Rpb24vZnJhbWUtZXh0cmFjdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgU2xpZGVyTW9kdWxlIH0gZnJvbSAnLi4vc2xpZGVyL2luZGV4JztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICcuLi90b29sdGlwL2luZGV4JztcbmltcG9ydCB7IE1lZGlhUGxheWVyQmFzZUV4dGVuc2lvbkRpcmVjdGl2ZSB9IGZyb20gJy4vZXh0ZW5zaW9ucy9iYXNlLWV4dGVuc2lvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWVkaWFQbGF5ZXJDb250cm9sc0V4dGVuc2lvbkNvbXBvbmVudCB9IGZyb20gJy4vZXh0ZW5zaW9ucy9jb250cm9scy9jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVkaWFQbGF5ZXJDdXN0b21Db250cm9sRGlyZWN0aXZlIH0gZnJvbSAnLi9leHRlbnNpb25zL2NvbnRyb2xzL2N1c3RvbS1jb250cm9sL2N1c3RvbS1jb250cm9sLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZWRpYVBsYXllclRpbWVsaW5lRXh0ZW5zaW9uQ29tcG9uZW50IH0gZnJvbSAnLi9leHRlbnNpb25zL3RpbWVsaW5lL3RpbWVsaW5lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZWRpYVBsYXllckNvbXBvbmVudCB9IGZyb20gJy4vbWVkaWEtcGxheWVyLmNvbXBvbmVudCc7XG5cbmNvbnN0IERFQ0xBUkFUSU9OUyA9IFtcbiAgICBNZWRpYVBsYXllckNvbXBvbmVudCxcbiAgICBNZWRpYVBsYXllclRpbWVsaW5lRXh0ZW5zaW9uQ29tcG9uZW50LFxuICAgIE1lZGlhUGxheWVyQmFzZUV4dGVuc2lvbkRpcmVjdGl2ZSxcbiAgICBNZWRpYVBsYXllckNvbnRyb2xzRXh0ZW5zaW9uQ29tcG9uZW50LFxuICAgIE1lZGlhUGxheWVyQ3VzdG9tQ29udHJvbERpcmVjdGl2ZVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRnJhbWVFeHRyYWN0aW9uTW9kdWxlLFxuICAgICAgICBUb29sdGlwTW9kdWxlLFxuICAgICAgICBBdWRpb1NlcnZpY2VNb2R1bGUsXG4gICAgICAgIER1cmF0aW9uUGlwZU1vZHVsZSxcbiAgICAgICAgRmlsZVNpemVQaXBlTW9kdWxlLFxuICAgICAgICBTbGlkZXJNb2R1bGUsXG4gICAgICAgIEFjY2Vzc2liaWxpdHlNb2R1bGUsXG4gICAgICAgIEExMXlNb2R1bGUsXG4gICAgICAgIENsaWNrT3V0c2lkZU1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogREVDTEFSQVRJT05TLFxuICAgIGRlY2xhcmF0aW9uczogREVDTEFSQVRJT05TXG59KVxuZXhwb3J0IGNsYXNzIE1lZGlhUGxheWVyTW9kdWxlIHsgfVxuIl19