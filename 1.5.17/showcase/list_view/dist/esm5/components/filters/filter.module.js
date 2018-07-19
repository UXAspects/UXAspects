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
import { FilterDynamicComponent, FilterTypeaheadHighlight } from './filter-dynamic/filter-dynamic.component';
var /** @type {?} */ DECLARATIONS = [
    FilterBaseComponent,
    FilterContainerComponent,
    FilterDropdownComponent,
    FilterDynamicComponent,
    FilterTypeaheadHighlight
];
var FilterModule = (function () {
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
                },] },
    ];
    /** @nocollapse */
    FilterModule.ctorParameters = function () { return []; };
    return FilterModule;
}());
export { FilterModule };
function FilterModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FilterModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FilterModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZpbHRlcnMvZmlsdGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBRTdHLHFCQUFNLFlBQVksR0FBRztJQUNqQixtQkFBbUI7SUFDbkIsd0JBQXdCO0lBQ3hCLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIsd0JBQXdCO0NBQzNCLENBQUM7Ozs7O2dCQUVELFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO3dCQUMxQixhQUFhO3dCQUNiLFdBQVc7d0JBQ1gsb0JBQW9CO3dCQUNwQixZQUFZO3dCQUNaLGVBQWU7d0JBQ2YsVUFBVTtxQkFDYjtvQkFDRCxPQUFPLEVBQUUsWUFBWTtvQkFDckIsWUFBWSxFQUFFLFlBQVk7aUJBQzdCOzs7O3VCQWpDRDs7U0FrQ2EsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQnNEcm9wZG93bk1vZHVsZSB9IGZyb20gJ25neC1ib290c3RyYXAvZHJvcGRvd24nO1xuaW1wb3J0IHsgTWVudU5hdmlnYXRpb25Nb2R1bGUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL21lbnUtbmF2aWdhdGlvbi9pbmRleCc7XG5pbXBvcnQgeyBUb29sdGlwTW9kdWxlIH0gZnJvbSAnLi4vdG9vbHRpcC9pbmRleCc7XG5pbXBvcnQgeyBUeXBlYWhlYWRNb2R1bGUgfSBmcm9tICcuLi90eXBlYWhlYWQvdHlwZWFoZWFkLm1vZHVsZSc7XG5pbXBvcnQgeyBGaWx0ZXJCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi9maWx0ZXItYmFzZS9maWx0ZXItYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmlsdGVyQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9maWx0ZXItY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWx0ZXJEcm9wZG93bkNvbXBvbmVudCB9IGZyb20gJy4vZmlsdGVyLWRyb3Bkb3duL2ZpbHRlci1kcm9wZG93bi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmlsdGVyRHluYW1pY0NvbXBvbmVudCwgRmlsdGVyVHlwZWFoZWFkSGlnaGxpZ2h0IH0gZnJvbSAnLi9maWx0ZXItZHluYW1pYy9maWx0ZXItZHluYW1pYy5jb21wb25lbnQnO1xuXG5jb25zdCBERUNMQVJBVElPTlMgPSBbXG4gICAgRmlsdGVyQmFzZUNvbXBvbmVudCxcbiAgICBGaWx0ZXJDb250YWluZXJDb21wb25lbnQsXG4gICAgRmlsdGVyRHJvcGRvd25Db21wb25lbnQsXG4gICAgRmlsdGVyRHluYW1pY0NvbXBvbmVudCxcbiAgICBGaWx0ZXJUeXBlYWhlYWRIaWdobGlnaHRcbl07XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBCc0Ryb3Bkb3duTW9kdWxlLmZvclJvb3QoKSxcbiAgICAgICAgVG9vbHRpcE1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIE1lbnVOYXZpZ2F0aW9uTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFR5cGVhaGVhZE1vZHVsZSxcbiAgICAgICAgQTExeU1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogREVDTEFSQVRJT05TLFxuICAgIGRlY2xhcmF0aW9uczogREVDTEFSQVRJT05TXG59KVxuZXhwb3J0IGNsYXNzIEZpbHRlck1vZHVsZSB7IH1cbiJdfQ==