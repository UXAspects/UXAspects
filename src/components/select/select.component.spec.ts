import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectModule } from './select.module';

@Component({
    selector: 'app-select-test',
    template: `
        <ux-select (valueChange)="onValueChange()" (inputChange)="onInputChange()" *ngIf="visible" [(input)]="input" [(value)]="value" [options]="options" [multiple]="multiple" [allowNull]="allowNull" [clearButton]="clearButton"></ux-select>
    `
})
export class SelectTestComponent {

    onValueChange(): void {}

    onInputChange(): void {}

    input: string = '';
    value: string | string[];
    options: string[] = ['One', 'Two', 'Three'];
    multiple: boolean = false;
    allowNull: boolean = false;
    clearButton: boolean = false;
    visible: boolean = true;
}

describe('Select Component', () => {
    let component: SelectTestComponent;
    let fixture: ComponentFixture<SelectTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SelectModule],
            declarations: [SelectTestComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should not call valueChange on initialization of single select', () => {
        spyOn(component, 'onValueChange');
        expect(component).toBeTruthy();
        expect(component.onValueChange).not.toHaveBeenCalled();
    });

    it('should not call valueChange on initialization of multiple select', () => {
        component.multiple = true;
        fixture.detectChanges();

        spyOn(component, 'onValueChange');
        expect(component).toBeTruthy();
        expect(component.onValueChange).not.toHaveBeenCalled();
    });

    it('should not call inputChange on initialization of single select', () => {
        spyOn(component, 'onInputChange');
        expect(component).toBeTruthy();
        expect(component.onInputChange).not.toHaveBeenCalled();
    });

    it('should not call inputChange on initialization of multiple select', () => {
        component.multiple = true;
        fixture.detectChanges();

        spyOn(component, 'onInputChange');
        expect(component).toBeTruthy();
        expect(component.onInputChange).not.toHaveBeenCalled();
    });

    it('should call valueChange when the value is changed in single select', () => {
        spyOn(component, 'onValueChange');

        component.value = 'One';
        fixture.detectChanges();

        expect(component.onValueChange).toHaveBeenCalled();
    });

    it('should call valueChange when the value is changed in multiple select', () => {
        component.multiple = true;
        fixture.detectChanges();

        spyOn(component, 'onValueChange');

        component.value = [component.options[0]];
        fixture.detectChanges();

        expect(component.onValueChange).toHaveBeenCalled();
    });


    it('should call inputChange when the input is changed in single select', () => {
        spyOn(component, 'onInputChange');

        component.input = 'One';
        fixture.detectChanges();

        expect(component.onInputChange).toHaveBeenCalled();
    });

    it('should call inputChange when the input is changed in multiple select', () => {
        component.multiple = true;
        fixture.detectChanges();

        spyOn(component, 'onInputChange');
        component.input = 'One';

        fixture.detectChanges();

        expect(component.onInputChange).toHaveBeenCalled();
    });

    it('should not show the clear button by default in single select', () => {
        expect(getClearButton()).toBeFalsy();
    });

    it('should not show the clear button by default in single select when allowNull is true', () => {
        component.allowNull = true;
        fixture.detectChanges();
        expect(getClearButton()).toBeFalsy();
    });

    it('should not show the clear button by default in multiple select', () => {
        component.multiple = true;
        fixture.detectChanges();
        expect(getClearButton(true)).toBeFalsy();
    });

    it('should not show the clear button when there is a value but allowNull is false in single select', () => {
        component.input = 'One';
        component.value = 'One';
        component.clearButton = true;
        fixture.detectChanges();
        expect(getClearButton()).toBeFalsy();
    });

    it('should show the clear button when there is a value but allowNull is true in single select', () => {

        component.value = 'One';
        component.allowNull = true;
        component.clearButton = true;
        fixture.detectChanges();
        expect(getClearButton()).toBeTruthy();
    });

    it('should show the clear button when there is a value in multiple select', () => {
        component.multiple = true;
        component.value = [component.options[0]];
        component.clearButton = true;
        fixture.detectChanges();
        expect(getClearButton(true)).toBeTruthy();
    });

    it('should clear the value when clear button is clicked in single select', () => {
        component.value = 'One';
        component.allowNull = true;
        component.clearButton = true;
        fixture.detectChanges();
        expect(getClearButton()).toBeTruthy();

        // press the clear button
        getClearButton().click();
        fixture.detectChanges();

        expect(component.value).toBe(null);
        expect(component.input).toBe(null);
    });

    it('should clear the value when clear button is click in multiple select', () => {
        component.multiple = true;
        component.clearButton = true;
        component.value = [component.options[0]];
        fixture.detectChanges();

        expect(getClearButton(true)).toBeTruthy();
        getClearButton(true).click();
        fixture.detectChanges();

        expect(component.value).toEqual([]);
        expect(component.input).toBe('');

    });

    it('should not lose current value when blurred', () => {
        component.input = 'One';
        component.value = 'One';
        fixture.detectChanges();

        expect(component.value).toBe('One');

        nativeElement.blur();
        expect(component.value).toBe('One');

    });

    it('should reset to previous value when blurred called and value does not match dropdown options', () => {
        component.input = 'One';
        component.value = 'One';
        fixture.detectChanges();

        component.input = 'two';

        expect(component.input).toBe('two');

        nativeElement.blur();
        expect(component.value).toBe('One');
    });


    function getClearButton(isMultiple: boolean = false): HTMLElement | null {
        return nativeElement.querySelector(`.${isMultiple ? 'ux-tag-icon' : 'ux-select-icon'}.ux-icon-close`);
    }
});