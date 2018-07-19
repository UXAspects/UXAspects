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
var SearchBuilderModule = (function () {
    function SearchBuilderModule() {
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
                },] },
    ];
    /** @nocollapse */
    SearchBuilderModule.ctorParameters = function () { return []; };
    return SearchBuilderModule;
}());
export { SearchBuilderModule };
function SearchBuilderModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SearchBuilderModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SearchBuilderModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VhcmNoLWJ1aWxkZXIvc2VhcmNoLWJ1aWxkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDcEcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDOUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDOUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDdkcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDaEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDbkYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDL0YsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDcEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7Z0JBRWhELFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG9CQUFvQjt3QkFDcEIsYUFBYTt3QkFDYixZQUFZO3FCQUNiO29CQUNELE9BQU8sRUFBRTt3QkFDUCxzQkFBc0I7d0JBQ3RCLDJCQUEyQjt3QkFDM0IsbUJBQW1CO3FCQUNwQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osc0JBQXNCO3dCQUN0QiwyQkFBMkI7d0JBQzNCLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQix3QkFBd0I7d0JBQ3hCLDRCQUE0Qjt3QkFDNUIscUJBQXFCO3dCQUNyQixtQkFBbUI7cUJBQ3BCO29CQUNELGVBQWUsRUFBRTt3QkFDZixtQkFBbUI7d0JBQ25CLG1CQUFtQjt3QkFDbkIsd0JBQXdCO3dCQUN4QixxQkFBcUI7cUJBQ3RCO2lCQUNGOzs7OzhCQTVDRDs7U0E2Q2EsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJDb21wb25lbnQgfSBmcm9tICcuL3NlYXJjaC1idWlsZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyR3JvdXBDb21wb25lbnQgfSBmcm9tICcuL3NlYXJjaC1idWlsZGVyLWdyb3VwL3NlYXJjaC1idWlsZGVyLWdyb3VwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWFyY2hUZXh0Q29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2gtY29tcG9uZW50cy90ZXh0L3RleHQuY29tcG9uZW50JztcbmltcG9ydCB7IFNlYXJjaERhdGVDb21wb25lbnQgfSBmcm9tICcuL3NlYXJjaC1jb21wb25lbnRzL2RhdGUvZGF0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlck91dGxldERpcmVjdGl2ZSB9IGZyb20gJy4vc2VhcmNoLWJ1aWxkZXItb3V0bGV0L3NlYXJjaC1idWlsZGVyLW91dGxldC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQmFzZVNlYXJjaENvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoLWNvbXBvbmVudHMvYmFzZS1zZWFyY2guY29tcG9uZW50JztcbmltcG9ydCB7IERhdGVUaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnLi4vZGF0ZS10aW1lLXBpY2tlci9kYXRlLXRpbWUtcGlja2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBTZWFyY2hEYXRlUmFuZ2VDb21wb25lbnQgfSBmcm9tICcuL3NlYXJjaC1jb21wb25lbnRzL2RhdGUtcmFuZ2UvZGF0ZS1yYW5nZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VhcmNoU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2gtY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWxlY3RNb2R1bGUgfSBmcm9tICcuLi9zZWxlY3QvaW5kZXgnO1xuaW1wb3J0IHsgUG9wb3Zlck1vZHVsZSB9IGZyb20gJy4uL3BvcG92ZXIvaW5kZXgnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIERhdGVUaW1lUGlja2VyTW9kdWxlLFxuICAgIFBvcG92ZXJNb2R1bGUsXG4gICAgU2VsZWN0TW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBTZWFyY2hCdWlsZGVyQ29tcG9uZW50LFxuICAgIFNlYXJjaEJ1aWxkZXJHcm91cENvbXBvbmVudCxcbiAgICBCYXNlU2VhcmNoQ29tcG9uZW50XG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFNlYXJjaEJ1aWxkZXJDb21wb25lbnQsXG4gICAgU2VhcmNoQnVpbGRlckdyb3VwQ29tcG9uZW50LFxuICAgIFNlYXJjaFRleHRDb21wb25lbnQsXG4gICAgU2VhcmNoRGF0ZUNvbXBvbmVudCxcbiAgICBTZWFyY2hEYXRlUmFuZ2VDb21wb25lbnQsXG4gICAgU2VhcmNoQnVpbGRlck91dGxldERpcmVjdGl2ZSxcbiAgICBTZWFyY2hTZWxlY3RDb21wb25lbnQsXG4gICAgQmFzZVNlYXJjaENvbXBvbmVudFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBTZWFyY2hUZXh0Q29tcG9uZW50LFxuICAgIFNlYXJjaERhdGVDb21wb25lbnQsXG4gICAgU2VhcmNoRGF0ZVJhbmdlQ29tcG9uZW50LFxuICAgIFNlYXJjaFNlbGVjdENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaEJ1aWxkZXJNb2R1bGUgeyB9XG4iXX0=