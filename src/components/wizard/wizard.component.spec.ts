import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { WizardModule } from './wizard.module';

@Component({
    selector: 'wizard-test-app',
    template: `
        <ux-wizard [orientation]="orientation" (stepChange)="onStepChange($event)">
            <ux-wizard-step *ngFor="let step of steps" [valid]="valid" [header]="step.header" [validator]="userValidator">
                <p>{{ step.content }}</p>
            </ux-wizard-step>
        </ux-wizard> `
})
export class WizardAsyncValidationTestComponent {
    orientation: string = 'horizontal';
    userValidator: boolean | Promise<boolean> | Observable<boolean>;

    steps = [
        {
            header: '1. First Step',
            content: 'Content of step 1.'
        },
        {
            header: '2. Second Step',
            content: 'Content of step 2.'
        },
        {
            header: '3. Second Step',
            content: 'Content of step 3.'
        },
    ];
    constructor(private _announcer: LiveAnnouncer) { }
    onStepChange(index: number): void {
        this._announcer.announce(`${this.steps[index].header} activated`);
    }
}
fdescribe('Wizard Component', () => {
    let component: WizardAsyncValidationTestComponent;
    let fixture: ComponentFixture<WizardAsyncValidationTestComponent>;
    let nativeElement: HTMLElement;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [WizardModule],
            declarations: [WizardAsyncValidationTestComponent]
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(WizardAsyncValidationTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });
    it('should initialise correctly', () => {

        expect(component).toBeTruthy();
    });

    it('should not allow users to move to next step when a passed in async function returns false', async () => {

        component.userValidator = fakeAsyncValid(false);

        await clickNext();

        fixture.detectChanges();
        await fixture.whenStable();

        const steps = getSteps();
        expect(steps[0].classList.contains('invalid')).toBeTruthy();

    });

    it('should allow users to move to next step when a passed in async function returns true ', async () => {

        component.userValidator = fakeAsyncValid(true);
        fixture.detectChanges();
        await fixture.whenStable();

        await clickNext();

        fixture.detectChanges();
        await fixture.whenStable();
        const steps = getSteps();

        expect(steps[0].classList.contains('invalid')).toBeFalsy();

    });

    // it('finish button should call onFinish a passed in async function returns true ', async () => {

    //     component.userValidator = fakeAsyncValid(true);
    //     fixture.detectChanges();
    //     await fixture.whenStable();

    //     await clickNext();

    //     fixture.detectChanges();
    //     await fixture.whenStable();

    //     await clickNext();
    //     fixture.detectChanges();
    //     await fixture.whenStable();
    //     debugger;


    // });

    async function whenStepsLoaded(): Promise<void> {
        tick(200);
        await fixture.whenStable();
    }

    function getSteps(): NodeListOf<HTMLUListElement> {
        return nativeElement.querySelectorAll<HTMLUListElement>(
            '.wizard-step'
        );
    }

    function getContentText(): string {
        return nativeElement.querySelector<HTMLElement>('.test-step-content')
            .innerText;
    }

    async function clickNext(): Promise<void> {
        const nextButton = nativeElement.querySelector<HTMLButtonElement>(
            '.wizard-footer .button-primary'
        );
        nextButton.click();
        fixture.detectChanges();
        await fixture.whenStable();
    }

    async function fakeAsyncValid(returnVal: boolean): Promise<boolean> {

        setInterval(() => {


        }, 1000);

        fixture.detectChanges();
        await fixture.whenStable();

        return returnVal;
    }

});