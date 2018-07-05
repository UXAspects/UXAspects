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
var /** @type {?} */ DECLARATIONS = [
    FacetContainerComponent,
    FacetHeaderComponent,
    FacetBaseComponent,
    FacetCheckListComponent,
    FacetTypeaheadListComponent,
    FacetTypeaheadHighlight
];
var FacetsModule = (function () {
    function FacetsModule() {
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
    /** @nocollapse */
    FacetsModule.ctorParameters = function () { return []; };
    return FacetsModule;
}());
export { FacetsModule };
function FacetsModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FacetsModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FacetsModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZhY2V0cy9mYWNldHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDNUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDbEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDN0gsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFFdEYscUJBQU0sWUFBWSxHQUFHO0lBQ2pCLHVCQUF1QjtJQUN2QixvQkFBb0I7SUFDcEIsa0JBQWtCO0lBQ2xCLHVCQUF1QjtJQUN2QiwyQkFBMkI7SUFDM0IsdUJBQXVCO0NBQzFCLENBQUM7Ozs7O2dCQUVELFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixXQUFXO3dCQUNYLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYixpQkFBaUI7d0JBQ2pCLGVBQWUsQ0FBQyxPQUFPLEVBQUU7cUJBQzVCO29CQUNELE9BQU8sRUFBRSxZQUFZO29CQUNyQixZQUFZLEVBQUUsWUFBWTtpQkFDN0I7Ozs7dUJBakNEOztTQWtDYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFR5cGVhaGVhZE1vZHVsZSB9IGZyb20gJ25neC1ib290c3RyYXAvdHlwZWFoZWFkJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGYWNldENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZmFjZXQtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGYWNldEJhc2VDb21wb25lbnQgfSBmcm9tICcuL2Jhc2UvZmFjZXQtYmFzZS9mYWNldC1iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGYWNldEhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vYmFzZS9mYWNldC1oZWFkZXIvZmFjZXQtaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGYWNldENoZWNrTGlzdENvbXBvbmVudCB9IGZyb20gJy4vZmFjZXQtY2hlY2stbGlzdC9mYWNldC1jaGVjay1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGYWNldFR5cGVhaGVhZExpc3RDb21wb25lbnQsIEZhY2V0VHlwZWFoZWFkSGlnaGxpZ2h0IH0gZnJvbSAnLi9mYWNldC10eXBlYWhlYWQtbGlzdC9mYWNldC10eXBlYWhlYWQtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDaGVja2JveE1vZHVsZSB9IGZyb20gJy4uL2NoZWNrYm94L2luZGV4JztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICcuLi90b29sdGlwL2luZGV4JztcbmltcG9ydCB7IFJlb3JkZXJhYmxlTW9kdWxlIH0gZnJvbSAnLi8uLi8uLi9kaXJlY3RpdmVzL3Jlb3JkZXJhYmxlL3Jlb3JkZXJhYmxlLm1vZHVsZSc7XG5cbmNvbnN0IERFQ0xBUkFUSU9OUyA9IFtcbiAgICBGYWNldENvbnRhaW5lckNvbXBvbmVudCxcbiAgICBGYWNldEhlYWRlckNvbXBvbmVudCxcbiAgICBGYWNldEJhc2VDb21wb25lbnQsXG4gICAgRmFjZXRDaGVja0xpc3RDb21wb25lbnQsXG4gICAgRmFjZXRUeXBlYWhlYWRMaXN0Q29tcG9uZW50LFxuICAgIEZhY2V0VHlwZWFoZWFkSGlnaGxpZ2h0XG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgQ2hlY2tib3hNb2R1bGUsXG4gICAgICAgIFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIFJlb3JkZXJhYmxlTW9kdWxlLFxuICAgICAgICBUeXBlYWhlYWRNb2R1bGUuZm9yUm9vdCgpXG4gICAgXSxcbiAgICBleHBvcnRzOiBERUNMQVJBVElPTlMsXG4gICAgZGVjbGFyYXRpb25zOiBERUNMQVJBVElPTlNcbn0pXG5leHBvcnQgY2xhc3MgRmFjZXRzTW9kdWxlIHsgfVxuIl19