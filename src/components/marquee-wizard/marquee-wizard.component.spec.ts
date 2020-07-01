import { ChangeDetectorRef, Component, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MarqueeWizardStepComponent } from './marquee-wizard-step.component';
import { MarqueeWizardModule } from './marquee-wizard.module';

const NEXT_BUTTON_SELECTOR: string = '.button-primary';

interface WizardStep {
    header: string;
    content: string;
    valid: boolean;
    visited?: boolean;
    completed?: boolean;
}

/**
 * Test navigation and steps display correctly
 **/
@Component({
    selector: 'marquee-wizard-app',
    template: `
        <ux-marquee-wizard
            class="marquee-wizard"
            [(step)]="step"
            [description]="description"
            (onFinish)="close()"
            (onCancel)="close()"
            [previousVisible]="step !== 0"
            [cancelVisible]="false"
        >
            <ng-template #description>
                <img
                    alt="Icon"
                    src="https://pages.github.houston.softwaregrp.net/caf/ux-aspects-micro-focus/docs/app/assets/img/marquee-wizard-icon.svg"
                />

                <h3 id="marquee-wizard-title" class="marquee-title">
                    Marquee Wizard
                </h3>
                <p class="m-b-nil">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean sodales lacus vitae congue lacinia. Phasellus finibus
                    dolor efficitur quam vestibulum feugiat.
                </p>
            </ng-template>

            <ux-marquee-wizard-step
                *ngFor="let step of steps"
                [header]="step.title"
            >
                <h3 class="marquee-step-title m-t-nil">{{ step.stepTitle }}</h3>
                <div class="row">
                    <div class="col-xs-7">
                        <p class="marquee-wizard-text">
                            Content of second step
                        </p>
                    </div>
                </div>
            </ux-marquee-wizard-step>
        </ux-marquee-wizard>
    `
})
export class MarqueeWizardComponent {
    step: number = 0;

    steps = [
        { title: 'step one', stepTitle: 'Marquee wizard' },
        {
            title: 'step two',
            stepTitle: 'Marquee wizard Step',
            contentStep: 'Content of second step'
        }
    ];

    /**
     * Close the modal and reset everything
     */
    close(): void {
        this.step = 0;
    }
}

describe('Marquee Wizard', () => {
    let component: MarqueeWizardComponent;
    let fixture: ComponentFixture<MarqueeWizardComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MarqueeWizardModule],
            declarations: [MarqueeWizardComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MarqueeWizardComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should initialise correctly', () => {
        expect(component).toBeTruthy();
    });

    it('should display an icon', () => {
        const container = nativeElement.querySelector(
            '.marquee-wizard-description-container'
        );
        const icon = container.querySelector('img');
        expect(icon).toBeTruthy();
    });

    it('should generate an id for each step', () => {
        const steps = nativeElement.querySelectorAll('.marquee-wizard-step');
        steps.forEach((step, index) => {
            expect(step.id).toMatch(`ux-wizard-[0-9]+-step-${ index }-label`);
        });
    });

    it('should display the step title in the side pane;', async(() => {
        const title = nativeElement.querySelector<HTMLHeadingElement>(
            '.marquee-title'
        );
        expect(title.innerText).toBe('Marquee Wizard');
    }));

    it('should emit when the button is clicked', async () => {
        const closeSpy = spyOn(fixture.componentInstance, 'close');

        let footer = nativeElement.querySelector('.modal-footer');
        let buttons = footer.querySelectorAll<HTMLButtonElement>(
            '.button-primary'
        );

        expect(buttons.length).toBe(1);

        // clicking the next button
        buttons.item(0).click();
        fixture.detectChanges();
        await fixture.whenStable();

        buttons = footer.querySelectorAll<HTMLButtonElement>('.button-primary');

        expect(buttons.length).toBe(1);

        // clicking the finish button
        buttons.item(0).click();
        fixture.detectChanges();
        await fixture.whenStable();

        // the finish event should have emitted
        expect(closeSpy).toHaveBeenCalled();
    });
});

/**
 * Test for EL-3790 where an error can occur if steps rely on request response
 */
@Component({
    selector: 'marquee-wizard-ngfor-app',
    template: `
        <ux-marquee-wizard class="marquee-wizard" [(step)]="step">
            <ux-marquee-wizard-step
                *ngFor="let step of steps"
                [header]="step.title"
                [valid]="valid"
                [disableNextWhenInvalid]="disableNextWhenInvalid"
            >
                <p class="test-step-content">{{ step.content }}</p>
            </ux-marquee-wizard-step>
        </ux-marquee-wizard>
    `
})
export class MarqueeWizardNgForComponent implements OnDestroy {
    step = 0;
    steps: { title: string; content: string; }[] = [];
    valid: boolean = true;
    disableNextWhenInvalid: boolean;
    private _timeout: number;

