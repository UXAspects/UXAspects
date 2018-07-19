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
const /** @type {?} */ DECLARATIONS = [
    FilterBaseComponent,
    FilterContainerComponent,
    FilterDropdownComponent,
    FilterDynamicComponent,
    FilterTypeaheadHighlight
];
export class FilterModule {
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
FilterModule.ctorParameters = () => [];
function FilterModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FilterModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FilterModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZpbHRlcnMvZmlsdGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBRTdHLHVCQUFNLFlBQVksR0FBRztJQUNqQixtQkFBbUI7SUFDbkIsd0JBQXdCO0lBQ3hCLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIsd0JBQXdCO0NBQzNCLENBQUM7QUFlRixNQUFNOzs7WUFiTCxRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtvQkFDMUIsYUFBYTtvQkFDYixXQUFXO29CQUNYLG9CQUFvQjtvQkFDcEIsWUFBWTtvQkFDWixlQUFlO29CQUNmLFVBQVU7aUJBQ2I7Z0JBQ0QsT0FBTyxFQUFFLFlBQVk7Z0JBQ3JCLFlBQVksRUFBRSxZQUFZO2FBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCc0Ryb3Bkb3duTW9kdWxlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9kcm9wZG93bic7XG5pbXBvcnQgeyBNZW51TmF2aWdhdGlvbk1vZHVsZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvbWVudS1uYXZpZ2F0aW9uL2luZGV4JztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICcuLi90b29sdGlwL2luZGV4JztcbmltcG9ydCB7IFR5cGVhaGVhZE1vZHVsZSB9IGZyb20gJy4uL3R5cGVhaGVhZC90eXBlYWhlYWQubW9kdWxlJztcbmltcG9ydCB7IEZpbHRlckJhc2VDb21wb25lbnQgfSBmcm9tICcuL2ZpbHRlci1iYXNlL2ZpbHRlci1iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWx0ZXJDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2ZpbHRlci1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZpbHRlckRyb3Bkb3duQ29tcG9uZW50IH0gZnJvbSAnLi9maWx0ZXItZHJvcGRvd24vZmlsdGVyLWRyb3Bkb3duLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWx0ZXJEeW5hbWljQ29tcG9uZW50LCBGaWx0ZXJUeXBlYWhlYWRIaWdobGlnaHQgfSBmcm9tICcuL2ZpbHRlci1keW5hbWljL2ZpbHRlci1keW5hbWljLmNvbXBvbmVudCc7XG5cbmNvbnN0IERFQ0xBUkFUSU9OUyA9IFtcbiAgICBGaWx0ZXJCYXNlQ29tcG9uZW50LFxuICAgIEZpbHRlckNvbnRhaW5lckNvbXBvbmVudCxcbiAgICBGaWx0ZXJEcm9wZG93bkNvbXBvbmVudCxcbiAgICBGaWx0ZXJEeW5hbWljQ29tcG9uZW50LFxuICAgIEZpbHRlclR5cGVhaGVhZEhpZ2hsaWdodFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEJzRHJvcGRvd25Nb2R1bGUuZm9yUm9vdCgpLFxuICAgICAgICBUb29sdGlwTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgTWVudU5hdmlnYXRpb25Nb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgVHlwZWFoZWFkTW9kdWxlLFxuICAgICAgICBBMTF5TW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBERUNMQVJBVElPTlMsXG4gICAgZGVjbGFyYXRpb25zOiBERUNMQVJBVElPTlNcbn0pXG5leHBvcnQgY2xhc3MgRmlsdGVyTW9kdWxlIHsgfVxuIl19