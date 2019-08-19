import { ComponentFixture, TestBed} from '@angular/core/testing';
import { RadioButtonModule } from './radiobutton.module';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

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

        expect(getRadioButtonContent(0)).toBe('Option1');
        expect(getRadioButtonContent(1)).toBe('Option2');
        expect(getRadioButtonContent(2)).toBe('Option3');
    });

    it('should have initially selected option', () => {
        expect(getNativeRadioButton(0).checked).toBeTruthy();
        expect(getNativeRadioButton(1).checked).toBeFalsy();
        expect(getNativeRadioButton(2).checked).toBeFalsy();

        expect(component.selected).toEqual(100);
    });

    it('should select an option when clicked', () => {

        // click on the second radio button
        getNativeRadioButton(1).click();

        fixture.detectChanges();

        expect(getNativeRadioButton(0).checked).toBeFalsy();
        expect(getNativeRadioButton(1).checked).toBeTruthy();
        expect(getNativeRadioButton(2).checked).toBeFalsy();

        expect(component.selected).toEqual('string');
    });

    it('should disable an option when the [disabled] input changes', () => {
       component.disabled = true;
       fixture.detectChanges();

        expect(getNativeRadioButton(0).disabled).toBeTruthy();
        expect(getRadioButtonLabel(0).classList.contains('ux-radio-button-disabled')).toBeTruthy();

        expect(getNativeRadioButton(1).disabled).toBeFalsy();
        expect(getRadioButtonLabel(1).classList.contains('ux-radio-button-disabled')).toBeFalsy();

        expect(getNativeRadioButton(2).disabled).toBeFalsy();
        expect(getRadioButtonLabel(2).classList.contains('ux-radio-button-disabled')).toBeFalsy();
    });

    it('should simplify an option when the [simplified] input changes', () => {
        component.simplified = true;
        fixture.detectChanges();

        expect(getRadioButtonLabel(0).classList.contains('ux-radio-button-simplified')).toBeTruthy();
        expect(getRadioButtonLabel(1).classList.contains('ux-radio-button-simplified')).toBeTruthy();
        expect(getRadioButtonLabel(2).classList.contains('ux-radio-button-simplified')).toBeTruthy();
    });

    it('should not allow an option 2 to be clicked when [clickable] input changes', () => {
        expect(component.selected).toEqual(100);

        component.clickable = false;
        fixture.detectChanges();
        getNativeRadioButton(1).click();
        fixture.detectChanges();

        expect(component.selected).toEqual(100);
    });

    it('should emit event on radio button click', () => {
        spyOn(component, 'onButtonClick');
        getNativeRadioButton(1).click();

        expect(component.onButtonClick).toHaveBeenCalled();

    });

    function getRadioButton(index:  number): HTMLElement {
        return nativeElement.querySelectorAll<HTMLElement>('ux-radio-button').item(index);
    }

    function getNativeRadioButton(index: number): HTMLInputElement {
        return getRadioButton(index).querySelector('input');
    }

    function getRadioButtonLabel(index: number): HTMLLabelElement {
        return getRadioButton(index).querySelector('label');
    }

    function getRadioButtonContent(index: number): string {
        return getRadioButton(index).querySelector<HTMLDivElement>('.ux-radio-button-label').innerText;
    }
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

        expect(getRadioButtonContent(0)).toBe('Option1');
        expect(getRadioButtonContent(1)).toBe('Option2');
        expect(getRadioButtonContent(2)).toBe('Option3');
    });

    it('should have initially selected option', () => {
        expect(getNativeRadioButton(0).checked).toBeTruthy();
        expect(getNativeRadioButton(1).checked).toBeFalsy();
        expect(getNativeRadioButton(2).checked).toBeFalsy();

        expect(component.selected).toEqual(100);
    });

    it('should select an option when clicked', () => {

        // click on the second radio button
        getNativeRadioButton(1).click();

        fixture.detectChanges();

        expect(getNativeRadioButton(0).checked).toBeFalsy();
        expect(getNativeRadioButton(1).checked).toBeTruthy();
        expect(getNativeRadioButton(2).checked).toBeFalsy();

        expect(component.selected).toEqual('string');
    });

    it('should disable an option when the [disabled] input changes', () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(getNativeRadioButton(0).disabled).toBeTruthy();
        expect(getRadioButtonLabel(0).classList.contains('ux-radio-button-disabled')).toBeTruthy();

        expect(getNativeRadioButton(1).disabled).toBeFalsy();
        expect(getRadioButtonLabel(1).classList.contains('ux-radio-button-disabled')).toBeFalsy();

        expect(getNativeRadioButton(2).disabled).toBeFalsy();
        expect(getRadioButtonLabel(2).classList.contains('ux-radio-button-disabled')).toBeFalsy();
    });

    it('should simplify an option when the [simplified] input changes', () => {
        component.simplified = true;
        fixture.detectChanges();

        expect(getRadioButtonLabel(0).classList.contains('ux-radio-button-simplified')).toBeTruthy();
        expect(getRadioButtonLabel(1).classList.contains('ux-radio-button-simplified')).toBeTruthy();
        expect(getRadioButtonLabel(2).classList.contains('ux-radio-button-simplified')).toBeTruthy();
    });

    it('should not allow an option 2 to be clicked when [clickable] input changes', () => {
        expect(component.selected).toEqual(100);

        component.clickable = false;
        fixture.detectChanges();
        getNativeRadioButton(1).click();
        fixture.detectChanges();

        expect(component.selected).toEqual(100);
    });

    it('should emit event on radio button click', () => {
        spyOn(component, 'onButtonClick');
        getNativeRadioButton(1).click();

        expect(component.onButtonClick).toHaveBeenCalled();

    });

    function getRadioButton(index:  number): HTMLElement {
        return nativeElement.querySelectorAll<HTMLElement>('ux-radio-button').item(index);
    }

    function getNativeRadioButton(index: number): HTMLInputElement {
        return getRadioButton(index).querySelector('input');
    }

    function getRadioButtonLabel(index: number): HTMLLabelElement {
        return getRadioButton(index).querySelector('label');
    }

    function getRadioButtonContent(index: number): string {
        return getRadioButton(index).querySelector<HTMLDivElement>('.ux-radio-button-label').innerText;
    }
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

        expect(getRadioButtonContent(0)).toBe('Option1');
        expect(getRadioButtonContent(1)).toBe('Option2');
        expect(getRadioButtonContent(2)).toBe('Option3');
    });

    it('should have initially selected option', () => {

        expect(getNativeRadioButton(0).checked).toBeTruthy();
        expect(getNativeRadioButton(1).checked).toBeFalsy();
        expect(getNativeRadioButton(2).checked).toBeFalsy();

        expect(component.selected).toEqual(100);
    });

    it('should select an option when clicked', () => {

        // click on the second radio button
        getNativeRadioButton(1).click();

        fixture.detectChanges();

        expect(getNativeRadioButton(0).checked).toBeFalsy();
        expect(getNativeRadioButton(1).checked).toBeTruthy();
        expect(getNativeRadioButton(2).checked).toBeFalsy();

        expect(component.selected).toEqual('string');
    });

    it('should disable an option when the [disabled] input changes', () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(getNativeRadioButton(0).disabled).toBeTruthy();
        expect(getRadioButtonLabel(0).classList.contains('ux-radio-button-disabled')).toBeTruthy();

        expect(getNativeRadioButton(1).disabled).toBeFalsy();
        expect(getRadioButtonLabel(1).classList.contains('ux-radio-button-disabled')).toBeFalsy();

        expect(getNativeRadioButton(2).disabled).toBeFalsy();
        expect(getRadioButtonLabel(2).classList.contains('ux-radio-button-disabled')).toBeFalsy();
    });

    it('should simplify an option when the [simplified] input changes', () => {
        component.simplified = true;
        fixture.detectChanges();

        expect(getRadioButtonLabel(0).classList.contains('ux-radio-button-simplified')).toBeTruthy();
        expect(getRadioButtonLabel(1).classList.contains('ux-radio-button-simplified')).toBeTruthy();
        expect(getRadioButtonLabel(2).classList.contains('ux-radio-button-simplified')).toBeTruthy();
    });

    it('should not allow an option 2 to be clicked when [clickable] input changes', () => {
        expect(component.selected).toEqual(100);

        component.clickable = false;
        fixture.detectChanges();
        getNativeRadioButton(1).click();
        fixture.detectChanges();

        expect(component.selected).toEqual(100);
    });

    it('should emit event on radio button click', () => {
        spyOn(component, 'onButtonClick');
        getNativeRadioButton(1).click();

        expect(component.onButtonClick).toHaveBeenCalled();

    });

    function getRadioButton(index:  number): HTMLElement {
        return nativeElement.querySelectorAll<HTMLElement>('ux-radio-button').item(index);
    }

    function getNativeRadioButton(index: number): HTMLInputElement {
        return getRadioButton(index).querySelector('input');
    }

    function getRadioButtonLabel(index: number): HTMLLabelElement {
        return getRadioButton(index).querySelector('label');
    }

    function getRadioButtonContent(index: number): string {
        return getRadioButton(index).querySelector<HTMLDivElement>('.ux-radio-button-label').innerText;
    }
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

        expect(getRadioButtonContent(0)).toBe('Option1');
        expect(getRadioButtonContent(1)).toBe('Option2');
        expect(getRadioButtonContent(2)).toBe('Option3');
    });

    it('should have initially selected option', () => {
        expect(getNativeRadioButton(0).checked).toBeTruthy();
        expect(getNativeRadioButton(1).checked).toBeFalsy();
        expect(getNativeRadioButton(2).checked).toBeFalsy();

        expect(component.selected).toEqual(100);
    });

    it('should select an option when clicked', () => {

        // click on the second radio button
        getNativeRadioButton(1).click();

        fixture.detectChanges();

        expect(getNativeRadioButton(0).checked).toBeFalsy();
        expect(getNativeRadioButton(1).checked).toBeTruthy();
        expect(getNativeRadioButton(2).checked).toBeFalsy();

        expect(component.selected).toEqual('string');
    });

    it('should disable an option when the [disabled] input changes', () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(getNativeRadioButton(0).disabled).toBeTruthy();
        expect(getRadioButtonLabel(0).classList.contains('ux-radio-button-disabled')).toBeTruthy();

        expect(getNativeRadioButton(1).disabled).toBeFalsy();
        expect(getRadioButtonLabel(1).classList.contains('ux-radio-button-disabled')).toBeFalsy();

        expect(getNativeRadioButton(2).disabled).toBeFalsy();
        expect(getRadioButtonLabel(2).classList.contains('ux-radio-button-disabled')).toBeFalsy();
    });

    it('should simplify an option when the [simplified] input changes', () => {
        component.simplified = true;
        fixture.detectChanges();

        expect(getRadioButtonLabel(0).classList.contains('ux-radio-button-simplified')).toBeTruthy();
        expect(getRadioButtonLabel(1).classList.contains('ux-radio-button-simplified')).toBeTruthy();
        expect(getRadioButtonLabel(2).classList.contains('ux-radio-button-simplified')).toBeTruthy();
    });

    it('should not allow an option 2 to be clicked when [clickable] input changes', () => {
        expect(component.selected).toEqual(100);

        component.clickable = false;
        fixture.detectChanges();
        getNativeRadioButton(1).click();
        fixture.detectChanges();

        expect(component.selected).toEqual(100);
    });

    it('should emit event on radio button click', () => {
        spyOn(component, 'onButtonClick');
        getNativeRadioButton(1).click();

        expect(component.onButtonClick).toHaveBeenCalled();

    });

    function getRadioButton(index:  number): HTMLElement {
        return nativeElement.querySelectorAll<HTMLElement>('ux-radio-button').item(index);
    }

    function getNativeRadioButton(index: number): HTMLInputElement {
        return getRadioButton(index).querySelector('input');
    }

    function getRadioButtonLabel(index: number): HTMLLabelElement {
        return getRadioButton(index).querySelector('label');
    }

    function getRadioButtonContent(index: number): string {
        return getRadioButton(index).querySelector<HTMLDivElement>('.ux-radio-button-label').innerText;
    }
});

