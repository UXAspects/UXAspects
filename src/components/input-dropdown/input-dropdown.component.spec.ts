import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, SimpleChange } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RadioButtonModule } from '../radiobutton/radiobutton.module';
import { InputDropdownComponent } from './input-dropdown.component';
import { InputDropdownModule } from './input-dropdown.module';
import { FormsModule } from '@angular/forms';

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
        const selectedSpy = spyOn(component.selectedChange, 'emit');
        const newValue = 'Bla';
        component.writeValue(newValue);
        expect(component.selected).toEqual(newValue);
        expect(selectedSpy).not.toHaveBeenCalled();
    });

    it('should send the selected value to Angular Forms when a item is selected', () => {
        const onChangeSpy = spyOn(component, 'onChange');
        const newValue = 'Blubb';

        // ideally we should have a test suits using ngModel or reactive forms, but for now this
        // will emulate an item being selected
        component.ngOnChanges({
            selected: new SimpleChange(null, newValue, false)
        });

        expect(onChangeSpy).toHaveBeenCalledWith(newValue);
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('should register onTouched', () => {
        const onTouchedSpy = spyOn(component, 'onTouched');

        // ideally we should have a test suits using ngModel or reactive forms, but for now this
        // will emulate an item being selected
        component.ngOnChanges({
            selected: new SimpleChange(null, 'One', false)
        });

        expect(onTouchedSpy).toHaveBeenCalledTimes(1);
    });
});

@Component({
    selector: 'app-dropdown-test',
    template: `
        <ux-input-dropdown
            [(dropdownOpen)]="dropdownOpen"
            (dropdownOpenChange)="onOpenChange($event)">

            <ng-template #displayContent>
                <b>Selection:</b> {{ selected ? selected : '(none)' }}
            </ng-template>

            <div class="radio-button-container" uxTabbableList uxRadioButtonGroup [(ngModel)]="selected">
                <ux-radio-button uxTabbableListItem *ngFor="let option of options">
                    {{ option }}
                </ux-radio-button>
            </div>
        </ux-input-dropdown>
    `
})
export class InputDropdownTestComponent {

    dropdownOpen: boolean = false;
    options: string[] = ['One', 'Two', 'Three'];
    selected: string = null;

    onOpenChange(isOpen: boolean): void {
    }
}

describe('InputDropdownComponent', () => {
    let component: InputDropdownTestComponent;
    let fixture: ComponentFixture<InputDropdownTestComponent>;
    let nativeElement: HTMLElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let openChangeSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                InputDropdownModule,
                NoopAnimationsModule,
                RadioButtonModule,
                FormsModule
            ],
            declarations: [InputDropdownTestComponent]
        }).compileComponents();

        // access the overlay container
        inject([OverlayContainer], (oc: OverlayContainer) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
        })();

        fixture = TestBed.createComponent(InputDropdownTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        openChangeSpy = spyOn(component, 'onOpenChange');
        fixture.detectChanges();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    it('should open dropdown when dropdownOpen is programmatically set to true', async () => {
        component.dropdownOpen = true;

        fixture.detectChanges();
        await fixture.whenStable();

        const dropdown = document.querySelector('.filter-container');
        expect(dropdown).toBeTruthy();
        expect(openChangeSpy).not.toHaveBeenCalled();
    });

    it('should close dropdown when dropdownOpen is programmatically set to false', async () => {
        component.dropdownOpen = true;

        fixture.detectChanges();
        await fixture.whenStable();

        component.dropdownOpen = false;

        fixture.detectChanges();
        await fixture.whenStable();

        const filter = document.querySelector('.filter-container');
        expect(filter).toBeFalsy();

        expect(openChangeSpy).not.toHaveBeenCalled();
    });

    it('dropdownOpenChange should emit when the dropdown is toggled non-programmatically', async () => {
        let trigger = nativeElement.querySelector('button.form-control') as HTMLButtonElement;
        trigger.click();

        fixture.detectChanges();
        await fixture.whenStable();

        expect(openChangeSpy).toHaveBeenCalledTimes(1);
        expect(openChangeSpy).toHaveBeenCalledWith(true);

        trigger.click();

        fixture.detectChanges();
        await fixture.whenStable();

        expect(openChangeSpy).toHaveBeenCalledTimes(2);
        expect(openChangeSpy).toHaveBeenCalledWith(false);
    });
});
