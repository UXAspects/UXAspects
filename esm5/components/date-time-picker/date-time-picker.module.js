/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpinButtonModule } from '../spin-button/index';
import { TimePickerModule } from '../time-picker/index';
import { DateTimePickerComponent } from './date-time-picker.component';
import { DateTimePickerConfig } from './date-time-picker.config';
import { DayViewComponent } from './day-view/day-view.component';
import { HeaderComponent } from './header/header.component';
import { MonthViewComponent } from './month-view/month-view.component';
import { TimeViewComponent } from './time-view/time-view.component';
import { YearViewComponent } from './year-view/year-view.component';
import { FocusIfModule } from '../../directives/focus-if/index';
var DateTimePickerModule = /** @class */ (function () {
    function DateTimePickerModule() {
    }
    /**
     * @return {?}
     */
    DateTimePickerModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: DateTimePickerModule,
            providers: [
                DateTimePickerConfig
            ]
        };
    };
    DateTimePickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        TimePickerModule,
                        SpinButtonModule,
                        FocusIfModule
                    ],
                    exports: [DateTimePickerComponent],
                    declarations: [DateTimePickerComponent, HeaderComponent, DayViewComponent, MonthViewComponent, YearViewComponent, TimeViewComponent]
                },] }
    ];
    return DateTimePickerModule;
}());
export { DateTimePickerModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL2RhdGUtdGltZS1waWNrZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7OztJQWVyRCw0QkFBTzs7O0lBQWQ7UUFDSSxNQUFNLENBQUM7WUFDSCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFNBQVMsRUFBRTtnQkFDUCxvQkFBb0I7YUFDdkI7U0FDSixDQUFDO0tBQ0w7O2dCQW5CSixRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxnQkFBZ0I7d0JBQ2hCLGdCQUFnQjt3QkFDaEIsYUFBYTtxQkFDaEI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsdUJBQXVCLENBQUM7b0JBQ2xDLFlBQVksRUFBRSxDQUFDLHVCQUF1QixFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQztpQkFDdkk7OytCQXpCRDs7U0EwQmEsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFNwaW5CdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9zcGluLWJ1dHRvbi9pbmRleCc7XG5pbXBvcnQgeyBUaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnLi4vdGltZS1waWNrZXIvaW5kZXgnO1xuaW1wb3J0IHsgRGF0ZVRpbWVQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGVUaW1lUGlja2VyQ29uZmlnIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbmZpZyc7XG5pbXBvcnQgeyBEYXlWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9kYXktdmlldy9kYXktdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb250aFZpZXdDb21wb25lbnQgfSBmcm9tICcuL21vbnRoLXZpZXcvbW9udGgtdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGltZVZpZXdDb21wb25lbnQgfSBmcm9tICcuL3RpbWUtdmlldy90aW1lLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IFllYXJWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi95ZWFyLXZpZXcveWVhci12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb2N1c0lmTW9kdWxlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9mb2N1cy1pZi9pbmRleCc7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBUaW1lUGlja2VyTW9kdWxlLFxuICAgICAgICBTcGluQnV0dG9uTW9kdWxlLFxuICAgICAgICBGb2N1c0lmTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbRGF0ZVRpbWVQaWNrZXJDb21wb25lbnRdLFxuICAgIGRlY2xhcmF0aW9uczogW0RhdGVUaW1lUGlja2VyQ29tcG9uZW50LCBIZWFkZXJDb21wb25lbnQsIERheVZpZXdDb21wb25lbnQsIE1vbnRoVmlld0NvbXBvbmVudCwgWWVhclZpZXdDb21wb25lbnQsIFRpbWVWaWV3Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlVGltZVBpY2tlck1vZHVsZSB7XG4gICAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogRGF0ZVRpbWVQaWNrZXJNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICBEYXRlVGltZVBpY2tlckNvbmZpZ1xuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==