    constructor(changeDetector: ChangeDetectorRef) {
        this._timeout = window.setTimeout(() => {
            this.steps = [
                { title: 'First Step', content: 'Content of first step' },
                { title: 'Second Step', content: 'Content of second step' }
            ];
            changeDetector.detectChanges();
        }, 100);
    }

    ngOnDestroy(): void {
        clearTimeout(this._timeout);
    }
}

describe('Marquee wizard with delayed step creation', () => {
    let component: MarqueeWizardNgForComponent;
    let fixture: ComponentFixture<MarqueeWizardNgForComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MarqueeWizardModule],
            declarations: [MarqueeWizardNgForComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MarqueeWizardNgForComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should update steps after delay', fakeAsync(async () => {
        let steps = getSteps();
        expect(steps.length).toBe(0);

        await whenStepsLoaded();

        steps = getSteps();
        expect(steps.length).toBe(2);
        expect(
            steps[0].querySelector<HTMLElement>('.marquee-wizard-step-title')
                .innerText
        ).toBe('First Step');
        expect(
            steps[1].querySelector<HTMLElement>('.marquee-wizard-step-title')
                .innerText
        ).toBe('Second Step');

        expect(component.step).toBe(0);
    }));

    it('should navigate to the second step after delay', fakeAsync(async () => {
        await whenStepsLoaded();

        await clickNext();

        expect(component.step).toBe(1);
        expect(getContentText()).toContain('Content of second step');
    }));

    it('should disable the next button when the step has an error', fakeAsync(async () => {
        component.disableNextWhenInvalid = true;
        component.valid = false;
        fixture.detectChanges();

        await whenStepsLoaded();

        const button = nativeElement.querySelector<HTMLButtonElement>(
            '.modal-footer .button-primary'
        );

        expect(button.hasAttribute('disabled')).toBeTruthy();
    }));

    async function whenStepsLoaded(): Promise<void> {
        tick(200);
        await fixture.whenStable();
    }

    function getSteps(): NodeListOf<HTMLUListElement> {
        return nativeElement.querySelectorAll<HTMLUListElement>(
            '.marquee-wizard-step'
        );
    }

    function getContentText(): string {
        return nativeElement.querySelector<HTMLElement>('.test-step-content')
            .innerText;
    }

    async function clickNext(): Promise<void> {
        const nextButton = nativeElement.querySelector<HTMLButtonElement>(
            '.modal-footer .button-primary'
        );
        nextButton.click();
        fixture.detectChanges();
        await fixture.whenStable();
    }
});

/**
 * Test resetVisitedOnValidationError flag working as expected and visitedChange is hit when required.
 **/
@Component({
    selector: 'marquee-wizard-validation-app',
    template: `
        <ux-marquee-wizard
            [(step)]="currentStep"
            [resetVisitedOnValidationError]="resetVisitedOnValidationError">
            <ux-marquee-wizard-step
                header="Step One"
                [valid]="step1Valid"
                [(visited)]="step1Visited"
                [(completed)]="step1Completed"
                (visitedChange)="visitedChanged(0, $event)">
                Step One Content
            </ux-marquee-wizard-step>
            <ux-marquee-wizard-step
                header="Step Two"
                [valid]="step2Valid"
                [(visited)]="step2Visited"
                [(completed)]="step2Completed"
                (visitedChange)="visitedChanged(1, $event)">
                Step Two Content
            </ux-marquee-wizard-step>
            <ux-marquee-wizard-step
                header="Step Three"
                [valid]="step3Valid"
                [(visited)]="step3Visited"
                [(completed)]="step3Completed"
                (visitedChange)="visitedChanged(2, $event)">
                Step Three Content
            </ux-marquee-wizard-step>
            <ux-marquee-wizard-step
                header="Step Four"
                [valid]="step4Valid"
                [(visited)]="step4Visited"
                [(completed)]="step4Completed"
                (visitedChange)="visitedChanged(3, $event)">
                Step Four Content
            </ux-marquee-wizard-step>
        </ux-marquee-wizard>
    `
})
export class MarqueeWizardValidationComponent {
    currentStep: number;
    resetVisitedOnValidationError = true;

    // step 1 values
    step1Valid = true;
    step1Visited: boolean;
    step1Completed: boolean;

    // step 2 values
    step2Valid: boolean = true;
    step2Visited: boolean;
    step2Completed: boolean;

