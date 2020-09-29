import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { StepChangingEvent } from '../wizard';
import { MarqueeWizardTestWrapper } from './marquee-wizard-test-wrapper';
import { MarqueeWizardComponent } from './marquee-wizard.component';
import { MarqueeWizardModule } from './marquee-wizard.module';

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
    @ViewChild(MarqueeWizardComponent) marqueeWizard: MarqueeWizardComponent;

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

describe('Marquee Wizard', () => {
    let component: MarqueeWizardTestComponent;
    let fixture: ComponentFixture<MarqueeWizardTestComponent>;
    let wrapper: MarqueeWizardTestWrapper<MarqueeWizardTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MarqueeWizardModule],
            declarations: [MarqueeWizardTestComponent],
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(MarqueeWizardTestComponent);
        wrapper = new MarqueeWizardTestWrapper(fixture);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    });

    it('should display an icon in the side pane', () => {
        const icon = wrapper.nativeElement.querySelector('.marquee-wizard-description-container img');
        expect(icon).toBeTruthy();
    });

    it('should display a title in the side pane', async(() => {
        const title = wrapper.nativeElement.querySelector<HTMLHeadingElement>('.marquee-title');
        expect(title.innerText).toBe('Marquee Wizard');
    }));

    it('should generate an id for each step', () => {
        const steps = wrapper.getStepHeaders();
        steps.forEach((step, index) => {
            expect(step.id).toMatch(`ux-wizard-[0-9]+-step-${index}-label`);
        });
    });

    it('should display the step headers in the side pane', () => {
        const stepHeaders = wrapper.getStepHeaders();
        expect(stepHeaders.length).toBe(2);
        expect(stepHeaders[0].classList).toContain('active', 'stepHeaders[0]');
        expect(stepHeaders[0].classList).toContain('visited', 'stepHeaders[0]');
        expect(stepHeaders[0].innerText).toBe('First Step', 'stepHeaders[0]');
        expect(stepHeaders[1].classList).not.toContain('active', 'stepHeaders[1]');
        expect(stepHeaders[1].classList).not.toContain('visited', 'stepHeaders[1]');
        expect(stepHeaders[1].innerText).toBe('Second Step', 'stepHeaders[1]');
    });

    it('should display step content', () => {
        expect(wrapper.getContentText()).toBe('Content of first step');
    });

    it('should set visited = true on the first step initially', () => {
        expect(component.steps[0].visited).toBe(true);
        expect(component.steps[1].visited).toBeUndefined();
    });

    it('should have a "Next" button on the first step', () => {
        const buttons = wrapper.getStepButtons();
        expect(buttons.length).toBe(1);
        expect(buttons[0].classList).toContain('button-primary');
        expect(buttons[0].innerText.toUpperCase()).toBe('NEXT');
    });

    it('should change to the second step when "Next" is clicked', async () => {
        await wrapper.clickStepButton('Next');

        expect(component.step).toBe(1);
        expect(wrapper.getActiveStepHeader().innerText).toBe('Second Step');
        expect(wrapper.getContentText()).toBe('Content of second step');
    });

    it('should emit stepChanging, stepChange, and onNext when "Next" is clicked', async () => {
        spyOn(component, 'onStepChanging');
        spyOn(component, 'onStepChange');
        spyOn(component, 'onNext');

        await wrapper.clickStepButton('Next');

        expect(component.onStepChanging).toHaveBeenCalledWith(new StepChangingEvent(0, 1));
        expect(component.onStepChange).toHaveBeenCalledWith(1);
        expect(component.onNext).toHaveBeenCalledWith(1);
    });

    it('should set visited = true on the second step when "Next" is clicked', async () => {
        await wrapper.clickStepButton('Next');

        expect(component.steps[0].visited).toBe(true, 'steps[0]');
        expect(component.steps[1].visited).toBe(true, 'steps[1]');
    });

    it('should set completed = true on the first step when "Next" is clicked', async () => {
        await wrapper.clickStepButton('Next');

        expect(component.steps[0].completed).toBe(true);
        expect(component.steps[1].completed).toBeUndefined();
    });

    describe('on the last step', () => {
        beforeEach(() => {
            component.step = 1;
            fixture.detectChanges();
        });

        it('should display step content', () => {
            expect(wrapper.getContentText()).toBe('Content of second step');
        });

        it('should display the step as active in the side pane', () => {
            expect(wrapper.getActiveStepHeader().innerText).toBe('Second Step');
        });

        it('should have a "Previous" and "Finish" button', () => {
            const buttons = wrapper.getStepButtons();
            expect(buttons.length).toBe(2);
            expect(buttons[0].classList).toContain('button-secondary');
            expect(buttons[0].innerText.toUpperCase()).toBe('PREVIOUS');
            expect(buttons[1].classList).toContain('button-primary');
            expect(buttons[1].innerText.toUpperCase()).toBe('FINISH');
        });

        it('should set visited = true on the step', () => {
            expect(component.steps[1].visited).toBe(true);
        });

        it('should emit onFinishing and onFinish when "Finish" button is clicked', async () => {
            spyOn(component, 'onFinishing');
            spyOn(component, 'onFinish');

            await wrapper.clickStepButton('Finish');

            expect(component.onFinishing).toHaveBeenCalledTimes(1);
            expect(component.onFinish).toHaveBeenCalledTimes(1);
        });

        it('should set completed = true when "Finish" is clicked', async () => {
            await wrapper.clickStepButton('Finish');

            expect(component.steps[1].completed).toBe(true);
        });

        it('should change to the first step when "Previous" is clicked', async () => {
            await wrapper.clickStepButton('Previous');

            expect(component.step).toBe(0);
            expect(wrapper.getActiveStepHeader().innerText).toBe('First Step');
            expect(wrapper.getContentText()).toBe('Content of first step');
            expect(component.steps[0].visited).toBe(true);
        });

        it('should emit stepChanging, stepChange, and onPrevious when "Previous" is clicked', async () => {
            spyOn(component, 'onStepChanging');
            spyOn(component, 'onStepChange');
            spyOn(component, 'onPrevious');

            await wrapper.clickStepButton('Previous');

            expect(component.onStepChanging).toHaveBeenCalledWith(new StepChangingEvent(1, 0));
            expect(component.onStepChange).toHaveBeenCalledWith(0);
            expect(component.onPrevious).toHaveBeenCalledWith(0);
        });

        it('should set the active step to 0 and reset visited state when reset() is called', () => {
            component.marqueeWizard.reset();

            expect(component.step).toBe(0);
            expect(component.steps[0].visited).toBe(true, 'steps[0]');
            expect(component.steps[1].visited).toBe(false, 'steps[1]');
        });
    });

    describe('with cancel button', () => {
        beforeEach(() => {
            component.cancelVisible = true;
            fixture.detectChanges();
        });

        it('should have a cancel button on the first step', () => {
            const buttons = wrapper.getStepButtons();
            expect(buttons.length).toBe(2);
            expect(buttons[0].classList).toContain('button-primary');
            expect(buttons[0].innerText.toUpperCase()).toBe('NEXT');
            expect(buttons[1].classList).toContain('button-secondary');
            expect(buttons[1].innerText.toUpperCase()).toBe('CANCEL');
        });

        it('should emit onCancel when the "Cancel" button is clicked', async () => {
            spyOn(component, 'onCancel');

            await wrapper.clickStepButton('Cancel');

            expect(component.onCancel).toHaveBeenCalledTimes(1);
        });
    });
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
export class MarqueeWizardAsyncTestComponent implements OnDestroy {
    step = 0;
    steps: StepDefinition[] = [];
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
    let component: MarqueeWizardAsyncTestComponent;
    let fixture: ComponentFixture<MarqueeWizardAsyncTestComponent>;
    let wrapper: MarqueeWizardTestWrapper<MarqueeWizardAsyncTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MarqueeWizardModule],
            declarations: [MarqueeWizardAsyncTestComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MarqueeWizardAsyncTestComponent);
        wrapper = new MarqueeWizardTestWrapper(fixture);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should have no steps initially', () => {
        const steps = wrapper.getStepHeaders();
        expect(steps.length).toBe(0);
    });

    it('should display steps after asynchronous load', fakeAsync(async () => {
        await whenStepsLoaded();

        const stepHeaders = wrapper.getStepHeaders();
        expect(stepHeaders.length).toBe(2);
        expect(stepHeaders[0].innerText).toBe('First Step');
        expect(stepHeaders[1].innerText).toBe('Second Step');

        expect(component.step).toBe(0);
        expect(wrapper.getContentText()).toBe('Content of first step');
    }));

    it('should navigate to the second step when clicking "Next"', fakeAsync(async () => {
        await whenStepsLoaded();

        await wrapper.clickStepButton('Next');

        expect(component.step).toBe(1);
        expect(wrapper.getContentText()).toBe('Content of second step');
    }));

    describe('with disableNextWhenInvalid = true', () => {
        beforeEach(() => {
            component.disableNextWhenInvalid = true;
            component.valid = false;
            fixture.detectChanges();
        });

        it('should disable the "Next" button when the step is invalid', fakeAsync(async () => {
            await whenStepsLoaded();

            const button = wrapper.getStepButton('Next');

            expect(button.hasAttribute('disabled')).toBe(true);
        }));
    });

    async function whenStepsLoaded(): Promise<void> {
        tick(200);
        fixture.detectChanges();
        await fixture.whenStable();

        // tick() operator requires a second round of change detection
        fixture.detectChanges();
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
export class MarqueeWizardValidationTestComponent {
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
    let component: MarqueeWizardValidationTestComponent;
    let fixture: ComponentFixture<MarqueeWizardValidationTestComponent>;
    let wrapper: MarqueeWizardTestWrapper<MarqueeWizardValidationTestComponent>;
    let visitedChanged: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MarqueeWizardModule],
            declarations: [MarqueeWizardValidationTestComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MarqueeWizardValidationTestComponent);
        wrapper = new MarqueeWizardTestWrapper(fixture);
        component = fixture.componentInstance;
        visitedChanged = spyOn(fixture.componentInstance, 'visitedChanged');
        fixture.detectChanges();
    });

    it('should remove visited state from later steps when valid = false', () => {
        // 3 steps and number 2 gets set invalid - 1 should stay the same, 3 should be valid but no longer be visited
        component.step1Visited = true;
        component.step2Visited = true;
        component.step3Visited = true;
        fixture.detectChanges();

        expect(wrapper.isStepValid(0)).toBe(true);
        expect(wrapper.isStepValid(1)).toBe(true);
        expect(wrapper.isStepValid(2)).toBe(true);

        expect(wrapper.isStepVisited(0)).toBe(true);
        expect(wrapper.isStepVisited(1)).toBe(true);
        expect(wrapper.isStepVisited(2)).toBe(true);

        component.step2Valid = false;
        fixture.detectChanges();

        expect(wrapper.isStepValid(0)).toBe(true);
        expect(wrapper.isStepValid(1)).toBe(false);
        expect(wrapper.isStepValid(2)).toBe(true);

        expect(wrapper.isStepVisited(0)).toBe(true);
        expect(wrapper.isStepVisited(1)).toBe(true);
        expect(wrapper.isStepVisited(2)).toBe(false);

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

        expect(wrapper.isStepValid(0)).toBe(true);
        expect(wrapper.isStepValid(1)).toBe(true);
        expect(wrapper.isStepValid(2)).toBe(true);

        expect(wrapper.isStepVisited(0)).toBe(true);
        expect(wrapper.isStepVisited(1)).toBe(true);
        expect(wrapper.isStepVisited(2)).toBe(true);

        component.step2Valid = false;
        fixture.detectChanges();

        expect(wrapper.isStepValid(0)).toBe(true);
        expect(wrapper.isStepValid(1)).toBe(false);
        expect(wrapper.isStepValid(2)).toBe(true);

        expect(wrapper.isStepVisited(0)).toBe(true);
        expect(wrapper.isStepVisited(1)).toBe(true);
        expect(wrapper.isStepVisited(2)).toBe(true);

        expect(component.step1Visited).toBe(true);
        expect(component.step2Visited).toBe(true);
        expect(component.step3Visited).toBe(true);

        // check visitedChange was not emitted
        expect(visitedChanged.calls.all().length).toBe(0);
    });
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

