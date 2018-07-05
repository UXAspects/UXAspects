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
var TypeaheadModule = (function () {
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
                },] },
    ];
    /** @nocollapse */
    TypeaheadModule.ctorParameters = function () { return []; };
    return TypeaheadModule;
}());
export { TypeaheadModule };
function TypeaheadModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TypeaheadModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TypeaheadModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3R5cGVhaGVhZC90eXBlYWhlYWQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDOUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7O2dCQUUxRCxRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osb0JBQW9CO3dCQUNwQixZQUFZO3FCQUNmO29CQUNELE9BQU8sRUFBRSxDQUFDLGtCQUFrQixDQUFDO29CQUM3QixZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSwyQkFBMkIsQ0FBQztvQkFDL0QsU0FBUyxFQUFFLENBQUMsbUJBQW1CLENBQUM7aUJBQ25DOzs7OzBCQWpCRDs7U0FrQmEsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW5maW5pdGVTY3JvbGxNb2R1bGUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2luZmluaXRlLXNjcm9sbC9pbmRleCc7XG5pbXBvcnQgeyBTY3JvbGxNb2R1bGUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3Njcm9sbC9pbmRleCc7XG5pbXBvcnQgeyBUeXBlYWhlYWRIaWdobGlnaHREaXJlY3RpdmUgfSBmcm9tICcuL3R5cGVhaGVhZC1oaWdobGlnaHQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFR5cGVhaGVhZEtleVNlcnZpY2UgfSBmcm9tICcuL3R5cGVhaGVhZC1rZXkuc2VydmljZSc7XG5pbXBvcnQgeyBUeXBlYWhlYWRDb21wb25lbnQgfSBmcm9tICcuL3R5cGVhaGVhZC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBJbmZpbml0ZVNjcm9sbE1vZHVsZSxcbiAgICAgICAgU2Nyb2xsTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbVHlwZWFoZWFkQ29tcG9uZW50XSxcbiAgICBkZWNsYXJhdGlvbnM6IFtUeXBlYWhlYWRDb21wb25lbnQsIFR5cGVhaGVhZEhpZ2hsaWdodERpcmVjdGl2ZV0sXG4gICAgcHJvdmlkZXJzOiBbVHlwZWFoZWFkS2V5U2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIFR5cGVhaGVhZE1vZHVsZSB7IH1cbiJdfQ==