    // step 3 values
    step3Valid: boolean = true;
    step3Visited: boolean;
    step3Completed: boolean;

    // step 4 values
    step4Valid: boolean = true;
    step4Visited: boolean;
    step4Completed: boolean;

    visitedChanged(index: number, value: boolean): void {
    }
}

describe('Marquee wizard with validation', () => {
    let component: MarqueeWizardValidationComponent;
    let fixture: ComponentFixture<MarqueeWizardValidationComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MarqueeWizardModule],
            declarations: [MarqueeWizardValidationComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MarqueeWizardValidationComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should remove visited state from later steps when valid = false', async () => {
        component.step1Visited = true;
        component.step2Visited = true;
        fixture.detectChanges();

        expect(isStepValid(0)).toBe(true);
        expect(isStepValid(1)).toBe(true);

        expect(isStepVisited(0)).toBe(true);
        expect(isStepVisited(1)).toBe(true);

        component.step1Valid = false;
        fixture.detectChanges();

        expect(isStepValid(0)).toBe(false);
        expect(isStepValid(1)).toBe(true);

        expect(isStepVisited(0)).toBe(true);
        expect(isStepVisited(1)).toBe(false);
    });

    it('should not remove visited state from later steps when valid = false and resetVisitedOnValidationError = false', async () => {
        component.resetVisitedOnValidationError = false;
        component.step1Visited = true;
        component.step2Visited = true;
        fixture.detectChanges();

        expect(isStepValid(0)).toBe(true);
        expect(isStepValid(1)).toBe(true);

        expect(isStepVisited(0)).toBe(true);
        expect(isStepVisited(1)).toBe(true);

        component.step1Valid = false;
        fixture.detectChanges();

        expect(isStepValid(0)).toBe(false);
        expect(isStepValid(1)).toBe(true);

        expect(isStepVisited(0)).toBe(true);
        expect(isStepVisited(1)).toBe(true);
    });

    describe('visitedChange event', () => {
        let visitedChanged: jasmine.Spy;

        beforeEach(() => {
            visitedChanged = spyOn(fixture.componentInstance, 'visitedChanged');
            fixture.detectChanges();
        });

        it('should trigger a visitedChange event when valid modified on the current step, and other steps ahead are visited', async () => {
            // emulate steps all being visited and complete
            component.step1Visited = true;
            component.step1Completed = true;
            component.step2Visited = true;
            component.step2Completed = true;
            component.step3Visited = true;
            component.step3Completed = true;
            component.step4Visited = true;
            component.step4Completed = true;
            fixture.detectChanges();
            await fixture.whenStable();

            // click next button to make second step active
            await fixture.nativeElement.querySelector(NEXT_BUTTON_SELECTOR).click();
            fixture.detectChanges();
            await fixture.whenStable();

            // set step 2 invalid
            component.step2Valid = false;
            fixture.detectChanges();
            await fixture.whenStable();

            const calls = visitedChanged.calls.all();

            // step 1 should be valid and visited
            expect(isStepValid(0)).toBe(true);
            expect(isStepVisited(0)).toBe(true);

            // step 2 should be invalid and visited
            expect(isStepValid(1)).toBe(false);
            expect(isStepVisited(1)).toBe(true);

            // step 3 should be valid and not visited
            expect(isStepValid(2)).toBe(true);
            expect(isStepVisited(2)).toBe(false);
            expect(calls[0].args).toEqual([2, false]);

            // step 4 should be valid and not visited
            expect(isStepValid(3)).toBe(true);
            expect(isStepVisited(3)).toBe(false);
            expect(calls[1].args).toEqual([3, false]);
        });

        it('should not fire off a visitedChange event when visited is updated directly', async () => {
            // clear initial fire off of visitedChange
            fixture.detectChanges();
            await fixture.whenStable();
            visitedChanged.calls.reset();

            // emulate steps being complete
            component.step1Visited = true;
            component.step2Visited = true;
            component.step3Visited = true;
            component.step4Visited = true;
            fixture.detectChanges();
            await fixture.whenStable();

            const calls = visitedChanged.calls.all();
            expect(calls.length).toBe(0, 'calls.length');
        });
    });

    function isStepVisited(index: number): boolean {
        const stepElements = nativeElement.querySelectorAll('.marquee-wizard-step');
        return stepElements[index].classList.contains('visited');
    }

    function isStepValid(index: number): boolean {
        const stepElements = nativeElement.querySelectorAll('.marquee-wizard-step');
        return !stepElements[index].classList.contains('invalid');
    }
});
