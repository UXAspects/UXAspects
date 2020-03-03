import { ChangeDetectionStrategy, SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputDropdownComponent } from './input-dropdown.component';
import { InputDropdownModule } from './input-dropdown.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('InputDropdownComponent', () => {
    let component: InputDropdownComponent<any>;
    let fixture: ComponentFixture<InputDropdownComponent<any>>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                InputDropdownModule,
                NoopAnimationsModule
            ]
        }).overrideComponent(InputDropdownComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default }
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputDropdownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should reset filter correctly', () => {
        component._filterText = 'Tralala';

        spyOn(component.filterChange, 'emit');
        spyOn(component.filterInputElement.nativeElement, 'focus');

        component.resetFilter(new MouseEvent('click'));

        fixture.detectChanges();
        expect(component._filterText).toEqual('');
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

    it('should open dropdown when dropdownOpen is programmatically set to true', async () => {

        // ngOnChanges does not get called in unit tests when there are no bindings set up so we must manually do this
        // to simulate the change of the dropdownOpen input
        component.ngOnChanges({
            dropdownOpen: new SimpleChange(false, true, false)
        });

        fixture.detectChanges();

        const dropdown = document.querySelector('.filter-container');
        expect(dropdown).toBeTruthy();
    });

    it('should close dropdown when dropdownOpen is programmatically set to false', async () => {

        component.dropdownOpen = true;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.dropdownOpen).toBeTruthy();

        component.dropdownOpen = false;
        fixture.detectChanges();
        await fixture.whenStable();

        let dropdown = document.querySelector('.filter-container');
        expect(dropdown).toBeFalsy();
    });

});
