import { O, SHIFT, TAB } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { dispatchKeyboardEvent } from '../../common/testing/dispatch-event';
import { SelectModule } from './select.module';
import { By } from '@angular/platform-browser';
import { SelectComponent } from './select.component';

@Component({
    selector: 'app-select-test',
    template: `
        <ux-select (valueChange)="onValueChange()" (inputChange)="onInputChange()" *ngIf="visible" [(input)]="input" [(value)]="value" [options]="options" [multiple]="multiple" [allowNull]="allowNull" [clearButton]="clearButton" [placeholder]="placeholder"></ux-select>
    `
})
export class SelectTestComponent {

    onValueChange(): void { }

    onInputChange(): void { }

    input: string = '';
    value: string | string[];
    options: string[] = ['One', 'Two', 'Three'];
    multiple: boolean = false;
    allowNull: boolean = false;
    clearButton: boolean = false;
    visible: boolean = true;
    placeholder: string;
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

    it('should display placeholder as empty string if not set', () => {
        let placeholderTextInitial = fixture.nativeElement.querySelector('input').placeholder;
        expect(placeholderTextInitial).toBe('');

        component.placeholder = 'Placeholder Text';
        fixture.detectChanges();

        let placeholderText = fixture.nativeElement.querySelector('input').placeholder;
        expect(placeholderText).toBe('Placeholder Text');
    });

    it('should not call valueChange on initialization of single select', () => {
        spyOn(component, 'onValueChange');
        expect(component).toBeTruthy();
        expect(component.onValueChange).not.toHaveBeenCalled();
    });

    it('should not call valueChange on initialization of multiple select', () => {
        spyOn(component, 'onValueChange');
        component.multiple = true;
        fixture.detectChanges();

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

    it('should not call valueChange when the value Input is changed in single select', () => {
        spyOn(component, 'onValueChange');

        component.value = 'One';
        fixture.detectChanges();

        expect(component.onValueChange).not.toHaveBeenCalled();
    });

    it('should call not valueChange when the value Input is changed in multiple select', () => {
        component.multiple = true;
        fixture.detectChanges();

        spyOn(component, 'onValueChange');

        component.value = [component.options[0]];
        fixture.detectChanges();

        expect(component.onValueChange).not.toHaveBeenCalled();
    });


    it('should call not inputChange when the input is changed in single select', () => {
        spyOn(component, 'onInputChange');

        component.input = 'One';
        fixture.detectChanges();

        expect(component.onInputChange).not.toHaveBeenCalled();
    });

    it('should not call inputChange when the input is changed in multiple select', () => {
        component.multiple = true;
        fixture.detectChanges();

        spyOn(component, 'onInputChange');
        component.input = 'One';

        fixture.detectChanges();

        expect(component.onInputChange).not.toHaveBeenCalled();
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
        fixture.detectChanges();
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
        fixture.detectChanges();
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

    it('should reset to previous value when blurred and value does not match dropdown options', () => {
        component.input = 'One';
        component.value = 'One';
        fixture.detectChanges();

        component.input = 'two';
        fixture.detectChanges();

        expect(component.input).toBe('two');

        nativeElement.blur();
        fixture.detectChanges();
        expect(component.value).toBe('One');
    });

    function getClearButton(isMultiple: boolean = false): HTMLElement | null {
        return nativeElement.querySelector(`.${isMultiple ? 'ux-tag-icon' : 'ux-select-icon'}.ux-icon-close`);
    }
});

@Component({
    selector: 'app-select-value-test',
    template: `
        <ux-select (valueChange)="onValueChange()" [(value)]="value" [options]="options" [multiple]="multiple"></ux-select>
    `
})
export class SelectValueTestComponent {

    onValueChange(): void { }

    options: string[] = ['One', 'Two', 'Three'];
    value: string | string[];
    multiple: boolean;
}
describe('Select Component - Value Input', () => {
    let component: SelectValueTestComponent;
    let fixture: ComponentFixture<SelectValueTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SelectModule],
            declarations: [SelectValueTestComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectValueTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
    });

    it('should have an initial value set to One', async () => {
        spyOn(component, 'onValueChange');
        component.value = component.options[0];
        fixture.autoDetectChanges();
        await fixture.whenStable();

        let selectText = fixture.nativeElement.querySelector('input').value;
        expect(selectText).toEqual('One');

        expect(component.onValueChange).not.toHaveBeenCalled();
    });

    it('should have an initial value set to One when multiple is true', async() => {
        spyOn(component, 'onValueChange');

        component.multiple = true;
        component.value = [component.options[0]];
        fixture.detectChanges();
        await fixture.whenStable();

        let tagText = fixture.nativeElement.querySelector('.ux-tag-text').innerText;
        expect(tagText).toBe('One');

        expect(component.onValueChange).not.toHaveBeenCalled();
    });
});

@Component({
    selector: 'app-select-ng-model-test',
    template: `
        <ux-select (ngModelChange)="onValueChange()" [(ngModel)]="value" [options]="options" [multiple]="multiple"></ux-select>
    `
})
export class SelectNgModelTestComponent {

