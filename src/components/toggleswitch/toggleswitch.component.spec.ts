import { ChangeDetectionStrategy, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleSwitchComponent } from './toggleswitch.component';
import { ToggleSwitchModule } from './toggleswitch.module';

describe('Toggle Switch Component', () => {
    let fixture: ComponentFixture<ToggleSwitchComponent>;
    let component: ToggleSwitchComponent;
    let nativeElement: HTMLElement;
    let valueChangeSpy: jasmine.Spy;
    let changeCallbackSpy: jasmine.Spy;
    let touchedCallbackSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ToggleSwitchModule]
        })
            .overrideComponent(ToggleSwitchComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
            })
            .compileComponents();

        fixture = TestBed.createComponent(ToggleSwitchComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        valueChangeSpy = spyOn(component.valueChange, 'emit');
        changeCallbackSpy = spyOn(component, 'onChangeCallback');
        touchedCallbackSpy = spyOn(component, 'onTouchedCallback');
        fixture.detectChanges();
    }));

    it('should initialise with the correct values', () => {
        expect(component).toBeTruthy();
        expect(component.value).toBe(false);
    });

    it('should not emit valueChange initially', () => {
        expect(valueChangeSpy).not.toHaveBeenCalled();
        expect(changeCallbackSpy).not.toHaveBeenCalled();
        expect(touchedCallbackSpy).not.toHaveBeenCalled();
    });

    it('should not emit valueChange when the value input changes', async () => {
        component.value = true;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(valueChangeSpy).not.toHaveBeenCalled();
        expect(changeCallbackSpy).not.toHaveBeenCalled();
        expect(touchedCallbackSpy).not.toHaveBeenCalled();
    });

    it('should not emit valueChange when the value input changes via ngModel or form control', async () => {
        component.writeValue(true);
        fixture.detectChanges();
        await fixture.whenStable();
        expect(valueChangeSpy).not.toHaveBeenCalled();
        expect(changeCallbackSpy).not.toHaveBeenCalled();
        expect(touchedCallbackSpy).not.toHaveBeenCalled();
    });

    it('should emit valueChange whenever the user toggle the input via clicking', async () => {
        expect(component.value).toBeFalsy();
        await toggle();

        expect(component.value).toBeTruthy();

        expect(valueChangeSpy).toHaveBeenCalledWith(true);
        expect(valueChangeSpy).toHaveBeenCalledTimes(1);

        expect(changeCallbackSpy).toHaveBeenCalledWith(true);
        expect(changeCallbackSpy).toHaveBeenCalledTimes(1);

        expect(touchedCallbackSpy).toHaveBeenCalled();
        expect(touchedCallbackSpy).toHaveBeenCalledTimes(1);

        await toggle();

        expect(component.value).toBeFalsy();

        expect(valueChangeSpy).toHaveBeenCalledWith(false);
        expect(valueChangeSpy).toHaveBeenCalledTimes(2);

        expect(changeCallbackSpy).toHaveBeenCalledWith(false);
        expect(changeCallbackSpy).toHaveBeenCalledTimes(2);

        expect(touchedCallbackSpy).toHaveBeenCalled();
        expect(touchedCallbackSpy).toHaveBeenCalledTimes(2);
    });

    it('should not allow toggling whenever the toggle switch is disabled via disabled input', async () => {
        component.disabled = true;
        await toggle();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.value).toBeFalsy();
        expect(valueChangeSpy).not.toHaveBeenCalled();
        expect(changeCallbackSpy).not.toHaveBeenCalled();
        expect(touchedCallbackSpy).not.toHaveBeenCalled();
    });

    it('should not allow toggling whenever the toggle switch is disabled via Angular forms', async () => {
        component.setDisabledState(true);
        await toggle();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.value).toBeFalsy();
        expect(valueChangeSpy).not.toHaveBeenCalled();
        expect(changeCallbackSpy).not.toHaveBeenCalled();
        expect(touchedCallbackSpy).not.toHaveBeenCalled();
    });

    it('should not allow toggling whenever the toggle switch is marked as not clickable', async () => {
        component.clickable = false;
        await toggle();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.value).toBeFalsy();
        expect(valueChangeSpy).not.toHaveBeenCalled();
        expect(changeCallbackSpy).not.toHaveBeenCalled();
        expect(touchedCallbackSpy).not.toHaveBeenCalled();
    });

    function getInput(): HTMLInputElement {
        return nativeElement.querySelector('input');
    }

    async function toggle(): Promise<void> {
        getInput().click();
        fixture.detectChanges();
        await fixture.whenStable();
    }

});

@Component({
    selector: 'toggleswitch-required-test',
    template: `
        <ux-toggleswitch
            [(value)]="toggleSwitches.option1"
            [required]="required">Toggle 1
        </ux-toggleswitch>
    `
})
export class ToggleswitchRequiredTestComponent {

    required: boolean = false;
    toggleSwitches = {
        option1: true,
    };


}

describe('Toggleswitch Test Component', () => {

    let component: ToggleswitchRequiredTestComponent;
    let fixture: ComponentFixture<ToggleswitchRequiredTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ToggleSwitchModule],
            declarations: [ToggleswitchRequiredTestComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToggleswitchRequiredTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should add a required attribute to the input when required is true', async () => {
        component.required = true;

        fixture.detectChanges();
        await fixture.whenStable();

        const inputElementEmpty = document.querySelectorAll<HTMLInputElement>('input.ux-toggleswitch-input');
        const attributeRequired = inputElementEmpty[0].hasAttribute('aria-required');

        expect(attributeRequired).toBe(true);
    });
});