@Component({
    selector: 'marquee-wizard-step-navigation-app',
    template: `
        <ux-marquee-wizard
            [(step)]="currentStep"
            (stepChange)="onStepChange($event)"
            [sequential]="sequential">
            <ux-marquee-wizard-step
                header="Step One"
                [(visited)]="step1Visited"
                [valid]="step1Valid"
                [(completed)]="step1Completed"
                (visitedChange)="visitedChanged(0, $event)"
                (completedChange)="completedChange(0, $event)">
                Step One Content
            </ux-marquee-wizard-step>
            <ux-marquee-wizard-step
                header="Step Two"
                [(visited)]="step2Visited"
                [valid]="step2Valid"
                (visitedChange)="visitedChanged(1, $event)"
                (completedChange)="completedChange(1, $event)"
                [(completed)]="step2Completed">
                Step Two Content
            </ux-marquee-wizard-step>
            <ux-marquee-wizard-step
                header="Step Three"
                [(visited)]="step3Visited"
                [valid]="step3Valid"
                [(completed)]="step3Completed"
                (visitedChange)="visitedChanged(2, $event)"
                (completedChange)="completedChange(2, $event)">
                Step Three Content
            </ux-marquee-wizard-step>
        </ux-marquee-wizard>
    `
})
export class MarqueeWizardStepNavigationComponent {
    currentStep: number;
    sequential: boolean = true;
    onStepChange(_: number): void {}

