import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StepDirection } from './number-picker.component';
import { NumberPickerModule } from './number-picker.module';

/** Number picker example using form group */
@Component({
    selector: 'app-number-picker-form',
    template: `<ux-number-picker [min]="min"
                                 [max]="max"
                                 [step]="step"
                                 [formControl]="form.controls['integer']"
                                 [placeholder]="placeholder">
                </ux-number-picker>
                <ux-number-picker [min]="min"
                                  [max]="max"
                                  [step]="step"
                                  [formControl]="form.controls['integer2']"
                                  [placeholder]="placeholder">
                </ux-number-picker>

    `
})
export class NumberPickerTestFormGroupComponent {

    form: FormGroup;
    disabled = false;
    min = -10;
    max = 10;
    step: number | ((value: number, direction: StepDirection) => number) = 1;
    placeholder: string;

    constructor(formBuilder: FormBuilder) {

        this.form = formBuilder.group({
            integer: [{ value: 0, disabled: false }, Validators.compose([Validators.required, Validators.min(-10), Validators.max(10)])],
            integer2: [{ value: 0, disabled: true }, Validators.compose([Validators.required, Validators.min(-10), Validators.max(10)])]
        });
    }
}

describe('Number Picker Component - FormGroup', () => {
    let component: NumberPickerTestFormGroupComponent;
    let fixture: ComponentFixture<NumberPickerTestFormGroupComponent>;
    let nativeElement: HTMLElement;
    let numberPickers: NodeListOf<HTMLInputElement>;
    let numberPicker1: HTMLInputElement;
    let numberPicker2: HTMLInputElement;
    let input1: HTMLInputElement;
    let input2: HTMLInputElement;

    async function clickElement(element: HTMLDivElement) {
        await element.click();
        fixture.detectChanges();
        await fixture.whenStable();
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NumberPickerModule, ReactiveFormsModule],
            declarations: [NumberPickerTestFormGroupComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NumberPickerTestFormGroupComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        numberPickers = nativeElement.querySelectorAll<HTMLInputElement>('ux-number-picker');
        numberPicker1 = numberPickers.item(0);
        numberPicker2 = numberPickers.item(1);
        input1 = numberPicker1.querySelector('input');
        input2 = numberPicker2.querySelector('input');

        fixture.detectChanges();
    });


    it('should initialise correctly', () => {

        expect(component).toBeTruthy();
        expect(component.form.controls.integer.value).toBe(0);
        expect(component.form.controls.integer2.value).toBe(0);
    });

    it('should allow a number to be entered', async () => {

        component.form.controls.integer.setValue(6);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input1.value).toBe('6');
    });

    it('should not display ux-number-picker-invalid class when value above max value and disabled', async () => {
        component.form.controls.integer2.setValue(20);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input2.value).toBe('20');
        expect(numberPicker2.classList.contains('ux-number-picker-invalid')).toBe(false);
    });

    it('should display ng-invalid class when value above max value', async () => {
        component.form.controls.integer.setValue(20);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input1.value).toBe('20');
        expect(numberPicker1.classList.contains('ng-invalid')).toBe(true);
    });

    it('should display ng-invalid class when value below min value', async () => {
        component.form.controls.integer.setValue(-20);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input1.value).toBe('-20');
        expect(numberPicker1.classList.contains('ng-invalid')).toBe(true);
    });

    it('should not display ng-invalid class when value above max value and disabled', async () => {
        component.form.controls.integer2.setValue(20);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input2.value).toBe('20');
        expect(numberPicker2.classList.contains('ng-invalid')).toBe(false);
    });

    it('should not display ux-number-picker-invalid when max value increased to match input value', async () => {
        component.form.controls.integer.setValue(15);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input1.value).toBe('15');
        expect(numberPicker1.classList.contains('ux-number-picker-invalid')).toBe(true);

        component.max = 15;
        fixture.detectChanges();
        component.form.controls.integer.setValidators(([Validators.required, Validators.min(-10), Validators.max(15)]));
        component.form.controls.integer.updateValueAndValidity();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(numberPicker1.classList.contains('ux-number-picker-invalid')).toBe(false);
    });

    it('should not display ux-number-picker-invalid when min value decreased to match input value', async () => {
        component.form.controls.integer.setValue(-15);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input1.value).toBe('-15');
        expect(numberPicker1.classList.contains('ux-number-picker-invalid')).toBe(true);

        component.min = -15;
        fixture.detectChanges();
        component.form.controls.integer.setValidators(([Validators.required, Validators.min(-15), Validators.max(10)]));
        component.form.controls.integer.updateValueAndValidity();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(numberPicker1.classList.contains('ux-number-picker-invalid')).toBe(false);
    });

    it('should apply a placeholder', () => {
        component.placeholder = 'Placeholder Text';
        fixture.detectChanges();

        const inputElement = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        expect(inputElement.placeholder).toBe('Placeholder Text');
    });

    it('should not apply a placeholder if unset', () => {
        const inputElement = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        const attribute = inputElement.getAttribute('placeholder');
        expect(attribute).toBeNull();
    });

    describe('on increment/decrement', () => {
        let input1IncrementBtn: HTMLDivElement;
        let input1DecrementBtn: HTMLDivElement;
        let input2IncrementBtn: HTMLDivElement;
        let input2DecrementBtn: HTMLDivElement;

        beforeEach(() => {
            input1IncrementBtn = numberPicker1.querySelector('.number-picker-control-up');
            input1DecrementBtn = numberPicker1.querySelector('.number-picker-control-down');
            input2IncrementBtn = numberPicker2.querySelector('.number-picker-control-up');
            input2DecrementBtn = numberPicker2.querySelector('.number-picker-control-down');
        });

        it('should work with whole numbers', async () => {
            component.form.controls.integer.setValue(7);
            fixture.detectChanges();
            await fixture.whenStable();

            // 1st increment
            await clickElement(input1IncrementBtn);
            expect(component.form.controls.integer.value).toBe(8);

            // 2nd increment
            await clickElement(input1IncrementBtn);
            expect(component.form.controls.integer.value).toBe(9);

            // 3rd increment
            await clickElement(input1IncrementBtn);
            expect(component.form.controls.integer.value).toBe(10);

            // 4th increment (tries to go outside max bounds)
            await clickElement(input1IncrementBtn);
            expect(component.form.controls.integer.value).toBe(10);

            // 1st decrement
            await clickElement(input1DecrementBtn);
            expect(component.form.controls.integer.value).toBe(9);

            // 2nd decrement
            await clickElement(input1DecrementBtn);
            expect(component.form.controls.integer.value).toBe(8);

            // 3rd decrement
            await clickElement(input1DecrementBtn);
            expect(component.form.controls.integer.value).toBe(7);
        });

        it('should work with decimal numbers without precision issues', async () => {
            component.step = 0.3;
            component.form.controls.integer.setValue(4);
            fixture.detectChanges();
            await fixture.whenStable();

            // 1st increment
            await clickElement(input1IncrementBtn);
            expect(component.form.controls.integer.value).toBe(4.3);

            // 2nd increment
            await clickElement(input1IncrementBtn);
            expect(component.form.controls.integer.value).toBe(4.6);

            // 3rd increment
            await clickElement(input1IncrementBtn);
            expect(component.form.controls.integer.value).toBe(4.9);

            // 4th increment
            await clickElement(input1IncrementBtn);
            expect(component.form.controls.integer.value).toBe(5.2);

            // 1st decrement
            await clickElement(input1DecrementBtn);
            expect(component.form.controls.integer.value).toBe(4.9);

            // 2nd decrement
            await clickElement(input1DecrementBtn);
            expect(component.form.controls.integer.value).toBe(4.6);

            // 3rd decrement
            await clickElement(input1DecrementBtn);
            expect(component.form.controls.integer.value).toBe(4.3);
        });

        it('should work with large whole numbers', async () => {
            component.step = 1000000;
            component.max = 1000000000;
            component.form.controls.integer.setValue(997000000);
            fixture.detectChanges();
            await fixture.whenStable();

            // 1st increment
            await clickElement(input1IncrementBtn);
            expect(component.form.controls.integer.value).toBe(998000000);

            // 2nd increment
            await clickElement(input1IncrementBtn);
            expect(component.form.controls.integer.value).toBe(999000000);

            // 3rd increment
            await clickElement(input1IncrementBtn);
            expect(component.form.controls.integer.value).toBe(1000000000);

            // 1st decrement
            await clickElement(input1DecrementBtn);
            expect(component.form.controls.integer.value).toBe(999000000);

            // 2nd decrement
            await clickElement(input1DecrementBtn);
            expect(component.form.controls.integer.value).toBe(998000000);

            // 3rd decrement
            await clickElement(input1DecrementBtn);
            expect(component.form.controls.integer.value).toBe(997000000);
        });

        it('should work with large decimal numbers', async () => {
            component.step = 0.1;
            component.max = 100000000;
            component.form.controls.integer.setValue(99999999.1);
            fixture.detectChanges();
            await fixture.whenStable();

            // 1st increment
            await clickElement(input1IncrementBtn);
            expect(component.form.controls.integer.value).toBe(99999999.2);

            // 2nd increment
            await clickElement(input1IncrementBtn);
            expect(component.form.controls.integer.value).toBe(99999999.3);

            // 3rd increment
            await clickElement(input1IncrementBtn);
            expect(component.form.controls.integer.value).toBe(99999999.4);

            // 1st decrement
            await clickElement(input1DecrementBtn);
            expect(component.form.controls.integer.value).toBe(99999999.3);

            // 2nd decrement
            await clickElement(input1DecrementBtn);
            expect(component.form.controls.integer.value).toBe(99999999.2);

            // 3rd decrement
            await clickElement(input1DecrementBtn);
            expect(component.form.controls.integer.value).toBe(99999999.1);

            // 4rd decrement
            await clickElement(input1DecrementBtn);
            expect(component.form.controls.integer.value).toBe(99999999);

            // 5th decrement
            await clickElement(input1DecrementBtn);
            expect(component.form.controls.integer.value).toBe(99999998.9);
        });

        it('should work when using a function as the step input', async () => {
            component.form.controls.integer.setValue(5);
            component.step = (value: number, direction: StepDirection) => {
                if (value === 5 && direction === StepDirection.Increment) {
                    return 2;
                } else {
                    return 1;
                }
            };
            fixture.detectChanges();
            await fixture.whenStable();

            await clickElement(input1IncrementBtn);
            expect(component.form.controls.integer.value).toBe(7, 'step function should increment by 2');

            await clickElement(input1DecrementBtn);
            expect(component.form.controls.integer.value).toBe(6, 'step function should decrement by 1');
        });
    });

    describe('on scroll', () => {
        it('should not change the value if the picker has not been focused', async () => {
            component.form.controls.integer.setValue(0);
            fixture.detectChanges();
            await fixture.whenStable();

            input1.dispatchEvent(new WheelEvent('wheel', { deltaY: 5 }));
            fixture.detectChanges();
            await fixture.whenStable();
            expect(input1.value).toBe('0');

            input1.dispatchEvent(new WheelEvent('wheel', { deltaY: -5 }));
            fixture.detectChanges();
            await fixture.whenStable();
            expect(input1.value).toBe('0');
        });
        it('should change the value if the picker is focused', async () => {
            component.form.controls.integer.setValue(0);
            fixture.detectChanges();
            await fixture.whenStable();

            await input1.focus();
            fixture.detectChanges();
            await fixture.whenStable();

            input1.dispatchEvent(new WheelEvent('wheel', { deltaY: 5 }));
            fixture.detectChanges();
            await fixture.whenStable();
            expect(input1.value).toBe('-1');

            input1.dispatchEvent(new WheelEvent('wheel', { deltaY: -5 }));
            fixture.detectChanges();
            await fixture.whenStable();
            expect(input1.value).toBe('0');
        });
        it('should stop changing the value if the picker is blured', async () => {
            component.form.controls.integer.setValue(0);
            fixture.detectChanges();
            await fixture.whenStable();

            input1.focus();
            fixture.detectChanges();
            await fixture.whenStable();

            input1.dispatchEvent(new WheelEvent('wheel', { deltaY: 5 }));
            fixture.detectChanges();
            await fixture.whenStable();
            expect(input1.value).toBe('-1');

            input1.blur();
            fixture.detectChanges();
            await fixture.whenStable();

            input1.dispatchEvent(new WheelEvent('wheel', { deltaY: -5 }));
            fixture.detectChanges();
            await fixture.whenStable();
            expect(input1.value).toBe('-1');
        });
    });
});

