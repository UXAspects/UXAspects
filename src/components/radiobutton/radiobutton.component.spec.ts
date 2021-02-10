import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonComponent } from './radiobutton.component';
import { RadioButtonModule } from './radiobutton.module';

describe('Radio Button Component', () => {
    let fixture: ComponentFixture<RadioButtonComponent>;
    let component: RadioButtonComponent;
    let nativeElement: HTMLElement;
    let valueChangeSpy: jasmine.Spy;
    let changeCallbackSpy: jasmine.Spy;
    let touchedCallbackSpy: jasmine.Spy;

    beforeEach((() => {
        TestBed.configureTestingModule({
            imports: [RadioButtonModule]
        })
            .overrideComponent(RadioButtonComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
            })
            .compileComponents();

        fixture = TestBed.createComponent(RadioButtonComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        valueChangeSpy = spyOn(component.valueChange, 'emit');
        changeCallbackSpy = spyOn(component, 'onChangeCallback');
        touchedCallbackSpy = spyOn(component, 'onTouchedCallback');

        component.option = true;

        fixture.detectChanges();
    }));

    it('should initialise with the correct values', () => {
        expect(component).toBeTruthy();
        expect(component.value).toBeFalsy();
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

        // clicking again should not toggle and should now emit a second time
        await toggle();

        expect(component.value).toBeTruthy();

        expect(valueChangeSpy).toHaveBeenCalledTimes(1);
        expect(changeCallbackSpy).toHaveBeenCalledTimes(1);
        expect(touchedCallbackSpy).toHaveBeenCalledTimes(1);
    });

    it('should not allow toggling whenever the radio button is disabled via disabled input', async () => {
        component.disabled = true;
        await toggle();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.value).toBeFalsy();
        expect(valueChangeSpy).not.toHaveBeenCalled();
        expect(changeCallbackSpy).not.toHaveBeenCalled();
        expect(touchedCallbackSpy).not.toHaveBeenCalled();
    });

    it('should not allow toggling whenever the radio button is disabled via Angular forms', async () => {
        component.setDisabledState(true);
        await toggle();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.value).toBeFalsy();
        expect(valueChangeSpy).not.toHaveBeenCalled();
        expect(changeCallbackSpy).not.toHaveBeenCalled();
        expect(touchedCallbackSpy).not.toHaveBeenCalled();
    });

    it('should not allow toggling whenever the radio button is marked as not clickable', async () => {
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
    selector: 'app-radio-button-value-test',
    template: `
        <div role="radiogroup" class="radio-button-container">
            <ux-radio-button
                name="group"
                [(value)]="selected"
                [option]="radioOptions.option1"
                [disabled]="disabled"
                [simplified]="simplified">
                Option1
            </ux-radio-button>

            <ux-radio-button
                name="group"
                [(value)]="selected"
                [clickable]="clickable"
                (valueChange)="onButtonClick()"
                [option]="radioOptions.option2"
                [simplified]="simplified">
                Option2
            </ux-radio-button>

            <ux-radio-button
                name="group"
                [(value)]="selected"
                [option]="radioOptions.option3"
                [simplified]="simplified">
                Option3
            </ux-radio-button>
        </div>
    `
})
export class RadioButtonValueTestComponent {

    selected: number | string | object = 100;

    radioOptions = {
        option1: 100,
        option2: 'string',
        option3: {
            test: 1
        }
    };

    disabled: boolean = false;
    simplified: boolean = false;
    clickable: boolean = true;

    onButtonClick(): void {}
}

