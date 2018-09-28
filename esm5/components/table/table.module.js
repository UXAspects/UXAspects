/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DragModule } from '../../directives/drag/index';
import { ResizableTableColumnComponent } from './table-column-resize/resizable-table-column.component';
import { ResizableTableDirective } from './table-column-resize/resizable-table.directive';
var TableModule = /** @class */ (function () {
    function TableModule() {
    }
    TableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        DragModule
                    ],
                    declarations: [
                        ResizableTableDirective,
                        ResizableTableColumnComponent
                    ],
                    exports: [
                        ResizableTableDirective,
                        ResizableTableColumnComponent
                    ]
                },] }
    ];
    return TableModule;
}());
export { TableModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGFibGUvdGFibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDekQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDdkcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0saURBQWlELENBQUM7Ozs7O2dCQUV6RixRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osVUFBVTtxQkFDYjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1YsdUJBQXVCO3dCQUN2Qiw2QkFBNkI7cUJBQ2hDO29CQUNELE9BQU8sRUFBRTt3QkFDTCx1QkFBdUI7d0JBQ3ZCLDZCQUE2QjtxQkFDaEM7aUJBQ0o7O3NCQW5CRDs7U0FvQmEsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRHJhZ01vZHVsZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvZHJhZy9pbmRleCc7XG5pbXBvcnQgeyBSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtY29sdW1uLXJlc2l6ZS9yZXNpemFibGUtdGFibGUtY29sdW1uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZXNpemFibGVUYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4vdGFibGUtY29sdW1uLXJlc2l6ZS9yZXNpemFibGUtdGFibGUuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRHJhZ01vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFJlc2l6YWJsZVRhYmxlRGlyZWN0aXZlLFxuICAgICAgICBSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBSZXNpemFibGVUYWJsZURpcmVjdGl2ZSxcbiAgICAgICAgUmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnRcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlTW9kdWxlIHt9Il19