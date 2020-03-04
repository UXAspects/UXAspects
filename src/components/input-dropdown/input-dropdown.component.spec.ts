import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RadioButtonModule } from '../radiobutton/radiobutton.module';
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
});

@Component({
    selector: 'app-dropdown-test',
    template: `
        <ux-input-dropdown
            [(selected)]="selected"
            [dropdownOpen]="dropdownOpen"
            (dropdownOpenChange)="dropdownOpenChange($event)"
            (filterChange)="setFilter($event)"
            [allowNull]="allowNull"
            [maxHeight]="maxHeight"
            [placeholder]="placeholder"
            aria-label="Filter input">

            <ng-template #displayContent>
                <b>Selection:</b> {{ selected ? selected.name : '(none)' }}
            </ng-template>

            <div class="radio-button-container"
                 uxTabbableList>
                <ux-radio-button
                    uxTabbableListItem
                    *ngFor="let option of filteredOptionList"
                    name="group"
                    [(value)]="selected"
                    [option]="option"
                    (keydown.space)="selectOption($event, option)">
                    <!-- <span [innerHTML]="option.name | highlightSearch: filter">
                    </span> -->
                </ux-radio-button>
            </div>

        </ux-input-dropdown>
    `
})
export class InputDropdownTestComponent {

    inputFocusHandler() {
        this.dropdownOpen = true;
        this.dropdownOpenChange.emit(this.dropdownOpen);
    }

    /** Emits when `dropdownOpen` changes. */
    @Output() dropdownOpenChange = new EventEmitter<boolean>();
    @Input() dropdownOpen: boolean = false;
}

describe('InputDropdownComponent', () => {
    let component: InputDropdownTestComponent;
    let fixture: ComponentFixture<InputDropdownTestComponent>;
    let nativeElement: HTMLElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                InputDropdownModule,
                NoopAnimationsModule,
                RadioButtonModule
            ],
            declarations: [InputDropdownTestComponent]
        }).overrideComponent(InputDropdownTestComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default }
        }).compileComponents();

        // access the overlay container
        inject([OverlayContainer], (oc: OverlayContainer) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
        })();

        fixture = TestBed.createComponent(InputDropdownTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
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
    });

    it('dropdownOpenChange should not emit when dropdownOpen is programmatically set', async () => {

        component.dropdownOpen = true;

        fixture.detectChanges();
        await fixture.whenStable();

        spyOn(component.dropdownOpenChange, 'emit');
        component.dropdownOpen = false;

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
