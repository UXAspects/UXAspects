/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReorderableDirective } from './reorderable.directive';
import { ReorderableHandleDirective } from './reorderable-handle.directive';
import { ReorderableModelDirective } from './reorderable-model.directive';
import { ReorderableService } from './reorderable.service';
var ReorderableModule = (function () {
    function ReorderableModule() {
    }
    ReorderableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        ReorderableDirective,
                        ReorderableHandleDirective,
                        ReorderableModelDirective
                    ],
                    exports: [
                        ReorderableDirective,
                        ReorderableHandleDirective,
                        ReorderableModelDirective
                    ],
                    providers: [
                        ReorderableService
                    ]
                },] },
    ];
    /** @nocollapse */
    ReorderableModule.ctorParameters = function () { return []; };
    return ReorderableModule;
}());
export { ReorderableModule };
function ReorderableModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ReorderableModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ReorderableModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVvcmRlcmFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvcmVvcmRlcmFibGUvcmVvcmRlcmFibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7Z0JBRTFELFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTtxQkFDZjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1Ysb0JBQW9CO3dCQUNwQiwwQkFBMEI7d0JBQzFCLHlCQUF5QjtxQkFDNUI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLG9CQUFvQjt3QkFDcEIsMEJBQTBCO3dCQUMxQix5QkFBeUI7cUJBQzVCO29CQUNELFNBQVMsRUFBRTt3QkFDUCxrQkFBa0I7cUJBQ3JCO2lCQUNKOzs7OzRCQXhCRDs7U0F5QmEsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZW9yZGVyYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4vcmVvcmRlcmFibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJlb3JkZXJhYmxlSGFuZGxlRGlyZWN0aXZlIH0gZnJvbSAnLi9yZW9yZGVyYWJsZS1oYW5kbGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJlb3JkZXJhYmxlTW9kZWxEaXJlY3RpdmUgfSBmcm9tICcuL3Jlb3JkZXJhYmxlLW1vZGVsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSZW9yZGVyYWJsZVNlcnZpY2UgfSBmcm9tICcuL3Jlb3JkZXJhYmxlLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgUmVvcmRlcmFibGVEaXJlY3RpdmUsXG4gICAgICAgIFJlb3JkZXJhYmxlSGFuZGxlRGlyZWN0aXZlLFxuICAgICAgICBSZW9yZGVyYWJsZU1vZGVsRGlyZWN0aXZlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFJlb3JkZXJhYmxlRGlyZWN0aXZlLFxuICAgICAgICBSZW9yZGVyYWJsZUhhbmRsZURpcmVjdGl2ZSxcbiAgICAgICAgUmVvcmRlcmFibGVNb2RlbERpcmVjdGl2ZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFJlb3JkZXJhYmxlU2VydmljZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgUmVvcmRlcmFibGVNb2R1bGUgeyB9XG4iXX0=