    // step 1 values
    step1Valid: boolean = true;
    step1Visited: boolean = true;
    step1Completed: boolean = false;

    // step 2 values
    step2Valid: boolean = true;
    step2Visited: boolean = true;
    step2Completed: boolean = false;

    // step 3 values
    step3Valid: boolean = true;
    step3Visited: boolean = true;
    step3Completed: boolean = false;

    visitedChanged(index: number, value: boolean): void {}
    completedChange(index: number, value: boolean): void {}

}

describe('Marquee wizard with step navigation', () => {
    let component: MarqueeWizardStepNavigationComponent;
    let fixture: ComponentFixture<MarqueeWizardStepNavigationComponent>;
    let nativeElement: HTMLElement;
    let visitedChanged: jasmine.Spy;
    let completedChange: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MarqueeWizardModule],
            declarations: [MarqueeWizardStepNavigationComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MarqueeWizardStepNavigationComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        visitedChanged = spyOn(fixture.componentInstance, 'visitedChanged');
        completedChange = spyOn(fixture.componentInstance, 'completedChange');
        fixture.detectChanges();
    });

    describe('[sequential]=false', () => {
        it('should allow navigation to any step and emit stepChange on click', async () => {
            component.sequential = false;

            component.step1Visited = true;
            component.step2Visited = false;
            component.step3Visited = false;

            expect(isStepVisited(0)).toBe(true);
            spyOn(component, 'onStepChange');

            fixture.detectChanges();
            await clickStep(2);

            expect(component.step1Visited).toBe(true);
            expect(component.step2Visited).toBe(false);
            expect(isStepVisited(2)).toBe(true);
            expect(component.onStepChange).toHaveBeenCalledWith(2);

            expect(component.step1Completed).toBe(true);
            expect(component.step2Completed).toBe(false);
            expect(component.step3Completed).toBe(false);
        });

        it('should mark a step as visited when navigating to a step', async () => {
            component.sequential = false;

            component.step1Visited = false;
            component.step2Visited = true;
            component.step3Visited = false;

            expect(isStepVisited(1)).toBe(true);

            fixture.detectChanges();
            await clickStep(0);

            expect(component.step1Visited).toBe(true);
            expect(component.step2Visited).toBe(true);
            expect(component.step3Visited).toBe(false);
        });

        it('should allow navigation away from an invalid step', async () => {
            component.sequential = false;

            component.step1Visited = true;
            component.step3Visited = true;
            component.step3Valid = false;

            fixture.detectChanges();
            expect(isStepValid(2)).toBe(false);

            await clickStep(1);

            expect(component.step2Visited).toBe(true);
        });

        it('should emit visitedChange when navigating to a step', async () => {
            component.sequential = false;

            component.step1Valid = true;
            component.step1Visited = true;
            component.step1Completed = true;

            component.step3Visited = false;

            fixture.detectChanges();
            await clickStep(2);

            expect(visitedChanged).toHaveBeenCalled();
        });

        it('should emit completedChange when step is completed', async () => {
            component.sequential = false;

            component.step1Valid = true;
            component.step1Visited = true;
            component.step1Completed = true;

            fixture.detectChanges();
            await clickStep(1);

            expect(completedChange).toHaveBeenCalled();
        });

    });

    function getSteps(): HTMLElement[] {
        return Array.from(nativeElement.querySelectorAll('.marquee-wizard-step'));
    }

    async function clickStep(index: number) {
        const steps = getSteps();
        steps[index].click();
        fixture.detectChanges();
        await fixture.whenStable();
    }

    function isStepVisited(index: number): boolean {
        const stepElements = nativeElement.querySelectorAll('.marquee-wizard-step');
        return stepElements[index].classList.contains('visited');
    }

    function isStepValid(index: number): boolean {
        const stepElements = nativeElement.querySelectorAll('.marquee-wizard-step');
        return !stepElements[index].classList.contains('invalid');
    }

});
