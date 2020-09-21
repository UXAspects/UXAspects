import { Component } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { StepChangingEvent } from './wizard.component';
import { WizardModule } from './wizard.module';

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
    let nativeElement: HTMLElement;

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
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;

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
        expect(getActiveStepHeader()).toBe('First Step');

        await clickNextOrFinish();

        expect(getActiveStepHeader()).toBe('Last Step');
        expect(stepChanging).toHaveBeenCalled();
        expect(stepChange).toHaveBeenCalled();
        expect(onNext).toHaveBeenCalled();
    });

    it('should allow finishing the wizard when no validator has been provided', async () => {
        await clickNextOrFinish();
        await clickNextOrFinish();

        expect(getActiveStepHeader()).toBe('Last Step');
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

        await clickNextOrFinish();

        expect(getActiveStepHeader()).toBe('Last Step');
        expect(stepChanging).toHaveBeenCalledTimes(1);
        expect(stepChange).toHaveBeenCalledTimes(1);
        expect(onNext).toHaveBeenCalledTimes(1);
    });

    it('should prevent proceeding to the next step when a validator function returns false', async () => {
        component.firstStepValidator = () => {
            return false;
        };
        fixture.detectChanges();

        await clickNextOrFinish();

        expect(getActiveStepHeader()).toBe('First Step');
        expect(stepChanging).toHaveBeenCalledTimes(1);
        expect(stepChange).not.toHaveBeenCalled();
        expect(onNext).not.toHaveBeenCalled();
    });

    it('should allow finishing the wizard when a validator function returns true', async () => {
        component.lastStepValidator = () => {
            return true;
        };
        fixture.detectChanges();

        await clickNextOrFinish();
        await clickNextOrFinish();

        expect(onFinishing).toHaveBeenCalled();
        expect(onFinish).toHaveBeenCalled();
    });

    it('should prevent finishing the wizard when a validator function returns false', async () => {
        component.lastStepValidator = () => {
            return false;
        };
        fixture.detectChanges();

        await clickNextOrFinish();
        await clickNextOrFinish();

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

        clickNextOrFinish();
        tick(ASYNC_DURATION);

        expect(getActiveStepHeader()).toBe('Last Step');
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

        clickNextOrFinish();
        tick(ASYNC_DURATION);

        expect(getActiveStepHeader()).toBe('First Step');
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

        clickNextOrFinish();
        tick(1);
        clickNextOrFinish();
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

        clickNextOrFinish();
        tick(1);
        clickNextOrFinish();
        tick(ASYNC_DURATION);

        expect(onFinishing).toHaveBeenCalled();
        expect(onFinish).not.toHaveBeenCalled();
    }));

    async function clickNextOrFinish(): Promise<void> {
        const button = nativeElement.querySelector<HTMLButtonElement>(
            '.wizard-footer .button-primary'
        );
        button.click();
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
        await fixture.whenStable();
    }

    function getActiveStepHeader(): string {
        return nativeElement
            .querySelector<HTMLElement>('.wizard-step.active')
            .innerText.trim();
    }
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
export class WizardValidationComponent {
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
    let component: WizardValidationComponent;
    let fixture: ComponentFixture<WizardValidationComponent>;
    let nativeElement: HTMLElement;
    let visitedChanged: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [WizardModule],
            declarations: [WizardValidationComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WizardValidationComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
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

    it('should not have an invalid appearance when valid = false and visited = false', () => {
        component.step1Visited = true;
        component.step2Visited = false;
        component.step2Valid = false;

        fixture.detectChanges();

        expect(isStepValid(1)).toBe(true);
    });

    it('should have an invalid appearance when valid = false and visited = true', () => {
        component.step1Visited = true;
        component.step2Visited = true;
        component.step2Valid = false;

        fixture.detectChanges();

        expect(isStepValid(1)).toBe(false);
    });

    function isStepVisited(index: number): boolean {
        const stepElements = nativeElement.querySelectorAll('.wizard-step');
        return stepElements[index].classList.contains('visited');
    }

    function isStepValid(index: number): boolean {
        const stepElements = nativeElement.querySelectorAll('.wizard-step');
        return !stepElements[index].classList.contains('invalid');
    }
});
