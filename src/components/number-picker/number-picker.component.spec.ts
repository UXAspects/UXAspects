import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberPickerModule } from './number-picker.module';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-number-picker-form',
    template: `<ux-number-picker min="-10"
                                 max="10"
                                 [valid]="form.controls['integer'].valid" 
                                 [formControl]="form.controls['integer']">
                </ux-number-picker>
                <ux-number-picker min="-10"
                                  max="10"
                                  [valid]="form.controls['integer2'].valid"
                                  [formControl]="form.controls['integer2']">
                </ux-number-picker>
    
    `
})
export class NumberPickerTestFormGroupComponent {

    form: FormGroup;
    disabled = false;

    constructor(formBuilder: FormBuilder) {

        this.form = formBuilder.group({
            integer: [{value: 0, disabled: false},  Validators.compose([Validators.required, Validators.min(-10), Validators.max(10)])],
            integer2: [{value: 0, disabled: true}, Validators.compose([Validators.required, Validators.min(-10), Validators.max(10)])]
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


    it ('should initialise correctly', () => {

        expect(component).toBeTruthy();

        expect(component.form.controls.integer.value).toBe(0);
        expect(component.form.controls.integer2.value).toBe(0);
    });

    it ('should allow a number to be entered', async() => {

        component.form.controls.integer.setValue(6);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input1.value).toBe('6');
    });


    it ('should display has-error class when value above max value', async() => {
        component.form.controls.integer.setValue(20);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input1.value).toBe('20');
        expect(numberPicker1.classList.contains('has-error')).toBe(true);
    });

    it ('should display has-error class when value below min value', async() => {
        component.form.controls.integer.setValue(-20);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input1.value).toBe('-20');
        expect(numberPicker1.classList.contains('has-error')).toBe(true);
    });

    it ('should not display has-error class when value above max value and disabled', async() => {
        component.form.controls.integer2.setValue(20);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input2.value).toBe('20');
        expect(numberPicker2.classList.contains('has-error')).toBe(false);
    });

    it ('should display ng-invalid class when value above max value', async() => {
        component.form.controls.integer.setValue(20);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input1.value).toBe('20');
        expect(numberPicker1.classList.contains('ng-invalid')).toBe(true);
    });

    it ('should display ng-invalid class when value below min value', async() => {
        component.form.controls.integer.setValue(-20);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input1.value).toBe('-20');
        expect(numberPicker1.classList.contains('ng-invalid')).toBe(true);
    });

    it ('should not display ng-invalid class when value above max value and disabled', async() => {
        component.form.controls.integer2.setValue(20);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input2.value).toBe('20');
        expect(numberPicker2.classList.contains('ng-invalid')).toBe(false);
    });
});

@Component({
    selector: 'app-number-picker-ngmodel',
    template: `<ux-number-picker [min]="-10"
                                 [max]="10"
                                 [disabled]="disabled"
                                 [(ngModel)]="value">
                </ux-number-picker>
    
    `
})
export class NumberPickerTestNgModelComponent {

    value = 0;
    disabled = false;

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


    it ('should initialise correctly', () => {
        expect(component).toBeTruthy();

        expect(component.value).toBe(0);
    });

    it ('should allow a number to be entered', async() => {
        component.value = 9;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input.value).toBe('9');
    });

    it ('should display has-error class when value above max value', async() => {
        component.value = 90;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(input.value).toBe('90');

        fixture.detectChanges();
        expect(numberPicker.classList.contains('has-error')).toBe(true);
    });

    it ('should display has-error class when value below min value', async() => {
        component.value = -20;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(input.value).toBe('-20');

        fixture.detectChanges();
        expect(numberPicker.classList.contains('has-error')).toBe(true);
    });

    it ('should not display has-error class when value above max value and disabled', async() => {
        component.disabled = true;
        fixture.detectChanges();
        component.value = 20;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(input.value).toBe('20');

        expect(numberPicker.classList.contains('has-error')).toBe(false);
    });
});

@Component({
    selector: 'app-number-picker-value',
    template: `<ux-number-picker [min]="-10"
                                 [max]="10"
                                 [disabled]="disabled"
                                 [value]="value">
                </ux-number-picker>
    
    `
})
export class NumberPickerTestValueComponent {

    value = 0;
    disabled = false;
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


    it ('should initialise correctly', () => {

        expect(component).toBeTruthy();

        expect(component.value).toBe(0);
    });

    it ('should allow a number to be entered', async() => {
        component.value = 9;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input.value).toBe('9');
    });

    it ('should display has-error class when value above max value', async() => {
        component.value = 78;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(input.value).toBe('78');

        expect(numberPicker.classList.contains('has-error')).toBe(true);
    });

    it ('should display has-error class when value below min value', async() => {
        component.value = -20;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input.value).toBe('-20');
        expect(numberPicker.classList.contains('has-error')).toBe(true);
    });

    it ('should not display has-error class when value above max value and disabled', async() => {
        component.disabled = true;
        component.value = 20;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input.value).toBe('20');
        expect(numberPicker.classList.contains('has-error')).toBe(false);
    });

    it ('should not display ng-valid class when value above max value', async() => {
        component.value = 20;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input.value).toBe('20');
        expect(numberPicker.classList.contains('ng-valid')).toBe(false);
    });

    it ('should not display ng-valid class when value below min value', async() => {
        component.value = -20;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input.value).toBe('-20');
        expect(numberPicker.classList.contains('ng-valid')).toBe(false);
    });

    it ('should not display ng-invalid class when value above max value and disabled', async() => {
        component.disabled = true;
        component.value = 20;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(input.value).toBe('20');
        expect(numberPicker.classList.contains('ng-invalid')).toBe(false);
    });

});