import { Component } from '@angular/core';
import {
    async,
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick
} from '@angular/core/testing';
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