    options: string[] = ['One', 'Two', 'Three'];
    value: string | string[];
    multiple: boolean = false;

    onValueChange(): void { }
}

describe('Select Component - NgModel Input', () => {
    let component: SelectNgModelTestComponent;
    let fixture: ComponentFixture<SelectNgModelTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SelectModule,
                FormsModule
            ],
            declarations: [SelectNgModelTestComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectNgModelTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
    });

    it('should have an initial value set to One', async () => {
        component.value = component.options[0];
        fixture.autoDetectChanges();
        await fixture.whenStable();

        spyOn(component, 'onValueChange');

        let selectText = fixture.nativeElement.querySelector('input').value;
        expect(selectText).toEqual('One');

        expect(component.onValueChange).not.toHaveBeenCalled();
    });

    it('should have an initial value set to One when multiple is true', async () => {
        component.multiple = true;
        component.value = [component.options[0]];
        fixture.autoDetectChanges();
        await fixture.whenStable();

        spyOn(component, 'onValueChange');

        const tags = fixture.nativeElement.querySelectorAll('li.ux-tag');
        expect(tags.length).toBe(1);

        expect(component.onValueChange).not.toHaveBeenCalled();
    });

    it('should change from untouched to touched when clicking the input in single mode', async () => {

        // await for forms to register handlers
        fixture.detectChanges();
        await fixture.whenStable();

        // get the select component instance
        const select = fixture.debugElement.query(By.directive(SelectComponent)).componentInstance;

        // spy on the touched event
        const touchedSpy = spyOn(select, '_onTouched');

        component.multiple = false;
        component.value = component.options[0];
        fixture.detectChanges();
        await fixture.whenStable();

        expect(touchedSpy).not.toHaveBeenCalled();

        getSelect(component.multiple).dispatchEvent(new Event('focus'));
        fixture.detectChanges();
        await fixture.whenStable();

        expect(touchedSpy).toHaveBeenCalled();
    });

    it('should change from untouched to touched when clicking the input in multiple mode', async () => {

        // await for forms to register handlers
        fixture.detectChanges();
        await fixture.whenStable();

        // get the select component instance
        const select = fixture.debugElement.query(By.directive(SelectComponent)).componentInstance;

        // spy on the touched event
        const touchedSpy = spyOn(select, '_onTouched');

        component.multiple = true;
        component.value = [component.options[0]];
        fixture.detectChanges();
        await fixture.whenStable();

        expect(touchedSpy).not.toHaveBeenCalled();

        getMultipleSelectInput().dispatchEvent(new Event('focus'));
        fixture.detectChanges();
        await fixture.whenStable();

        expect(touchedSpy).toHaveBeenCalled();
    });

    it('should not open dropdown when tabbing past select', async () => {
        fixture.detectChanges();

        const input = getInput();
        input.focus();
        dispatchKeyboardEvent(input, 'keydown', TAB, null, 'Tab');

        await fixture.whenStable();

        fixture.detectChanges();
        expect(getTypeahead()).toBeFalsy();
    });

    it('should not open dropdown when pressing a not printable key such as shift', async () => {
        fixture.detectChanges();

        const input = getInput();
        input.focus();
        dispatchKeyboardEvent(input, 'keydown', SHIFT, null, 'Shift');

        await fixture.whenStable();

        fixture.detectChanges();
        expect(getTypeahead()).toBeFalsy();
    });

