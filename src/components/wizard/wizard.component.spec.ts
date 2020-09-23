import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { WizardTestWrapper } from './wizard-test-wrapper';
import { StepChangingEvent, WizardComponent } from './wizard.component';
import { WizardModule } from './wizard.module';

interface StepDefinition {
    title: string;
    content?: string;
    visited?: boolean;
}

/**
 * Test navigation and steps display correctly
 */
@Component({
    selector: 'wizard-test-app',
    template: `
        <ux-wizard
            [(step)]="step"
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
            <ux-wizard-step
                *ngFor="let step of steps"
                [header]="step.title"
                [(visited)]="step.visited"
            >
                <p class="test-step-content">{{ step.content }}</p>
            </ux-wizard-step>
        </ux-wizard>
    `,
})
export class WizardTestComponent {
    @ViewChild(WizardComponent) wizard: WizardComponent;

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

describe('Wizard', () => {
    let component: WizardTestComponent;
    let fixture: ComponentFixture<WizardTestComponent>;
    let wrapper: WizardTestWrapper<WizardTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [WizardModule],
            declarations: [WizardTestComponent],
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(WizardTestComponent);
        wrapper = new WizardTestWrapper(fixture);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    });

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
            component.wizard.reset();

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

@Component({
    selector: 'wizard-async-validation-test-app',
    template: `
        <ux-wizard
            (stepChanging)="stepChanging($event)"
            (stepChange)="stepChange($event)"
            (onNext)="onNext($event)"
            (onFinishing)="onFinishing()"
            (onFinish)="onFinish()"
        >
            <ux-wizard-step
                header="First Step"
                [validator]="firstStepValidator"
            >
                <p>First Step</p>
            </ux-wizard-step>
            <ux-wizard-step header="Last Step" [validator]="lastStepValidator">
                <p>Last Step</p>
            </ux-wizard-step>
        </ux-wizard>
    `
})
export class WizardAsyncValidationTestComponent {
    firstStepValidator: () => boolean | Promise<boolean>;
    lastStepValidator: () => boolean | Promise<boolean>;
    stepChanging(_: StepChangingEvent) {}
    stepChange(_: number) {}
    onNext(_: number) {}
    onFinishing() {}
    onFinish() {}
}

describe('Wizard with validator', () => {
    const ASYNC_DURATION = 100;

    let component: WizardAsyncValidationTestComponent;
    let fixture: ComponentFixture<WizardAsyncValidationTestComponent>;
    let wrapper: WizardTestWrapper<WizardAsyncValidationTestComponent>;

    let stepChanging: jasmine.Spy;
    let stepChange: jasmine.Spy;
    let onNext: jasmine.Spy;
    let onFinishing: jasmine.Spy;
    let onFinish: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [WizardModule],
            declarations: [WizardAsyncValidationTestComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(WizardAsyncValidationTestComponent);
        wrapper = new WizardTestWrapper(fixture);
        component = fixture.componentInstance;

        stepChanging = spyOn(component, 'stepChanging');
        stepChange = spyOn(component, 'stepChange');
        onNext = spyOn(component, 'onNext');
        onFinishing = spyOn(component, 'onFinishing');
        onFinish = spyOn(component, 'onFinish');

        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should allow proceeding to the next step when no validator has been provided', async () => {
        expect(wrapper.getActiveStepHeader().innerText).toBe('First Step');

        await wrapper.clickStepButton('Next');

        expect(wrapper.getActiveStepHeader().innerText).toBe('Last Step');
        expect(stepChanging).toHaveBeenCalled();
        expect(stepChange).toHaveBeenCalled();
        expect(onNext).toHaveBeenCalled();
    });

    it('should allow finishing the wizard when no validator has been provided', async () => {
        await wrapper.clickStepButton('Next');
        await wrapper.clickStepButton('Finish');

        expect(wrapper.getActiveStepHeader().innerText).toBe('Last Step');
        expect(stepChanging).toHaveBeenCalledTimes(1);
        expect(stepChange).toHaveBeenCalledTimes(1);
        expect(onNext).toHaveBeenCalledTimes(1);
        expect(onFinishing).toHaveBeenCalledTimes(1);
        expect(onFinish).toHaveBeenCalledTimes(1);
    });

    it('should allow proceeding to the next step when a validator function returns true', async () => {
        component.firstStepValidator = () => {
            return true;
        };
        fixture.detectChanges();

        await wrapper.clickStepButton('Next');

        expect(wrapper.getActiveStepHeader().innerText).toBe('Last Step');
        expect(stepChanging).toHaveBeenCalledTimes(1);
        expect(stepChange).toHaveBeenCalledTimes(1);
        expect(onNext).toHaveBeenCalledTimes(1);
    });

    it('should prevent proceeding to the next step when a validator function returns false', async () => {
        component.firstStepValidator = () => {
            return false;
        };
        fixture.detectChanges();

        await wrapper.clickStepButton('Next');

        expect(wrapper.getActiveStepHeader().innerText).toBe('First Step');
        expect(stepChanging).toHaveBeenCalledTimes(1);
        expect(stepChange).not.toHaveBeenCalled();
        expect(onNext).not.toHaveBeenCalled();
    });

    it('should allow finishing the wizard when a validator function returns true', async () => {
        component.lastStepValidator = () => {
            return true;
        };
        fixture.detectChanges();

        await wrapper.clickStepButton('Next');
        await wrapper.clickStepButton('Finish');

        expect(onFinishing).toHaveBeenCalled();
        expect(onFinish).toHaveBeenCalled();
    });

    it('should prevent finishing the wizard when a validator function returns false', async () => {
        component.lastStepValidator = () => {
            return false;
        };
        fixture.detectChanges();

        await wrapper.clickStepButton('Next');
        await wrapper.clickStepButton('Finish');

        expect(onFinishing).toHaveBeenCalled();
        expect(onFinish).not.toHaveBeenCalled();
    });

    it('should allow proceeding to the next step when a validator function returns true in a promise', fakeAsync(() => {
        component.firstStepValidator = () => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(true);
                }, ASYNC_DURATION);
            });
        };
        fixture.detectChanges();

        wrapper.clickStepButton('Next');
        tick(ASYNC_DURATION);
        fixture.detectChanges();

        expect(wrapper.getActiveStepHeader().innerText).toBe('Last Step');
        expect(stepChanging).toHaveBeenCalled();
        expect(stepChange).toHaveBeenCalled();
        expect(onNext).toHaveBeenCalled();
    }));

    it('should prevent proceeding to the next step when a validator function returns false in a promise', fakeAsync(() => {
        component.firstStepValidator = () => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(false);
                }, ASYNC_DURATION);
            });
        };
        fixture.detectChanges();

        wrapper.clickStepButton('Next');
        tick(ASYNC_DURATION);

        expect(wrapper.getActiveStepHeader().innerText).toBe('First Step');
        expect(stepChanging).toHaveBeenCalled();
        expect(stepChange).not.toHaveBeenCalled();
        expect(onNext).not.toHaveBeenCalled();
    }));

    it('should allow finishing the wizard when a validator function returns true in a promise', fakeAsync(() => {
        component.lastStepValidator = () => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(true);
                }, ASYNC_DURATION);
            });
        };
        fixture.detectChanges();

        wrapper.clickStepButton('Next');
        tick(1);
        wrapper.clickStepButton('Finish');
        tick(ASYNC_DURATION);

        expect(onFinishing).toHaveBeenCalled();
        expect(onFinish).toHaveBeenCalled();
    }));

    it('should prevent finishing the wizard when a validator function returns false in a promise', fakeAsync(() => {
        component.lastStepValidator = () => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(false);
                }, ASYNC_DURATION);
            });
        };
        fixture.detectChanges();

        wrapper.clickStepButton('Next');
        tick(1);
        wrapper.clickStepButton('Finish');
        tick(ASYNC_DURATION);

        expect(onFinishing).toHaveBeenCalled();
        expect(onFinish).not.toHaveBeenCalled();
    }));
});

