/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CommonModule } from '@angular/common';
import { FacetContainerComponent } from './facet-container.component';
import { FacetBaseComponent } from './base/facet-base/facet-base.component';
import { FacetHeaderComponent } from './base/facet-header/facet-header.component';
import { FacetCheckListComponent } from './facet-check-list/facet-check-list.component';
import { FacetTypeaheadListComponent, FacetTypeaheadHighlight } from './facet-typeahead-list/facet-typeahead-list.component';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from '../checkbox/index';
import { TooltipModule } from '../tooltip/index';
import { ReorderableModule } from './../../directives/reorderable/reorderable.module';
const /** @type {?} */ DECLARATIONS = [
    FacetContainerComponent,
    FacetHeaderComponent,
    FacetBaseComponent,
    FacetCheckListComponent,
    FacetTypeaheadListComponent,
    FacetTypeaheadHighlight
];
export class FacetsModule {
}
FacetsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    CheckboxModule,
                    TooltipModule,
                    ReorderableModule,
                    TypeaheadModule.forRoot()
                ],
                exports: DECLARATIONS,
                declarations: DECLARATIONS
            },] },
];
function FacetsModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FacetsModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FacetsModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZhY2V0cy9mYWNldHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDNUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDbEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDN0gsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFFdEYsdUJBQU0sWUFBWSxHQUFHO0lBQ2pCLHVCQUF1QjtJQUN2QixvQkFBb0I7SUFDcEIsa0JBQWtCO0lBQ2xCLHVCQUF1QjtJQUN2QiwyQkFBMkI7SUFDM0IsdUJBQXVCO0NBQzFCLENBQUM7QUFjRixNQUFNOzs7WUFaTCxRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxjQUFjO29CQUNkLGFBQWE7b0JBQ2IsaUJBQWlCO29CQUNqQixlQUFlLENBQUMsT0FBTyxFQUFFO2lCQUM1QjtnQkFDRCxPQUFPLEVBQUUsWUFBWTtnQkFDckIsWUFBWSxFQUFFLFlBQVk7YUFDN0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHlwZWFoZWFkTW9kdWxlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC90eXBlYWhlYWQnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZhY2V0Q29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9mYWNldC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZhY2V0QmFzZUNvbXBvbmVudCB9IGZyb20gJy4vYmFzZS9mYWNldC1iYXNlL2ZhY2V0LWJhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IEZhY2V0SGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9iYXNlL2ZhY2V0LWhlYWRlci9mYWNldC1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZhY2V0Q2hlY2tMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9mYWNldC1jaGVjay1saXN0L2ZhY2V0LWNoZWNrLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IEZhY2V0VHlwZWFoZWFkTGlzdENvbXBvbmVudCwgRmFjZXRUeXBlYWhlYWRIaWdobGlnaHQgfSBmcm9tICcuL2ZhY2V0LXR5cGVhaGVhZC1saXN0L2ZhY2V0LXR5cGVhaGVhZC1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENoZWNrYm94TW9kdWxlIH0gZnJvbSAnLi4vY2hlY2tib3gvaW5kZXgnO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4uL3Rvb2x0aXAvaW5kZXgnO1xuaW1wb3J0IHsgUmVvcmRlcmFibGVNb2R1bGUgfSBmcm9tICcuLy4uLy4uL2RpcmVjdGl2ZXMvcmVvcmRlcmFibGUvcmVvcmRlcmFibGUubW9kdWxlJztcblxuY29uc3QgREVDTEFSQVRJT05TID0gW1xuICAgIEZhY2V0Q29udGFpbmVyQ29tcG9uZW50LFxuICAgIEZhY2V0SGVhZGVyQ29tcG9uZW50LFxuICAgIEZhY2V0QmFzZUNvbXBvbmVudCxcbiAgICBGYWNldENoZWNrTGlzdENvbXBvbmVudCxcbiAgICBGYWNldFR5cGVhaGVhZExpc3RDb21wb25lbnQsXG4gICAgRmFjZXRUeXBlYWhlYWRIaWdobGlnaHRcbl07XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBDaGVja2JveE1vZHVsZSxcbiAgICAgICAgVG9vbHRpcE1vZHVsZSxcbiAgICAgICAgUmVvcmRlcmFibGVNb2R1bGUsXG4gICAgICAgIFR5cGVhaGVhZE1vZHVsZS5mb3JSb290KClcbiAgICBdLFxuICAgIGV4cG9ydHM6IERFQ0xBUkFUSU9OUyxcbiAgICBkZWNsYXJhdGlvbnM6IERFQ0xBUkFUSU9OU1xufSlcbmV4cG9ydCBjbGFzcyBGYWNldHNNb2R1bGUgeyB9XG4iXX0=