    it('should open dropdown when entering value', async () => {
        fixture.detectChanges();

        const input = getInput();
        input.focus();

        dispatchKeyboardEvent(input, 'keydown', O, null, 'o');
        component.value = 'O';
        fixture.detectChanges();

        await fixture.whenStable();
        expect(getTypeahead()).toBeTruthy();
    });


    function getInput(): HTMLElement | null {
        return nativeElement.querySelector('input.form-control');
    }

    function getTypeahead(): HTMLElement | null {
        return nativeElement.querySelector('ux-typeahead.open');
    }

    function getSelect(isMultiple: boolean): HTMLElement | null {
        return nativeElement.querySelector(`ux-select ${isMultiple ? 'ux-tag-input' : 'input.form-control'}`);
    }

    function getMultipleSelectInput(): HTMLInputElement {
        return nativeElement.querySelector('input.ux-tag-input');
    }
});

@Component({
    selector: 'app-select-reactive-form-test',
    template: `
        <form [formGroup]="form">
            <ux-select formControlName="select" [options]="options" [multiple]="multiple"></ux-select>
        </form>
    `
})
export class SelectReactiveFormTestComponent {

    multiple: boolean = false;

    form = new FormGroup({
        select: new FormControl('One')
    });

    options: string[] = ['One', 'Two', 'Three'];

    onValueChange(): void { }
}

describe('Select Component - Reactive Form Input', () => {
    let component: SelectReactiveFormTestComponent;
    let fixture: ComponentFixture<SelectReactiveFormTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SelectModule,
                ReactiveFormsModule
            ],
            declarations: [SelectReactiveFormTestComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectReactiveFormTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
    });

    it('should have an initial value set One', async () => {
        fixture.autoDetectChanges();
        await fixture.whenStable();
        spyOn(component, 'onValueChange');

        let selectText = fixture.nativeElement.querySelector('input').value;
        expect(selectText).toEqual('One');

        expect(component.onValueChange).not.toHaveBeenCalled();
    });

    it('should have an initial value set One when multiple is true', () => {
        component.multiple = true;
        component.form.setValue({
            select: ['One']
        });
        fixture.detectChanges();

        spyOn(component, 'onValueChange');

        let tagText = fixture.nativeElement.querySelector('.ux-tag-text').innerText;
        expect(tagText).toBe('One');

        expect(component.onValueChange).not.toHaveBeenCalled();
    });
});

@Component({
    selector: 'app-select-test',
    template: `
        <ux-select (valueChange)="onValueChange()" (inputChange)="onInputChange()" *ngIf="visible" [(input)]="input" [(value)]="value" [options]="options" [multiple]="multiple" [allowNull]="allowNull" [clearButton]="clearButton" [placeholder]="placeholder">
            <ng-template #icon *ngIf="multiple">
                <div class="ux-select-icon">
                    <i class="ux-icon ux-icon-add"></i>
                </div>
            </ng-template>
        </ux-select>
    `
})
export class SingleSelectWithCustomIconTestComponent {
    input: string = '';
    value: string | string[];
    options: string[] = ['One', 'Two', 'Three'];
    multiple: boolean = false;
    allowNull: boolean = false;
    clearButton: boolean = false;
    visible: boolean = true;
    placeholder: string;

    onValueChange(): void { }
    onInputChange(): void { }
}

describe('Select Component - With custom Icon', () => {
    let component: SingleSelectWithCustomIconTestComponent;
    let fixture: ComponentFixture<SingleSelectWithCustomIconTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SelectModule],
            declarations: [SingleSelectWithCustomIconTestComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SingleSelectWithCustomIconTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
    });

    it('should close the dropdown when clicking on custom icon multiple mode', () => {
        component.multiple = true;
        component.value = [component.options[0]];
        fixture.detectChanges();

        // click on icon to open typeahead, expect a class of open
        getCustomIcon().click();
        fixture.detectChanges();
        expect(getTypeahead()).toBeTruthy();

        // Click on button again to close, expect no class of open
        getCustomIcon().click();
        fixture.detectChanges();
        expect(getTypeahead()).toBeFalsy();
        fixture.detectChanges();
    });

    it('should close the dropdown when clicking on custom icon single mode', () => {
        component.multiple = false;
        component.value = component.options[0];
        fixture.detectChanges();

        // click on icon to open typeahead, expect a class of open
        getCustomIcon().click();
        fixture.detectChanges();
        expect(getTypeahead()).toBeTruthy();
        fixture.detectChanges();

        // Click on button again to close, expect no class of open
        getCustomIcon().click();
        fixture.detectChanges();
        expect(getTypeahead()).toBeFalsy();
        fixture.detectChanges();
    });

    function getTypeahead(): HTMLElement | null {
        return nativeElement.querySelector('ux-typeahead.open');
    }

    function getCustomIcon(): HTMLElement | null {
        return nativeElement.querySelector('.ux-select-icon');
    }
});