describe('Radio Button Component - Value', () => {
    let component: RadioButtonValueTestComponent;
    let fixture: ComponentFixture<RadioButtonValueTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RadioButtonModule],
            declarations: [RadioButtonValueTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(RadioButtonValueTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should initialise correctly', () => {
        expect(component).toBeTruthy();

        expect(getRadioButtonContent(0, nativeElement)).toBe('Option1');
        expect(getRadioButtonContent(1, nativeElement)).toBe('Option2');
        expect(getRadioButtonContent(2, nativeElement)).toBe('Option3');
    });

    it('should have initially selected option', () => {
        expect(getNativeRadioButton(0, nativeElement).checked).toBeTruthy();
        expect(getNativeRadioButton(1, nativeElement).checked).toBeFalsy();
        expect(getNativeRadioButton(2, nativeElement).checked).toBeFalsy();

        expect(component.selected).toEqual(100);
    });

    it('should select an option when clicked', () => {

        // click on the second radio button
        getNativeRadioButton(1, nativeElement).click();

        fixture.detectChanges();

        expect(getNativeRadioButton(0, nativeElement).checked).toBeFalsy();
        expect(getNativeRadioButton(1, nativeElement).checked).toBeTruthy();
        expect(getNativeRadioButton(2, nativeElement).checked).toBeFalsy();

        expect(component.selected).toEqual('string');
    });

    it('should disable an option when the [disabled] input changes', () => {
       component.disabled = true;
       fixture.detectChanges();

        expect(getNativeRadioButton(0, nativeElement).disabled).toBeTruthy();
        expect(getRadioButtonLabel(0, nativeElement).classList.contains('ux-radio-button-disabled')).toBeTruthy();

        expect(getNativeRadioButton(1, nativeElement).disabled).toBeFalsy();
        expect(getRadioButtonLabel(1, nativeElement).classList.contains('ux-radio-button-disabled')).toBeFalsy();

        expect(getNativeRadioButton(2, nativeElement).disabled).toBeFalsy();
        expect(getRadioButtonLabel(2, nativeElement).classList.contains('ux-radio-button-disabled')).toBeFalsy();
    });

    it('should simplify an option when the [simplified] input changes', () => {
        component.simplified = true;
        fixture.detectChanges();

        expect(getRadioButtonLabel(0, nativeElement).classList.contains('ux-radio-button-simplified')).toBeTruthy();
        expect(getRadioButtonLabel(1, nativeElement).classList.contains('ux-radio-button-simplified')).toBeTruthy();
        expect(getRadioButtonLabel(2, nativeElement).classList.contains('ux-radio-button-simplified')).toBeTruthy();
    });

    it('should not allow an option 2 to be clicked when [clickable] input changes', () => {
        expect(component.selected).toEqual(100);

        component.clickable = false;
        fixture.detectChanges();
        getNativeRadioButton(1, nativeElement).click();
        fixture.detectChanges();

        expect(component.selected).toEqual(100);
    });

    it('should emit event on radio button click', () => {
        spyOn(component, 'onButtonClick');
        getNativeRadioButton(1, nativeElement).click();

        expect(component.onButtonClick).toHaveBeenCalled();

    });
});

@Component({
    selector: 'app-radio-button-value-test',
    template: `
        <div role="radiogroup" uxRadioButtonGroup [(value)]="selected" class="radio-button-container">
            <ux-radio-button
                name="group"
                [option]="radioOptions.option1"
                [disabled]="disabled"
                [simplified]="simplified">
                Option1
            </ux-radio-button>

            <ux-radio-button
                name="group"
                [clickable]="clickable"
                (valueChange)="onButtonClick()"
                [option]="radioOptions.option2"
                [simplified]="simplified">
                Option2
            </ux-radio-button>

            <ux-radio-button
                name="group"
                [option]="radioOptions.option3"
                [simplified]="simplified">
                Option3
            </ux-radio-button>
        </div>
    `
})
export class RadioButtonTestValueGroupComponent {

    selected: number | string | object = 100;

    radioOptions = {
        option1: 100,
        option2: 'string',
        option3: {
            test: 1
        }
    };

    disabled: boolean = false;
    simplified: boolean = false;
    clickable: boolean = true;

    onButtonClick(): void {}

}