@Component({
    selector: 'app-number-picker-ngmodel',
    template: `<ux-number-picker [min]="min"
                                 [max]="max"
                                 [disabled]="disabled"
                                 [(ngModel)]="value">
                </ux-number-picker>

    `
})
export class NumberPickerTestNgModelComponent {

    value = 0;
    disabled = false;
    min = -10;
    max = 10;

}

describe('Number Picker Component - ngModel', () => {
    let component: NumberPickerTestNgModelComponent;
    let fixture: ComponentFixture<NumberPickerTestNgModelComponent>;
    let nativeElement: HTMLElement;
    let numberPicker: HTMLElement;
    let input: HTMLInputElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NumberPickerModule,
                FormsModule
            ],
            declarations: [NumberPickerTestNgModelComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NumberPickerTestNgModelComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        numberPicker = nativeElement.querySelector('ux-number-picker');
        input = numberPicker.querySelector('input');
        fixture.detectChanges();
    });


    it('should initialise correctly', () => {
        expect(component).toBeTruthy();

        expect(component.value).toBe(0);
    });

    it('should allow a number to be entered', async () => {
        component.value = 9;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input.value).toBe('9');
    });

    it('should display ux-number-picker-invalid class when value above max value', async () => {
        component.value = 90;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(input.value).toBe('90');

        fixture.detectChanges();
        expect(numberPicker.classList.contains('ux-number-picker-invalid')).toBe(true);
    });

    it('should not display ux-number-picker-invalid class when max value increased to match input value', async () => {
        component.value = 15;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(input.value).toBe('15');

        fixture.detectChanges();
        expect(numberPicker.classList.contains('ux-number-picker-invalid')).toBe(true);

        component.max = 15;
        fixture.detectChanges();
        await fixture.whenStable();

        fixture.detectChanges();
        expect(numberPicker.classList.contains('ux-number-picker-invalid')).toBe(false);
    });

    it('should not display ux-number-picker-invalid class when min value decreased to match input value', async () => {
        component.value = -15;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(input.value).toBe('-15');

        fixture.detectChanges();
        expect(numberPicker.classList.contains('ux-number-picker-invalid')).toBe(true);

        component.min = -15;
        fixture.detectChanges();
        await fixture.whenStable();

        fixture.detectChanges();
        expect(numberPicker.classList.contains('ux-number-picker-invalid')).toBe(false);
    });

    it('should display ux-number-picker-invalid class when value below min value', async () => {
        component.value = -20;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(input.value).toBe('-20');

        fixture.detectChanges();
        expect(numberPicker.classList.contains('ux-number-picker-invalid')).toBe(true);
    });

    it('should not display ux-number-picker-invalid class when value above max value and disabled', async () => {
        component.disabled = true;
        fixture.detectChanges();
        component.value = 20;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(input.value).toBe('20');

        expect(numberPicker.classList.contains('ux-number-picker-invalid')).toBe(false);
    });
});

