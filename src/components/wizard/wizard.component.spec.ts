import { CommonModule } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import {
    async,
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick
} from '@angular/core/testing';
import { WizardStepComponent } from './wizard-step.component';
import { StepChangingEvent } from './wizard.component';
import { WizardModule } from './wizard.module';

const NEXT_BUTTON_SELECTOR = '.wizard-footer .button-primary';

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

interface WizardStep {
    header: string;
    content: string;
    visited?: boolean;
    valid?: boolean;
}

@Component({
    selector: 'wizard-visited-change-test-app',
    template: `
        <ux-wizard>
            <ux-wizard-step *ngFor="let step of steps; let index = index"
                [header]="step.header"
                [(valid)]="step.valid"
                [(visited)]="step.visited"
                (visitedChange)="visitedChanged(index, $event)"
            >
                <p>{{ step.content }}</p>
            </ux-wizard-step>
        </ux-wizard>
    `
})
class WizardVisitedChangeTestComponent {
    steps: WizardStep[] = [
        {
            header: '1. First Step',
            content: 'Content of step 1.',
            valid: true
        },
        {
            header: '2. Second Step',
            content: 'Content of step 2.',
            valid: true
        },
        {
            header: '3. Third Step',
            content: 'Content of step 3.',
            valid: true
        },
        {
            header: '4. Fourth Step',
            content: 'Content of step 4.',
            valid: true
        }
    ];
    visitedChanged(index: number, value: boolean) { }

    @ViewChildren(WizardStepComponent)
    stepsList: QueryList<WizardStepComponent>;
}

describe('Wizard with visitedChange event', () => {
    let component: WizardVisitedChangeTestComponent;
    let fixture: ComponentFixture<WizardVisitedChangeTestComponent>;
    let nativeElement: HTMLElement;
    let visitedChanged: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [WizardModule, CommonModule],
            declarations: [WizardVisitedChangeTestComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(WizardVisitedChangeTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        visitedChanged = spyOn(component, 'visitedChanged');

        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should trigger a visitedChange event when valid modified on the current step, when other steps ahead are visited', async () => {
        // emulate steps being complete
        component.steps[0].visited = true;
        component.steps[1].visited = true;
        component.steps[2].visited = true;
        component.steps[3].visited = true;
        fixture.detectChanges();
        await fixture.whenStable();

        // click next button to make second step active
        await fixture.nativeElement.querySelector(NEXT_BUTTON_SELECTOR).click();
        fixture.detectChanges();
        await fixture.whenStable();

        visitedChanged.calls.reset();

        // set step 2 invalid
        component.steps[1].valid = false;
        fixture.detectChanges();
        await fixture.whenStable();

        // get dump of all calls made to event
        const calls = visitedChanged.calls.all();

        // get all steps from view child list
        const stepsList = component.stepsList.toArray();

        // step 1 should be valid and visited
        expect(stepsList[0].valid).toBe(true, 'stepsList[0].valid');
        expect(stepsList[0].visited).toBe(true, 'stepsList[0].visited');

        // step 2 should be invalid and not visited
        expect(stepsList[1].valid).toBe(false, 'stepsList[1].valid');
        expect(stepsList[1].visited).toBe(false, 'stepsList[1].visited');
        expect(calls[0].args).toEqual([1, false]);

        // step 3 should be valid and not visited
        expect(stepsList[2].valid).toBe(true, 'stepsList[2].valid');
        expect(stepsList[2].visited).toBe(false, 'stepsList[2].visited');
        expect(calls[1].args).toEqual([2, false]);

        // step 4 should have valid undefined (not set yet) and not visited
        expect(stepsList[3].valid).toBe(true, 'stepsList[3].valid');
        expect(stepsList[3].visited).toBe(false, 'stepsList[3].visited');
        expect(calls[2].args).toEqual([3, false]);
    });

    it('should not fire off a visitedChange event when visited is updated directly', async () => {
        // clear initial fire off of visitedChange
        fixture.detectChanges();
        await fixture.whenStable();
        visitedChanged.calls.reset();

        // emulate steps being complete
        component.steps[0].visited = true;
        component.steps[1].visited = true;
        component.steps[2].visited = true;
        component.steps[3].visited = true;
        fixture.detectChanges();
        await fixture.whenStable();

        const calls = visitedChanged.calls.all();
        expect(calls.length).toBe(0, 'calls.length');
    });
});