describe('Radio Button Component - Value with uxRadioButtonGroup', () => {
    let component: RadioButtonTestValueGroupComponent;
    let fixture: ComponentFixture<RadioButtonTestValueGroupComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RadioButtonModule],
            declarations: [RadioButtonTestValueGroupComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(RadioButtonTestValueGroupComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should initialise correctly', () => {
        expect(component).toBeTruthy();

        expect(getRadioButtonContent(0, nativeElement)).toBe('Option1');
        expect(getRadioButtonContent(1, nativeElement)).toBe('Option2');
        expect(getRadioButtonContent(2, nativeElement)).toBe('Option3');
    });

    it('should have initially selected option', () => {
        expect(getNativeRadioButton(0, nativeElement).checked).toBeTruthy();
        expect(getNativeRadioButton(1, nativeElement).checked).toBeFalsy();
        expect(getNativeRadioButton(2, nativeElement).checked).toBeFalsy();

        expect(component.selected).toEqual(100);
    });

    it('should select an option when clicked', () => {

        // click on the second radio button
        getNativeRadioButton(1, nativeElement).click();

        fixture.detectChanges();

        expect(getNativeRadioButton(0, nativeElement).checked).toBeFalsy();
        expect(getNativeRadioButton(1, nativeElement).checked).toBeTruthy();
        expect(getNativeRadioButton(2, nativeElement).checked).toBeFalsy();

        expect(component.selected).toEqual('string');
    });

    it('should disable an option when the [disabled] input changes', () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(getNativeRadioButton(0, nativeElement).disabled).toBeTruthy();
        expect(getRadioButtonLabel(0, nativeElement).classList.contains('ux-radio-button-disabled')).toBeTruthy();

        expect(getNativeRadioButton(1, nativeElement).disabled).toBeFalsy();
        expect(getRadioButtonLabel(1, nativeElement).classList.contains('ux-radio-button-disabled')).toBeFalsy();

        expect(getNativeRadioButton(2, nativeElement).disabled).toBeFalsy();
        expect(getRadioButtonLabel(2, nativeElement).classList.contains('ux-radio-button-disabled')).toBeFalsy();
    });

    it('should simplify an option when the [simplified] input changes', () => {
        component.simplified = true;
        fixture.detectChanges();

        expect(getRadioButtonLabel(0, nativeElement).classList.contains('ux-radio-button-simplified')).toBeTruthy();
        expect(getRadioButtonLabel(1, nativeElement).classList.contains('ux-radio-button-simplified')).toBeTruthy();
        expect(getRadioButtonLabel(2, nativeElement).classList.contains('ux-radio-button-simplified')).toBeTruthy();
    });

    it('should not allow an option 2 to be clicked when [clickable] input changes', () => {
        expect(component.selected).toEqual(100);

        component.clickable = false;
        fixture.detectChanges();
        getNativeRadioButton(1, nativeElement).click();
        fixture.detectChanges();

        expect(component.selected).toEqual(100);
    });

    it('should emit event on radio button click', () => {
        spyOn(component, 'onButtonClick');
        getNativeRadioButton(1, nativeElement).click();

        expect(component.onButtonClick).toHaveBeenCalled();

    });
});

@Component({
    selector: 'app-radio-button-value-test',
    template: `
        <div role="radiogroup" class="radio-button-container">
            <ux-radio-button
                name="group"
                [(ngModel)]="selected"
                [option]="radioOptions.option1"
                [disabled]="disabled"
                [simplified]="simplified">
                Option1
            </ux-radio-button>

            <ux-radio-button
                name="group"
                [(ngModel)]="selected"
                [clickable]="clickable"
                (ngModelChange)="onButtonClick()"
                [option]="radioOptions.option2"
                [simplified]="simplified">
                Option2
            </ux-radio-button>

            <ux-radio-button
                [(ngModel)]="selected"
                name="group"
                [option]="radioOptions.option3"
                [simplified]="simplified">
                Option3
            </ux-radio-button>
        </div>
    `
})
export class RadioButtonTestNgModelComponent {

    selected: number | string | object = 100;

    radioOptions = {
        option1: 100,
        option2: 'string',
        option3: {
            test: 1
        }
    };

    disabled: boolean = false;
    simplified: boolean = false;
    clickable: boolean = true;

