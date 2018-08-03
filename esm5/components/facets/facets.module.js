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
var /** @type {?} */ DECLARATIONS = [
    FacetContainerComponent,
    FacetHeaderComponent,
    FacetBaseComponent,
    FacetCheckListComponent,
    FacetCheckListItemComponent,
    FacetTypeaheadListComponent,
    FacetTypeaheadListItemComponent,
    FacetTypeaheadHighlight
];
var FacetsModule = /** @class */ (function () {
    function FacetsModule() {
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
                },] }
    ];
    return FacetsModule;
}());
export { FacetsModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZhY2V0cy9mYWNldHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBQ2pILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQzdILE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLGdGQUFnRixDQUFDO0FBRWpJLHFCQUFNLFlBQVksR0FBRztJQUNqQix1QkFBdUI7SUFDdkIsb0JBQW9CO0lBQ3BCLGtCQUFrQjtJQUNsQix1QkFBdUI7SUFDdkIsMkJBQTJCO0lBQzNCLDJCQUEyQjtJQUMzQiwrQkFBK0I7SUFDL0IsdUJBQXVCO0NBQzFCLENBQUM7Ozs7O2dCQUVELFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsVUFBVTt3QkFDVixZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsY0FBYzt3QkFDZCxhQUFhO3dCQUNiLGlCQUFpQjt3QkFDakIsZUFBZTtxQkFDbEI7b0JBQ0QsT0FBTyxFQUFFLFlBQVk7b0JBQ3JCLFlBQVksRUFBRSxZQUFZO2lCQUM3Qjs7dUJBdkNEOztTQXdDYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDaGVja2JveE1vZHVsZSB9IGZyb20gJy4uL2NoZWNrYm94L2luZGV4JztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICcuLi90b29sdGlwL2luZGV4JztcbmltcG9ydCB7IFR5cGVhaGVhZE1vZHVsZSB9IGZyb20gJy4uL3R5cGVhaGVhZC9pbmRleCc7XG5pbXBvcnQgeyBSZW9yZGVyYWJsZU1vZHVsZSB9IGZyb20gJy4vLi4vLi4vZGlyZWN0aXZlcy9yZW9yZGVyYWJsZS9yZW9yZGVyYWJsZS5tb2R1bGUnO1xuaW1wb3J0IHsgRmFjZXRCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi9iYXNlL2ZhY2V0LWJhc2UvZmFjZXQtYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmFjZXRIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2Jhc2UvZmFjZXQtaGVhZGVyL2ZhY2V0LWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmFjZXRDaGVja0xpc3RJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9mYWNldC1jaGVjay1saXN0L2NoZWNrLWxpc3QtaXRlbS9mYWNldC1jaGVjay1saXN0LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IEZhY2V0Q2hlY2tMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9mYWNldC1jaGVjay1saXN0L2ZhY2V0LWNoZWNrLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IEZhY2V0Q29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9mYWNldC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZhY2V0VHlwZWFoZWFkSGlnaGxpZ2h0LCBGYWNldFR5cGVhaGVhZExpc3RDb21wb25lbnQgfSBmcm9tICcuL2ZhY2V0LXR5cGVhaGVhZC1saXN0L2ZhY2V0LXR5cGVhaGVhZC1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGYWNldFR5cGVhaGVhZExpc3RJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9mYWNldC10eXBlYWhlYWQtbGlzdC90eXBlYWhlYWQtbGlzdC1pdGVtL2ZhY2V0LXR5cGVhaGVhZC1saXN0LWl0ZW0uY29tcG9uZW50JztcblxuY29uc3QgREVDTEFSQVRJT05TID0gW1xuICAgIEZhY2V0Q29udGFpbmVyQ29tcG9uZW50LFxuICAgIEZhY2V0SGVhZGVyQ29tcG9uZW50LFxuICAgIEZhY2V0QmFzZUNvbXBvbmVudCxcbiAgICBGYWNldENoZWNrTGlzdENvbXBvbmVudCxcbiAgICBGYWNldENoZWNrTGlzdEl0ZW1Db21wb25lbnQsXG4gICAgRmFjZXRUeXBlYWhlYWRMaXN0Q29tcG9uZW50LFxuICAgIEZhY2V0VHlwZWFoZWFkTGlzdEl0ZW1Db21wb25lbnQsXG4gICAgRmFjZXRUeXBlYWhlYWRIaWdobGlnaHRcbl07XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBBMTF5TW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBDaGVja2JveE1vZHVsZSxcbiAgICAgICAgVG9vbHRpcE1vZHVsZSxcbiAgICAgICAgUmVvcmRlcmFibGVNb2R1bGUsXG4gICAgICAgIFR5cGVhaGVhZE1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogREVDTEFSQVRJT05TLFxuICAgIGRlY2xhcmF0aW9uczogREVDTEFSQVRJT05TXG59KVxuZXhwb3J0IGNsYXNzIEZhY2V0c01vZHVsZSB7IH1cbiJdfQ==