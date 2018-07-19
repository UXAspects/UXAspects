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
var FacetsModule = (function () {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZhY2V0cy9mYWNldHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBQ2pILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQzdILE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLGdGQUFnRixDQUFDO0FBRWpJLHFCQUFNLFlBQVksR0FBRztJQUNqQix1QkFBdUI7SUFDdkIsb0JBQW9CO0lBQ3BCLGtCQUFrQjtJQUNsQix1QkFBdUI7SUFDdkIsMkJBQTJCO0lBQzNCLDJCQUEyQjtJQUMzQiwrQkFBK0I7SUFDL0IsdUJBQXVCO0NBQzFCLENBQUM7Ozs7O2dCQUVELFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsVUFBVTt3QkFDVixZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsY0FBYzt3QkFDZCxhQUFhO3dCQUNiLGlCQUFpQjt3QkFDakIsZUFBZTtxQkFDbEI7b0JBQ0QsT0FBTyxFQUFFLFlBQVk7b0JBQ3JCLFlBQVksRUFBRSxZQUFZO2lCQUM3Qjs7Ozt1QkF2Q0Q7O1NBd0NhLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENoZWNrYm94TW9kdWxlIH0gZnJvbSAnLi4vY2hlY2tib3gvaW5kZXgnO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4uL3Rvb2x0aXAvaW5kZXgnO1xuaW1wb3J0IHsgVHlwZWFoZWFkTW9kdWxlIH0gZnJvbSAnLi4vdHlwZWFoZWFkL2luZGV4JztcbmltcG9ydCB7IFJlb3JkZXJhYmxlTW9kdWxlIH0gZnJvbSAnLi8uLi8uLi9kaXJlY3RpdmVzL3Jlb3JkZXJhYmxlL3Jlb3JkZXJhYmxlLm1vZHVsZSc7XG5pbXBvcnQgeyBGYWNldEJhc2VDb21wb25lbnQgfSBmcm9tICcuL2Jhc2UvZmFjZXQtYmFzZS9mYWNldC1iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGYWNldEhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vYmFzZS9mYWNldC1oZWFkZXIvZmFjZXQtaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGYWNldENoZWNrTGlzdEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2ZhY2V0LWNoZWNrLWxpc3QvY2hlY2stbGlzdC1pdGVtL2ZhY2V0LWNoZWNrLWxpc3QtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmFjZXRDaGVja0xpc3RDb21wb25lbnQgfSBmcm9tICcuL2ZhY2V0LWNoZWNrLWxpc3QvZmFjZXQtY2hlY2stbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmFjZXRDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2ZhY2V0LWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmFjZXRUeXBlYWhlYWRIaWdobGlnaHQsIEZhY2V0VHlwZWFoZWFkTGlzdENvbXBvbmVudCB9IGZyb20gJy4vZmFjZXQtdHlwZWFoZWFkLWxpc3QvZmFjZXQtdHlwZWFoZWFkLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IEZhY2V0VHlwZWFoZWFkTGlzdEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2ZhY2V0LXR5cGVhaGVhZC1saXN0L3R5cGVhaGVhZC1saXN0LWl0ZW0vZmFjZXQtdHlwZWFoZWFkLWxpc3QtaXRlbS5jb21wb25lbnQnO1xuXG5jb25zdCBERUNMQVJBVElPTlMgPSBbXG4gICAgRmFjZXRDb250YWluZXJDb21wb25lbnQsXG4gICAgRmFjZXRIZWFkZXJDb21wb25lbnQsXG4gICAgRmFjZXRCYXNlQ29tcG9uZW50LFxuICAgIEZhY2V0Q2hlY2tMaXN0Q29tcG9uZW50LFxuICAgIEZhY2V0Q2hlY2tMaXN0SXRlbUNvbXBvbmVudCxcbiAgICBGYWNldFR5cGVhaGVhZExpc3RDb21wb25lbnQsXG4gICAgRmFjZXRUeXBlYWhlYWRMaXN0SXRlbUNvbXBvbmVudCxcbiAgICBGYWNldFR5cGVhaGVhZEhpZ2hsaWdodFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEExMXlNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIENoZWNrYm94TW9kdWxlLFxuICAgICAgICBUb29sdGlwTW9kdWxlLFxuICAgICAgICBSZW9yZGVyYWJsZU1vZHVsZSxcbiAgICAgICAgVHlwZWFoZWFkTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBERUNMQVJBVElPTlMsXG4gICAgZGVjbGFyYXRpb25zOiBERUNMQVJBVElPTlNcbn0pXG5leHBvcnQgY2xhc3MgRmFjZXRzTW9kdWxlIHsgfVxuIl19