/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DragModule } from '../../directives/drag/index';
import { ResizeModule } from '../../directives/resize/index';
import { ResizableTableCellDirective } from './table-column-resize/resizable-table-cell.directive';
import { ResizableTableColumnComponent } from './table-column-resize/resizable-table-column.component';
import { ResizableTableDirective } from './table-column-resize/resizable-table.directive';
var TableModule = /** @class */ (function () {
    function TableModule() {
    }
    TableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        DragModule,
                        ResizeModule,
                        A11yModule
                    ],
                    declarations: [
                        ResizableTableDirective,
                        ResizableTableColumnComponent,
                        ResizableTableCellDirective
                    ],
                    exports: [
                        ResizableTableDirective,
                        ResizableTableColumnComponent,
                        ResizableTableCellDirective
                    ]
                },] }
    ];
    return TableModule;
}());
export { TableModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGFibGUvdGFibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUNuRyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUN2RyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQzs7Ozs7Z0JBRXpGLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixVQUFVO3dCQUNWLFlBQVk7d0JBQ1osVUFBVTtxQkFDYjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1YsdUJBQXVCO3dCQUN2Qiw2QkFBNkI7d0JBQzdCLDJCQUEyQjtxQkFDOUI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLHVCQUF1Qjt3QkFDdkIsNkJBQTZCO3dCQUM3QiwyQkFBMkI7cUJBQzlCO2lCQUNKOztzQkExQkQ7O1NBMkJhLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEcmFnTW9kdWxlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9kcmFnL2luZGV4JztcbmltcG9ydCB7IFJlc2l6ZU1vZHVsZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcmVzaXplL2luZGV4JztcbmltcG9ydCB7IFJlc2l6YWJsZVRhYmxlQ2VsbERpcmVjdGl2ZSB9IGZyb20gJy4vdGFibGUtY29sdW1uLXJlc2l6ZS9yZXNpemFibGUtdGFibGUtY2VsbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQgfSBmcm9tICcuL3RhYmxlLWNvbHVtbi1yZXNpemUvcmVzaXphYmxlLXRhYmxlLWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVzaXphYmxlVGFibGVEaXJlY3RpdmUgfSBmcm9tICcuL3RhYmxlLWNvbHVtbi1yZXNpemUvcmVzaXphYmxlLXRhYmxlLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIERyYWdNb2R1bGUsXG4gICAgICAgIFJlc2l6ZU1vZHVsZSxcbiAgICAgICAgQTExeU1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFJlc2l6YWJsZVRhYmxlRGlyZWN0aXZlLFxuICAgICAgICBSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudCxcbiAgICAgICAgUmVzaXphYmxlVGFibGVDZWxsRGlyZWN0aXZlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFJlc2l6YWJsZVRhYmxlRGlyZWN0aXZlLFxuICAgICAgICBSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudCxcbiAgICAgICAgUmVzaXphYmxlVGFibGVDZWxsRGlyZWN0aXZlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZU1vZHVsZSB7fVxuIl19