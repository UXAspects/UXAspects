import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, SimpleChange } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RadioButtonModule } from '../radiobutton/radiobutton.module';
import { InputDropdownComponent } from './input-dropdown.component';
import { InputDropdownModule } from './input-dropdown.module';

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
        component.filter = 'Tralala';

        spyOn(component.filterChange, 'emit');
        spyOn(component.filterInputElement.nativeElement, 'focus');

        component.resetFilter();

        fixture.detectChanges();
        expect(component.filter).toEqual('');
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

    it('should send the selected value to Angular Forms when an item is selected', () => {
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

    it('should clear the filter when an item is selected', () => {
        const filterValue = 'habe';
        component.filter = filterValue;
        expect(component.filter).toEqual(filterValue);

        // ideally we should have a test suits using ngModel or reactive forms, but for now this
        // will emulate an item being selected
        component.ngOnChanges({
            selected: new SimpleChange(null, 'haberdasher', false)
        });

        expect(component.filter).toEqual('');
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
            [allowNull]="allowNull"
            [(dropdownOpen)]="dropdownOpen"
            [disabled]="disabled"
            (selectedChange)="onSelectedChange($event)"
            [(selected)]="selected"
            (dropdownOpenChange)="onOpenChange($event)">

            <ng-template #displayContent>
                <span class="selection"><b>Selection:</b> {{ selected ? selected : '(none)' }}</span>
            </ng-template>

            <div class="radio-button-container" uxTabbableList uxRadioButtonGroup [(ngModel)]="selected">
                <ux-radio-button uxTabbableListItem *ngFor="let option of options" [option]="option">
                    {{ option }}
                </ux-radio-button>
            </div>
        </ux-input-dropdown>
    `
})
export class InputDropdownTestComponent {

    disabled: boolean = false;
    dropdownOpen: boolean = false;
    allowNull: boolean = false;
    options: string[] = ['One', 'Two', 'Three'];
    selected: string = null;

    onSelectedChange(event: any): void { }

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

    it('should not focus the input field when dropdownOpen is programmatically set to true', async () => {
        component.dropdownOpen = true;

        fixture.detectChanges();
        await fixture.whenStable();

        const input = document.querySelector<HTMLInputElement>('input.form-control');

        expect(document.activeElement).not.toBe(input);
    });

    it('should focus the input field when dropdownOpen is opened with a click', async () => {
        const trigger = document.querySelector('button.form-control') as HTMLButtonElement;

        trigger.click();

        fixture.detectChanges();
        await fixture.whenStable();

        const input = document.querySelector<HTMLInputElement>('input.form-control');

        expect(document.activeElement).toBe(input);
    });

    it('dropdownOpenChange should emit when the dropdown is toggled non-programmatically', async () => {
        const trigger = nativeElement.querySelector('button.form-control') as HTMLButtonElement;
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

    it('should not open the dropdown when disabled is true', async () => {
        const trigger = nativeElement.querySelector('button.form-control') as HTMLButtonElement;
        component.disabled = true;

        trigger.click();
        fixture.detectChanges();
        await fixture.whenStable();

        const filterContainer = nativeElement.querySelector('.filter-container');
        expect(filterContainer).toBeNull();
    });

    it('should not retain focus on the button when disabled is true.', async () => {
        const trigger = nativeElement.querySelector('button.form-control') as HTMLButtonElement;
        component.disabled = true;

        fixture.detectChanges();
        await fixture.whenStable();

        // open menu
        trigger.click();
        fixture.detectChanges();
        await fixture.whenStable();

        const button = document.querySelector<HTMLInputElement>('button.form-control');

        expect(document.activeElement).not.toBe(button);
    });

    it('dropdownOpenChange should not emit when the button has been disabled', async () => {
        const trigger = nativeElement.querySelector('.ux-select-icon') as HTMLButtonElement;
        component.disabled = true;

        fixture.detectChanges();

        trigger.click();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(openChangeSpy).not.toHaveBeenCalled();
    });

    describe('with allowNull = true', () => {
        beforeEach(() => {
            component.allowNull = true;
            component.dropdownOpen = true;
            component.selected = 'One';
            fixture.detectChanges();
        });

        it('should set the selected display value to "(none)" when the clear button is clicked', async () => {
            const clearButton = nativeElement.querySelector('.ux-select-icon.ux-select-clear-icon') as HTMLButtonElement;
            clearButton.click();

            fixture.detectChanges();
            await fixture.whenStable();

            const title = nativeElement.querySelector<HTMLElement>('.selection');
            expect(title.innerText).toBe('Selection: (none)');
        });

        it('should emit selectedChange when the value has been cleared', async () => {
            spyOn(component, 'onSelectedChange');

            const clearButton = nativeElement.querySelector('.ux-select-icon.ux-select-clear-icon') as HTMLButtonElement;
            clearButton.click();

            fixture.detectChanges();
            await fixture.whenStable();

            expect(component.onSelectedChange).toHaveBeenCalledWith(undefined);
        });

        it('should not clear the value when disabled is true', async () => {
            component.disabled = true;
            fixture.detectChanges();

            const clearButton = nativeElement.querySelector('.ux-select-icon.ux-select-clear-icon') as HTMLButtonElement;
            clearButton.click();

            fixture.detectChanges();
            await fixture.whenStable();

            const title = nativeElement.querySelector<HTMLElement>('.selection');
            expect(title.innerText).toBe('Selection: One');
        });

    });
});
