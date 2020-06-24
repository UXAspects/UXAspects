import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import {
    async,
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick
} from '@angular/core/testing';
import { StepChangingEvent } from '../wizard/index';
import { MarqueeWizardStepComponent } from './marquee-wizard-step.component';
import { MarqueeWizardModule } from './marquee-wizard.module';

enum MarqueeWizardSelectors {
    ToggleValidity = '.toggle-validity-button',
    NextButton = '.button-primary',
    SecondStep = '.marquee-wizard-steps > li:nth-child(2)'
}

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
            expect(step.id).toMatch(`ux-wizard-[0-9]+-step-${index}-label`);
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
    steps = [];
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


interface WizardStep {
    header: string;
    content: string;
}

@Component({
    selector: 'wizard-visited-change-test-app',
    template: `
        <ux-marquee-wizard
            (stepChanging)="stepChanging($event)"
            (stepChange)="stepChange($event)"
            (onNext)="onNext($event)"
        >
            <ux-marquee-wizard-step *ngFor="let step of steps"
                [header]="step.header" [valid]="step.valid"
                (visitedChange)="visitedChanged()"
            >
                <p>{{ step.content }}</p>
                <button class="toggle-validity-button" (click)="step.valid = !step.valid">Toggle validity</button>
            </ux-marquee-wizard-step>
        </ux-marquee-wizard>
    `
})
class MarqueeWizardVisitedChangeTestComponent {
    steps: WizardStep[] = [
        {
            header: '1. First Step',
            content: 'Content of step 1.',
        },
        {
            header: '2. Second Step',
            content: 'Content of step 2.',
        },
        {
            header: '3. Third Step',
            content: 'Content of step 3.',
        },
        {
            header: '4. Fourth Step',
            content: 'Content of step 4.',
        }
    ];
    stepChanging(_: StepChangingEvent) {}
    stepChange(_: number) {}
    onNext(_: number) {}
    visitedChanged(_: boolean) { }

    @ViewChildren(MarqueeWizardStepComponent)
    stepsList: QueryList<MarqueeWizardStepComponent>;
}

describe('Marquee wizard with visitedChange event', () => {
    let component: MarqueeWizardVisitedChangeTestComponent;
    let fixture: ComponentFixture<MarqueeWizardVisitedChangeTestComponent>;
    let nativeElement: HTMLElement;
    let visitedChanged: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MarqueeWizardModule, CommonModule],
            declarations: [MarqueeWizardVisitedChangeTestComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(MarqueeWizardVisitedChangeTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        visitedChanged = spyOn(component, 'visitedChanged');

        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should trigger a visitedChange event when valid modified on the current step, when other steps ahead are visited', async () => {
        // set step 1 to valid and move forward
        await clickButton(MarqueeWizardSelectors.ToggleValidity);
        await clickButton(MarqueeWizardSelectors.NextButton);

        // set step 2 to valid and move forward
        await clickButton(MarqueeWizardSelectors.ToggleValidity);
        await clickButton(MarqueeWizardSelectors.NextButton);

        // set step 3 to valid and move forward
        await clickButton(MarqueeWizardSelectors.ToggleValidity);
        await clickButton(MarqueeWizardSelectors.NextButton);

        // jump back to the first step
        await clickButton(MarqueeWizardSelectors.SecondStep);

        visitedChanged.calls.reset();

        // valid now false and should trigger visitedChange
        await clickButton(MarqueeWizardSelectors.ToggleValidity);

        await clickButton(MarqueeWizardSelectors.NextButton);

        expect(visitedChanged).toHaveBeenCalledTimes(1);

        const stepsList = component.stepsList.toArray();
        // step 1 should be valid and visited
        expect(stepsList[0]._valid).toBeTruthy();
        expect(stepsList[0].visited).toBeTruthy();
        expect(stepsList[0].completed).toBeTruthy();

        // step 2 should be invalid and not visited
        expect(stepsList[1]._valid).toBeFalsy();
        expect(stepsList[1].visited).toBeFalsy();
        expect(stepsList[1].completed).toBeFalsy();

        // step 3 should be valid and not visited
        expect(stepsList[2]._valid).toBeTruthy();
        expect(stepsList[2].visited).toBeFalsy();
        expect(stepsList[2].completed).toBeFalsy();

        // step 4 should have valid undefined (not set yet) and not visited
        expect(stepsList[3]._valid).toBeUndefined();
        expect(stepsList[3].visited).toBeFalsy();
        expect(stepsList[3].completed).toBeFalsy();

    });

    async function clickButton(selector: MarqueeWizardSelectors): Promise<void> {
        const button = nativeElement.querySelector<HTMLButtonElement>(selector);
        button.click();
        fixture.detectChanges();
        await fixture.whenStable();
    }
});
