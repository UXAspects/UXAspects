/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardModule } from '../wizard/index';
import { MarqueeWizardComponent } from './marquee-wizard.component';
import { MarqueeWizardStepComponent } from './marquee-wizard-step.component';
import { TooltipModule } from '../tooltip/index';
import { AccessibilityModule } from '../../directives/accessibility/index';
var MarqueeWizardModule = /** @class */ (function () {
    function MarqueeWizardModule() {
    }
    MarqueeWizardModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        WizardModule,
                        TooltipModule,
                        AccessibilityModule
                    ],
                    exports: [
                        MarqueeWizardComponent,
                        MarqueeWizardStepComponent
                    ],
                    declarations: [
                        MarqueeWizardComponent,
                        MarqueeWizardStepComponent
                    ]
                },] }
    ];
    return MarqueeWizardModule;
}());
export { MarqueeWizardModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFycXVlZS13aXphcmQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWFycXVlZS13aXphcmQvbWFycXVlZS13aXphcmQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDOzs7OztnQkFFMUUsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixtQkFBbUI7cUJBQ3RCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxzQkFBc0I7d0JBQ3RCLDBCQUEwQjtxQkFDN0I7b0JBQ0QsWUFBWSxFQUFFO3dCQUNWLHNCQUFzQjt3QkFDdEIsMEJBQTBCO3FCQUM3QjtpQkFDSjs7OEJBeEJEOztTQXlCYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgV2l6YXJkTW9kdWxlIH0gZnJvbSAnLi4vd2l6YXJkL2luZGV4JztcbmltcG9ydCB7IE1hcnF1ZWVXaXphcmRDb21wb25lbnQgfSBmcm9tICcuL21hcnF1ZWUtd2l6YXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXJxdWVlV2l6YXJkU3RlcENvbXBvbmVudCB9IGZyb20gJy4vbWFycXVlZS13aXphcmQtc3RlcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4uL3Rvb2x0aXAvaW5kZXgnO1xuaW1wb3J0IHsgQWNjZXNzaWJpbGl0eU1vZHVsZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvYWNjZXNzaWJpbGl0eS9pbmRleCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFdpemFyZE1vZHVsZSxcbiAgICAgICAgVG9vbHRpcE1vZHVsZSxcbiAgICAgICAgQWNjZXNzaWJpbGl0eU1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBNYXJxdWVlV2l6YXJkQ29tcG9uZW50LFxuICAgICAgICBNYXJxdWVlV2l6YXJkU3RlcENvbXBvbmVudFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE1hcnF1ZWVXaXphcmRDb21wb25lbnQsXG4gICAgICAgIE1hcnF1ZWVXaXphcmRTdGVwQ29tcG9uZW50XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXJxdWVlV2l6YXJkTW9kdWxlIHsgfVxuIl19