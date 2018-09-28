/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { FocusIfModule } from '../../directives/focus-if/index';
import { DateTimePickerModule } from '../date-time-picker/date-time-picker.module';
import { PopoverModule } from '../popover/index';
import { SelectModule } from '../select/index';
import { SearchBuilderFocusService } from './search-builder-focus.service';
import { SearchBuilderGroupComponent } from './search-builder-group/search-builder-group.component';
import { SearchBuilderOutletDirective } from './search-builder-outlet/search-builder-outlet.directive';
import { SearchBuilderComponent } from './search-builder.component';
import { BaseSearchComponent } from './search-components/base-search.component';
import { SearchDateRangeComponent } from './search-components/date-range/date-range.component';
import { SearchDateComponent } from './search-components/date/date.component';
import { SearchSelectComponent } from './search-components/select/select.component';
import { SearchTextComponent } from './search-components/text/text.component';
export class SearchBuilderModule {
}
SearchBuilderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    AccessibilityModule,
                    CommonModule,
                    DateTimePickerModule,
                    FocusIfModule,
                    FormsModule,
                    PopoverModule,
                    SelectModule,
                ],
                exports: [
                    SearchBuilderComponent,
                    SearchBuilderGroupComponent,
                    BaseSearchComponent
                ],
                declarations: [
                    SearchBuilderComponent,
                    SearchBuilderGroupComponent,
                    SearchTextComponent,
                    SearchDateComponent,
                    SearchDateRangeComponent,
                    SearchBuilderOutletDirective,
                    SearchSelectComponent,
                    BaseSearchComponent
                ],
                entryComponents: [
                    SearchTextComponent,
                    SearchDateComponent,
                    SearchDateRangeComponent,
                    SearchSelectComponent
                ],
                providers: [
                    SearchBuilderFocusService
                ]
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VhcmNoLWJ1aWxkZXIvc2VhcmNoLWJ1aWxkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDcEcsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDdkcsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDaEYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDL0YsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDcEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFxQzlFLE1BQU07OztZQW5DTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLG1CQUFtQjtvQkFDbkIsWUFBWTtvQkFDWixvQkFBb0I7b0JBQ3BCLGFBQWE7b0JBQ2IsV0FBVztvQkFDWCxhQUFhO29CQUNiLFlBQVk7aUJBQ2I7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHNCQUFzQjtvQkFDdEIsMkJBQTJCO29CQUMzQixtQkFBbUI7aUJBQ3BCO2dCQUNELFlBQVksRUFBRTtvQkFDWixzQkFBc0I7b0JBQ3RCLDJCQUEyQjtvQkFDM0IsbUJBQW1CO29CQUNuQixtQkFBbUI7b0JBQ25CLHdCQUF3QjtvQkFDeEIsNEJBQTRCO29CQUM1QixxQkFBcUI7b0JBQ3JCLG1CQUFtQjtpQkFDcEI7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLG1CQUFtQjtvQkFDbkIsbUJBQW1CO29CQUNuQix3QkFBd0I7b0JBQ3hCLHFCQUFxQjtpQkFDdEI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULHlCQUF5QjtpQkFDMUI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY2Nlc3NpYmlsaXR5TW9kdWxlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9hY2Nlc3NpYmlsaXR5L2luZGV4JztcbmltcG9ydCB7IEZvY3VzSWZNb2R1bGUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2ZvY3VzLWlmL2luZGV4JztcbmltcG9ydCB7IERhdGVUaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnLi4vZGF0ZS10aW1lLXBpY2tlci9kYXRlLXRpbWUtcGlja2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBQb3BvdmVyTW9kdWxlIH0gZnJvbSAnLi4vcG9wb3Zlci9pbmRleCc7XG5pbXBvcnQgeyBTZWxlY3RNb2R1bGUgfSBmcm9tICcuLi9zZWxlY3QvaW5kZXgnO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlckZvY3VzU2VydmljZSB9IGZyb20gJy4vc2VhcmNoLWJ1aWxkZXItZm9jdXMuc2VydmljZSc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyR3JvdXBDb21wb25lbnQgfSBmcm9tICcuL3NlYXJjaC1idWlsZGVyLWdyb3VwL3NlYXJjaC1idWlsZGVyLWdyb3VwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyT3V0bGV0RGlyZWN0aXZlIH0gZnJvbSAnLi9zZWFyY2gtYnVpbGRlci1vdXRsZXQvc2VhcmNoLWJ1aWxkZXItb3V0bGV0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2gtYnVpbGRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFzZVNlYXJjaENvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoLWNvbXBvbmVudHMvYmFzZS1zZWFyY2guY29tcG9uZW50JztcbmltcG9ydCB7IFNlYXJjaERhdGVSYW5nZUNvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoLWNvbXBvbmVudHMvZGF0ZS1yYW5nZS9kYXRlLXJhbmdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWFyY2hEYXRlQ29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2gtY29tcG9uZW50cy9kYXRlL2RhdGUuY29tcG9uZW50JztcbmltcG9ydCB7IFNlYXJjaFNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoLWNvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VhcmNoVGV4dENvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoLWNvbXBvbmVudHMvdGV4dC90ZXh0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBBY2Nlc3NpYmlsaXR5TW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBEYXRlVGltZVBpY2tlck1vZHVsZSxcbiAgICBGb2N1c0lmTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFBvcG92ZXJNb2R1bGUsXG4gICAgU2VsZWN0TW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgU2VhcmNoQnVpbGRlckNvbXBvbmVudCxcbiAgICBTZWFyY2hCdWlsZGVyR3JvdXBDb21wb25lbnQsXG4gICAgQmFzZVNlYXJjaENvbXBvbmVudFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBTZWFyY2hCdWlsZGVyQ29tcG9uZW50LFxuICAgIFNlYXJjaEJ1aWxkZXJHcm91cENvbXBvbmVudCxcbiAgICBTZWFyY2hUZXh0Q29tcG9uZW50LFxuICAgIFNlYXJjaERhdGVDb21wb25lbnQsXG4gICAgU2VhcmNoRGF0ZVJhbmdlQ29tcG9uZW50LFxuICAgIFNlYXJjaEJ1aWxkZXJPdXRsZXREaXJlY3RpdmUsXG4gICAgU2VhcmNoU2VsZWN0Q29tcG9uZW50LFxuICAgIEJhc2VTZWFyY2hDb21wb25lbnRcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgU2VhcmNoVGV4dENvbXBvbmVudCxcbiAgICBTZWFyY2hEYXRlQ29tcG9uZW50LFxuICAgIFNlYXJjaERhdGVSYW5nZUNvbXBvbmVudCxcbiAgICBTZWFyY2hTZWxlY3RDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgU2VhcmNoQnVpbGRlckZvY3VzU2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaEJ1aWxkZXJNb2R1bGUgeyB9XG4iXX0=