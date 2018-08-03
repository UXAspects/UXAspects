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
var ReorderableModule = /** @class */ (function () {
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
                },] }
    ];
    return ReorderableModule;
}());
export { ReorderableModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVvcmRlcmFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvcmVvcmRlcmFibGUvcmVvcmRlcmFibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7Z0JBRTFELFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTtxQkFDZjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1Ysb0JBQW9CO3dCQUNwQiwwQkFBMEI7d0JBQzFCLHlCQUF5QjtxQkFDNUI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLG9CQUFvQjt3QkFDcEIsMEJBQTBCO3dCQUMxQix5QkFBeUI7cUJBQzVCO29CQUNELFNBQVMsRUFBRTt3QkFDUCxrQkFBa0I7cUJBQ3JCO2lCQUNKOzs0QkF4QkQ7O1NBeUJhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUmVvcmRlcmFibGVEaXJlY3RpdmUgfSBmcm9tICcuL3Jlb3JkZXJhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSZW9yZGVyYWJsZUhhbmRsZURpcmVjdGl2ZSB9IGZyb20gJy4vcmVvcmRlcmFibGUtaGFuZGxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSZW9yZGVyYWJsZU1vZGVsRGlyZWN0aXZlIH0gZnJvbSAnLi9yZW9yZGVyYWJsZS1tb2RlbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUmVvcmRlcmFibGVTZXJ2aWNlIH0gZnJvbSAnLi9yZW9yZGVyYWJsZS5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFJlb3JkZXJhYmxlRGlyZWN0aXZlLFxuICAgICAgICBSZW9yZGVyYWJsZUhhbmRsZURpcmVjdGl2ZSxcbiAgICAgICAgUmVvcmRlcmFibGVNb2RlbERpcmVjdGl2ZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBSZW9yZGVyYWJsZURpcmVjdGl2ZSxcbiAgICAgICAgUmVvcmRlcmFibGVIYW5kbGVEaXJlY3RpdmUsXG4gICAgICAgIFJlb3JkZXJhYmxlTW9kZWxEaXJlY3RpdmVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBSZW9yZGVyYWJsZVNlcnZpY2VcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFJlb3JkZXJhYmxlTW9kdWxlIHsgfVxuIl19