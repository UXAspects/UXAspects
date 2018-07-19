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
var DateTimePickerModule = (function () {
    function DateTimePickerModule() {
    }
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
                    declarations: [DateTimePickerComponent, HeaderComponent, DayViewComponent, MonthViewComponent, YearViewComponent, TimeViewComponent],
                    providers: [
                        DateTimePickerConfig
                    ]
                },] },
    ];
    /** @nocollapse */
    DateTimePickerModule.ctorParameters = function () { return []; };
    return DateTimePickerModule;
}());
export { DateTimePickerModule };
function DateTimePickerModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DateTimePickerModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DateTimePickerModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL2RhdGUtdGltZS1waWNrZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7Z0JBRS9ELFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixXQUFXO3dCQUNYLGdCQUFnQjt3QkFDaEIsZ0JBQWdCO3dCQUNoQixhQUFhO3FCQUNoQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztvQkFDbEMsWUFBWSxFQUFFLENBQUMsdUJBQXVCLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDO29CQUNwSSxTQUFTLEVBQUU7d0JBQ1Asb0JBQW9CO3FCQUN2QjtpQkFDSjs7OzsrQkEzQkQ7O1NBNEJhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTcGluQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vc3Bpbi1idXR0b24vaW5kZXgnO1xuaW1wb3J0IHsgVGltZVBpY2tlck1vZHVsZSB9IGZyb20gJy4uL3RpbWUtcGlja2VyL2luZGV4JztcbmltcG9ydCB7IERhdGVUaW1lUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRlVGltZVBpY2tlckNvbmZpZyB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci5jb25maWcnO1xuaW1wb3J0IHsgRGF5Vmlld0NvbXBvbmVudCB9IGZyb20gJy4vZGF5LXZpZXcvZGF5LXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IEhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vaGVhZGVyL2hlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9udGhWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9tb250aC12aWV3L21vbnRoLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IFRpbWVWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi90aW1lLXZpZXcvdGltZS12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBZZWFyVmlld0NvbXBvbmVudCB9IGZyb20gJy4veWVhci12aWV3L3llYXItdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9jdXNJZk1vZHVsZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvZm9jdXMtaWYvaW5kZXgnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgVGltZVBpY2tlck1vZHVsZSxcbiAgICAgICAgU3BpbkJ1dHRvbk1vZHVsZSxcbiAgICAgICAgRm9jdXNJZk1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW0RhdGVUaW1lUGlja2VyQ29tcG9uZW50XSxcbiAgICBkZWNsYXJhdGlvbnM6IFtEYXRlVGltZVBpY2tlckNvbXBvbmVudCwgSGVhZGVyQ29tcG9uZW50LCBEYXlWaWV3Q29tcG9uZW50LCBNb250aFZpZXdDb21wb25lbnQsIFllYXJWaWV3Q29tcG9uZW50LCBUaW1lVmlld0NvbXBvbmVudF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIERhdGVUaW1lUGlja2VyQ29uZmlnXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlVGltZVBpY2tlck1vZHVsZSB7IH1cbiJdfQ==