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
var /** @type {?} */ DECLARATIONS = [
    DashboardComponent,
    DashboardWidgetComponent,
    DashboardDragHandleDirective,
    DashboardGrabHandleDirective
];
var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
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
    return DashboardModule;
}());
export { DashboardModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNuRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNuRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUUvRSxxQkFBTSxZQUFZLEdBQUc7SUFDakIsa0JBQWtCO0lBQ2xCLHdCQUF3QjtJQUN4Qiw0QkFBNEI7SUFDNUIsNEJBQTRCO0NBQy9CLENBQUM7Ozs7O2dCQUVELFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsVUFBVTt3QkFDVixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osVUFBVTtxQkFDYjtvQkFDRCxPQUFPLEVBQUUsWUFBWTtvQkFDckIsWUFBWSxFQUFFLFlBQVk7b0JBQzFCLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2lCQUNoQzs7MEJBNUJEOztTQTZCYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRHJhZ01vZHVsZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvZHJhZy9pbmRleCc7XG5pbXBvcnQgeyBSZXNpemVNb2R1bGUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3Jlc2l6ZS9pbmRleCc7XG5pbXBvcnQgeyBEYXNoYm9hcmRDb21wb25lbnQgfSBmcm9tICcuL2Rhc2hib2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGFzaGJvYXJkU2VydmljZSB9IGZyb20gJy4vZGFzaGJvYXJkLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGFzaGJvYXJkRHJhZ0hhbmRsZURpcmVjdGl2ZSB9IGZyb20gJy4vZHJhZy1oYW5kbGUvZHJhZy1oYW5kbGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhc2hib2FyZEdyYWJIYW5kbGVEaXJlY3RpdmUgfSBmcm9tICcuL2dyYWItaGFuZGxlL2dyYWItaGFuZGxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL3dpZGdldC9kYXNoYm9hcmQtd2lkZ2V0LmNvbXBvbmVudCc7XG5cbmNvbnN0IERFQ0xBUkFUSU9OUyA9IFtcbiAgICBEYXNoYm9hcmRDb21wb25lbnQsXG4gICAgRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50LFxuICAgIERhc2hib2FyZERyYWdIYW5kbGVEaXJlY3RpdmUsXG4gICAgRGFzaGJvYXJkR3JhYkhhbmRsZURpcmVjdGl2ZVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEExMXlNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgUmVzaXplTW9kdWxlLFxuICAgICAgICBEcmFnTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBERUNMQVJBVElPTlMsXG4gICAgZGVjbGFyYXRpb25zOiBERUNMQVJBVElPTlMsXG4gICAgcHJvdmlkZXJzOiBbRGFzaGJvYXJkU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIERhc2hib2FyZE1vZHVsZSB7IH1cbiJdfQ==