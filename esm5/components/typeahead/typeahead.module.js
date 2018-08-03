/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from '../../directives/infinite-scroll/index';
import { ScrollModule } from '../../directives/scroll/index';
import { TypeaheadHighlightDirective } from './typeahead-highlight.directive';
import { TypeaheadKeyService } from './typeahead-key.service';
import { TypeaheadComponent } from './typeahead.component';
var TypeaheadModule = /** @class */ (function () {
    function TypeaheadModule() {
    }
    TypeaheadModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        InfiniteScrollModule,
                        ScrollModule
                    ],
                    exports: [TypeaheadComponent],
                    declarations: [TypeaheadComponent, TypeaheadHighlightDirective],
                    providers: [TypeaheadKeyService],
                },] }
    ];
    return TypeaheadModule;
}());
export { TypeaheadModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3R5cGVhaGVhZC90eXBlYWhlYWQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDOUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7O2dCQUUxRCxRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osb0JBQW9CO3dCQUNwQixZQUFZO3FCQUNmO29CQUNELE9BQU8sRUFBRSxDQUFDLGtCQUFrQixDQUFDO29CQUM3QixZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSwyQkFBMkIsQ0FBQztvQkFDL0QsU0FBUyxFQUFFLENBQUMsbUJBQW1CLENBQUM7aUJBQ25DOzswQkFqQkQ7O1NBa0JhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEluZmluaXRlU2Nyb2xsTW9kdWxlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9pbmZpbml0ZS1zY3JvbGwvaW5kZXgnO1xuaW1wb3J0IHsgU2Nyb2xsTW9kdWxlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9zY3JvbGwvaW5kZXgnO1xuaW1wb3J0IHsgVHlwZWFoZWFkSGlnaGxpZ2h0RGlyZWN0aXZlIH0gZnJvbSAnLi90eXBlYWhlYWQtaGlnaGxpZ2h0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUeXBlYWhlYWRLZXlTZXJ2aWNlIH0gZnJvbSAnLi90eXBlYWhlYWQta2V5LnNlcnZpY2UnO1xuaW1wb3J0IHsgVHlwZWFoZWFkQ29tcG9uZW50IH0gZnJvbSAnLi90eXBlYWhlYWQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgSW5maW5pdGVTY3JvbGxNb2R1bGUsXG4gICAgICAgIFNjcm9sbE1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1R5cGVhaGVhZENvbXBvbmVudF0sXG4gICAgZGVjbGFyYXRpb25zOiBbVHlwZWFoZWFkQ29tcG9uZW50LCBUeXBlYWhlYWRIaWdobGlnaHREaXJlY3RpdmVdLFxuICAgIHByb3ZpZGVyczogW1R5cGVhaGVhZEtleVNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBUeXBlYWhlYWRNb2R1bGUgeyB9XG4iXX0=