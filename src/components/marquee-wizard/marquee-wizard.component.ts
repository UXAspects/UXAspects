import { Component, ContentChildren, ElementRef, EventEmitter, Input, OnDestroy, Output, QueryList, TemplateRef } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { WizardComponent } from '../wizard/index';
import { MarqueeWizardStepComponent } from './marquee-wizard-step.component';
import { MarqueeWizardService, MarqueeWizardValidEvent } from './marquee-wizard.service';
import { ResizeDimensions, ResizeService } from '../../directives/resize/index';
import { Subject } from 'rxjs';

@Component({
    selector: 'ux-marquee-wizard',
    templateUrl: './marquee-wizard.component.html',
    providers: [MarqueeWizardService]
})
export class MarqueeWizardComponent extends WizardComponent implements OnDestroy {

    /** Provide a custom template for the description in the left panel */
    @Input() description: string | TemplateRef<any>;

    /** Provide a custom template for the step in the left panel */
    @Input() stepTemplate: TemplateRef<any>;

    /** Initial set to default width to match 240px on left but can be changed with a perecentage value */
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

    /** Unsubscribe from all subscriptions when component is destroyed */
    private _onDestroyed = new Subject<void>();

    get isTemplate(): boolean {
        return this.description && this.description instanceof TemplateRef;
    }

    constructor(marqueeWizardService: MarqueeWizardService,
                private _resizeService: ResizeService,
                private _elementRef: ElementRef<HTMLElement>
    ) {
        super();

        // watch for changes to the size
        _resizeService.addResizeListener(_elementRef.nativeElement)
            .pipe(takeUntil(this._onDestroyed))
            .subscribe(this.onResize.bind(this));

        marqueeWizardService.valid$.pipe(filter((event: MarqueeWizardValidEvent) => !event.valid))
            .subscribe(this.validChange.bind(this));
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._onDestroyed.next();
        this._onDestroyed.complete();
        this._resizeService.removeResizeListener(this._elementRef.nativeElement);
    }

    /**
     * If the current step is valid, mark it as
     * complete and go to the next step
     */
    next(): void {

        // get the current step
        const step = this.getCurrentStep() as MarqueeWizardStepComponent;

        if (step.valid) {
            super.next();

            // mark this step as completed
            step.setCompleted(true);
        } else {
            this.stepError.next(this.step);
        }
    }


    /**
     * If the validation is true then disable the next button
     * and do not allow progression onto the next step
     */
    isDisabled(): boolean {

         const step = this.getCurrentStep() as MarqueeWizardStepComponent;

         if (step.valid) {
            return false;
         } else {
            return true;
        }
    }


    /**
     * Emit the onFinishing event and if valid the onFinish event.
     * Also mark the final step as completed if it is valid
     */
    finish(): Promise<void> {

        // get the current step
        const step = this.getCurrentStep() as MarqueeWizardStepComponent;

        // call the original finish function
        return super.finish().then(() => {
            // if the step is valid indicate that it is now complete
            if (step.valid) {
                step.setCompleted(true);
            } else {
                this.stepError.next(this.step);
            }
        });
    }

    /**
     * If a step in the wizard becomes invalid, all steps sequentially after
     * it, should become unvisited and incomplete
     */
    validChange(state: MarqueeWizardValidEvent): void {

        const steps = this.steps.toArray();
        const current = steps.findIndex(step => step === state.step);
        const affected = steps.slice(current);

        affected.forEach(step => {

            // the step should no longer be completed
            step.completed = false;

            // if the step is not the current step then also mark it as unvisited
            if (step !== state.step) {
                step.visited = false;
            }
        });
    }

    onResize(event: ResizeDimensions): void {
        if (event.width !== 0 && event.height !== 0) {
            this._isInitialised = true;
        }
    }

    /** Whenever the drag event ends, update the internal value and emit the new size */
    onDragEnd({ sizes }: SplitDragEndEvent): void {
        // we need to only get the size of the first panel which will be the side panel
        this.sidePanelWidth = sizes[0];
        this.sidePanelWidthChange.emit(this.sidePanelWidth);
    }
}

/** Angular Split does not export a type for this so we created our own */
interface SplitDragEndEvent {
    gutterNum: number;
    sizes: number[];
}