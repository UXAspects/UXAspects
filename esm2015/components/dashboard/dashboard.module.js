/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DragModule } from '../../directives/drag/index';
import { ResizeModule } from '../../directives/resize/index';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { DashboardDragHandleDirective } from './drag-handle/drag-handle.directive';
import { DashboardGrabHandleDirective } from './grab-handle/grab-handle.directive';
import { DashboardWidgetComponent } from './widget/dashboard-widget.component';
const /** @type {?} */ DECLARATIONS = [
    DashboardComponent,
    DashboardWidgetComponent,
    DashboardDragHandleDirective,
    DashboardGrabHandleDirective
];
export class DashboardModule {
}
DashboardModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    A11yModule,
                    CommonModule,
                    ResizeModule,
                    DragModule
                ],
                exports: DECLARATIONS,
                declarations: DECLARATIONS,
                providers: [DashboardService],
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNuRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNuRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUUvRSx1QkFBTSxZQUFZLEdBQUc7SUFDakIsa0JBQWtCO0lBQ2xCLHdCQUF3QjtJQUN4Qiw0QkFBNEI7SUFDNUIsNEJBQTRCO0NBQy9CLENBQUM7QUFhRixNQUFNOzs7WUFYTCxRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFVBQVU7b0JBQ1YsWUFBWTtvQkFDWixZQUFZO29CQUNaLFVBQVU7aUJBQ2I7Z0JBQ0QsT0FBTyxFQUFFLFlBQVk7Z0JBQ3JCLFlBQVksRUFBRSxZQUFZO2dCQUMxQixTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQzthQUNoQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERyYWdNb2R1bGUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2RyYWcvaW5kZXgnO1xuaW1wb3J0IHsgUmVzaXplTW9kdWxlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9yZXNpemUvaW5kZXgnO1xuaW1wb3J0IHsgRGFzaGJvYXJkQ29tcG9uZW50IH0gZnJvbSAnLi9kYXNoYm9hcmQuY29tcG9uZW50JztcbmltcG9ydCB7IERhc2hib2FyZFNlcnZpY2UgfSBmcm9tICcuL2Rhc2hib2FyZC5zZXJ2aWNlJztcbmltcG9ydCB7IERhc2hib2FyZERyYWdIYW5kbGVEaXJlY3RpdmUgfSBmcm9tICcuL2RyYWctaGFuZGxlL2RyYWctaGFuZGxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXNoYm9hcmRHcmFiSGFuZGxlRGlyZWN0aXZlIH0gZnJvbSAnLi9ncmFiLWhhbmRsZS9ncmFiLWhhbmRsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi93aWRnZXQvZGFzaGJvYXJkLXdpZGdldC5jb21wb25lbnQnO1xuXG5jb25zdCBERUNMQVJBVElPTlMgPSBbXG4gICAgRGFzaGJvYXJkQ29tcG9uZW50LFxuICAgIERhc2hib2FyZFdpZGdldENvbXBvbmVudCxcbiAgICBEYXNoYm9hcmREcmFnSGFuZGxlRGlyZWN0aXZlLFxuICAgIERhc2hib2FyZEdyYWJIYW5kbGVEaXJlY3RpdmVcbl07XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBBMTF5TW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFJlc2l6ZU1vZHVsZSxcbiAgICAgICAgRHJhZ01vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogREVDTEFSQVRJT05TLFxuICAgIGRlY2xhcmF0aW9uczogREVDTEFSQVRJT05TLFxuICAgIHByb3ZpZGVyczogW0Rhc2hib2FyZFNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRNb2R1bGUgeyB9XG4iXX0=