    onButtonClick(): void {}

}

describe('Radio Button Component - NgModel', () => {
    let component: RadioButtonTestNgModelComponent;
    let fixture: ComponentFixture<RadioButtonTestNgModelComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RadioButtonModule, FormsModule],
            declarations: [RadioButtonTestNgModelComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(RadioButtonTestNgModelComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should initialise correctly', () => {
        expect(component).toBeTruthy();

        expect(getRadioButtonContent(0, nativeElement)).toBe('Option1');
        expect(getRadioButtonContent(1, nativeElement)).toBe('Option2');
        expect(getRadioButtonContent(2, nativeElement)).toBe('Option3');
    });

    it('should have initially selected option', () => {

        expect(getNativeRadioButton(0, nativeElement).checked).toBeTruthy();
        expect(getNativeRadioButton(1, nativeElement).checked).toBeFalsy();
        expect(getNativeRadioButton(2, nativeElement).checked).toBeFalsy();

        expect(component.selected).toEqual(100);
    });

    it('should select an option when clicked', () => {

        // click on the second radio button
        getNativeRadioButton(1, nativeElement).click();

        fixture.detectChanges();

        expect(getNativeRadioButton(0, nativeElement).checked).toBeFalsy();
        expect(getNativeRadioButton(1, nativeElement).checked).toBeTruthy();
        expect(getNativeRadioButton(2, nativeElement).checked).toBeFalsy();

        expect(component.selected).toEqual('string');
    });

    it('should disable an option when the [disabled] input changes', () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(getNativeRadioButton(0, nativeElement).disabled).toBeTruthy();
        expect(getRadioButtonLabel(0, nativeElement).classList.contains('ux-radio-button-disabled')).toBeTruthy();

        expect(getNativeRadioButton(1, nativeElement).disabled).toBeFalsy();
        expect(getRadioButtonLabel(1, nativeElement).classList.contains('ux-radio-button-disabled')).toBeFalsy();

        expect(getNativeRadioButton(2, nativeElement).disabled).toBeFalsy();
        expect(getRadioButtonLabel(2, nativeElement).classList.contains('ux-radio-button-disabled')).toBeFalsy();
    });

    it('should simplify an option when the [simplified] input changes', () => {
        component.simplified = true;
        fixture.detectChanges();

        expect(getRadioButtonLabel(0, nativeElement).classList.contains('ux-radio-button-simplified')).toBeTruthy();
        expect(getRadioButtonLabel(1, nativeElement).classList.contains('ux-radio-button-simplified')).toBeTruthy();
        expect(getRadioButtonLabel(2, nativeElement).classList.contains('ux-radio-button-simplified')).toBeTruthy();
    });

    it('should not allow an option 2 to be clicked when [clickable] input changes', () => {
        expect(component.selected).toEqual(100);

        component.clickable = false;
        fixture.detectChanges();
        getNativeRadioButton(1, nativeElement).click();
        fixture.detectChanges();

        expect(component.selected).toEqual(100);
    });

    it('should emit event on radio button click', () => {
        spyOn(component, 'onButtonClick');
        getNativeRadioButton(1, nativeElement).click();

        expect(component.onButtonClick).toHaveBeenCalled();

    });
});

@Component({
    selector: 'app-radio-button-value-test',
    template: `
        <div role="radiogroup" uxRadioButtonGroup (ngModelChange)="onButtonClick()" [(ngModel)]="selected" class="radio-button-container">
            <ux-radio-button
                name="group"
                [option]="radioOptions.option1"
                [disabled]="disabled"
                [simplified]="simplified">
                Option1
            </ux-radio-button>

            <ux-radio-button
                name="group"
                [clickable]="clickable"
                [option]="radioOptions.option2"
                [simplified]="simplified">
                Option2
            </ux-radio-button>

            <ux-radio-button
                name="group"
                [option]="radioOptions.option3"
                [simplified]="simplified">
                Option3
            </ux-radio-button>
        </div>
    `
})
export class RadioButtonTestNgModelGroupComponent {

