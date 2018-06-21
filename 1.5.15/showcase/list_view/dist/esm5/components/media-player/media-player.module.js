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
var /** @type {?} */ DECLARATIONS = [
    MediaPlayerComponent,
    MediaPlayerTimelineExtensionComponent,
    MediaPlayerBaseExtensionDirective,
    MediaPlayerControlsExtensionComponent
];
var MediaPlayerModule = (function () {
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
                        FileSizePipeModule
                    ],
                    exports: DECLARATIONS,
                    declarations: DECLARATIONS,
                    providers: [MediaPlayerService]
                },] },
    ];
    return MediaPlayerModule;
}());
export { MediaPlayerModule };
function MediaPlayerModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MediaPlayerModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MediaPlayerModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtcGxheWVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL21lZGlhLXBsYXllci9tZWRpYS1wbGF5ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNqRyxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRixPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNqRyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUNoRyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFakQscUJBQU0sWUFBWSxHQUFHO0lBQ2pCLG9CQUFvQjtJQUNwQixxQ0FBcUM7SUFDckMsaUNBQWlDO0lBQ2pDLHFDQUFxQztDQUN4QyxDQUFDOzs7OztnQkFFRCxRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1oscUJBQXFCO3dCQUNyQixhQUFhO3dCQUNiLGtCQUFrQjt3QkFDbEIsa0JBQWtCO3dCQUNsQixrQkFBa0I7cUJBQ3JCO29CQUNELE9BQU8sRUFBRSxZQUFZO29CQUNyQixZQUFZLEVBQUUsWUFBWTtvQkFDMUIsU0FBUyxFQUFFLENBQUMsa0JBQWtCLENBQUM7aUJBQ2xDOzs0QkFqQ0Q7O1NBa0NhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBNZWRpYVBsYXllckNvbXBvbmVudCB9IGZyb20gJy4vbWVkaWEtcGxheWVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZWRpYVBsYXllclRpbWVsaW5lRXh0ZW5zaW9uQ29tcG9uZW50IH0gZnJvbSAnLi9leHRlbnNpb25zL3RpbWVsaW5lL3RpbWVsaW5lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZWRpYVBsYXllckJhc2VFeHRlbnNpb25EaXJlY3RpdmUgfSBmcm9tICcuL2V4dGVuc2lvbnMvYmFzZS1leHRlbnNpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IE1lZGlhUGxheWVyQ29udHJvbHNFeHRlbnNpb25Db21wb25lbnQgfSBmcm9tICcuL2V4dGVuc2lvbnMvY29udHJvbHMvY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCB7IEZyYW1lRXh0cmFjdGlvbk1vZHVsZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2ZyYW1lLWV4dHJhY3Rpb24vZnJhbWUtZXh0cmFjdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQXVkaW9TZXJ2aWNlTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXVkaW8vaW5kZXgnO1xuaW1wb3J0IHsgRHVyYXRpb25QaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vcGlwZXMvZHVyYXRpb24vaW5kZXgnO1xuaW1wb3J0IHsgRmlsZVNpemVQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vcGlwZXMvZmlsZS1zaXplL2luZGV4JztcbmltcG9ydCB7IE1lZGlhUGxheWVyU2VydmljZSB9IGZyb20gJy4vbWVkaWEtcGxheWVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4uL3Rvb2x0aXAvaW5kZXgnO1xuXG5jb25zdCBERUNMQVJBVElPTlMgPSBbXG4gICAgTWVkaWFQbGF5ZXJDb21wb25lbnQsXG4gICAgTWVkaWFQbGF5ZXJUaW1lbGluZUV4dGVuc2lvbkNvbXBvbmVudCxcbiAgICBNZWRpYVBsYXllckJhc2VFeHRlbnNpb25EaXJlY3RpdmUsXG4gICAgTWVkaWFQbGF5ZXJDb250cm9sc0V4dGVuc2lvbkNvbXBvbmVudFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRnJhbWVFeHRyYWN0aW9uTW9kdWxlLFxuICAgICAgICBUb29sdGlwTW9kdWxlLFxuICAgICAgICBBdWRpb1NlcnZpY2VNb2R1bGUsXG4gICAgICAgIER1cmF0aW9uUGlwZU1vZHVsZSxcbiAgICAgICAgRmlsZVNpemVQaXBlTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBERUNMQVJBVElPTlMsXG4gICAgZGVjbGFyYXRpb25zOiBERUNMQVJBVElPTlMsXG4gICAgcHJvdmlkZXJzOiBbTWVkaWFQbGF5ZXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBNZWRpYVBsYXllck1vZHVsZSB7IH1cbiJdfQ==