@Component({
    selector: 'app-select-with-recent-options-test',
    template: `
        <ux-select [(value)]="value"
            [options]="options"
            [multiple]="multiple"
            [allowNull]="allowNull"
            [(dropdownOpen)]="dropdownOpen"
            [(recentOptions)]="recentOptions"
            [recentOptionsMaxCount]="recentOptionsMaxCount"
            (recentOptionsChange)="onRecentOptionsChange($event)"></ux-select>
    `
})
export class SelectWithRecentOptionsTestComponent {

    value: string | string[];
    options: string[] = ['One', 'Two', 'Three'];
    multiple: boolean = false;
    allowNull: boolean = false;
    dropdownOpen: boolean = true;
    recentOptions: string[] = [];
    recentOptionsMaxCount = 2;

    onRecentOptionsChange(_: string[]): void {}
}

describe('Select with recent options', () => {

    let component: SelectWithRecentOptionsTestComponent;
    let fixture: ComponentFixture<SelectWithRecentOptionsTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SelectModule],
            declarations: [SelectWithRecentOptionsTestComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectWithRecentOptionsTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should initially display no recent options', () => {
        expect(nativeElement.querySelector('.ux-typeahead-recent-options')).toBeNull();
    });

    it('should display provided recent options', () => {
        component.recentOptions = ['One', 'Two'];
        fixture.detectChanges();

        expect(nativeElement.querySelector('.ux-typeahead-recent-options')).not.toBeNull();

        const recentOptionListItems = nativeElement.querySelectorAll('.ux-typeahead-recent-options li');
        expect(recentOptionListItems.length).toBe(2);
        expect((recentOptionListItems[0] as HTMLElement).innerText).toBe('One');
        expect((recentOptionListItems[1] as HTMLElement).innerText).toBe('Two');
    });

    it('should not allow more than the maximum recent options', async () => {
        component.recentOptions = ['One', 'Two', 'Three'];
        fixture.detectChanges();
        await fixture.whenStable();

        expect(nativeElement.querySelector('.ux-typeahead-recent-options')).not.toBeNull();

        const recentOptionListItems = nativeElement.querySelectorAll('.ux-typeahead-recent-options li');
        expect(recentOptionListItems.length).toBe(2);
        expect((recentOptionListItems[0] as HTMLElement).innerText).toBe('One');
        expect((recentOptionListItems[1] as HTMLElement).innerText).toBe('Two');

        expect(component.recentOptions.length).toBe(2);
        expect(component.recentOptions[0]).toBe('One');
        expect(component.recentOptions[1]).toBe('Two');
    });

    it('should update recent options when maximum recent options changes', async () => {
        component.recentOptions = ['One', 'Two'];
        fixture.detectChanges();

        expect(nativeElement.querySelector('.ux-typeahead-recent-options')).not.toBeNull();

        let recentOptionListItems = nativeElement.querySelectorAll('.ux-typeahead-recent-options li');
        expect(recentOptionListItems.length).toBe(2);
        expect((recentOptionListItems[0] as HTMLElement).innerText).toBe('One');
        expect((recentOptionListItems[1] as HTMLElement).innerText).toBe('Two');

        component.recentOptionsMaxCount = 1;
        fixture.detectChanges();
        await fixture.whenStable();

        recentOptionListItems = nativeElement.querySelectorAll('.ux-typeahead-recent-options li');
        expect(recentOptionListItems.length).toBe(1);
        expect((recentOptionListItems[0] as HTMLElement).innerText).toBe('One');

        expect(component.recentOptions.length).toBe(1);
        expect(component.recentOptions[0]).toBe('One');
    });

});
