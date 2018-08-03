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
var /** @type {?} */ DECLARATIONS = [
    MediaPlayerComponent,
    MediaPlayerTimelineExtensionComponent,
    MediaPlayerBaseExtensionDirective,
    MediaPlayerControlsExtensionComponent,
    MediaPlayerCustomControlDirective
];
var MediaPlayerModule = /** @class */ (function () {
    function MediaPlayerModule() {
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
    return MediaPlayerModule;
}());
export { MediaPlayerModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtcGxheWVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL21lZGlhLXBsYXllci9tZWRpYS1wbGF5ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDaEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRixPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNqRyxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSwrREFBK0QsQ0FBQztBQUNsSCxPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNqRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVoRSxxQkFBTSxZQUFZLEdBQUc7SUFDakIsb0JBQW9CO0lBQ3BCLHFDQUFxQztJQUNyQyxpQ0FBaUM7SUFDakMscUNBQXFDO0lBQ3JDLGlDQUFpQztDQUNwQyxDQUFDOzs7OztnQkFFRCxRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1oscUJBQXFCO3dCQUNyQixhQUFhO3dCQUNiLGtCQUFrQjt3QkFDbEIsa0JBQWtCO3dCQUNsQixrQkFBa0I7d0JBQ2xCLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQixVQUFVO3dCQUNWLGtCQUFrQjtxQkFDckI7b0JBQ0QsT0FBTyxFQUFFLFlBQVk7b0JBQ3JCLFlBQVksRUFBRSxZQUFZO2lCQUM3Qjs7NEJBeENEOztTQXlDYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY2Nlc3NpYmlsaXR5TW9kdWxlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9hY2Nlc3NpYmlsaXR5L2luZGV4JztcbmltcG9ydCB7IENsaWNrT3V0c2lkZU1vZHVsZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvY2xpY2stb3V0c2lkZS9pbmRleCc7XG5pbXBvcnQgeyBEdXJhdGlvblBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9kdXJhdGlvbi9pbmRleCc7XG5pbXBvcnQgeyBGaWxlU2l6ZVBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9maWxlLXNpemUvaW5kZXgnO1xuaW1wb3J0IHsgQXVkaW9TZXJ2aWNlTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXVkaW8vaW5kZXgnO1xuaW1wb3J0IHsgRnJhbWVFeHRyYWN0aW9uTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZnJhbWUtZXh0cmFjdGlvbi9mcmFtZS1leHRyYWN0aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBTbGlkZXJNb2R1bGUgfSBmcm9tICcuLi9zbGlkZXIvaW5kZXgnO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4uL3Rvb2x0aXAvaW5kZXgnO1xuaW1wb3J0IHsgTWVkaWFQbGF5ZXJCYXNlRXh0ZW5zaW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9leHRlbnNpb25zL2Jhc2UtZXh0ZW5zaW9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZWRpYVBsYXllckNvbnRyb2xzRXh0ZW5zaW9uQ29tcG9uZW50IH0gZnJvbSAnLi9leHRlbnNpb25zL2NvbnRyb2xzL2NvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZWRpYVBsYXllckN1c3RvbUNvbnRyb2xEaXJlY3RpdmUgfSBmcm9tICcuL2V4dGVuc2lvbnMvY29udHJvbHMvY3VzdG9tLWNvbnRyb2wvY3VzdG9tLWNvbnRyb2wuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1lZGlhUGxheWVyVGltZWxpbmVFeHRlbnNpb25Db21wb25lbnQgfSBmcm9tICcuL2V4dGVuc2lvbnMvdGltZWxpbmUvdGltZWxpbmUuY29tcG9uZW50JztcbmltcG9ydCB7IE1lZGlhUGxheWVyQ29tcG9uZW50IH0gZnJvbSAnLi9tZWRpYS1wbGF5ZXIuY29tcG9uZW50JztcblxuY29uc3QgREVDTEFSQVRJT05TID0gW1xuICAgIE1lZGlhUGxheWVyQ29tcG9uZW50LFxuICAgIE1lZGlhUGxheWVyVGltZWxpbmVFeHRlbnNpb25Db21wb25lbnQsXG4gICAgTWVkaWFQbGF5ZXJCYXNlRXh0ZW5zaW9uRGlyZWN0aXZlLFxuICAgIE1lZGlhUGxheWVyQ29udHJvbHNFeHRlbnNpb25Db21wb25lbnQsXG4gICAgTWVkaWFQbGF5ZXJDdXN0b21Db250cm9sRGlyZWN0aXZlXG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGcmFtZUV4dHJhY3Rpb25Nb2R1bGUsXG4gICAgICAgIFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIEF1ZGlvU2VydmljZU1vZHVsZSxcbiAgICAgICAgRHVyYXRpb25QaXBlTW9kdWxlLFxuICAgICAgICBGaWxlU2l6ZVBpcGVNb2R1bGUsXG4gICAgICAgIFNsaWRlck1vZHVsZSxcbiAgICAgICAgQWNjZXNzaWJpbGl0eU1vZHVsZSxcbiAgICAgICAgQTExeU1vZHVsZSxcbiAgICAgICAgQ2xpY2tPdXRzaWRlTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBERUNMQVJBVElPTlMsXG4gICAgZGVjbGFyYXRpb25zOiBERUNMQVJBVElPTlNcbn0pXG5leHBvcnQgY2xhc3MgTWVkaWFQbGF5ZXJNb2R1bGUgeyB9XG4iXX0=