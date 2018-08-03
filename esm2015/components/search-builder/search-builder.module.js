/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchBuilderComponent } from './search-builder.component';
import { SearchBuilderGroupComponent } from './search-builder-group/search-builder-group.component';
import { SearchTextComponent } from './search-components/text/text.component';
import { SearchDateComponent } from './search-components/date/date.component';
import { SearchBuilderOutletDirective } from './search-builder-outlet/search-builder-outlet.directive';
import { BaseSearchComponent } from './search-components/base-search.component';
import { DateTimePickerModule } from '../date-time-picker/date-time-picker.module';
import { SearchDateRangeComponent } from './search-components/date-range/date-range.component';
import { SearchSelectComponent } from './search-components/select/select.component';
import { SelectModule } from '../select/index';
import { PopoverModule } from '../popover/index';
export class SearchBuilderModule {
}
SearchBuilderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    DateTimePickerModule,
                    PopoverModule,
                    SelectModule
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
                ]
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VhcmNoLWJ1aWxkZXIvc2VhcmNoLWJ1aWxkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDcEcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDOUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDOUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDdkcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDaEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDbkYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDL0YsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDcEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQWdDakQsTUFBTTs7O1lBOUJMLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixXQUFXO29CQUNYLG9CQUFvQjtvQkFDcEIsYUFBYTtvQkFDYixZQUFZO2lCQUNiO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxzQkFBc0I7b0JBQ3RCLDJCQUEyQjtvQkFDM0IsbUJBQW1CO2lCQUNwQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osc0JBQXNCO29CQUN0QiwyQkFBMkI7b0JBQzNCLG1CQUFtQjtvQkFDbkIsbUJBQW1CO29CQUNuQix3QkFBd0I7b0JBQ3hCLDRCQUE0QjtvQkFDNUIscUJBQXFCO29CQUNyQixtQkFBbUI7aUJBQ3BCO2dCQUNELGVBQWUsRUFBRTtvQkFDZixtQkFBbUI7b0JBQ25CLG1CQUFtQjtvQkFDbkIsd0JBQXdCO29CQUN4QixxQkFBcUI7aUJBQ3RCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlckNvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoLWJ1aWxkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJHcm91cENvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoLWJ1aWxkZXItZ3JvdXAvc2VhcmNoLWJ1aWxkZXItZ3JvdXAuY29tcG9uZW50JztcbmltcG9ydCB7IFNlYXJjaFRleHRDb21wb25lbnQgfSBmcm9tICcuL3NlYXJjaC1jb21wb25lbnRzL3RleHQvdGV4dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VhcmNoRGF0ZUNvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoLWNvbXBvbmVudHMvZGF0ZS9kYXRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyT3V0bGV0RGlyZWN0aXZlIH0gZnJvbSAnLi9zZWFyY2gtYnVpbGRlci1vdXRsZXQvc2VhcmNoLWJ1aWxkZXItb3V0bGV0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCYXNlU2VhcmNoQ29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2gtY29tcG9uZW50cy9iYXNlLXNlYXJjaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0ZVRpbWVQaWNrZXJNb2R1bGUgfSBmcm9tICcuLi9kYXRlLXRpbWUtcGlja2VyL2RhdGUtdGltZS1waWNrZXIubW9kdWxlJztcbmltcG9ydCB7IFNlYXJjaERhdGVSYW5nZUNvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoLWNvbXBvbmVudHMvZGF0ZS1yYW5nZS9kYXRlLXJhbmdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWFyY2hTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL3NlYXJjaC1jb21wb25lbnRzL3NlbGVjdC9zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbGVjdE1vZHVsZSB9IGZyb20gJy4uL3NlbGVjdC9pbmRleCc7XG5pbXBvcnQgeyBQb3BvdmVyTW9kdWxlIH0gZnJvbSAnLi4vcG9wb3Zlci9pbmRleCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRGF0ZVRpbWVQaWNrZXJNb2R1bGUsXG4gICAgUG9wb3Zlck1vZHVsZSxcbiAgICBTZWxlY3RNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFNlYXJjaEJ1aWxkZXJDb21wb25lbnQsXG4gICAgU2VhcmNoQnVpbGRlckdyb3VwQ29tcG9uZW50LFxuICAgIEJhc2VTZWFyY2hDb21wb25lbnRcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU2VhcmNoQnVpbGRlckNvbXBvbmVudCxcbiAgICBTZWFyY2hCdWlsZGVyR3JvdXBDb21wb25lbnQsXG4gICAgU2VhcmNoVGV4dENvbXBvbmVudCxcbiAgICBTZWFyY2hEYXRlQ29tcG9uZW50LFxuICAgIFNlYXJjaERhdGVSYW5nZUNvbXBvbmVudCxcbiAgICBTZWFyY2hCdWlsZGVyT3V0bGV0RGlyZWN0aXZlLFxuICAgIFNlYXJjaFNlbGVjdENvbXBvbmVudCxcbiAgICBCYXNlU2VhcmNoQ29tcG9uZW50XG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIFNlYXJjaFRleHRDb21wb25lbnQsXG4gICAgU2VhcmNoRGF0ZUNvbXBvbmVudCxcbiAgICBTZWFyY2hEYXRlUmFuZ2VDb21wb25lbnQsXG4gICAgU2VhcmNoU2VsZWN0Q29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoQnVpbGRlck1vZHVsZSB7IH1cbiJdfQ==