/**
 * Test resetVisitedOnValidationError flag working as expected and visitedChange is hit when required.
 **/
@Component({
    selector: 'marquee-wizard-validation-app',
    template: `
        <ux-wizard
            [(step)]="currentStep"
            [resetVisitedOnValidationError]="resetVisitedOnValidationError">
            <ux-wizard-step
                header="Step One"
                [valid]="step1Valid"
                [(visited)]="step1Visited"
                (visitedChange)="visitedChanged(0, $event)">
                Step One Content
            </ux-wizard-step>
            <ux-wizard-step
                header="Step Two"
                [valid]="step2Valid"
                [(visited)]="step2Visited"
                (visitedChange)="visitedChanged(1, $event)">
                Step Two Content
            </ux-wizard-step>
            <ux-wizard-step
                header="Step Three"
                [valid]="step3Valid"
                [(visited)]="step3Visited"
                (visitedChange)="visitedChanged(2, $event)">
                Step Three Content
            </ux-wizard-step>
        </ux-wizard>
    `
})
export class WizardValidationTestComponent {
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

    visitedChanged(index: number, value: boolean): void {
    }
}

describe('Wizard with validation', () => {
    let component: WizardValidationTestComponent;
    let fixture: ComponentFixture<WizardValidationTestComponent>;
    let wrapper: WizardTestWrapper<WizardValidationTestComponent>;
    let visitedChanged: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [WizardModule],
            declarations: [WizardValidationTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WizardValidationTestComponent);
        wrapper = new WizardTestWrapper(fixture);
        component = fixture.componentInstance;
        visitedChanged = spyOn(fixture.componentInstance, 'visitedChanged');
        fixture.detectChanges();
    });

    it('should remove visited state from later steps when valid = false', () => {
        // has to be set manually as false as default
        component.resetVisitedOnValidationError = true;

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

    it('should not have an invalid appearance when valid = false and visited = false', () => {
        component.step1Visited = true;
        component.step2Visited = false;
        component.step2Valid = false;

        fixture.detectChanges();

        expect(wrapper.isStepValid(1)).toBe(true);
    });

    it('should have an invalid appearance when valid = false and visited = true', () => {
        component.step1Visited = true;
        component.step2Visited = true;
        component.step2Valid = false;

        fixture.detectChanges();

        expect(wrapper.isStepValid(1)).toBe(false);
    });
});
