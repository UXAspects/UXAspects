import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MarqueeWizardModule } from './marquee-wizard.module';
import { By } from '@angular/platform-browser';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { MarqueeWizardStepComponent } from './marquee-wizard-step.component';

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
            [cancelVisible]="false">
            <ng-template #description>
                <img
                    alt="Icon"
                    src="https://pages.github.houston.softwaregrp.net/caf/ux-aspects-micro-focus/docs/app/assets/img/marquee-wizard-icon.svg"/>

                <h3 id="marquee-wizard-title" class="marquee-title"> Marquee Wizard</h3>
                <p class="m-b-nil">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean sodales lacus vitae congue lacinia. Phasellus finibus
                    dolor efficitur quam vestibulum feugiat.
                </p> </ng-template>

            <ux-marquee-wizard-step
                *ngFor="let step of steps; index as pageIndex"
                [header]="step.title">
                <h3 class="marquee-step-title m-t-nil">{{ step.stepTitle }}</h3>
                <div class="row">
                    <div class="col-xs-7">
                        <p class="marquee-wizard-text"> Content of second step</p>
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
        {title: 'step two',  stepTitle: 'Marquee wizard Step', contentStep: 'Content of second step'}
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
    let iconElement: HTMLElement;

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
        iconElement = fixture.elementRef.nativeElement.querySelector(
            '.marquee-wizard-step'
        );
        fixture.detectChanges();
    });

    it('should initialise correctly', () => {
       expect(component).toBeTruthy();
    });

    it('should display an icon', () => {
       const container = nativeElement.querySelector('.marquee-wizard-description-container');
       const icon = container.querySelector('img');
       expect(icon).toBeTruthy();
    });

    it('should display the step title in the side pane;', async(() => {
       const title = nativeElement.querySelector<HTMLHeadingElement>('.marquee-title');
       expect(title.innerText).toBe('Marquee Wizard');
    }));

    it('should emit when the button is clicked', async () => {
       const closeSpy = spyOn(fixture.componentInstance, 'close');

       let footer = nativeElement.querySelector('.modal-footer');
       let buttons = footer.querySelectorAll<HTMLButtonElement>('.button-primary');

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

    it('should default to the first step', () => {
      const steps = document.querySelectorAll<HTMLUListElement>('.marquee-wizard-step');

      const firstStep = steps.item(0);
      expect(firstStep).toBeTruthy();
    });
});

/**
 * Test for EL-3790 where an error can occur if steps rely on request response
 */
@Component({
    selector: 'marquee-wizard-app',
    template: `
        <ux-marquee-wizard class="marquee-wizard">
            <ux-marquee-wizard-step
                *ngFor="let step of steps"
                [header]="step.title"
                [valid]="valid"
                [disableNextWhenInvalid]="disableNextWhenInvalid">
                <h3 class="marquee-step-title m-t-nil">{{ step.stepTitle }}</h3>
                <div *ngIf="step?.contentStep" class="row">
                    <div class="col-xs-7">
                        <p class="marquee-wizard-text"> {{ step.contentStep }}</p>
                    </div>
                </div>
            </ux-marquee-wizard-step>
        </ux-marquee-wizard>
    `
})
export class MarqueeWizardNgForComponent implements OnDestroy {
    step: number = 0;
    steps = [];
    valid: boolean = true;
    _timeout: number;
    disableNextWhenInvalid: boolean;

    constructor() {
        this._timeout = window.setTimeout(() => {
            this.steps = [
                { title: 'first step', stepTitle: 'Marquee wizard' },
                { title: 'second step', stepTitle: 'Marquee wizard Step', contentStep: 'Content of second step'}
            ];
        }, 3000);
    }

    ngOnDestroy(): void {
        clearTimeout(this._timeout);
    }
}

describe('Marquee wizard ngFor example', () => {
    let component: MarqueeWizardNgForComponent;
    let fixture: ComponentFixture<MarqueeWizardNgForComponent>;
    let nativeElement: HTMLElement;
    let checkboxNativeElement: HTMLElement;

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

    it('should have no steps before the timeout is rendered', () => {
      const stepsInitial = document.querySelectorAll<HTMLUListElement>('.marquee-wizard-step');
      expect(stepsInitial.length).toBe(0);
    });

    it('should update steps after delay (eg. server delay)', fakeAsync(async () => {
      tick(4000);
      await detectChanges();

        // see if steps are present now
      const steps = document.querySelectorAll<HTMLUListElement>('.marquee-wizard-step' );
      expect(steps.length).toBe(2);
    }));

    it('should have the correct step titles', fakeAsync(async () => {
       tick(4000);
       await detectChanges();

       const steps = document.querySelectorAll<HTMLElement>( '.marquee-wizard-steps' );

       const firstStep = steps.item(0);
       expect(firstStep).toBeTruthy();

       const title = nativeElement.querySelector<HTMLHeadingElement>('.marquee-step-title');
       expect(title.innerText).toBe('Marquee wizard');

       let footer = nativeElement.querySelector('.modal-footer');
       let buttons = footer.querySelectorAll<HTMLButtonElement>('.button-primary');

       expect(buttons.length).toBe(1);

        // clicking the next button
       buttons.item(0).click();
       fixture.detectChanges();
       await fixture.whenStable();

       const secondSteps = document.querySelectorAll<HTMLUListElement>( '.marquee-wizard-step');

       const secondStep = steps.item(0);
       expect(secondStep).toBeTruthy();

        // check title shows
       const titleOne = nativeElement.querySelector<HTMLHeadingElement>('.marquee-step-title');
       expect(titleOne.innerText).toBe('Marquee wizard Step');
    }));

    it('Should contain some text about the second step', fakeAsync(async () => {
      tick(4000);
      await detectChanges();

      let footer = nativeElement.querySelector('.modal-footer');
      let buttons = footer.querySelectorAll<HTMLButtonElement>('.button-primary' );

      expect(buttons.length).toBe(1);

        // clicking the next button
      buttons.item(0).click();
      fixture.detectChanges();
      await fixture.whenStable();

      const text = nativeElement.querySelector<HTMLTextAreaElement>('.marquee-wizard-text');
      let compiled = fixture.debugElement.nativeElement;
      expect(text.innerText).toContain('Content of second step');
    }));

    it('should go to next step when button is pressed', fakeAsync(async () => {
      tick(4000);
      await detectChanges();
      const steps = document.querySelectorAll<HTMLUListElement>('.marquee-wizard-step');

      const firstStep = steps.item(0);
      expect(firstStep).toBeTruthy();

      let footer = nativeElement.querySelector('.modal-footer');
      let buttons = footer.querySelectorAll<HTMLButtonElement>('.button-primary');

      expect(buttons.length).toBe(1);
        // click into next step
      buttons.item(0).click();
      fixture.detectChanges();
      await fixture.whenStable();

      buttons = footer.querySelectorAll<HTMLButtonElement>('.button-primary');
      expect(buttons.length).toBe(1);
    }));

    it('should disable the next button when the step has an error', fakeAsync(async () => {
      tick(4000);
      component.disableNextWhenInvalid = true;
      component.valid = false;
      fixture.detectChanges();
      await fixture.whenStable();

      let footer = nativeElement.querySelector('.modal-footer');
      let button = footer.querySelector<HTMLButtonElement>('.button-primary');

      button.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(button.hasAttribute('disabled')).toBeTruthy();
    }));

    // we need to run CD three time for component update and ngFor update and wizard step update
    async function detectChanges() {
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      await fixture.whenStable();
    }
});
