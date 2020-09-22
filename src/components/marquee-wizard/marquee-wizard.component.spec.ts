import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MarqueeWizardModule } from './marquee-wizard.module';
import { StepChangingEvent } from '../wizard';

interface StepDefinition {
    title: string;
    content?: string;
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
            [(step)]="step"
            [description]="description"
            [previousVisible]="step !== 0"
            [cancelVisible]="cancelVisible"
            (stepChanging)="onStepChanging($event)"
            (stepChange)="onStepChange($event)"
            (onNext)="onNext($event)"
            (onPrevious)="onPrevious($event)"
            (onFinishing)="onFinishing()"
            (onFinish)="onFinish()"
            (onCancel)="onCancel()"
        >
            <ng-template #description>
                <img
                    alt="Icon"
                    src="https://pages.github.houston.softwaregrp.net/caf/ux-aspects-micro-focus/docs/app/assets/img/marquee-wizard-icon.svg"
                />

                <h3 class="marquee-title">Marquee Wizard</h3>
            </ng-template>

            <ux-marquee-wizard-step
                *ngFor="let step of steps"
                [header]="step.title"
                [(visited)]="step.visited"
                [(completed)]="step.completed"
            >
                <p class="test-step-content">{{ step.content }}</p>
            </ux-marquee-wizard-step>
        </ux-marquee-wizard>
    `,
})
export class MarqueeWizardTestComponent {
    step: number = 0;

    steps: StepDefinition[] = [
        { title: 'First Step', content: 'Content of first step' },
        { title: 'Second Step', content: 'Content of second step' },
    ];

    cancelVisible = false;

    onStepChanging(_: StepChangingEvent): void {}
    onStepChange(_: number): void {}
    onNext(_: number): void {}
    onPrevious(_: number): void {}
    onFinishing(): void {}
    onFinish(): void {}
    onCancel(): void {}
}

fdescribe('Marquee Wizard', () => {
    let component: MarqueeWizardTestComponent;
    let fixture: ComponentFixture<MarqueeWizardTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MarqueeWizardModule],
            declarations: [MarqueeWizardTestComponent],
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(MarqueeWizardTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    });

    it('should display an icon in the side pane', () => {
        const container = nativeElement.querySelector('.marquee-wizard-description-container');
        const icon = container.querySelector('img');
        expect(icon).toBeTruthy();
    });

    it('should display a title in the side pane', async(() => {
        const title = nativeElement.querySelector<HTMLHeadingElement>('.marquee-title');
        expect(title.innerText).toBe('Marquee Wizard');
    }));

    it('should generate an id for each step', () => {
        const steps = getStepHeaders();
        steps.forEach((step, index) => {
            expect(step.id).toMatch(`ux-wizard-[0-9]+-step-${index}-label`);
        });
    });

    it('should display the step headers in the side pane', () => {
        const stepHeaders = getStepHeaders();
        expect(stepHeaders.length).toBe(2);
        expect(stepHeaders[0].classList).toContain('active', 'stepHeaders[0]');
        expect(stepHeaders[0].classList).toContain('visited', 'stepHeaders[0]');
        expect(stepHeaders[0].innerText).toBe('First Step', 'stepHeaders[0]');
        expect(stepHeaders[1].classList).not.toContain('active', 'stepHeaders[1]');
        expect(stepHeaders[1].classList).not.toContain('visited', 'stepHeaders[1]');
        expect(stepHeaders[1].innerText).toBe('Second Step', 'stepHeaders[1]');
    });

    it('should display step content', () => {
        expect(getContentText()).toBe('Content of first step');
    });

    it('should have a "Next" button on the first step', () => {
        const buttons = getStepButtons();
        expect(buttons.length).toBe(1);
        expect(buttons[0].classList).toContain('button-primary');
        expect(buttons[0].innerText.toUpperCase()).toBe('NEXT');
    });

    it('should change to the second step when "Next" is clicked', async () => {
        await clickStepButton('Next');

        expect(component.step).toBe(1);
        expect(getActiveStepHeader().innerText).toBe('Second Step');
        expect(getContentText()).toBe('Content of second step');
    });

    it('should emit stepChanging, stepChange, and onNext when "Next" is clicked', async () => {
        spyOn(component, 'onStepChanging');
        spyOn(component, 'onStepChange');
        spyOn(component, 'onNext');

        await clickStepButton('Next');

        expect(component.onStepChanging).toHaveBeenCalledWith(new StepChangingEvent(0, 1));
        expect(component.onStepChange).toHaveBeenCalledWith(1);
        expect(component.onNext).toHaveBeenCalledWith(1);
    });

    describe('on the last step', () => {
        beforeEach(() => {
            component.step = 1;
            fixture.detectChanges();
        });

        it('should display step content', () => {
            expect(getContentText()).toBe('Content of second step');
        });

        it('should display the step as active in the side pane', () => {
            expect(getActiveStepHeader().innerText).toBe('Second Step');
        });

        it('should have a "Previous" and "Finish" button', () => {
            const buttons = getStepButtons();
            expect(buttons.length).toBe(2);
            expect(buttons[0].classList).toContain('button-secondary');
            expect(buttons[0].innerText.toUpperCase()).toBe('PREVIOUS');
            expect(buttons[1].classList).toContain('button-primary');
            expect(buttons[1].innerText.toUpperCase()).toBe('FINISH');
        });

        it('should emit onFinishing and onFinish when "Finish" button is clicked', async () => {
            spyOn(component, 'onFinishing');
            spyOn(component, 'onFinish');

            await clickStepButton('Finish');

            expect(component.onFinishing).toHaveBeenCalledTimes(1);
            expect(component.onFinish).toHaveBeenCalledTimes(1);
        });

        it('should change to the first step when "Previous" is clicked', async () => {
            await clickStepButton('Previous');

            expect(component.step).toBe(0);
            expect(getActiveStepHeader().innerText).toBe('First Step');
            expect(getContentText()).toBe('Content of first step');
        });

        it('should emit stepChanging, stepChange, and onPrevious when "Previous" is clicked', async () => {
            spyOn(component, 'onStepChanging');
            spyOn(component, 'onStepChange');
            spyOn(component, 'onPrevious');

            await clickStepButton('Previous');

            expect(component.onStepChanging).toHaveBeenCalledWith(new StepChangingEvent(1, 0));
            expect(component.onStepChange).toHaveBeenCalledWith(0);
            expect(component.onPrevious).toHaveBeenCalledWith(0);
        });
    });

    describe('with cancel button', () => {
        beforeEach(() => {
            component.cancelVisible = true;
            fixture.detectChanges();
        });

        it('should have a cancel button on the first step', () => {
            const buttons = getStepButtons();
            expect(buttons.length).toBe(2);
            expect(buttons[0].classList).toContain('button-primary');
            expect(buttons[0].innerText.toUpperCase()).toBe('NEXT');
            expect(buttons[1].classList).toContain('button-secondary');
            expect(buttons[1].innerText.toUpperCase()).toBe('CANCEL');
        });

        it('should emit onCancel when the "Cancel" button is clicked', async () => {
            spyOn(component, 'onCancel');

            await clickStepButton('Cancel');

            expect(component.onCancel).toHaveBeenCalledTimes(1);
        });
    });

    function getStepHeaders(): HTMLElement[] {
        return Array.from(nativeElement.querySelectorAll('.marquee-wizard-steps > .marquee-wizard-step'));
    }

    function getActiveStepHeader(): HTMLElement {
        return nativeElement.querySelector('.marquee-wizard-step.active');
    }

    function getStepButtons(): HTMLButtonElement[] {
        return Array.from(nativeElement.querySelectorAll('.modal-footer button'));
    }

    function getContentText(): string {
        return nativeElement.querySelector<HTMLElement>('.test-step-content').innerText;
    }

    async function clickStepButton(buttonText: string): Promise<void> {
        const buttons = getStepButtons();
        const button = buttons.find((b) => b.innerText.toUpperCase() === buttonText.toUpperCase());
        if (!button) {
            throw new Error(`Button "${buttonText}" not found on step ${component.step}`);
        }

        button.click();
        fixture.detectChanges();
        return await fixture.whenStable();
    }
});

/**
 * Test for EL-3790 where an error can occur if steps rely on request response
 */
@Component({
    selector: 'marquee-wizard-ngfor-app',
    template: `
        <ux-marquee-wizard [(step)]="step">
            <ux-marquee-wizard-step
                *ngFor="let step of steps"
                [header]="step.title"
                [valid]="valid"
                [disableNextWhenInvalid]="disableNextWhenInvalid"
            >
                <p class="test-step-content">{{ step.content }}</p>
            </ux-marquee-wizard-step>
        </ux-marquee-wizard>
    `,
})
export class MarqueeWizardNgForComponent implements OnDestroy {
    step = 0;
    steps: { title: string; content: string }[] = [];
    valid: boolean = true;
    disableNextWhenInvalid: boolean;
    private _timeout: number;

    constructor(changeDetector: ChangeDetectorRef) {
        this._timeout = window.setTimeout(() => {
            this.steps = [
                { title: 'First Step', content: 'Content of first step' },
                { title: 'Second Step', content: 'Content of second step' },
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
            declarations: [MarqueeWizardNgForComponent],
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
        expect(steps[0].querySelector<HTMLElement>('.marquee-wizard-step-title').innerText).toBe('First Step');
        expect(steps[1].querySelector<HTMLElement>('.marquee-wizard-step-title').innerText).toBe('Second Step');

        expect(component.step).toBe(0);
        expect(getContentText()).toContain('Content of first step');
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

        const button = nativeElement.querySelector<HTMLButtonElement>('.modal-footer .button-primary');

        expect(button.hasAttribute('disabled')).toBeTruthy();
    }));

    async function whenStepsLoaded(): Promise<void> {
        tick(200);
        fixture.detectChanges();
        await fixture.whenStable();

        // tick() operator requires a second round of change detection
        fixture.detectChanges();
    }

    function getSteps(): NodeListOf<HTMLUListElement> {
        return nativeElement.querySelectorAll<HTMLUListElement>('.marquee-wizard-step');
    }

    function getContentText(): string {
        return nativeElement.querySelector<HTMLElement>('.test-step-content').innerText;
    }

    async function clickNext(): Promise<void> {
        const nextButton = nativeElement.querySelector<HTMLButtonElement>('.modal-footer .button-primary');
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
        <ux-marquee-wizard [(step)]="currentStep" [resetVisitedOnValidationError]="resetVisitedOnValidationError">
            <ux-marquee-wizard-step
                header="Step One"
                [valid]="step1Valid"
                [(visited)]="step1Visited"
                [(completed)]="step1Completed"
                (visitedChange)="visitedChanged(0, $event)"
            >
                Step One Content
            </ux-marquee-wizard-step>
            <ux-marquee-wizard-step
                header="Step Two"
                [valid]="step2Valid"
                [(visited)]="step2Visited"
                [(completed)]="step2Completed"
                (visitedChange)="visitedChanged(1, $event)"
            >
                Step Two Content
            </ux-marquee-wizard-step>
            <ux-marquee-wizard-step
                header="Step Three"
                [valid]="step3Valid"
                [(visited)]="step3Visited"
                [(completed)]="step3Completed"
                (visitedChange)="visitedChanged(2, $event)"
            >
                Step Three Content
            </ux-marquee-wizard-step>
        </ux-marquee-wizard>
    `,
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

