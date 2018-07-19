/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from '../checkbox/index';
import { TooltipModule } from '../tooltip/index';
import { TypeaheadModule } from '../typeahead/index';
import { ReorderableModule } from './../../directives/reorderable/reorderable.module';
import { FacetBaseComponent } from './base/facet-base/facet-base.component';
import { FacetHeaderComponent } from './base/facet-header/facet-header.component';
import { FacetCheckListItemComponent } from './facet-check-list/check-list-item/facet-check-list-item.component';
import { FacetCheckListComponent } from './facet-check-list/facet-check-list.component';
import { FacetContainerComponent } from './facet-container.component';
import { FacetTypeaheadHighlight, FacetTypeaheadListComponent } from './facet-typeahead-list/facet-typeahead-list.component';
import { FacetTypeaheadListItemComponent } from './facet-typeahead-list/typeahead-list-item/facet-typeahead-list-item.component';
const /** @type {?} */ DECLARATIONS = [
    FacetContainerComponent,
    FacetHeaderComponent,
    FacetBaseComponent,
    FacetCheckListComponent,
    FacetCheckListItemComponent,
    FacetTypeaheadListComponent,
    FacetTypeaheadListItemComponent,
    FacetTypeaheadHighlight
];
export class FacetsModule {
}
FacetsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    A11yModule,
                    CommonModule,
                    FormsModule,
                    CheckboxModule,
                    TooltipModule,
                    ReorderableModule,
                    TypeaheadModule
                ],
                exports: DECLARATIONS,
                declarations: DECLARATIONS
            },] },
];
/** @nocollapse */
FacetsModule.ctorParameters = () => [];
function FacetsModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FacetsModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FacetsModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZhY2V0cy9mYWNldHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBQ2pILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQzdILE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLGdGQUFnRixDQUFDO0FBRWpJLHVCQUFNLFlBQVksR0FBRztJQUNqQix1QkFBdUI7SUFDdkIsb0JBQW9CO0lBQ3BCLGtCQUFrQjtJQUNsQix1QkFBdUI7SUFDdkIsMkJBQTJCO0lBQzNCLDJCQUEyQjtJQUMzQiwrQkFBK0I7SUFDL0IsdUJBQXVCO0NBQzFCLENBQUM7QUFlRixNQUFNOzs7WUFiTCxRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFVBQVU7b0JBQ1YsWUFBWTtvQkFDWixXQUFXO29CQUNYLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixpQkFBaUI7b0JBQ2pCLGVBQWU7aUJBQ2xCO2dCQUNELE9BQU8sRUFBRSxZQUFZO2dCQUNyQixZQUFZLEVBQUUsWUFBWTthQUM3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ2hlY2tib3hNb2R1bGUgfSBmcm9tICcuLi9jaGVja2JveC9pbmRleCc7XG5pbXBvcnQgeyBUb29sdGlwTW9kdWxlIH0gZnJvbSAnLi4vdG9vbHRpcC9pbmRleCc7XG5pbXBvcnQgeyBUeXBlYWhlYWRNb2R1bGUgfSBmcm9tICcuLi90eXBlYWhlYWQvaW5kZXgnO1xuaW1wb3J0IHsgUmVvcmRlcmFibGVNb2R1bGUgfSBmcm9tICcuLy4uLy4uL2RpcmVjdGl2ZXMvcmVvcmRlcmFibGUvcmVvcmRlcmFibGUubW9kdWxlJztcbmltcG9ydCB7IEZhY2V0QmFzZUNvbXBvbmVudCB9IGZyb20gJy4vYmFzZS9mYWNldC1iYXNlL2ZhY2V0LWJhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IEZhY2V0SGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9iYXNlL2ZhY2V0LWhlYWRlci9mYWNldC1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZhY2V0Q2hlY2tMaXN0SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vZmFjZXQtY2hlY2stbGlzdC9jaGVjay1saXN0LWl0ZW0vZmFjZXQtY2hlY2stbGlzdC1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGYWNldENoZWNrTGlzdENvbXBvbmVudCB9IGZyb20gJy4vZmFjZXQtY2hlY2stbGlzdC9mYWNldC1jaGVjay1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGYWNldENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZmFjZXQtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGYWNldFR5cGVhaGVhZEhpZ2hsaWdodCwgRmFjZXRUeXBlYWhlYWRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9mYWNldC10eXBlYWhlYWQtbGlzdC9mYWNldC10eXBlYWhlYWQtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmFjZXRUeXBlYWhlYWRMaXN0SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vZmFjZXQtdHlwZWFoZWFkLWxpc3QvdHlwZWFoZWFkLWxpc3QtaXRlbS9mYWNldC10eXBlYWhlYWQtbGlzdC1pdGVtLmNvbXBvbmVudCc7XG5cbmNvbnN0IERFQ0xBUkFUSU9OUyA9IFtcbiAgICBGYWNldENvbnRhaW5lckNvbXBvbmVudCxcbiAgICBGYWNldEhlYWRlckNvbXBvbmVudCxcbiAgICBGYWNldEJhc2VDb21wb25lbnQsXG4gICAgRmFjZXRDaGVja0xpc3RDb21wb25lbnQsXG4gICAgRmFjZXRDaGVja0xpc3RJdGVtQ29tcG9uZW50LFxuICAgIEZhY2V0VHlwZWFoZWFkTGlzdENvbXBvbmVudCxcbiAgICBGYWNldFR5cGVhaGVhZExpc3RJdGVtQ29tcG9uZW50LFxuICAgIEZhY2V0VHlwZWFoZWFkSGlnaGxpZ2h0XG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQTExeU1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgQ2hlY2tib3hNb2R1bGUsXG4gICAgICAgIFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIFJlb3JkZXJhYmxlTW9kdWxlLFxuICAgICAgICBUeXBlYWhlYWRNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IERFQ0xBUkFUSU9OUyxcbiAgICBkZWNsYXJhdGlvbnM6IERFQ0xBUkFUSU9OU1xufSlcbmV4cG9ydCBjbGFzcyBGYWNldHNNb2R1bGUgeyB9XG4iXX0=