    selected: number | string | object = 100;

    radioOptions = {
        option1: 100,
        option2: 'string',
        option3: {
            test: 1
        }
    };

    disabled: boolean = false;
    simplified: boolean = false;
    clickable: boolean = true;

    onButtonClick(): void {}

}

describe('Radio Button Component - NgModel', () => {
    let component: RadioButtonTestNgModelGroupComponent;
    let fixture: ComponentFixture<RadioButtonTestNgModelGroupComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RadioButtonModule, FormsModule],
            declarations: [RadioButtonTestNgModelGroupComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(RadioButtonTestNgModelGroupComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should initialise correctly', () => {
        expect(component).toBeTruthy();

        expect(getRadioButtonContent(0, nativeElement)).toBe('Option1');
        expect(getRadioButtonContent(1, nativeElement)).toBe('Option2');
        expect(getRadioButtonContent(2, nativeElement)).toBe('Option3');
    });

    it('should have initially selected option', () => {
        expect(getNativeRadioButton(0, nativeElement).checked).toBeTruthy();
        expect(getNativeRadioButton(1, nativeElement).checked).toBeFalsy();
        expect(getNativeRadioButton(2, nativeElement).checked).toBeFalsy();

        expect(component.selected).toEqual(100);
    });

    it('should select an option when clicked', () => {

        // click on the second radio button
        getNativeRadioButton(1, nativeElement).click();

        fixture.detectChanges();

        expect(getNativeRadioButton(0, nativeElement).checked).toBeFalsy();
        expect(getNativeRadioButton(1, nativeElement).checked).toBeTruthy();
        expect(getNativeRadioButton(2, nativeElement).checked).toBeFalsy();

        expect(component.selected).toEqual('string');
    });

    it('should disable an option when the [disabled] input changes', () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(getNativeRadioButton(0, nativeElement).disabled).toBeTruthy();
        expect(getRadioButtonLabel(0, nativeElement).classList.contains('ux-radio-button-disabled')).toBeTruthy();

        expect(getNativeRadioButton(1, nativeElement).disabled).toBeFalsy();
        expect(getRadioButtonLabel(1, nativeElement).classList.contains('ux-radio-button-disabled')).toBeFalsy();

        expect(getNativeRadioButton(2, nativeElement).disabled).toBeFalsy();
        expect(getRadioButtonLabel(2, nativeElement).classList.contains('ux-radio-button-disabled')).toBeFalsy();
    });

    it('should simplify an option when the [simplified] input changes', () => {
        component.simplified = true;
        fixture.detectChanges();

        expect(getRadioButtonLabel(0, nativeElement).classList.contains('ux-radio-button-simplified')).toBeTruthy();
        expect(getRadioButtonLabel(1, nativeElement).classList.contains('ux-radio-button-simplified')).toBeTruthy();
        expect(getRadioButtonLabel(2, nativeElement).classList.contains('ux-radio-button-simplified')).toBeTruthy();
    });

    it('should not allow an option 2 to be clicked when [clickable] input changes', () => {
        expect(component.selected).toEqual(100);

        component.clickable = false;
        fixture.detectChanges();
        getNativeRadioButton(1, nativeElement).click();
        fixture.detectChanges();

        expect(component.selected).toEqual(100);
    });

    it('should emit event on radio button click', () => {
        spyOn(component, 'onButtonClick');
        getNativeRadioButton(1, nativeElement).click();

        expect(component.onButtonClick).toHaveBeenCalled();

    });
});

@Component({
    selector: 'app-radio-button-value-test',
    template: `
        <form [formGroup]="form">
            <div (valueChange)="onButtonClick()" uxRadioButtonGroup formControlName="option">
                <ux-radio-button [clickable]="clickable" [disabled]="disabled" [simplified]="simplified" [option]="1">Option 1</ux-radio-button>
                <ux-radio-button [simplified]="simplified"[option]="2" [required]="required">Option 2</ux-radio-button>
            </div>
        </form>
    `
})
export class RadioButtonTestReactiveFormComponent {

