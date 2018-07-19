import { ElementRef, Injector, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export declare class MarqueeWizardNg1Component extends UpgradeComponent {
    wizardIcon: string;
    wizardSteps: MarqueeWizardStep[];
    buttonOptions: MarqueeWizardOptions;
    onChanging: Function;
    onFinished: Function;
    onFinishing: Function;
    onCanceled: Function;
    isVisited: boolean;
    sideInfo: MarqueeWizardSideInfo;
    wizardStepsChange: EventEmitter<MarqueeWizardStep[]>;
    constructor(elementRef: ElementRef, injector: Injector);
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
