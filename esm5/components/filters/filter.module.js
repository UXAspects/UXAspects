/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TooltipModule } from '../tooltip/index';
import { FilterBaseComponent } from './filter-base/filter-base.component';
import { FilterContainerComponent } from './filter-container.component';
import { FilterDropdownComponent } from './filter-dropdown/filter-dropdown.component';
import { FilterDynamicComponent } from './filter-dynamic/filter-dynamic.component';
var /** @type {?} */ DECLARATIONS = [
    FilterBaseComponent,
    FilterContainerComponent,
    FilterDropdownComponent,
    FilterDynamicComponent
];
var FilterModule = (function () {
    function FilterModule() {
    }
    FilterModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BsDropdownModule.forRoot(),
                        TypeaheadModule.forRoot(),
                        TooltipModule,
                        FormsModule,
                        CommonModule
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZpbHRlcnMvZmlsdGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDdEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFbkYscUJBQU0sWUFBWSxHQUFHO0lBQ2pCLG1CQUFtQjtJQUNuQix3QkFBd0I7SUFDeEIsdUJBQXVCO0lBQ3ZCLHNCQUFzQjtDQUN6QixDQUFDOzs7OztnQkFFRCxRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLGdCQUFnQixDQUFDLE9BQU8sRUFBRTt3QkFDMUIsZUFBZSxDQUFDLE9BQU8sRUFBRTt3QkFDekIsYUFBYTt3QkFDYixXQUFXO3dCQUNYLFlBQVk7cUJBQ2Y7b0JBQ0QsT0FBTyxFQUFFLFlBQVk7b0JBQ3JCLFlBQVksRUFBRSxZQUFZO2lCQUM3Qjs7Ozt1QkE1QkQ7O1NBNkJhLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQnNEcm9wZG93bk1vZHVsZSB9IGZyb20gJ25neC1ib290c3RyYXAvZHJvcGRvd24nO1xuaW1wb3J0IHsgVHlwZWFoZWFkTW9kdWxlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC90eXBlYWhlYWQnO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4uL3Rvb2x0aXAvaW5kZXgnO1xuaW1wb3J0IHsgRmlsdGVyQmFzZUNvbXBvbmVudCB9IGZyb20gJy4vZmlsdGVyLWJhc2UvZmlsdGVyLWJhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IEZpbHRlckNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZmlsdGVyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmlsdGVyRHJvcGRvd25Db21wb25lbnQgfSBmcm9tICcuL2ZpbHRlci1kcm9wZG93bi9maWx0ZXItZHJvcGRvd24uY29tcG9uZW50JztcbmltcG9ydCB7IEZpbHRlckR5bmFtaWNDb21wb25lbnQgfSBmcm9tICcuL2ZpbHRlci1keW5hbWljL2ZpbHRlci1keW5hbWljLmNvbXBvbmVudCc7XG5cbmNvbnN0IERFQ0xBUkFUSU9OUyA9IFtcbiAgICBGaWx0ZXJCYXNlQ29tcG9uZW50LFxuICAgIEZpbHRlckNvbnRhaW5lckNvbXBvbmVudCxcbiAgICBGaWx0ZXJEcm9wZG93bkNvbXBvbmVudCxcbiAgICBGaWx0ZXJEeW5hbWljQ29tcG9uZW50XG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQnNEcm9wZG93bk1vZHVsZS5mb3JSb290KCksXG4gICAgICAgIFR5cGVhaGVhZE1vZHVsZS5mb3JSb290KCksXG4gICAgICAgIFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IERFQ0xBUkFUSU9OUyxcbiAgICBkZWNsYXJhdGlvbnM6IERFQ0xBUkFUSU9OU1xufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJNb2R1bGUgeyB9XG4iXX0=