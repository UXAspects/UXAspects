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

class MarqueeWizardTestWrapper<T> {
    nativeElement: HTMLElement;

    constructor(private _fixture: ComponentFixture<T>) {
        this.nativeElement = _fixture.nativeElement;
    }

    isStepVisited(index: number): boolean {
        const stepElements = this.nativeElement.querySelectorAll('.marquee-wizard-step');
        return stepElements[index].classList.contains('visited');
    }

    isStepValid(index: number): boolean {
        const stepElements = this.nativeElement.querySelectorAll('.marquee-wizard-step');
        return !stepElements[index].classList.contains('invalid');
    }

    getStepHeaders(): HTMLElement[] {
        return Array.from(this.nativeElement.querySelectorAll('.marquee-wizard-steps > .marquee-wizard-step'));
    }

    getActiveStepHeader(): HTMLElement {
        return this.nativeElement.querySelector('.marquee-wizard-step.active');
    }

    getContentText(): string {
        return this.nativeElement.querySelector<HTMLElement>('.test-step-content').innerText;
    }

    getStepButtons(): HTMLButtonElement[] {
        return Array.from(this.nativeElement.querySelectorAll('.modal-footer button'));
    }

    getStepButton(buttonText: string): HTMLButtonElement {
        const buttons = this.getStepButtons();
        return buttons.find(button => button.innerText.toUpperCase() === buttonText.toUpperCase());
    }

    async clickStepButton(buttonText: string): Promise<void> {
        const button = this.getStepButton(buttonText);
        if (!button) {
            throw new Error(`Button "${buttonText}" not found`);
        }

        button.click();
        this._fixture.detectChanges();
        return await this._fixture.whenStable();
    }
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
        const container = wrapper.nativeElement.querySelector('.marquee-wizard-description-container');
        const icon = container.querySelector('img');
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

        it('should emit onFinishing and onFinish when "Finish" button is clicked', async () => {
            spyOn(component, 'onFinishing');
            spyOn(component, 'onFinish');

            await wrapper.clickStepButton('Finish');

            expect(component.onFinishing).toHaveBeenCalledTimes(1);
            expect(component.onFinish).toHaveBeenCalledTimes(1);
        });

        it('should change to the first step when "Previous" is clicked', async () => {
            await wrapper.clickStepButton('Previous');

            expect(component.step).toBe(0);
            expect(wrapper.getActiveStepHeader().innerText).toBe('First Step');
            expect(wrapper.getContentText()).toBe('Content of first step');
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
        let steps = wrapper.getStepHeaders();
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

        it('should disable the "Next" button when the step is invalid and ', fakeAsync(async () => {
            await whenStepsLoaded();

            const button = wrapper.getStepButton('Next');

            expect(button.hasAttribute('disabled')).toBeTruthy();
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
