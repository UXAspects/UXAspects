import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SelectModule} from "./select.module";
import {ElementFinder} from "protractor";

@Component({
    selector: 'app-select-test',
    template: `
        <ux-select [options]="options" [multiple]="multiple" [allowNull]="allowNull" [clearButton]="clearButton"></ux-select>
    `
})
export class SelectTestComponent {

    options: string[] = ['One', 'Two', 'Three'];
    multiple: boolean = false;
    allowNull: boolean  = false;
    clearButton: boolean = false;


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

    it('should initialise', () => {
        expect(component).toBeTruthy();
    })

    it('should not show the clear button by default in single select', async () => {
        expect(getClearButton()).toBeFalsy();
    });

    it('should not show the clear button by default in single select when allowNull is true', async () => {
        component.allowNull = true;
        fixture.detectChanges();
        expect(getClearButton()).toBeFalsy();
    });

    it('should not show the clear button by default in multiple select', async () => {
        component.multiple = true;
        fixture.detectChanges();
        expect(getClearButton(true)).toBeFalsy();
    });

    it('should not show the clear button when there is a value but allowNull is false in single select', async () => {
        // await page.clickOnDropdown(false);
        // await page.clickOnCountry(false, 0);
        expect(getClearButton()).toBeFalsy();
    });

    it('should show the clear button when there is a value but allowNull is true in single select', async () => {

        // await page.clickOnDropdown(false);
        // await page.clickOnCountry(false, 0);
        component.allowNull = true;
        fixture.detectChanges();
        expect(getClearButton()).toBeTruthy();
    });

    it('should show the clear button when there is a value in multiple select', async () => {
        component.multiple = true;
        fixture.detectChanges();
        await page.clickOnDropdown(true);
        await page.clickOnCountry(true, 0);
        expect(getClearButton(true)).toBeTruthy();
    });

    it('should clear the value when clear button is click in single select', async () => {
        component.allowNull = true;
        fixture.detectChanges();
        await page.clickOnDropdown(false);
        await page.clickOnCountry(false, 0);
        expect(getClearButton()).toBeTruthy();
        expect(await page.getSelectedLocationText()).toBe('"United States"');

        // press the clear button
        await page.clickClearButton();
        expect(await page.selectedLocation.getText()).toBe('Selected location(s): null');
    });

    it('should clear the value when clear button is click in multiple select', async () => {
        component.multiple = true;
        fixture.detectChanges();
        await page.clickOnDropdown(true);
        await page.clickOnCountry(true, 0);
        expect(getClearButton(true)).toBeTruthy();
        expect(await page.getSelectedLocationText()).toBe('[ "United States" ]');

        // press the clear button
        await page.clickClearButton(true);
        expect(await page.selectedLocation.getText()).toBe('Selected location(s): []');
    });

    function getClearButton(isMultiple: boolean = false) {
        return nativeElement.querySelector(`.${isMultiple ? 'ux-tag-icon' : 'ux-select-icon'}.ux-icon-close`);
    }

});
