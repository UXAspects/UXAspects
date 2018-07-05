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
export class ReorderableModule {
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
ReorderableModule.ctorParameters = () => [];
function ReorderableModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ReorderableModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ReorderableModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVvcmRlcmFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvcmVvcmRlcmFibGUvcmVvcmRlcmFibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQW9CM0QsTUFBTTs7O1lBbEJMLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtpQkFDZjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1Ysb0JBQW9CO29CQUNwQiwwQkFBMEI7b0JBQzFCLHlCQUF5QjtpQkFDNUI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLG9CQUFvQjtvQkFDcEIsMEJBQTBCO29CQUMxQix5QkFBeUI7aUJBQzVCO2dCQUNELFNBQVMsRUFBRTtvQkFDUCxrQkFBa0I7aUJBQ3JCO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJlb3JkZXJhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9yZW9yZGVyYWJsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUmVvcmRlcmFibGVIYW5kbGVEaXJlY3RpdmUgfSBmcm9tICcuL3Jlb3JkZXJhYmxlLWhhbmRsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUmVvcmRlcmFibGVNb2RlbERpcmVjdGl2ZSB9IGZyb20gJy4vcmVvcmRlcmFibGUtbW9kZWwuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJlb3JkZXJhYmxlU2VydmljZSB9IGZyb20gJy4vcmVvcmRlcmFibGUuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBSZW9yZGVyYWJsZURpcmVjdGl2ZSxcbiAgICAgICAgUmVvcmRlcmFibGVIYW5kbGVEaXJlY3RpdmUsXG4gICAgICAgIFJlb3JkZXJhYmxlTW9kZWxEaXJlY3RpdmVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgUmVvcmRlcmFibGVEaXJlY3RpdmUsXG4gICAgICAgIFJlb3JkZXJhYmxlSGFuZGxlRGlyZWN0aXZlLFxuICAgICAgICBSZW9yZGVyYWJsZU1vZGVsRGlyZWN0aXZlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgUmVvcmRlcmFibGVTZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBSZW9yZGVyYWJsZU1vZHVsZSB7IH1cbiJdfQ==