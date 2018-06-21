/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { filter } from 'rxjs/operators';
import { WizardComponent } from '../wizard/index';
import { MarqueeWizardStepComponent } from './marquee-wizard-step.component';
import { MarqueeWizardService } from './marquee-wizard.service';
var MarqueeWizardComponent = (function (_super) {
    tslib_1.__extends(MarqueeWizardComponent, _super);
    function MarqueeWizardComponent(marqueeWizardService) {
        var _this = _super.call(this) || this;
        _this.steps = new QueryList();
        marqueeWizardService.valid$.pipe(filter(function (event) { return !event.valid; })).subscribe(_this.validChange.bind(_this));
        return _this;
    }
    Object.defineProperty(MarqueeWizardComponent.prototype, "isTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.description && this.description instanceof TemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * If the current step is valid, mark it as
     * complete and go to the next step
     */
    /**
     * If the current step is valid, mark it as
     * complete and go to the next step
     * @return {?}
     */
    MarqueeWizardComponent.prototype.next = /**
     * If the current step is valid, mark it as
     * complete and go to the next step
     * @return {?}
     */
    function () {
        // get the current step
        var /** @type {?} */ step = /** @type {?} */ (this.getCurrentStep());
        if (step.valid) {
            _super.prototype.next.call(this);
            // mark this step as completed
            step.setCompleted(true);
        }
    };
    /**
     * Emit the onFinishing event and if valid the onFinish event.
     * Also mark the final step as completed if it is valid
     */
    /**
     * Emit the onFinishing event and if valid the onFinish event.
     * Also mark the final step as completed if it is valid
     * @return {?}
     */
    MarqueeWizardComponent.prototype.finish = /**
     * Emit the onFinishing event and if valid the onFinish event.
     * Also mark the final step as completed if it is valid
     * @return {?}
     */
    function () {
        // get the current step
        var /** @type {?} */ step = /** @type {?} */ (this.getCurrentStep());
        // call the original finish function
        return _super.prototype.finish.call(this).then(function () {
            // if the step is valid indicate that it is now complete
            if (step.valid) {
                step.setCompleted(true);
            }
        });
    };
    /**
     * If a step in the wizard becomes invalid, all steps sequentially after
     * it, should become unvisited and incomplete
     */
    /**
     * If a step in the wizard becomes invalid, all steps sequentially after
     * it, should become unvisited and incomplete
     * @param {?} state
     * @return {?}
     */
    MarqueeWizardComponent.prototype.validChange = /**
     * If a step in the wizard becomes invalid, all steps sequentially after
     * it, should become unvisited and incomplete
     * @param {?} state
     * @return {?}
     */
    function (state) {
        var /** @type {?} */ steps = this.steps.toArray();
        var /** @type {?} */ current = steps.findIndex(function (step) { return step === state.step; });
        var /** @type {?} */ affected = steps.slice(current);
        affected.forEach(function (step) {
            // the step should no longer be completed
            step.completed = false;
            // if the step is not the current step then also mark it as unvisited
            if (step !== state.step) {
                step.visited = false;
            }
        });
    };
    MarqueeWizardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-marquee-wizard',
                    template: "<div class=\"marquee-wizard-side-panel\">\n\n    <div class=\"marquee-wizard-description-container\" *ngIf=\"description\">\n        <!-- If a template was provided display it -->\n        <ng-container *ngIf=\"isTemplate\" [ngTemplateOutlet]=\"description\"></ng-container>\n\n        <!-- Otherwise wimply display the string -->\n        <ng-container *ngIf=\"!isTemplate\">\n            <p>{{ description }}</p>\n        </ng-container>\n    </div>\n\n    <ul class=\"marquee-wizard-steps\">\n\n        <li class=\"marquee-wizard-step\" *ngFor=\"let step of steps\" (click)=\"gotoStep(step)\" [class.active]=\"step.active\" [class.visited]=\"step.visited\" [class.invalid]=\"!step.valid\">\n            <i class=\"marquee-wizard-step-icon\" [ngClass]=\"step.icon\"></i>\n            <span class=\"marquee-wizard-step-title\">{{ step.header }}</span>\n            <span class=\"marquee-wizard-step-status hpe-icon hpe-checkmark\" *ngIf=\"step.completed\"></span>\n        </li>\n\n    </ul>\n</div>\n\n<div class=\"marquee-wizard-content-panel\">\n    <div class=\"marquee-wizard-content\">\n        <ng-content></ng-content>\n    </div>\n\n    <div class=\"modal-footer\">\n\n        <button #tip=\"ux-tooltip\" class=\"btn button-secondary\" *ngIf=\"previousVisible\" [uxTooltip]=\"previousTooltip\" container=\"body\"\n            [disabled]=\"previousDisabled || step === 0\" (click)=\"previous(); tip.hide()\">{{ previousText }}</button>\n\n        <button #tip=\"ux-tooltip\" class=\"btn button-primary\" *ngIf=\"nextVisible && !isLastStep()\" [uxTooltip]=\"nextTooltip\" container=\"body\"\n            [disabled]=\"nextDisabled\" (click)=\"next(); tip.hide()\">{{ nextText }}</button>\n\n        <button #tip=\"ux-tooltip\" class=\"btn button-primary\" *ngIf=\"finishVisible && isLastStep() || finishAlwaysVisible\" [uxTooltip]=\"finishTooltip\"\n            container=\"body\" [disabled]=\"finishDisabled\" (click)=\"finish(); tip.hide()\">{{ finishText }}</button>\n\n        <button #tip=\"ux-tooltip\" class=\"btn button-secondary\" *ngIf=\"cancelVisible && !isLastStep() || cancelAlwaysVisible\" [uxTooltip]=\"cancelTooltip\"\n            container=\"body\" [disabled]=\"cancelDisabled\" (click)=\"cancel(); tip.hide()\">{{ cancelText }}</button>\n    </div>\n</div>",
                    providers: [MarqueeWizardService]
                },] },
    ];
    /** @nocollapse */
    MarqueeWizardComponent.ctorParameters = function () { return [
        { type: MarqueeWizardService, },
    ]; };
    MarqueeWizardComponent.propDecorators = {
        "description": [{ type: Input },],
        "steps": [{ type: ContentChildren, args: [MarqueeWizardStepComponent,] },],
    };
    return MarqueeWizardComponent;
}(WizardComponent));
export { MarqueeWizardComponent };
function MarqueeWizardComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MarqueeWizardComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MarqueeWizardComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MarqueeWizardComponent.propDecorators;
    /** @type {?} */
    MarqueeWizardComponent.prototype.description;
    /** @type {?} */
    MarqueeWizardComponent.prototype.steps;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFycXVlZS13aXphcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWFycXVlZS13aXphcmQvbWFycXVlZS13aXphcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsb0JBQW9CLEVBQTJCLE1BQU0sMEJBQTBCLENBQUM7O0lBaUQ3QyxrREFBZTtJQVN2RCxnQ0FBWSxvQkFBMEM7UUFBdEQsWUFDSSxpQkFBTyxTQUtWO3NCQVpvRCxJQUFJLFNBQVMsRUFBOEI7UUFTNUYsb0JBQW9CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDNUIsTUFBTSxDQUFDLFVBQUMsS0FBOEIsSUFBSyxPQUFBLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBWixDQUFZLENBQUMsQ0FDM0QsQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQzs7S0FDNUM7SUFWRCxzQkFBSSw4Q0FBVTs7OztRQUFkO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsWUFBWSxXQUFXLENBQUM7U0FDdEU7OztPQUFBO0lBVUQ7OztPQUdHOzs7Ozs7SUFDSCxxQ0FBSTs7Ozs7SUFBSjs7UUFHSSxxQkFBTSxJQUFJLHFCQUFHLElBQUksQ0FBQyxjQUFjLEVBQWdDLENBQUEsQ0FBQztRQUVqRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNiLGlCQUFNLElBQUksV0FBRSxDQUFDOztZQUdiLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7S0FDSjtJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsdUNBQU07Ozs7O0lBQU47O1FBR0kscUJBQU0sSUFBSSxxQkFBRyxJQUFJLENBQUMsY0FBYyxFQUFnQyxDQUFBLENBQUM7O1FBR2pFLE1BQU0sQ0FBQyxpQkFBTSxNQUFNLFdBQUUsQ0FBQyxJQUFJLENBQUM7O1lBRXZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDM0I7U0FDSixDQUFDLENBQUM7S0FDTjtJQUVEOzs7T0FHRzs7Ozs7OztJQUNILDRDQUFXOzs7Ozs7SUFBWCxVQUFZLEtBQThCO1FBRXRDLHFCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25DLHFCQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLEVBQW5CLENBQW1CLENBQUMsQ0FBQztRQUM3RCxxQkFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV0QyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTs7WUFHakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7O1lBR3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDeEI7U0FDSixDQUFDLENBQUM7S0FFTjs7Z0JBeEhKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUsMnVFQTBDUDtvQkFDSCxTQUFTLEVBQUUsQ0FBRSxvQkFBb0IsQ0FBRTtpQkFDdEM7Ozs7Z0JBaERRLG9CQUFvQjs7O2dDQW1EeEIsS0FBSzswQkFDTCxlQUFlLFNBQUMsMEJBQTBCOztpQ0F4RC9DO0VBcUQ0QyxlQUFlO1NBQTlDLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBJbnB1dCwgUXVlcnlMaXN0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgV2l6YXJkQ29tcG9uZW50IH0gZnJvbSAnLi4vd2l6YXJkL2luZGV4JztcbmltcG9ydCB7IE1hcnF1ZWVXaXphcmRTdGVwQ29tcG9uZW50IH0gZnJvbSAnLi9tYXJxdWVlLXdpemFyZC1zdGVwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXJxdWVlV2l6YXJkU2VydmljZSwgTWFycXVlZVdpemFyZFZhbGlkRXZlbnQgfSBmcm9tICcuL21hcnF1ZWUtd2l6YXJkLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LW1hcnF1ZWUtd2l6YXJkJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJtYXJxdWVlLXdpemFyZC1zaWRlLXBhbmVsXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwibWFycXVlZS13aXphcmQtZGVzY3JpcHRpb24tY29udGFpbmVyXCIgKm5nSWY9XCJkZXNjcmlwdGlvblwiPlxuICAgICAgICA8IS0tIElmIGEgdGVtcGxhdGUgd2FzIHByb3ZpZGVkIGRpc3BsYXkgaXQgLS0+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1RlbXBsYXRlXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwiZGVzY3JpcHRpb25cIj48L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8IS0tIE90aGVyd2lzZSB3aW1wbHkgZGlzcGxheSB0aGUgc3RyaW5nIC0tPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzVGVtcGxhdGVcIj5cbiAgICAgICAgICAgIDxwPnt7IGRlc2NyaXB0aW9uIH19PC9wPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cblxuICAgIDx1bCBjbGFzcz1cIm1hcnF1ZWUtd2l6YXJkLXN0ZXBzXCI+XG5cbiAgICAgICAgPGxpIGNsYXNzPVwibWFycXVlZS13aXphcmQtc3RlcFwiICpuZ0Zvcj1cImxldCBzdGVwIG9mIHN0ZXBzXCIgKGNsaWNrKT1cImdvdG9TdGVwKHN0ZXApXCIgW2NsYXNzLmFjdGl2ZV09XCJzdGVwLmFjdGl2ZVwiIFtjbGFzcy52aXNpdGVkXT1cInN0ZXAudmlzaXRlZFwiIFtjbGFzcy5pbnZhbGlkXT1cIiFzdGVwLnZhbGlkXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cIm1hcnF1ZWUtd2l6YXJkLXN0ZXAtaWNvblwiIFtuZ0NsYXNzXT1cInN0ZXAuaWNvblwiPjwvaT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWFycXVlZS13aXphcmQtc3RlcC10aXRsZVwiPnt7IHN0ZXAuaGVhZGVyIH19PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXJxdWVlLXdpemFyZC1zdGVwLXN0YXR1cyBocGUtaWNvbiBocGUtY2hlY2ttYXJrXCIgKm5nSWY9XCJzdGVwLmNvbXBsZXRlZFwiPjwvc3Bhbj5cbiAgICAgICAgPC9saT5cblxuICAgIDwvdWw+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cIm1hcnF1ZWUtd2l6YXJkLWNvbnRlbnQtcGFuZWxcIj5cbiAgICA8ZGl2IGNsYXNzPVwibWFycXVlZS13aXphcmQtY29udGVudFwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XG5cbiAgICAgICAgPGJ1dHRvbiAjdGlwPVwidXgtdG9vbHRpcFwiIGNsYXNzPVwiYnRuIGJ1dHRvbi1zZWNvbmRhcnlcIiAqbmdJZj1cInByZXZpb3VzVmlzaWJsZVwiIFt1eFRvb2x0aXBdPVwicHJldmlvdXNUb29sdGlwXCIgY29udGFpbmVyPVwiYm9keVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwicHJldmlvdXNEaXNhYmxlZCB8fCBzdGVwID09PSAwXCIgKGNsaWNrKT1cInByZXZpb3VzKCk7IHRpcC5oaWRlKClcIj57eyBwcmV2aW91c1RleHQgfX08L2J1dHRvbj5cblxuICAgICAgICA8YnV0dG9uICN0aXA9XCJ1eC10b29sdGlwXCIgY2xhc3M9XCJidG4gYnV0dG9uLXByaW1hcnlcIiAqbmdJZj1cIm5leHRWaXNpYmxlICYmICFpc0xhc3RTdGVwKClcIiBbdXhUb29sdGlwXT1cIm5leHRUb29sdGlwXCIgY29udGFpbmVyPVwiYm9keVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwibmV4dERpc2FibGVkXCIgKGNsaWNrKT1cIm5leHQoKTsgdGlwLmhpZGUoKVwiPnt7IG5leHRUZXh0IH19PC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvbiAjdGlwPVwidXgtdG9vbHRpcFwiIGNsYXNzPVwiYnRuIGJ1dHRvbi1wcmltYXJ5XCIgKm5nSWY9XCJmaW5pc2hWaXNpYmxlICYmIGlzTGFzdFN0ZXAoKSB8fCBmaW5pc2hBbHdheXNWaXNpYmxlXCIgW3V4VG9vbHRpcF09XCJmaW5pc2hUb29sdGlwXCJcbiAgICAgICAgICAgIGNvbnRhaW5lcj1cImJvZHlcIiBbZGlzYWJsZWRdPVwiZmluaXNoRGlzYWJsZWRcIiAoY2xpY2spPVwiZmluaXNoKCk7IHRpcC5oaWRlKClcIj57eyBmaW5pc2hUZXh0IH19PC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvbiAjdGlwPVwidXgtdG9vbHRpcFwiIGNsYXNzPVwiYnRuIGJ1dHRvbi1zZWNvbmRhcnlcIiAqbmdJZj1cImNhbmNlbFZpc2libGUgJiYgIWlzTGFzdFN0ZXAoKSB8fCBjYW5jZWxBbHdheXNWaXNpYmxlXCIgW3V4VG9vbHRpcF09XCJjYW5jZWxUb29sdGlwXCJcbiAgICAgICAgICAgIGNvbnRhaW5lcj1cImJvZHlcIiBbZGlzYWJsZWRdPVwiY2FuY2VsRGlzYWJsZWRcIiAoY2xpY2spPVwiY2FuY2VsKCk7IHRpcC5oaWRlKClcIj57eyBjYW5jZWxUZXh0IH19PC9idXR0b24+XG4gICAgPC9kaXY+XG48L2Rpdj5gLFxuICAgIHByb3ZpZGVyczogWyBNYXJxdWVlV2l6YXJkU2VydmljZSBdXG59KVxuZXhwb3J0IGNsYXNzIE1hcnF1ZWVXaXphcmRDb21wb25lbnQgZXh0ZW5kcyBXaXphcmRDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgZGVzY3JpcHRpb246IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG4gICAgQENvbnRlbnRDaGlsZHJlbihNYXJxdWVlV2l6YXJkU3RlcENvbXBvbmVudCkgc3RlcHMgPSBuZXcgUXVlcnlMaXN0PE1hcnF1ZWVXaXphcmRTdGVwQ29tcG9uZW50PigpO1xuXG4gICAgZ2V0IGlzVGVtcGxhdGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlc2NyaXB0aW9uICYmIHRoaXMuZGVzY3JpcHRpb24gaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZjtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihtYXJxdWVlV2l6YXJkU2VydmljZTogTWFycXVlZVdpemFyZFNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBtYXJxdWVlV2l6YXJkU2VydmljZS52YWxpZCQucGlwZShcbiAgICAgICAgICAgIGZpbHRlcigoZXZlbnQ6IE1hcnF1ZWVXaXphcmRWYWxpZEV2ZW50KSA9PiAhZXZlbnQudmFsaWQpXG4gICAgICAgICkuc3Vic2NyaWJlKHRoaXMudmFsaWRDaGFuZ2UuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgdGhlIGN1cnJlbnQgc3RlcCBpcyB2YWxpZCwgbWFyayBpdCBhc1xuICAgICAqIGNvbXBsZXRlIGFuZCBnbyB0byB0aGUgbmV4dCBzdGVwXG4gICAgICovXG4gICAgbmV4dCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgc3RlcFxuICAgICAgICBjb25zdCBzdGVwID0gdGhpcy5nZXRDdXJyZW50U3RlcCgpIGFzIE1hcnF1ZWVXaXphcmRTdGVwQ29tcG9uZW50O1xuXG4gICAgICAgIGlmIChzdGVwLnZhbGlkKSB7XG4gICAgICAgICAgICBzdXBlci5uZXh0KCk7XG5cbiAgICAgICAgICAgIC8vIG1hcmsgdGhpcyBzdGVwIGFzIGNvbXBsZXRlZFxuICAgICAgICAgICAgc3RlcC5zZXRDb21wbGV0ZWQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbWl0IHRoZSBvbkZpbmlzaGluZyBldmVudCBhbmQgaWYgdmFsaWQgdGhlIG9uRmluaXNoIGV2ZW50LlxuICAgICAqIEFsc28gbWFyayB0aGUgZmluYWwgc3RlcCBhcyBjb21wbGV0ZWQgaWYgaXQgaXMgdmFsaWRcbiAgICAgKi9cbiAgICBmaW5pc2goKTogUHJvbWlzZTx2b2lkPiB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IHN0ZXBcbiAgICAgICAgY29uc3Qgc3RlcCA9IHRoaXMuZ2V0Q3VycmVudFN0ZXAoKSBhcyBNYXJxdWVlV2l6YXJkU3RlcENvbXBvbmVudDtcblxuICAgICAgICAvLyBjYWxsIHRoZSBvcmlnaW5hbCBmaW5pc2ggZnVuY3Rpb25cbiAgICAgICAgcmV0dXJuIHN1cGVyLmZpbmlzaCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gaWYgdGhlIHN0ZXAgaXMgdmFsaWQgaW5kaWNhdGUgdGhhdCBpdCBpcyBub3cgY29tcGxldGVcbiAgICAgICAgICAgIGlmIChzdGVwLnZhbGlkKSB7XG4gICAgICAgICAgICAgICAgc3RlcC5zZXRDb21wbGV0ZWQodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElmIGEgc3RlcCBpbiB0aGUgd2l6YXJkIGJlY29tZXMgaW52YWxpZCwgYWxsIHN0ZXBzIHNlcXVlbnRpYWxseSBhZnRlclxuICAgICAqIGl0LCBzaG91bGQgYmVjb21lIHVudmlzaXRlZCBhbmQgaW5jb21wbGV0ZVxuICAgICAqL1xuICAgIHZhbGlkQ2hhbmdlKHN0YXRlOiBNYXJxdWVlV2l6YXJkVmFsaWRFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IHN0ZXBzID0gdGhpcy5zdGVwcy50b0FycmF5KCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSBzdGVwcy5maW5kSW5kZXgoc3RlcCA9PiBzdGVwID09PSBzdGF0ZS5zdGVwKTtcbiAgICAgICAgY29uc3QgYWZmZWN0ZWQgPSBzdGVwcy5zbGljZShjdXJyZW50KTtcblxuICAgICAgICBhZmZlY3RlZC5mb3JFYWNoKHN0ZXAgPT4ge1xuXG4gICAgICAgICAgICAvLyB0aGUgc3RlcCBzaG91bGQgbm8gbG9uZ2VyIGJlIGNvbXBsZXRlZFxuICAgICAgICAgICAgc3RlcC5jb21wbGV0ZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gaWYgdGhlIHN0ZXAgaXMgbm90IHRoZSBjdXJyZW50IHN0ZXAgdGhlbiBhbHNvIG1hcmsgaXQgYXMgdW52aXNpdGVkXG4gICAgICAgICAgICBpZiAoc3RlcCAhPT0gc3RhdGUuc3RlcCkge1xuICAgICAgICAgICAgICAgIHN0ZXAudmlzaXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cbn0iXX0=