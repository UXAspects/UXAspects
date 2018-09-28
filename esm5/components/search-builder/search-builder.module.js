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
var SearchBuilderModule = /** @class */ (function () {
    function SearchBuilderModule() {
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
    return SearchBuilderModule;
}());
export { SearchBuilderModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VhcmNoLWJ1aWxkZXIvc2VhcmNoLWJ1aWxkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDcEcsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDdkcsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDaEYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDL0YsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDcEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUNBQXlDLENBQUM7Ozs7O2dCQUU3RSxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLG1CQUFtQjt3QkFDbkIsWUFBWTt3QkFDWixvQkFBb0I7d0JBQ3BCLGFBQWE7d0JBQ2IsV0FBVzt3QkFDWCxhQUFhO3dCQUNiLFlBQVk7cUJBQ2I7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHNCQUFzQjt3QkFDdEIsMkJBQTJCO3dCQUMzQixtQkFBbUI7cUJBQ3BCO29CQUNELFlBQVksRUFBRTt3QkFDWixzQkFBc0I7d0JBQ3RCLDJCQUEyQjt3QkFDM0IsbUJBQW1CO3dCQUNuQixtQkFBbUI7d0JBQ25CLHdCQUF3Qjt3QkFDeEIsNEJBQTRCO3dCQUM1QixxQkFBcUI7d0JBQ3JCLG1CQUFtQjtxQkFDcEI7b0JBQ0QsZUFBZSxFQUFFO3dCQUNmLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQix3QkFBd0I7d0JBQ3hCLHFCQUFxQjtxQkFDdEI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULHlCQUF5QjtxQkFDMUI7aUJBQ0Y7OzhCQXBERDs7U0FxRGEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFjY2Vzc2liaWxpdHlNb2R1bGUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2FjY2Vzc2liaWxpdHkvaW5kZXgnO1xuaW1wb3J0IHsgRm9jdXNJZk1vZHVsZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvZm9jdXMtaWYvaW5kZXgnO1xuaW1wb3J0IHsgRGF0ZVRpbWVQaWNrZXJNb2R1bGUgfSBmcm9tICcuLi9kYXRlLXRpbWUtcGlja2VyL2RhdGUtdGltZS1waWNrZXIubW9kdWxlJztcbmltcG9ydCB7IFBvcG92ZXJNb2R1bGUgfSBmcm9tICcuLi9wb3BvdmVyL2luZGV4JztcbmltcG9ydCB7IFNlbGVjdE1vZHVsZSB9IGZyb20gJy4uL3NlbGVjdC9pbmRleCc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi9zZWFyY2gtYnVpbGRlci1mb2N1cy5zZXJ2aWNlJztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJHcm91cENvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoLWJ1aWxkZXItZ3JvdXAvc2VhcmNoLWJ1aWxkZXItZ3JvdXAuY29tcG9uZW50JztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJPdXRsZXREaXJlY3RpdmUgfSBmcm9tICcuL3NlYXJjaC1idWlsZGVyLW91dGxldC9zZWFyY2gtYnVpbGRlci1vdXRsZXQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJDb21wb25lbnQgfSBmcm9tICcuL3NlYXJjaC1idWlsZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCYXNlU2VhcmNoQ29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2gtY29tcG9uZW50cy9iYXNlLXNlYXJjaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VhcmNoRGF0ZVJhbmdlQ29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2gtY29tcG9uZW50cy9kYXRlLXJhbmdlL2RhdGUtcmFuZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IFNlYXJjaERhdGVDb21wb25lbnQgfSBmcm9tICcuL3NlYXJjaC1jb21wb25lbnRzL2RhdGUvZGF0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VhcmNoU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2gtY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWFyY2hUZXh0Q29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2gtY29tcG9uZW50cy90ZXh0L3RleHQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEFjY2Vzc2liaWxpdHlNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIERhdGVUaW1lUGlja2VyTW9kdWxlLFxuICAgIEZvY3VzSWZNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUG9wb3Zlck1vZHVsZSxcbiAgICBTZWxlY3RNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBTZWFyY2hCdWlsZGVyQ29tcG9uZW50LFxuICAgIFNlYXJjaEJ1aWxkZXJHcm91cENvbXBvbmVudCxcbiAgICBCYXNlU2VhcmNoQ29tcG9uZW50XG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFNlYXJjaEJ1aWxkZXJDb21wb25lbnQsXG4gICAgU2VhcmNoQnVpbGRlckdyb3VwQ29tcG9uZW50LFxuICAgIFNlYXJjaFRleHRDb21wb25lbnQsXG4gICAgU2VhcmNoRGF0ZUNvbXBvbmVudCxcbiAgICBTZWFyY2hEYXRlUmFuZ2VDb21wb25lbnQsXG4gICAgU2VhcmNoQnVpbGRlck91dGxldERpcmVjdGl2ZSxcbiAgICBTZWFyY2hTZWxlY3RDb21wb25lbnQsXG4gICAgQmFzZVNlYXJjaENvbXBvbmVudFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBTZWFyY2hUZXh0Q29tcG9uZW50LFxuICAgIFNlYXJjaERhdGVDb21wb25lbnQsXG4gICAgU2VhcmNoRGF0ZVJhbmdlQ29tcG9uZW50LFxuICAgIFNlYXJjaFNlbGVjdENvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBTZWFyY2hCdWlsZGVyRm9jdXNTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoQnVpbGRlck1vZHVsZSB7IH1cbiJdfQ==