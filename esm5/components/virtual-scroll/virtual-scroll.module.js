/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualScrollComponent } from './virtual-scroll.component';
import { ResizeModule } from '../../directives/resize/index';
import { VirtualScrollLoadingDirective } from './directives/virtual-scroll-loading.directive';
import { VirtualScrollLoadButtonDirective } from './directives/virtual-scroll-load-button.directive';
import { VirtualScrollCellDirective } from './directives/virtual-scroll-cell.directive';
var /** @type {?} */ DECLARATIONS = [
    VirtualScrollComponent,
    VirtualScrollLoadingDirective,
    VirtualScrollLoadButtonDirective,
    VirtualScrollCellDirective
];
var VirtualScrollModule = (function () {
    function VirtualScrollModule() {
    }
    VirtualScrollModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        ResizeModule
                    ],
                    exports: DECLARATIONS,
                    declarations: DECLARATIONS
                },] },
    ];
    /** @nocollapse */
    VirtualScrollModule.ctorParameters = function () { return []; };
    return VirtualScrollModule;
}());
export { VirtualScrollModule };
function VirtualScrollModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    VirtualScrollModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    VirtualScrollModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdmlydHVhbC1zY3JvbGwvdmlydHVhbC1zY3JvbGwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDOUYsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDckcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFFeEYscUJBQU0sWUFBWSxHQUFHO0lBQ2pCLHNCQUFzQjtJQUN0Qiw2QkFBNkI7SUFDN0IsZ0NBQWdDO0lBQ2hDLDBCQUEwQjtDQUM3QixDQUFDOzs7OztnQkFFRCxRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osWUFBWTtxQkFDZjtvQkFDRCxPQUFPLEVBQUUsWUFBWTtvQkFDckIsWUFBWSxFQUFFLFlBQVk7aUJBQzdCOzs7OzhCQXZCRDs7U0F3QmEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFZpcnR1YWxTY3JvbGxDb21wb25lbnQgfSBmcm9tICcuL3ZpcnR1YWwtc2Nyb2xsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZXNpemVNb2R1bGUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3Jlc2l6ZS9pbmRleCc7XG5pbXBvcnQgeyBWaXJ0dWFsU2Nyb2xsTG9hZGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy92aXJ0dWFsLXNjcm9sbC1sb2FkaW5nLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBWaXJ0dWFsU2Nyb2xsTG9hZEJ1dHRvbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy92aXJ0dWFsLXNjcm9sbC1sb2FkLWJ1dHRvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVmlydHVhbFNjcm9sbENlbGxEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdmlydHVhbC1zY3JvbGwtY2VsbC5kaXJlY3RpdmUnO1xuXG5jb25zdCBERUNMQVJBVElPTlMgPSBbXG4gICAgVmlydHVhbFNjcm9sbENvbXBvbmVudCxcbiAgICBWaXJ0dWFsU2Nyb2xsTG9hZGluZ0RpcmVjdGl2ZSxcbiAgICBWaXJ0dWFsU2Nyb2xsTG9hZEJ1dHRvbkRpcmVjdGl2ZSxcbiAgICBWaXJ0dWFsU2Nyb2xsQ2VsbERpcmVjdGl2ZVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgUmVzaXplTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBERUNMQVJBVElPTlMsXG4gICAgZGVjbGFyYXRpb25zOiBERUNMQVJBVElPTlNcbn0pXG5leHBvcnQgY2xhc3MgVmlydHVhbFNjcm9sbE1vZHVsZSB7IH1cbiJdfQ==