@Component({
    selector: 'app-number-picker-value',
    template: `<ux-number-picker [min]="min"
                                 [max]="max"
                                 [required]="required"
                                 [disabled]="disabled"
                                 (valueChange)="onValueChange($event)"
                                 [value]="value"
                                 [(ngModel)]="value"
                                 (ngModelChange)="onNgModelChange($event)">
                </ux-number-picker>

    `
})
export class NumberPickerTestValueComponent {

    required: boolean = false;
    value = 0;
    disabled = false;
    min = -10;
    max = 10;

    onValueChange(value: number): void { }
    onNgModelChange(value: number): void { }

}

describe('Number Picker Component - value', () => {
    let component: NumberPickerTestValueComponent;
    let fixture: ComponentFixture<NumberPickerTestValueComponent>;
    let nativeElement: HTMLElement;
    let numberPicker: HTMLElement;
    let input: HTMLInputElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NumberPickerModule,
                FormsModule
            ],
            declarations: [NumberPickerTestValueComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NumberPickerTestValueComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        numberPicker = nativeElement.querySelector('ux-number-picker');
        input = numberPicker.querySelector('input');
        fixture.detectChanges();
    });


    it('should initialise correctly', () => {

        expect(component).toBeTruthy();

        expect(component.value).toBe(0);
    });

    it('should allow a number to be entered', async () => {
        component.value = 9;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input.value).toBe('9');
    });

    it('should display ux-number-picker-invalid class when value above max value', async () => {
        component.value = 78;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(input.value).toBe('78');

        expect(numberPicker.classList.contains('ux-number-picker-invalid')).toBe(true);
    });

    it('should display ux-number-picker-invalid class when value below min value', async () => {
        component.value = -20;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input.value).toBe('-20');
        expect(numberPicker.classList.contains('ux-number-picker-invalid')).toBe(true);
    });

    it('should not display ux-number-picker-invalid class when max value increased to match input value', async () => {
        component.value = 15;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input.value).toBe('15');
        expect(numberPicker.classList.contains('ux-number-picker-invalid')).toBe(true);

        component.max = 15;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(numberPicker.classList.contains('ux-number-picker-invalid')).toBe(false);
    });

    it('should not display ux-number-picker-invalid class when min value decreased to match input value', async () => {
        component.value = -15;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input.value).toBe('-15');
        expect(numberPicker.classList.contains('ux-number-picker-invalid')).toBe(true);

        component.min = -15;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(numberPicker.classList.contains('ux-number-picker-invalid')).toBe(false);
    });

    it('should not display ux-number-picker-invalid class when value above max value and disabled', async () => {
        component.disabled = true;
        component.value = 20;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input.value).toBe('20');
        expect(numberPicker.classList.contains('ux-number-picker-invalid')).toBe(false);
    });

    it('should not display ng-invalid class when value above max value', async () => {
        component.value = 20;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input.value).toBe('20');
        expect(numberPicker.classList.contains('ng-invalid')).toBe(false);
    });

    it('should not display ng-invalid class when value below min value', async () => {
        component.value = -20;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input.value).toBe('-20');
        expect(numberPicker.classList.contains('ng-invalid')).toBe(false);
    });

    it('should not display ng-invalid class when value above max value and disabled', async () => {
        component.disabled = true;
        component.value = 20;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input.value).toBe('20');
        expect(numberPicker.classList.contains('ng-invalid')).toBe(false);
    });

    it('should call the event emitter once per change', () => {
        const controlUp = nativeElement.querySelector<HTMLElement>('.number-picker-control-up');

        spyOn(component, 'onValueChange');

        controlUp.click();

        expect(component.onValueChange).toHaveBeenCalledWith(1);
        expect(component.onValueChange).toHaveBeenCalledTimes(1);

    });

    it('should not emit valueChange when the value input changes', async () => {
        spyOn(component, 'onValueChange');
        component.value = 1;
        fixture.detectChanges();
        await fixture.whenStable();

        const controlUp = nativeElement.querySelector<HTMLButtonElement>('input').value;
        expect(controlUp).toEqual('1');

        expect(component.onValueChange).not.toHaveBeenCalled();
    });

    it('should emit valueChange event when a value is entered', async () => {
        const inputElement = getInput();

        spyOn(component, 'onValueChange');
        spyOn(component, 'onNgModelChange');
        inputElement.value = '7';
        input.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.onValueChange).toHaveBeenCalledWith(7);
        expect(component.onValueChange).toHaveBeenCalledTimes(1);

        expect(component.onNgModelChange).toHaveBeenCalledWith(7);
        expect(component.onNgModelChange).toHaveBeenCalledTimes(1);

    });

    it('should add a required attribute to the input when required is true', () => {
        component.required = true;

        fixture.detectChanges();

        const inputElementEmpty = nativeElement.querySelector<HTMLInputElement>('input.form-control');
        const attributeRequired = inputElementEmpty.hasAttribute('required');

        expect(attributeRequired).toBe(true);
    });

    function getInput(): HTMLInputElement | null {
        return nativeElement.querySelector('input.form-control');
    }

});