@Component({
    selector: 'app-radio-button-value-test',
    template: `  
        <form [formGroup]="form">
            <div (valueChange)="onButtonClick()" uxRadioButtonGroup formControlName="option">
                <ux-radio-button [clickable]="clickable" [disabled]="disabled" [simplified]="simplified" [option]="1">Option 1</ux-radio-button>
                <ux-radio-button [simplified]="simplified"[option]="2">Option 2</ux-radio-button>
            </div>
        </form>
    `
})
export class RadioButtonTestReactiveFormComponent {

    form = new FormGroup({
        option: new FormControl(2),
    });

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

        expect(getRadioButtonContent(0)).toBe('Option 1');
        expect(getRadioButtonContent(1)).toBe('Option 2');
    });

    it('should have initially selected option', () => {
        expect(getNativeRadioButton(0).checked).toBeFalsy();
        expect(getNativeRadioButton(1).checked).toBeTruthy();

        expect(component.form.value.option).toEqual(2);
    });

    it('should select an option when clicked', () => {

        // click on the first radio button
        getNativeRadioButton(0).click();

        fixture.detectChanges();

        expect(getNativeRadioButton(0).checked).toBeTruthy();
        expect(getNativeRadioButton(1).checked).toBeFalsy();

        expect(component.form.value.option).toEqual(1);
    });

    it('should disable an option when the [disabled] input changes', () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(getNativeRadioButton(0).disabled).toBeTruthy();
        expect(getRadioButtonLabel(0).classList.contains('ux-radio-button-disabled')).toBeTruthy();

        expect(getNativeRadioButton(1).disabled).toBeFalsy();
        expect(getRadioButtonLabel(1).classList.contains('ux-radio-button-disabled')).toBeFalsy();

    });

    it('should simplify an option when the [simplified] input changes', () => {
        component.simplified = true;
        fixture.detectChanges();

        expect(getRadioButtonLabel(0).classList.contains('ux-radio-button-simplified')).toBeTruthy();
        expect(getRadioButtonLabel(1).classList.contains('ux-radio-button-simplified')).toBeTruthy();
    });

    it('should not allow an option 1 to be clicked when [clickable] input changes', () => {
        expect(component.form.value.option).toEqual(2);

        component.clickable = false;
        fixture.detectChanges();
        getNativeRadioButton(0).click();
        fixture.detectChanges();

        expect(component.form.value.option).toEqual(2);
    });

    it('should emit event on radio button click', () => {
        spyOn(component, 'onButtonClick');
        getNativeRadioButton(0).click();
        fixture.detectChanges();

        expect(component.onButtonClick).toHaveBeenCalled();

    });

    function getRadioButton(index:  number): HTMLElement {
        return nativeElement.querySelectorAll<HTMLElement>('ux-radio-button').item(index);
    }

    function getNativeRadioButton(index: number): HTMLInputElement {
        return getRadioButton(index).querySelector('input');
    }

    function getRadioButtonLabel(index: number): HTMLLabelElement {
        return getRadioButton(index).querySelector('label');
    }

    function getRadioButtonContent(index: number): string {
        return getRadioButton(index).querySelector<HTMLDivElement>('.ux-radio-button-label').innerText;
    }
});