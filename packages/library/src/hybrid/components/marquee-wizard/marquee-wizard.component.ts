import { Directive, ElementRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'marquee-wizard'
})
export class MarqueeWizardNg1Component extends UpgradeComponent {

    @Input() wizardIcon: string;
    @Input() wizardSteps: MarqueeWizardStep[];
    @Input() buttonOptions: MarqueeWizardOptions;
    @Input() onChanging: Function;
    @Input() onFinished: Function;
    @Input() onFinishing: Function;
    @Input() onCanceled: Function;
    @Input() isVisited: boolean;
    @Input() sideInfo: MarqueeWizardSideInfo;

    @Output() wizardStepsChange: EventEmitter<MarqueeWizardStep[]> = new EventEmitter<MarqueeWizardStep[]>();

    constructor(elementRef: ElementRef, injector: Injector) {
        super('marqueeWizard', elementRef, injector);
    }
}

export interface MarqueeWizardStep {
    title: string;
    html?: string;
    header?: string;
    templateUrl?: string;
    hidden?: boolean;
    error?: boolean;
    completed?: boolean;
    visited?: boolean;
}

export interface MarqueeWizardOptions {
    nextText?: string;
    previousText?: string;
    finishText?: string;
    showNext?: boolean;
    showPrevious?: boolean;
    showFinish?: boolean;
    nextTooltip?: string;
    previousTooltip?: string;
    finishTooltip?: string;
    previousEnabled?: boolean;
    nextEnabled?: boolean;
    finishEnabled?: boolean;
}

export interface MarqueeWizardSideInfo {
    title: string;
    description: string;
}