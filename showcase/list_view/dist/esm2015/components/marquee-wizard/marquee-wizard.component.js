/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { filter } from 'rxjs/operators';
import { WizardComponent } from '../wizard/index';
import { MarqueeWizardStepComponent } from './marquee-wizard-step.component';
import { MarqueeWizardService } from './marquee-wizard.service';
export class MarqueeWizardComponent extends WizardComponent {
    /**
     * @param {?} marqueeWizardService
     */
    constructor(marqueeWizardService) {
        super();
        this.steps = new QueryList();
        marqueeWizardService.valid$.pipe(filter((event) => !event.valid)).subscribe(this.validChange.bind(this));
    }
    /**
     * @return {?}
     */
    get isTemplate() {
        return this.description && this.description instanceof TemplateRef;
    }
    /**
     * If the current step is valid, mark it as
     * complete and go to the next step
     * @return {?}
     */
    next() {
        // get the current step
        const /** @type {?} */ step = /** @type {?} */ (this.getCurrentStep());
        if (step.valid) {
            super.next();
            // mark this step as completed
            step.setCompleted(true);
        }
    }
    /**
     * Emit the onFinishing event and if valid the onFinish event.
     * Also mark the final step as completed if it is valid
     * @return {?}
     */
    finish() {
        // get the current step
        const /** @type {?} */ step = /** @type {?} */ (this.getCurrentStep());
        // call the original finish function
        return super.finish().then(() => {
            // if the step is valid indicate that it is now complete
            if (step.valid) {
                step.setCompleted(true);
            }
        });
    }
    /**
     * If a step in the wizard becomes invalid, all steps sequentially after
     * it, should become unvisited and incomplete
     * @param {?} state
     * @return {?}
     */
    validChange(state) {
        const /** @type {?} */ steps = this.steps.toArray();
        const /** @type {?} */ current = steps.findIndex(step => step === state.step);
        const /** @type {?} */ affected = steps.slice(current);
        affected.forEach(step => {
            // the step should no longer be completed
            step.completed = false;
            // if the step is not the current step then also mark it as unvisited
            if (step !== state.step) {
                step.visited = false;
            }
        });
    }
}
MarqueeWizardComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-marquee-wizard',
                template: `<div class="marquee-wizard-side-panel">

    <div class="marquee-wizard-description-container" *ngIf="description">
        <!-- If a template was provided display it -->
        <ng-container *ngIf="isTemplate" [ngTemplateOutlet]="description"></ng-container>

        <!-- Otherwise wimply display the string -->
        <ng-container *ngIf="!isTemplate">
            <p>{{ description }}</p>
        </ng-container>
    </div>

    <ul class="marquee-wizard-steps">

        <li class="marquee-wizard-step" *ngFor="let step of steps" (click)="gotoStep(step)" [class.active]="step.active" [class.visited]="step.visited" [class.invalid]="!step.valid">
            <i class="marquee-wizard-step-icon" [ngClass]="step.icon"></i>
            <span class="marquee-wizard-step-title">{{ step.header }}</span>
            <span class="marquee-wizard-step-status hpe-icon hpe-checkmark" *ngIf="step.completed"></span>
        </li>

    </ul>
</div>

<div class="marquee-wizard-content-panel">
    <div class="marquee-wizard-content">
        <ng-content></ng-content>
    </div>

    <div class="modal-footer">

        <button #tip="ux-tooltip" class="btn button-secondary" *ngIf="previousVisible" [uxTooltip]="previousTooltip" container="body"
            [disabled]="previousDisabled || step === 0" (click)="previous(); tip.hide()">{{ previousText }}</button>

        <button #tip="ux-tooltip" class="btn button-primary" *ngIf="nextVisible && !isLastStep()" [uxTooltip]="nextTooltip" container="body"
            [disabled]="nextDisabled" (click)="next(); tip.hide()">{{ nextText }}</button>

        <button #tip="ux-tooltip" class="btn button-primary" *ngIf="finishVisible && isLastStep() || finishAlwaysVisible" [uxTooltip]="finishTooltip"
            container="body" [disabled]="finishDisabled" (click)="finish(); tip.hide()">{{ finishText }}</button>

        <button #tip="ux-tooltip" class="btn button-secondary" *ngIf="cancelVisible && !isLastStep() || cancelAlwaysVisible" [uxTooltip]="cancelTooltip"
            container="body" [disabled]="cancelDisabled" (click)="cancel(); tip.hide()">{{ cancelText }}</button>
    </div>
</div>`,
                providers: [MarqueeWizardService]
            },] },
];
/** @nocollapse */
MarqueeWizardComponent.ctorParameters = () => [
    { type: MarqueeWizardService, },
];
MarqueeWizardComponent.propDecorators = {
    "description": [{ type: Input },],
    "steps": [{ type: ContentChildren, args: [MarqueeWizardStepComponent,] },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFycXVlZS13aXphcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWFycXVlZS13aXphcmQvbWFycXVlZS13aXphcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBMkIsTUFBTSwwQkFBMEIsQ0FBQztBQWlEekYsTUFBTSw2QkFBOEIsU0FBUSxlQUFlOzs7O0lBU3ZELFlBQVksb0JBQTBDO1FBQ2xELEtBQUssRUFBRSxDQUFDO3FCQVB5QyxJQUFJLFNBQVMsRUFBOEI7UUFTNUYsb0JBQW9CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDNUIsTUFBTSxDQUFDLENBQUMsS0FBOEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FDM0QsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUM1Qzs7OztJQVZELElBQUksVUFBVTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLFlBQVksV0FBVyxDQUFDO0tBQ3RFOzs7Ozs7SUFjRCxJQUFJOztRQUdBLHVCQUFNLElBQUkscUJBQUcsSUFBSSxDQUFDLGNBQWMsRUFBZ0MsQ0FBQSxDQUFDO1FBRWpFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2IsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDOztZQUdiLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7S0FDSjs7Ozs7O0lBTUQsTUFBTTs7UUFHRix1QkFBTSxJQUFJLHFCQUFHLElBQUksQ0FBQyxjQUFjLEVBQWdDLENBQUEsQ0FBQzs7UUFHakUsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7O1lBRXZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDM0I7U0FDSixDQUFDLENBQUM7S0FDTjs7Ozs7OztJQU1ELFdBQVcsQ0FBQyxLQUE4QjtRQUV0Qyx1QkFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQyx1QkFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RCx1QkFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV0QyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUk7O1lBR2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDOztZQUd2QixFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ3hCO1NBQ0osQ0FBQyxDQUFDO0tBRU47OztZQXhISixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EwQ1A7Z0JBQ0gsU0FBUyxFQUFFLENBQUUsb0JBQW9CLENBQUU7YUFDdEM7Ozs7WUFoRFEsb0JBQW9COzs7NEJBbUR4QixLQUFLO3NCQUNMLGVBQWUsU0FBQywwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgSW5wdXQsIFF1ZXJ5TGlzdCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFdpemFyZENvbXBvbmVudCB9IGZyb20gJy4uL3dpemFyZC9pbmRleCc7XG5pbXBvcnQgeyBNYXJxdWVlV2l6YXJkU3RlcENvbXBvbmVudCB9IGZyb20gJy4vbWFycXVlZS13aXphcmQtc3RlcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFycXVlZVdpemFyZFNlcnZpY2UsIE1hcnF1ZWVXaXphcmRWYWxpZEV2ZW50IH0gZnJvbSAnLi9tYXJxdWVlLXdpemFyZC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1tYXJxdWVlLXdpemFyZCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibWFycXVlZS13aXphcmQtc2lkZS1wYW5lbFwiPlxuXG4gICAgPGRpdiBjbGFzcz1cIm1hcnF1ZWUtd2l6YXJkLWRlc2NyaXB0aW9uLWNvbnRhaW5lclwiICpuZ0lmPVwiZGVzY3JpcHRpb25cIj5cbiAgICAgICAgPCEtLSBJZiBhIHRlbXBsYXRlIHdhcyBwcm92aWRlZCBkaXNwbGF5IGl0IC0tPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNUZW1wbGF0ZVwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImRlc2NyaXB0aW9uXCI+PC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgPCEtLSBPdGhlcndpc2Ugd2ltcGx5IGRpc3BsYXkgdGhlIHN0cmluZyAtLT5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc1RlbXBsYXRlXCI+XG4gICAgICAgICAgICA8cD57eyBkZXNjcmlwdGlvbiB9fTwvcD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG5cbiAgICA8dWwgY2xhc3M9XCJtYXJxdWVlLXdpemFyZC1zdGVwc1wiPlxuXG4gICAgICAgIDxsaSBjbGFzcz1cIm1hcnF1ZWUtd2l6YXJkLXN0ZXBcIiAqbmdGb3I9XCJsZXQgc3RlcCBvZiBzdGVwc1wiIChjbGljayk9XCJnb3RvU3RlcChzdGVwKVwiIFtjbGFzcy5hY3RpdmVdPVwic3RlcC5hY3RpdmVcIiBbY2xhc3MudmlzaXRlZF09XCJzdGVwLnZpc2l0ZWRcIiBbY2xhc3MuaW52YWxpZF09XCIhc3RlcC52YWxpZFwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJtYXJxdWVlLXdpemFyZC1zdGVwLWljb25cIiBbbmdDbGFzc109XCJzdGVwLmljb25cIj48L2k+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hcnF1ZWUtd2l6YXJkLXN0ZXAtdGl0bGVcIj57eyBzdGVwLmhlYWRlciB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWFycXVlZS13aXphcmQtc3RlcC1zdGF0dXMgaHBlLWljb24gaHBlLWNoZWNrbWFya1wiICpuZ0lmPVwic3RlcC5jb21wbGV0ZWRcIj48L3NwYW4+XG4gICAgICAgIDwvbGk+XG5cbiAgICA8L3VsPlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJtYXJxdWVlLXdpemFyZC1jb250ZW50LXBhbmVsXCI+XG4gICAgPGRpdiBjbGFzcz1cIm1hcnF1ZWUtd2l6YXJkLWNvbnRlbnRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxuXG4gICAgICAgIDxidXR0b24gI3RpcD1cInV4LXRvb2x0aXBcIiBjbGFzcz1cImJ0biBidXR0b24tc2Vjb25kYXJ5XCIgKm5nSWY9XCJwcmV2aW91c1Zpc2libGVcIiBbdXhUb29sdGlwXT1cInByZXZpb3VzVG9vbHRpcFwiIGNvbnRhaW5lcj1cImJvZHlcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cInByZXZpb3VzRGlzYWJsZWQgfHwgc3RlcCA9PT0gMFwiIChjbGljayk9XCJwcmV2aW91cygpOyB0aXAuaGlkZSgpXCI+e3sgcHJldmlvdXNUZXh0IH19PC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvbiAjdGlwPVwidXgtdG9vbHRpcFwiIGNsYXNzPVwiYnRuIGJ1dHRvbi1wcmltYXJ5XCIgKm5nSWY9XCJuZXh0VmlzaWJsZSAmJiAhaXNMYXN0U3RlcCgpXCIgW3V4VG9vbHRpcF09XCJuZXh0VG9vbHRpcFwiIGNvbnRhaW5lcj1cImJvZHlcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cIm5leHREaXNhYmxlZFwiIChjbGljayk9XCJuZXh0KCk7IHRpcC5oaWRlKClcIj57eyBuZXh0VGV4dCB9fTwvYnV0dG9uPlxuXG4gICAgICAgIDxidXR0b24gI3RpcD1cInV4LXRvb2x0aXBcIiBjbGFzcz1cImJ0biBidXR0b24tcHJpbWFyeVwiICpuZ0lmPVwiZmluaXNoVmlzaWJsZSAmJiBpc0xhc3RTdGVwKCkgfHwgZmluaXNoQWx3YXlzVmlzaWJsZVwiIFt1eFRvb2x0aXBdPVwiZmluaXNoVG9vbHRpcFwiXG4gICAgICAgICAgICBjb250YWluZXI9XCJib2R5XCIgW2Rpc2FibGVkXT1cImZpbmlzaERpc2FibGVkXCIgKGNsaWNrKT1cImZpbmlzaCgpOyB0aXAuaGlkZSgpXCI+e3sgZmluaXNoVGV4dCB9fTwvYnV0dG9uPlxuXG4gICAgICAgIDxidXR0b24gI3RpcD1cInV4LXRvb2x0aXBcIiBjbGFzcz1cImJ0biBidXR0b24tc2Vjb25kYXJ5XCIgKm5nSWY9XCJjYW5jZWxWaXNpYmxlICYmICFpc0xhc3RTdGVwKCkgfHwgY2FuY2VsQWx3YXlzVmlzaWJsZVwiIFt1eFRvb2x0aXBdPVwiY2FuY2VsVG9vbHRpcFwiXG4gICAgICAgICAgICBjb250YWluZXI9XCJib2R5XCIgW2Rpc2FibGVkXT1cImNhbmNlbERpc2FibGVkXCIgKGNsaWNrKT1cImNhbmNlbCgpOyB0aXAuaGlkZSgpXCI+e3sgY2FuY2VsVGV4dCB9fTwvYnV0dG9uPlxuICAgIDwvZGl2PlxuPC9kaXY+YCxcbiAgICBwcm92aWRlcnM6IFsgTWFycXVlZVdpemFyZFNlcnZpY2UgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXJxdWVlV2l6YXJkQ29tcG9uZW50IGV4dGVuZHMgV2l6YXJkQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGRlc2NyaXB0aW9uOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWFycXVlZVdpemFyZFN0ZXBDb21wb25lbnQpIHN0ZXBzID0gbmV3IFF1ZXJ5TGlzdDxNYXJxdWVlV2l6YXJkU3RlcENvbXBvbmVudD4oKTtcblxuICAgIGdldCBpc1RlbXBsYXRlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXNjcmlwdGlvbiAmJiB0aGlzLmRlc2NyaXB0aW9uIGluc3RhbmNlb2YgVGVtcGxhdGVSZWY7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IobWFycXVlZVdpemFyZFNlcnZpY2U6IE1hcnF1ZWVXaXphcmRTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgbWFycXVlZVdpemFyZFNlcnZpY2UudmFsaWQkLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoKGV2ZW50OiBNYXJxdWVlV2l6YXJkVmFsaWRFdmVudCkgPT4gIWV2ZW50LnZhbGlkKVxuICAgICAgICApLnN1YnNjcmliZSh0aGlzLnZhbGlkQ2hhbmdlLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElmIHRoZSBjdXJyZW50IHN0ZXAgaXMgdmFsaWQsIG1hcmsgaXQgYXNcbiAgICAgKiBjb21wbGV0ZSBhbmQgZ28gdG8gdGhlIG5leHQgc3RlcFxuICAgICAqL1xuICAgIG5leHQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IHN0ZXBcbiAgICAgICAgY29uc3Qgc3RlcCA9IHRoaXMuZ2V0Q3VycmVudFN0ZXAoKSBhcyBNYXJxdWVlV2l6YXJkU3RlcENvbXBvbmVudDtcblxuICAgICAgICBpZiAoc3RlcC52YWxpZCkge1xuICAgICAgICAgICAgc3VwZXIubmV4dCgpO1xuXG4gICAgICAgICAgICAvLyBtYXJrIHRoaXMgc3RlcCBhcyBjb21wbGV0ZWRcbiAgICAgICAgICAgIHN0ZXAuc2V0Q29tcGxldGVkKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW1pdCB0aGUgb25GaW5pc2hpbmcgZXZlbnQgYW5kIGlmIHZhbGlkIHRoZSBvbkZpbmlzaCBldmVudC5cbiAgICAgKiBBbHNvIG1hcmsgdGhlIGZpbmFsIHN0ZXAgYXMgY29tcGxldGVkIGlmIGl0IGlzIHZhbGlkXG4gICAgICovXG4gICAgZmluaXNoKCk6IFByb21pc2U8dm9pZD4ge1xuXG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCBzdGVwXG4gICAgICAgIGNvbnN0IHN0ZXAgPSB0aGlzLmdldEN1cnJlbnRTdGVwKCkgYXMgTWFycXVlZVdpemFyZFN0ZXBDb21wb25lbnQ7XG5cbiAgICAgICAgLy8gY2FsbCB0aGUgb3JpZ2luYWwgZmluaXNoIGZ1bmN0aW9uXG4gICAgICAgIHJldHVybiBzdXBlci5maW5pc2goKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIGlmIHRoZSBzdGVwIGlzIHZhbGlkIGluZGljYXRlIHRoYXQgaXQgaXMgbm93IGNvbXBsZXRlXG4gICAgICAgICAgICBpZiAoc3RlcC52YWxpZCkge1xuICAgICAgICAgICAgICAgIHN0ZXAuc2V0Q29tcGxldGVkKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZiBhIHN0ZXAgaW4gdGhlIHdpemFyZCBiZWNvbWVzIGludmFsaWQsIGFsbCBzdGVwcyBzZXF1ZW50aWFsbHkgYWZ0ZXJcbiAgICAgKiBpdCwgc2hvdWxkIGJlY29tZSB1bnZpc2l0ZWQgYW5kIGluY29tcGxldGVcbiAgICAgKi9cbiAgICB2YWxpZENoYW5nZShzdGF0ZTogTWFycXVlZVdpemFyZFZhbGlkRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBzdGVwcyA9IHRoaXMuc3RlcHMudG9BcnJheSgpO1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gc3RlcHMuZmluZEluZGV4KHN0ZXAgPT4gc3RlcCA9PT0gc3RhdGUuc3RlcCk7XG4gICAgICAgIGNvbnN0IGFmZmVjdGVkID0gc3RlcHMuc2xpY2UoY3VycmVudCk7XG5cbiAgICAgICAgYWZmZWN0ZWQuZm9yRWFjaChzdGVwID0+IHtcblxuICAgICAgICAgICAgLy8gdGhlIHN0ZXAgc2hvdWxkIG5vIGxvbmdlciBiZSBjb21wbGV0ZWRcbiAgICAgICAgICAgIHN0ZXAuY29tcGxldGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBzdGVwIGlzIG5vdCB0aGUgY3VycmVudCBzdGVwIHRoZW4gYWxzbyBtYXJrIGl0IGFzIHVudmlzaXRlZFxuICAgICAgICAgICAgaWYgKHN0ZXAgIT09IHN0YXRlLnN0ZXApIHtcbiAgICAgICAgICAgICAgICBzdGVwLnZpc2l0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG59Il19