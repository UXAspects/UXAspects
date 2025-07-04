import { AfterViewChecked, Component, ContentChildren, ElementRef, EventEmitter, inject, Input, OnDestroy, Output, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { TabbableListDirective } from '../../directives/accessibility';
import { ResizeDimensions, ResizeService } from '../../directives/resize/index';
import { WizardComponent, WizardService, WizardStepComponent } from '../wizard/index';
import { MarqueeWizardStepComponent } from './marquee-wizard-step.component';

@Component({
    selector: 'ux-marquee-wizard',
    templateUrl: './marquee-wizard.component.html',
    providers: [WizardService],
    preserveWhitespaces: false,
    standalone: false
})
export class MarqueeWizardComponent<TStepContext = unknown> extends WizardComponent implements OnDestroy, AfterViewChecked {
    readonly wizardService = inject<WizardService<MarqueeWizardStepComponent>>(WizardService);

    private readonly _resizeService = inject(ResizeService);

    private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    @ViewChild(TabbableListDirective)
    tabbableList: TabbableListDirective;

    /** Provide a custom template for the description in the left panel */
    @Input() description: string | TemplateRef<void>;

    /** Provide a custom template for the step in the left panel */
    @Input() stepTemplate: TemplateRef<MarqueeWizardStepContext<TStepContext>>;

    /** Initial set to default width to match 240px on left but can be changed with a percentage value */
    @Input() sidePanelWidth: number = 25;

    /** Width of the splitter - default is 10 */
    @Input() gutterSize: number = 10;

    /** If set to true the resizable splitter will be enabled and set to the default width **/
    @Input() resizable: boolean = false;

    /** Emit the current width of the splitter*/
    @Output() sidePanelWidthChange = new EventEmitter<number>();

    /** Access each step content component */
    @ContentChildren(MarqueeWizardStepComponent) steps = new QueryList<MarqueeWizardStepComponent>();

    /**
     * If the wizard is in a modal it may initially have a size of 0 until the modal displays
     * in which case if we are using the splitter it will not render correctly. We use this
     * variable to only initialise the splitter when the content has a width.
     */
    _isInitialised: boolean = false;

    get isTemplate(): boolean {
        return this.description && this.description instanceof TemplateRef;
    }

    constructor() {
        super();

        // set to true as default for Marquee Wizard only
        this.resetVisitedOnValidationError = true;

        // watch for changes to the size
        this._resizeService.addResizeListener(this._elementRef.nativeElement)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(this.onResize.bind(this));
    }

    ngAfterViewChecked(): void {
        this.tabbableList?.setFirstItemTabbable();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._resizeService.removeResizeListener(this._elementRef.nativeElement);
    }

    /**
     * If the current step is valid, mark it as
     * complete and go to the next step
     */
    async next(): Promise<void> {
        // get the current step
        const step = this.getCurrentStep() as MarqueeWizardStepComponent;

        await super.next();

        if (step && step.valid) {
            // mark this step as completed
            step.setCompleted(true);
        } else {
            this.stepError.next(this.step);
        }
    }

    /**
     * Emit the onFinishing event and if valid the onFinish event.
     * Also mark the final step as completed if it is valid
     */
    async finish(): Promise<void> {

        // get the current step
        const step = this.getCurrentStep() as MarqueeWizardStepComponent;

        await super.finish();

        // if the step is valid indicate that it is now complete
        if (step.valid) {
            step.setCompleted(true);
        } else {
            this.stepError.next(this.step);
        }
    }

    onResize(event: ResizeDimensions): void {
        if (event.width !== 0 && event.height !== 0) {
            this._isInitialised = true;
        }
    }

    /** Whenever the drag event ends, update the internal value and emit the new size */
    onDragEnd({ sizes }: SplitDragEndEvent): void {
        // we need to only get the size of the first panel which will be the side panel
        this.sidePanelWidth = sizes[0] as number;
        this.sidePanelWidthChange.emit(this.sidePanelWidth);
    }

    gotoStep(step: WizardStepComponent): void {
        const currentStep = this.getCurrentStep() as MarqueeWizardStepComponent;

        if (currentStep !== step) {
            if (!this.sequential) {
                currentStep.setCompleted(true);
            }
            super.gotoStep(step);
        }
    }

    protected setFutureStepsUnvisited(currentStep: MarqueeWizardStepComponent): void {
        super.setFutureStepsUnvisited(currentStep);

        // Marquee wizard steps have an additional completed property which must also be changed.
        // The base class implementation only changes the visited state
        this.getFutureSteps(currentStep).forEach((step: MarqueeWizardStepComponent) => step.completed = false);
    }
}

/** Angular Split does not export a type for this so we created our own */
interface SplitDragEndEvent {
    gutterNum: number;
    sizes: (number | '*')[];
}

export interface MarqueeWizardStepContext<T> {
    $implicit: MarqueeWizardStepComponent<T>;
    index: number;
    context: T;
}
