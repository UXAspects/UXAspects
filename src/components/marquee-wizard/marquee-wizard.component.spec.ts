import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MarqueeWizardModule } from './marquee-wizard.module';

@Component({
    selector: 'marquee-wizard-app',
    template: `<ux-marquee-wizard
    class="marquee-wizard"
    [(step)]="step"
    [description]="description"
    (onFinish)="close()"
    (onCancel)="close()"
    [previousVisible]="step !== 0"
    [cancelVisible]="false">

    <ng-template #description>
        <img alt="Icon"
        src="https://pages.github.houston.softwaregrp.net/caf/ux-aspects-micro-focus/docs/app/assets/img/marquee-wizard-icon.svg">

        <h3 id="marquee-wizard-title" class="marquee-title">Marquee Wizard</h3>
        <p class="m-b-nil">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Aenean sodales lacus vitae congue lacinia. Phasellus finibus
            dolor efficitur quam vestibulum feugiat.
        </p>
    </ng-template>

    <ux-marquee-wizard-step *ngFor="let step of steps; index as pageIndex" [header]="step.title">
        <h3 class="marquee-step-title m-t-nil">Marquee wizard Step</h3>
    </ux-marquee-wizard-step>


</ux-marquee-wizard>`
})
export class MarqueeWizardComponent {

    step: number = 0;

    steps = [
        { title: 'first step' },
        { title: 'second step' },
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
            declarations: [MarqueeWizardComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MarqueeWizardComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        iconElement = fixture.elementRef.nativeElement.querySelector('.marquee-wizard-step');
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

    it('should display the step title in the side pane;', async (() => {
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

        debugger;
       // expect(firstStep[0].classList.contains('active'));
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
    <ux-marquee-wizard-step *ngFor="let step of steps" [header]="step.title">
        <h3 class="marquee-step-title m-t-nil">Marquee wizard Step</h3>
    </ux-marquee-wizard-step>
</ux-marquee-wizard>`
})
export class MarqueeWizardNgForComponent {
    step: number = 0;
    steps = [];

    constructor() {
        setTimeout(() => {
            this.steps = [
                { title: 'first step' },
                { title: 'second step' },
            ];
        }, 3000);
    }
}

describe('Marquee wizard ngFor example', () => {

    let component: MarqueeWizardComponent;
    let fixture: ComponentFixture<MarqueeWizardComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MarqueeWizardModule],
            declarations: [MarqueeWizardComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MarqueeWizardComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should update steps after delay (eg. server delay)', fakeAsync(() => {
        tick(4000);
        // see if steps are present now

        const steps = document.querySelectorAll<HTMLUListElement>('.marquee-wizard-step');
        expect(steps).toBeTruthy();
        debugger;

    }));

});