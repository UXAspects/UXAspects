/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DragModule } from '../../directives/drag/index';
import { ResizeModule } from '../../directives/resize/index';
import { ResizableTableCellDirective } from './table-column-resize/resizable-table-cell.directive';
import { ResizableTableColumnComponent } from './table-column-resize/resizable-table-column.component';
import { ResizableTableDirective } from './table-column-resize/resizable-table.directive';
export class TableModule {
}
TableModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    DragModule,
                    ResizeModule
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGFibGUvdGFibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ25HLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBbUIxRixNQUFNOzs7WUFqQkwsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFVBQVU7b0JBQ1YsWUFBWTtpQkFDZjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsdUJBQXVCO29CQUN2Qiw2QkFBNkI7b0JBQzdCLDJCQUEyQjtpQkFDOUI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLHVCQUF1QjtvQkFDdkIsNkJBQTZCO29CQUM3QiwyQkFBMkI7aUJBQzlCO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERyYWdNb2R1bGUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2RyYWcvaW5kZXgnO1xuaW1wb3J0IHsgUmVzaXplTW9kdWxlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9yZXNpemUvaW5kZXgnO1xuaW1wb3J0IHsgUmVzaXphYmxlVGFibGVDZWxsRGlyZWN0aXZlIH0gZnJvbSAnLi90YWJsZS1jb2x1bW4tcmVzaXplL3Jlc2l6YWJsZS10YWJsZS1jZWxsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtY29sdW1uLXJlc2l6ZS9yZXNpemFibGUtdGFibGUtY29sdW1uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZXNpemFibGVUYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4vdGFibGUtY29sdW1uLXJlc2l6ZS9yZXNpemFibGUtdGFibGUuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRHJhZ01vZHVsZSxcbiAgICAgICAgUmVzaXplTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgUmVzaXphYmxlVGFibGVEaXJlY3RpdmUsXG4gICAgICAgIFJlc2l6YWJsZVRhYmxlQ29sdW1uQ29tcG9uZW50LFxuICAgICAgICBSZXNpemFibGVUYWJsZUNlbGxEaXJlY3RpdmVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgUmVzaXphYmxlVGFibGVEaXJlY3RpdmUsXG4gICAgICAgIFJlc2l6YWJsZVRhYmxlQ29sdW1uQ29tcG9uZW50LFxuICAgICAgICBSZXNpemFibGVUYWJsZUNlbGxEaXJlY3RpdmVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlTW9kdWxlIHt9XG4iXX0=