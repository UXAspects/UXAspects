import { CommonModule } from '@angular/common';
import { ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconModule } from '../icon';
import { MenuModule } from '../menu';
import { InputDropdownComponent } from './input-dropdown.component';


describe('InputDropdownComponent', () => {
    let component: InputDropdownComponent<any>;
    let fixture: ComponentFixture<InputDropdownComponent<any>>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InputDropdownComponent],
            imports: [CommonModule, FormsModule, IconModule, MenuModule, BrowserAnimationsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputDropdownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.filterInputElement = new ElementRef({ focus: () => true });
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should reset filter correctly', () => {
        component.filterText = 'Tralala';

        spyOn(component.filterChange, 'emit');
        spyOn(component.filterInputElement.nativeElement, 'focus');

        component.resetFilter(new MouseEvent('click'));

        fixture.detectChanges();
        expect(component.filterText).toEqual('');
        expect(component.filterChange.emit).toHaveBeenCalledWith('');
        expect(component.filterInputElement.nativeElement.focus).toHaveBeenCalledWith();
    });

    it('should write value', () => {
        spyOn(component.selectedChange, 'emit');
        const newValue = 'Bla';

        component.writeValue(newValue);

        expect(component.selected).toEqual(newValue);
    });

    it('should register onChange', () => {
        const callbackObject = { callback: () => true };
        spyOn(callbackObject, 'callback');
        const newValue = 'Blubb';

        component.registerOnChange(callbackObject.callback);
        component.onChange(newValue);

        expect(callbackObject.callback).toHaveBeenCalledWith(newValue);
    });

    it('should register onTouched', () => {
        const callbackObject = { callback: () => true };
        spyOn(callbackObject, 'callback');

        component.registerOnTouched(callbackObject.callback);
        component.onTouched();

        expect(callbackObject.callback).toHaveBeenCalledWith();
    });

    it('should open dropdown when dropdownOpen is programmatically set to true', () => {
        debugger;
        // check dropdownOpen is currently false
        expect(component.dropdownOpen).toBeFalsy();
        spyOn(component.dropdownOpenChange, 'emit');

        // set dropdownOpen to be true
        component.dropdownOpen = true;
        fixture.detectChanges();
        debugger;
        // Check the filter-container is now visible
        let dropdown = document.querySelector('.filter-container');
        expect(dropdown).toBeTruthy();

        expect(component.dropdownOpenChange.emit).toHaveBeenCalledWith(true);
    });

    it('should close dropdown when dropdownOpen is programmatically set to false', async () => {

        component.dropdownOpen = true;
        fixture.detectChanges();
        expect(component.dropdownOpen).toBeTruthy();

        spyOn(component.dropdownOpenChange, 'emit');

        component.dropdownOpen = false;
        fixture.detectChanges();
        await fixture.whenStable();

        let dropdown = document.querySelector('.filter-container');
        expect(dropdown).toBeFalsy();

        expect(component.dropdownOpenChange.emit).toHaveBeenCalledWith(false);
    });
});