    visitedChanged(index: number, value: boolean): void {}
}

describe('Marquee wizard with validation', () => {
    let component: MarqueeWizardValidationComponent;
    let fixture: ComponentFixture<MarqueeWizardValidationComponent>;
    let nativeElement: HTMLElement;
    let visitedChanged: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MarqueeWizardModule],
            declarations: [MarqueeWizardValidationComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MarqueeWizardValidationComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        visitedChanged = spyOn(fixture.componentInstance, 'visitedChanged');
        fixture.detectChanges();
    });

    it('should remove visited state from later steps when valid = false', () => {
        // 3 steps and number 2 gets set invalid - 1 should stay the same, 3 should be valid but no longer be visited
        component.step1Visited = true;
        component.step2Visited = true;
        component.step3Visited = true;
        fixture.detectChanges();

        expect(isStepValid(0)).toBe(true);
        expect(isStepValid(1)).toBe(true);
        expect(isStepValid(2)).toBe(true);

        expect(isStepVisited(0)).toBe(true);
        expect(isStepVisited(1)).toBe(true);
        expect(isStepVisited(2)).toBe(true);

        component.step2Valid = false;
        fixture.detectChanges();

        expect(isStepValid(0)).toBe(true);
        expect(isStepValid(1)).toBe(false);
        expect(isStepValid(2)).toBe(true);

        expect(isStepVisited(0)).toBe(true);
        expect(isStepVisited(1)).toBe(true);
        expect(isStepVisited(2)).toBe(false);

        expect(component.step1Visited).toBe(true);
        expect(component.step2Visited).toBe(true);
        expect(component.step3Visited).toBe(false);

        // check visitedChange was emitted 1 time only
        expect(visitedChanged.calls.all().length).toBe(1);
    });

    it('should not remove visited state from later steps when valid = false and resetVisitedOnValidationError = false', () => {
        component.resetVisitedOnValidationError = false;
        component.step1Visited = true;
        component.step2Visited = true;
        component.step3Visited = true;
        fixture.detectChanges();

        expect(isStepValid(0)).toBe(true);
        expect(isStepValid(1)).toBe(true);
        expect(isStepValid(2)).toBe(true);

        expect(isStepVisited(0)).toBe(true);
        expect(isStepVisited(1)).toBe(true);
        expect(isStepVisited(2)).toBe(true);

        component.step2Valid = false;
        fixture.detectChanges();

        expect(isStepValid(0)).toBe(true);
        expect(isStepValid(1)).toBe(false);
        expect(isStepValid(2)).toBe(true);

        expect(isStepVisited(0)).toBe(true);
        expect(isStepVisited(1)).toBe(true);
        expect(isStepVisited(2)).toBe(true);

        expect(component.step1Visited).toBe(true);
        expect(component.step2Visited).toBe(true);
        expect(component.step3Visited).toBe(true);

        // check visitedChange was not emitted
        expect(visitedChanged.calls.all().length).toBe(0);
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

/**
 * Custom step template
 */
@Component({
    selector: 'marquee-wizard-custom-step',
    template: `
        <ux-marquee-wizard [stepTemplate]="stepTemplate">
            <ng-template #stepTemplate let-step let-index="index" let-context="context">
                {{ index }}. {{ step.header }} ({{ context.count }})
            </ng-template>

            <ux-marquee-wizard-step header="Step One" [context]="{ count: 123 }"> </ux-marquee-wizard-step>

            <ux-marquee-wizard-step header="Step Two" [context]="{ count: 456 }"> </ux-marquee-wizard-step>
        </ux-marquee-wizard>
    `,
})
export class MarqueeWizardCustomStepTemplateComponent {}

describe('Marquee wizard with custom step template', () => {
    let component: MarqueeWizardCustomStepTemplateComponent;
    let fixture: ComponentFixture<MarqueeWizardCustomStepTemplateComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MarqueeWizardModule],
            declarations: [MarqueeWizardCustomStepTemplateComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MarqueeWizardCustomStepTemplateComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    }));

    it('should display the custom step template with the correct context', () => {
        const steps = nativeElement.querySelectorAll('.marquee-wizard-step');
        expect(steps.item(0).textContent.trim()).toBe('0. Step One (123)');
        expect(steps.item(1).textContent.trim()).toBe('1. Step Two (456)');
    });
});
