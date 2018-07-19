/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { InfiniteScrollModule } from '../../directives/infinite-scroll/index';
import { TagInputModule } from '../tag-input/index';
import { TypeaheadModule } from '../typeahead/index';
import { SelectComponent } from './select.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
var SelectModule = (function () {
    function SelectModule() {
    }
    SelectModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        InfiniteScrollModule,
                        TagInputModule,
                        TypeaheadModule
                    ],
                    exports: [SelectComponent],
                    declarations: [SelectComponent]
                },] },
    ];
    /** @nocollapse */
    SelectModule.ctorParameters = function () { return []; };
    return SelectModule;
}());
export { SelectModule };
function SelectModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SelectModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SelectModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlbGVjdC9zZWxlY3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O2dCQUU1QyxRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxvQkFBb0I7d0JBQ3BCLGNBQWM7d0JBQ2QsZUFBZTtxQkFDbEI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO29CQUMxQixZQUFZLEVBQUUsQ0FBQyxlQUFlLENBQUM7aUJBQ2xDOzs7O3VCQWxCRDs7U0FtQmEsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluZmluaXRlU2Nyb2xsTW9kdWxlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9pbmZpbml0ZS1zY3JvbGwvaW5kZXgnO1xuaW1wb3J0IHsgVGFnSW5wdXRNb2R1bGUgfSBmcm9tICcuLi90YWctaW5wdXQvaW5kZXgnO1xuaW1wb3J0IHsgVHlwZWFoZWFkTW9kdWxlIH0gZnJvbSAnLi4vdHlwZWFoZWFkL2luZGV4JztcbmltcG9ydCB7IFNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgSW5maW5pdGVTY3JvbGxNb2R1bGUsXG4gICAgICAgIFRhZ0lucHV0TW9kdWxlLFxuICAgICAgICBUeXBlYWhlYWRNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtTZWxlY3RDb21wb25lbnRdLFxuICAgIGRlY2xhcmF0aW9uczogW1NlbGVjdENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0TW9kdWxlIHsgfVxuIl19