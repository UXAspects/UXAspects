import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';
import { CheckboxModule } from './checkbox.module';

describe('Checkbox Component', () => {
    let fixture: ComponentFixture<CheckboxComponent>;
    let component: CheckboxComponent;
    let nativeElement: HTMLElement;
    let valueChangeSpy: jasmine.Spy;
    let changeCallbackSpy: jasmine.Spy;
    let touchedCallbackSpy: jasmine.Spy;

    beforeEach((() => {
        TestBed.configureTestingModule({
            imports: [CheckboxModule]
        })
            .overrideComponent(CheckboxComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
            })
            .compileComponents();

        fixture = TestBed.createComponent<CheckboxComponent>(CheckboxComponent);
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
        expect(component.indeterminateValue).toBe(-1);
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

    it('should allow an indeterminate value to be set', async () => {
        component.value = -1;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(getInput().indeterminate).toBeTruthy();
    });

    it('should not allow toggling whenever the checkbox is disabled via disabled input', async () => {
        component.disabled = true;
        await toggle();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.value).toBeFalsy();
        expect(valueChangeSpy).not.toHaveBeenCalled();
        expect(changeCallbackSpy).not.toHaveBeenCalled();
        expect(touchedCallbackSpy).not.toHaveBeenCalled();
    });

    it('should not allow toggling whenever the checkbox is disabled via Angular forms', async () => {
        component.setDisabledState(true);
        await toggle();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.value).toBeFalsy();
        expect(valueChangeSpy).not.toHaveBeenCalled();
        expect(changeCallbackSpy).not.toHaveBeenCalled();
        expect(touchedCallbackSpy).not.toHaveBeenCalled();
    });

    it('should not allow toggling whenever the checkbox is marked as not clickable', async () => {
        component.clickable = false;
        await toggle();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.value).toBeFalsy();
        expect(valueChangeSpy).not.toHaveBeenCalled();
        expect(changeCallbackSpy).not.toHaveBeenCalled();
        expect(touchedCallbackSpy).not.toHaveBeenCalled();
    });

    it('should add a required attribute to the input when required is true', () => {
        component.required = true;

        fixture.detectChanges();

        const inputElementEmpty = nativeElement.querySelector<HTMLInputElement>('input.ux-checkbox-input');
        const attributeRequired = inputElementEmpty.hasAttribute('required');

        expect(attributeRequired).toBe(true);
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