    form = new FormGroup({
        option: new FormControl(2),
    });

    required: boolean = false;
    disabled: boolean = false;
    simplified: boolean = false;
    clickable: boolean = true;

    onButtonClick(): void {}
}

describe('Radio Button Component - Reactive Form', () => {
    let component: RadioButtonTestReactiveFormComponent;
    let fixture: ComponentFixture<RadioButtonTestReactiveFormComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RadioButtonModule, ReactiveFormsModule],
            declarations: [RadioButtonTestReactiveFormComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(RadioButtonTestReactiveFormComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should initialise correctly', () => {
        expect(component).toBeTruthy();

        expect(getRadioButtonContent(0, nativeElement)).toBe('Option 1');
        expect(getRadioButtonContent(1, nativeElement)).toBe('Option 2');
    });

    it('should have initially selected option', () => {
        expect(getNativeRadioButton(0, nativeElement).checked).toBeFalsy();
        expect(getNativeRadioButton(1, nativeElement).checked).toBeTruthy();

        expect(component.form.value.option).toEqual(2);
    });

    it('should select an option when clicked', () => {

        // click on the first radio button
        getNativeRadioButton(0, nativeElement).click();

        fixture.detectChanges();

        expect(getNativeRadioButton(0, nativeElement).checked).toBeTruthy();
        expect(getNativeRadioButton(1, nativeElement).checked).toBeFalsy();

        expect(component.form.value.option).toEqual(1);
    });

    it('should disable an option when the [disabled] input changes', () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(getNativeRadioButton(0, nativeElement).disabled).toBeTruthy();
        expect(getRadioButtonLabel(0, nativeElement).classList.contains('ux-radio-button-disabled')).toBeTruthy();

        expect(getNativeRadioButton(1, nativeElement).disabled).toBeFalsy();
        expect(getRadioButtonLabel(1, nativeElement).classList.contains('ux-radio-button-disabled')).toBeFalsy();

    });

    it('should simplify an option when the [simplified] input changes', () => {
        component.simplified = true;
        fixture.detectChanges();

        expect(getRadioButtonLabel(0, nativeElement).classList.contains('ux-radio-button-simplified')).toBeTruthy();
        expect(getRadioButtonLabel(1, nativeElement).classList.contains('ux-radio-button-simplified')).toBeTruthy();
    });

    it('should not allow an option 1 to be clicked when [clickable] input changes', () => {
        expect(component.form.value.option).toEqual(2);

        component.clickable = false;
        fixture.detectChanges();
        getNativeRadioButton(0, nativeElement).click();
        fixture.detectChanges();

        expect(component.form.value.option).toEqual(2);
    });

    it('should emit event on radio button click', () => {
        spyOn(component, 'onButtonClick');
        getNativeRadioButton(0, nativeElement).click();
        fixture.detectChanges();

        expect(component.onButtonClick).toHaveBeenCalled();

    });

    it('should add a required attribute to the input when required is true', () => {
        component.required = true;

        fixture.detectChanges();

        const inputElementEmpty = nativeElement.querySelectorAll<HTMLInputElement>('input.ux-radio-button-input');
        const attributeRequired = inputElementEmpty[1].hasAttribute('required');

        expect(attributeRequired).toBe(true);
    });
});


function getRadioButton(index:  number, nativeElement: HTMLElement): HTMLElement {
    return nativeElement.querySelectorAll<HTMLElement>('ux-radio-button').item(index);
}

function getNativeRadioButton(index: number, nativeElement: HTMLElement): HTMLInputElement {
    return getRadioButton(index, nativeElement).querySelector('input');
}

function getRadioButtonLabel(index: number, nativeElement: HTMLElement): HTMLLabelElement {
    return getRadioButton(index, nativeElement).querySelector('label');
}

function getRadioButtonContent(index: number, nativeElement: HTMLElement): string {
    return getRadioButton(index, nativeElement).querySelector<HTMLDivElement>('.ux-radio-button-label').innerText;
}
