/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MenuNavigationModule } from '../../directives/menu-navigation/index';
import { TooltipModule } from '../tooltip/index';
import { TypeaheadModule } from '../typeahead/typeahead.module';
import { FilterBaseComponent } from './filter-base/filter-base.component';
import { FilterContainerComponent } from './filter-container.component';
import { FilterDropdownComponent } from './filter-dropdown/filter-dropdown.component';
import { FilterDynamicComponent } from './filter-dynamic/filter-dynamic.component';
import { FilterTypeaheadHighlight } from './filter-dynamic/filter-typeahead-highlight.pipe';
var /** @type {?} */ DECLARATIONS = [
    FilterBaseComponent,
    FilterContainerComponent,
    FilterDropdownComponent,
    FilterDynamicComponent,
    FilterTypeaheadHighlight
];
var FilterModule = /** @class */ (function () {
    function FilterModule() {
    }
    FilterModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BsDropdownModule.forRoot(),
                        TooltipModule,
                        FormsModule,
                        MenuNavigationModule,
                        CommonModule,
                        TypeaheadModule,
                        A11yModule
                    ],
                    exports: DECLARATIONS,
                    declarations: DECLARATIONS
                },] }
    ];
    return FilterModule;
}());
export { FilterModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZpbHRlcnMvZmlsdGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBRTVGLHFCQUFNLFlBQVksR0FBRztJQUNqQixtQkFBbUI7SUFDbkIsd0JBQXdCO0lBQ3hCLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIsd0JBQXdCO0NBQzNCLENBQUM7Ozs7O2dCQUVELFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO3dCQUMxQixhQUFhO3dCQUNiLFdBQVc7d0JBQ1gsb0JBQW9CO3dCQUNwQixZQUFZO3dCQUNaLGVBQWU7d0JBQ2YsVUFBVTtxQkFDYjtvQkFDRCxPQUFPLEVBQUUsWUFBWTtvQkFDckIsWUFBWSxFQUFFLFlBQVk7aUJBQzdCOzt1QkFsQ0Q7O1NBbUNhLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJzRHJvcGRvd25Nb2R1bGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2Ryb3Bkb3duJztcbmltcG9ydCB7IE1lbnVOYXZpZ2F0aW9uTW9kdWxlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9tZW51LW5hdmlnYXRpb24vaW5kZXgnO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4uL3Rvb2x0aXAvaW5kZXgnO1xuaW1wb3J0IHsgVHlwZWFoZWFkTW9kdWxlIH0gZnJvbSAnLi4vdHlwZWFoZWFkL3R5cGVhaGVhZC5tb2R1bGUnO1xuaW1wb3J0IHsgRmlsdGVyQmFzZUNvbXBvbmVudCB9IGZyb20gJy4vZmlsdGVyLWJhc2UvZmlsdGVyLWJhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IEZpbHRlckNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZmlsdGVyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmlsdGVyRHJvcGRvd25Db21wb25lbnQgfSBmcm9tICcuL2ZpbHRlci1kcm9wZG93bi9maWx0ZXItZHJvcGRvd24uY29tcG9uZW50JztcbmltcG9ydCB7IEZpbHRlckR5bmFtaWNDb21wb25lbnQgfSBmcm9tICcuL2ZpbHRlci1keW5hbWljL2ZpbHRlci1keW5hbWljLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWx0ZXJUeXBlYWhlYWRIaWdobGlnaHQgfSBmcm9tICcuL2ZpbHRlci1keW5hbWljL2ZpbHRlci10eXBlYWhlYWQtaGlnaGxpZ2h0LnBpcGUnO1xuXG5jb25zdCBERUNMQVJBVElPTlMgPSBbXG4gICAgRmlsdGVyQmFzZUNvbXBvbmVudCxcbiAgICBGaWx0ZXJDb250YWluZXJDb21wb25lbnQsXG4gICAgRmlsdGVyRHJvcGRvd25Db21wb25lbnQsXG4gICAgRmlsdGVyRHluYW1pY0NvbXBvbmVudCxcbiAgICBGaWx0ZXJUeXBlYWhlYWRIaWdobGlnaHRcbl07XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBCc0Ryb3Bkb3duTW9kdWxlLmZvclJvb3QoKSxcbiAgICAgICAgVG9vbHRpcE1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIE1lbnVOYXZpZ2F0aW9uTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFR5cGVhaGVhZE1vZHVsZSxcbiAgICAgICAgQTExeU1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogREVDTEFSQVRJT05TLFxuICAgIGRlY2xhcmF0aW9uczogREVDTEFSQVRJT05TXG59KVxuZXhwb3J0IGNsYXNzIEZpbHRlck1vZHVsZSB7IH1cbiJdfQ==