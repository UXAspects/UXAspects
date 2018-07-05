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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VhcmNoLWJ1aWxkZXIvc2VhcmNoLWJ1aWxkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDcEcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDOUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDOUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDdkcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDaEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDbkYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDL0YsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDcEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7Z0JBRWhELFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG9CQUFvQjt3QkFDcEIsYUFBYTt3QkFDYixZQUFZO3FCQUNiO29CQUNELE9BQU8sRUFBRTt3QkFDUCxzQkFBc0I7d0JBQ3RCLDJCQUEyQjt3QkFDM0IsbUJBQW1CO3FCQUNwQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osc0JBQXNCO3dCQUN0QiwyQkFBMkI7d0JBQzNCLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQix3QkFBd0I7d0JBQ3hCLDRCQUE0Qjt3QkFDNUIscUJBQXFCO3dCQUNyQixtQkFBbUI7cUJBQ3BCO29CQUNELGVBQWUsRUFBRTt3QkFDZixtQkFBbUI7d0JBQ25CLG1CQUFtQjt3QkFDbkIsd0JBQXdCO3dCQUN4QixxQkFBcUI7cUJBQ3RCO2lCQUNGOzs4QkE1Q0Q7O1NBNkNhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2gtYnVpbGRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlckdyb3VwQ29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2gtYnVpbGRlci1ncm91cC9zZWFyY2gtYnVpbGRlci1ncm91cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VhcmNoVGV4dENvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoLWNvbXBvbmVudHMvdGV4dC90ZXh0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWFyY2hEYXRlQ29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2gtY29tcG9uZW50cy9kYXRlL2RhdGUuY29tcG9uZW50JztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJPdXRsZXREaXJlY3RpdmUgfSBmcm9tICcuL3NlYXJjaC1idWlsZGVyLW91dGxldC9zZWFyY2gtYnVpbGRlci1vdXRsZXQuZGlyZWN0aXZlJztcbmltcG9ydCB7IEJhc2VTZWFyY2hDb21wb25lbnQgfSBmcm9tICcuL3NlYXJjaC1jb21wb25lbnRzL2Jhc2Utc2VhcmNoLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRlVGltZVBpY2tlck1vZHVsZSB9IGZyb20gJy4uL2RhdGUtdGltZS1waWNrZXIvZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUnO1xuaW1wb3J0IHsgU2VhcmNoRGF0ZVJhbmdlQ29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2gtY29tcG9uZW50cy9kYXRlLXJhbmdlL2RhdGUtcmFuZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IFNlYXJjaFNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoLWNvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0TW9kdWxlIH0gZnJvbSAnLi4vc2VsZWN0L2luZGV4JztcbmltcG9ydCB7IFBvcG92ZXJNb2R1bGUgfSBmcm9tICcuLi9wb3BvdmVyL2luZGV4JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEYXRlVGltZVBpY2tlck1vZHVsZSxcbiAgICBQb3BvdmVyTW9kdWxlLFxuICAgIFNlbGVjdE1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgU2VhcmNoQnVpbGRlckNvbXBvbmVudCxcbiAgICBTZWFyY2hCdWlsZGVyR3JvdXBDb21wb25lbnQsXG4gICAgQmFzZVNlYXJjaENvbXBvbmVudFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBTZWFyY2hCdWlsZGVyQ29tcG9uZW50LFxuICAgIFNlYXJjaEJ1aWxkZXJHcm91cENvbXBvbmVudCxcbiAgICBTZWFyY2hUZXh0Q29tcG9uZW50LFxuICAgIFNlYXJjaERhdGVDb21wb25lbnQsXG4gICAgU2VhcmNoRGF0ZVJhbmdlQ29tcG9uZW50LFxuICAgIFNlYXJjaEJ1aWxkZXJPdXRsZXREaXJlY3RpdmUsXG4gICAgU2VhcmNoU2VsZWN0Q29tcG9uZW50LFxuICAgIEJhc2VTZWFyY2hDb21wb25lbnRcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgU2VhcmNoVGV4dENvbXBvbmVudCxcbiAgICBTZWFyY2hEYXRlQ29tcG9uZW50LFxuICAgIFNlYXJjaERhdGVSYW5nZUNvbXBvbmVudCxcbiAgICBTZWFyY2hTZWxlY3RDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hCdWlsZGVyTW9kdWxlIHsgfVxuIl19