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
var MarqueeWizardModule = (function () {
    function MarqueeWizardModule() {
    }
    MarqueeWizardModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        WizardModule,
                        TooltipModule
                    ],
                    exports: [
                        MarqueeWizardComponent,
                        MarqueeWizardStepComponent
                    ],
                    declarations: [
                        MarqueeWizardComponent,
                        MarqueeWizardStepComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    MarqueeWizardModule.ctorParameters = function () { return []; };
    return MarqueeWizardModule;
}());
export { MarqueeWizardModule };
function MarqueeWizardModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MarqueeWizardModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MarqueeWizardModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFycXVlZS13aXphcmQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWFycXVlZS13aXphcmQvbWFycXVlZS13aXphcmQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7OztnQkFFaEQsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLFlBQVk7d0JBQ1osYUFBYTtxQkFDaEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLHNCQUFzQjt3QkFDdEIsMEJBQTBCO3FCQUM3QjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1Ysc0JBQXNCO3dCQUN0QiwwQkFBMEI7cUJBQzdCO2lCQUNKOzs7OzhCQXRCRDs7U0F1QmEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFdpemFyZE1vZHVsZSB9IGZyb20gJy4uL3dpemFyZC9pbmRleCc7XG5pbXBvcnQgeyBNYXJxdWVlV2l6YXJkQ29tcG9uZW50IH0gZnJvbSAnLi9tYXJxdWVlLXdpemFyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFycXVlZVdpemFyZFN0ZXBDb21wb25lbnQgfSBmcm9tICcuL21hcnF1ZWUtd2l6YXJkLXN0ZXAuY29tcG9uZW50JztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICcuLi90b29sdGlwL2luZGV4JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgV2l6YXJkTW9kdWxlLFxuICAgICAgICBUb29sdGlwTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1hcnF1ZWVXaXphcmRDb21wb25lbnQsXG4gICAgICAgIE1hcnF1ZWVXaXphcmRTdGVwQ29tcG9uZW50XG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWFycXVlZVdpemFyZENvbXBvbmVudCxcbiAgICAgICAgTWFycXVlZVdpemFyZFN0ZXBDb21wb25lbnRcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hcnF1ZWVXaXphcmRNb2R1bGUgeyB9XG4iXX0=