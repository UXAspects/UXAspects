import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, SimpleChange } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InputDropdownComponent } from './input-dropdown.component';
import { InputDropdownModule } from './input-dropdown.module';

describe('InputDropdownComponent', () => {
    let component: InputDropdownComponent<any>;
    let fixture: ComponentFixture<InputDropdownComponent<any>>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                InputDropdownModule,
                NoopAnimationsModule
            ]
        }).overrideComponent(InputDropdownComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default }
        }).compileComponents();

        // access the overlay container
        inject([OverlayContainer], (oc: OverlayContainer) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
        })();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InputDropdownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    afterEach(() => {
        overlayContainer.ngOnDestroy();
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
        await fixture.whenStable();

        const dropdown = document.querySelector('.filter-container');
        expect(dropdown).toBeTruthy();
    });

    it('should close dropdown when dropdownOpen is programmatically set to false', async () => {

        component.ngOnChanges({
            dropdownOpen: new SimpleChange(false, true, false)
        });

        fixture.detectChanges();
        await fixture.whenStable();

        component.ngOnChanges({
            dropdownOpen: new SimpleChange(true, false, false)
        });

        fixture.detectChanges();
        await fixture.whenStable();

        const filter = document.querySelector('.filter-container');
        expect(filter).toBeFalsy();
    });

    it('dropdownOpenChange should not emit when dropdownOpen is programmatically set', async () => {

        component.ngOnChanges({
            dropdownOpen: new SimpleChange(false, true, false)
        });

        spyOn(component.dropdownOpenChange, 'emit');

        component.ngOnChanges({
            dropdownOpen: new SimpleChange(true, false, false)
        });

        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.dropdownOpenChange.emit).not.toHaveBeenCalled();
    });

    it('dropdownOpenChange should emit when dropdownOpen is set by the component', async () => {

        spyOn(component.dropdownOpenChange, 'emit');

        component.inputFocusHandler();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.dropdownOpenChange.emit).toHaveBeenCalledWith(true);
    });

});
