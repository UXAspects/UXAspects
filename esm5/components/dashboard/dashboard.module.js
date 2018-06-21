/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardWidgetComponent } from './widget/dashboard-widget.component';
import { DashboardService } from './dashboard.service';
import { DashboardDragHandleDirective } from './drag-handle/drag-handle.directive';
import { ResizeModule } from '../../directives/resize/index';
import { DragModule } from '../../directives/drag/index';
var /** @type {?} */ DECLARATIONS = [
    DashboardComponent,
    DashboardWidgetComponent,
    DashboardDragHandleDirective
];
var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        ResizeModule,
                        DragModule
                    ],
                    exports: DECLARATIONS,
                    declarations: DECLARATIONS,
                    providers: [DashboardService],
                },] },
    ];
    return DashboardModule;
}());
export { DashboardModule };
function DashboardModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DashboardModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DashboardModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNuRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXpELHFCQUFNLFlBQVksR0FBVTtJQUN4QixrQkFBa0I7SUFDbEIsd0JBQXdCO0lBQ3hCLDRCQUE0QjtDQUMvQixDQUFDOzs7OztnQkFFRCxRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixVQUFVO3FCQUNiO29CQUNELE9BQU8sRUFBRSxZQUFZO29CQUNyQixZQUFZLEVBQUUsWUFBWTtvQkFDMUIsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7aUJBQ2hDOzswQkF4QkQ7O1NBeUJhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERhc2hib2FyZENvbXBvbmVudCB9IGZyb20gJy4vZGFzaGJvYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL3dpZGdldC9kYXNoYm9hcmQtd2lkZ2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXNoYm9hcmRTZXJ2aWNlIH0gZnJvbSAnLi9kYXNoYm9hcmQuc2VydmljZSc7XG5pbXBvcnQgeyBEYXNoYm9hcmREcmFnSGFuZGxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kcmFnLWhhbmRsZS9kcmFnLWhhbmRsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUmVzaXplTW9kdWxlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9yZXNpemUvaW5kZXgnO1xuaW1wb3J0IHsgRHJhZ01vZHVsZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvZHJhZy9pbmRleCc7XG5cbmNvbnN0IERFQ0xBUkFUSU9OUzogYW55W10gPSBbXG4gICAgRGFzaGJvYXJkQ29tcG9uZW50LFxuICAgIERhc2hib2FyZFdpZGdldENvbXBvbmVudCxcbiAgICBEYXNoYm9hcmREcmFnSGFuZGxlRGlyZWN0aXZlXG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBSZXNpemVNb2R1bGUsXG4gICAgICAgIERyYWdNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IERFQ0xBUkFUSU9OUyxcbiAgICBkZWNsYXJhdGlvbnM6IERFQ0xBUkFUSU9OUyxcbiAgICBwcm92aWRlcnM6IFtEYXNoYm9hcmRTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkTW9kdWxlIHsgfVxuIl19