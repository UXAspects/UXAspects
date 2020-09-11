import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SelectionModule } from './selection.module';
import { SelectionMode } from './selection.service';
import { AccessibilityModule, FocusIndicator } from '../accessibility/index';
import { SelectionDirective } from './selection.directive';
import { CheckboxModule } from '../../components/checkbox/index';
import { FocusOrigin } from '@angular/cdk/a11y';
import { SelectionItemDirective } from './selection-item.directive';

@Component({
    selector: 'app-selection-test',
    template: `
        <ul [mode]="mode"
            [(uxSelection)]="selection"
            (uxSelectionChange)="onSelectedChange($event)">

            <li *ngFor="let option of options"
                [uxSelectionItem]="option"
                (selectedChange)="onSelectedItemChange($event)">

                <ux-checkbox tabindex="-1"
                             [value]="isSelected(option)"
                             (valueChange)="setSelection(option, $event)">
                </ux-checkbox>
                {{ option }}
            </li>
        </ul>
    `
})
export class SelectionDirectiveSpec {

    mode: SelectionMode = 'simple';

    options: ReadonlyArray<string> = [
        'Option 1',
        'Option 2',
        'Option 3'
    ];

    selection: ReadonlyArray<string> = [
        'Option 2'
    ];

    @ViewChild(SelectionDirective) selectionDirective: SelectionDirective<string>;
    @ViewChildren(SelectionItemDirective) selectionItemDirectives: QueryList<SelectionItemDirective<string>>;

    onSelectedChange(_: string[]): void {
    }

    onSelectedItemChange(_: boolean): void {
    }

    isSelected(option: string): boolean {
        return this.selection.indexOf(option) !== -1;
    }

    selectAll(): void {
        this.selectionDirective.selectAll();
    }

    deselectAll(): void {
        this.selectionDirective.deselectAll();
    }

    setSelection(option: string, isSelected: boolean): void {
        if (isSelected) {
            this.selection = [...this.selection, option];
        } else {
            this.selection = this.selection.filter(opt => opt !== option);
        }
    }

    focusRow(index: number, origin: FocusOrigin): void {
        // access the private focus indicator instance for simulating focus with specific origins
        const row = this.selectionItemDirectives.toArray()[index];
        const focusIndicator = (row as any)._focusIndicator as FocusIndicator;

        focusIndicator.focus(origin);
    }
}

describe('Selection Directive', () => {
    let fixture: ComponentFixture<SelectionDirectiveSpec>;
    let component: SelectionDirectiveSpec;
    let nativeElement: HTMLElement;
    let onSelectedChangeSpy: jasmine.Spy;
    let onSelectedItemChangeSpy: jasmine.Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AccessibilityModule,
                CheckboxModule,
                SelectionModule
            ],
            declarations: [SelectionDirectiveSpec]
        }).compileComponents();

        fixture = TestBed.createComponent<SelectionDirectiveSpec>(SelectionDirectiveSpec);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;

        onSelectedChangeSpy = spyOn(component, 'onSelectedChange');
        onSelectedItemChangeSpy = spyOn(component, 'onSelectedItemChange');

        fixture.detectChanges();
    });

    it('should not emit any outputs on init', fakeAsync(() => {
        tick();
        expect(onSelectedChangeSpy).not.toHaveBeenCalled();
        expect(onSelectedItemChangeSpy).not.toHaveBeenCalled();
    }));

    it('should apply the ux-selection-selected class whenever an item is selected', fakeAsync(() => {
        expect(getListItem(1).classList).toContain('ux-selection-selected');
    }));

    it('should not emit uxSelectionChange when an input value changes, but should emit selectedChange on uxSelectionItem', fakeAsync(() => {
        component.selection = ['Option 1'];
        fixture.detectChanges();
        tick();

        expect(onSelectedChangeSpy).not.toHaveBeenCalled();
        expect(onSelectedItemChangeSpy).toHaveBeenCalledTimes(2);
    }));

    it('should emit whenever we select all and no items are selected', fakeAsync(() => {
        clearSelection();

        component.selectAll();
        fixture.detectChanges();
        tick();

        expect(onSelectedChangeSpy).toHaveBeenCalledTimes(1);
        expect(onSelectedChangeSpy).toHaveBeenCalledWith(['Option 1', 'Option 2', 'Option 3']);

        expect(onSelectedItemChangeSpy).toHaveBeenCalledTimes(3);
    }));

    it('should not emit whenever we select all and all items were previously selected', fakeAsync(() => {
        component.selection = ['Option 1', 'Option 2', 'Option 3'];
        fixture.detectChanges();
        tick();
        onSelectedItemChangeSpy.calls.reset();

        component.selectAll();
        fixture.detectChanges();
        tick();

        expect(onSelectedChangeSpy).not.toHaveBeenCalled();
        expect(onSelectedItemChangeSpy).not.toHaveBeenCalled();
    }));

    it('should emit whenever we deselect all and all items are selected', fakeAsync(() => {
        component.selection = ['Option 1', 'Option 2', 'Option 3'];
        fixture.detectChanges();
        tick();
        onSelectedItemChangeSpy.calls.reset();

        component.deselectAll();
        fixture.detectChanges();
        tick();

        expect(onSelectedChangeSpy).toHaveBeenCalledTimes(1);
        expect(onSelectedChangeSpy).toHaveBeenCalledWith([]);
        expect(onSelectedItemChangeSpy).toHaveBeenCalledTimes(3);
    }));

    it('should not emit whenever we deselect all and all items were previously unselected', fakeAsync(() => {
        clearSelection();

        component.deselectAll();
        fixture.detectChanges();
        tick();

        expect(onSelectedChangeSpy).not.toHaveBeenCalled();
        expect(onSelectedItemChangeSpy).not.toHaveBeenCalled();
    }));

    it('should select and emit on item click', fakeAsync(() => {
        clearSelection();

        getListItem(0).click();
        fixture.detectChanges();
        tick();

        expect(onSelectedChangeSpy).toHaveBeenCalledTimes(1);
        expect(onSelectedChangeSpy).toHaveBeenCalledWith(['Option 1']);
        expect(onSelectedItemChangeSpy).toHaveBeenCalledTimes(1);
    }));

    it('should deselect and emit on selected item click', fakeAsync(() => {
        getListItem(1).click();
        fixture.detectChanges();
        tick();

        expect(onSelectedChangeSpy).toHaveBeenCalledTimes(1);
        expect(onSelectedChangeSpy).toHaveBeenCalledWith([]);
        expect(onSelectedItemChangeSpy).toHaveBeenCalledTimes(1);
    }));

    it('should allow selection via uxSelectionItem selected property', fakeAsync(() => {
        clearSelection();
        toggleListItemCheckbox(0);

        expect(onSelectedChangeSpy).toHaveBeenCalledTimes(1);
        expect(onSelectedChangeSpy).toHaveBeenCalledWith(['Option 1']);
        expect(onSelectedItemChangeSpy).toHaveBeenCalledTimes(1);
        expect(onSelectedItemChangeSpy).toHaveBeenCalledWith(true);
    }));

    it('should allow deselection via uxSelectionItem selected property', fakeAsync(() => {
        toggleListItemCheckbox(1);

        expect(onSelectedChangeSpy).toHaveBeenCalledTimes(1);
        expect(onSelectedChangeSpy).toHaveBeenCalledWith([]);
        expect(onSelectedItemChangeSpy).toHaveBeenCalledTimes(1);
        expect(onSelectedItemChangeSpy).toHaveBeenCalledWith(false);
    }));

    it('should add the "ux-selection-focused" class when an item is focused via keyboard', fakeAsync(() => {
        expect(getListItem(0).classList).not.toContain('ux-selection-focused');
        component.focusRow(0, 'keyboard');
        fixture.detectChanges();
        expect(getListItem(0).classList).toContain('ux-selection-focused');
    }));

    it('should not add the "ux-selection-focused" class when an item is focused via mouse', fakeAsync(() => {
        expect(getListItem(0).classList).not.toContain('ux-selection-focused');
        component.focusRow(0, 'mouse');
        fixture.detectChanges();
        expect(getListItem(0).classList).not.toContain('ux-selection-focused');
    }));

    it('should not add the "ux-selection-focused" class when an item is focused via programmatic focus', fakeAsync(() => {
        expect(getListItem(0).classList).not.toContain('ux-selection-focused');
        component.focusRow(0, 'program');
        fixture.detectChanges();
        expect(getListItem(0).classList).not.toContain('ux-selection-focused');
    }));

    it('should remove the "ux-selection-focused" class when an item is blurred', () => {
        component.focusRow(0, 'keyboard');
        fixture.detectChanges();
        expect(getListItem(0).classList).toContain('ux-selection-focused');
        getListItem(0).dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        expect(getListItem(0).classList).not.toContain('ux-selection-focused');
    });

    describe('mode = "row"', () => {
        beforeEach(() => {
            component.mode = 'row';
            fixture.detectChanges();
        });

        it('should not emit when clicking on a selected item', fakeAsync(() => {
            getListItem(1).click();
            fixture.detectChanges();
            tick();

            expect(onSelectedChangeSpy).not.toHaveBeenCalled();
            expect(onSelectedItemChangeSpy).not.toHaveBeenCalled();
        }));

        it('should deselect and emit whenever a different item is selected', fakeAsync(() => {
            getListItem(0).click();
            fixture.detectChanges();
            tick();

            expect(onSelectedChangeSpy).toHaveBeenCalledTimes(1);
            expect(onSelectedItemChangeSpy).toHaveBeenCalledTimes(2);
        }));
    });

    describe('mode = "row-alt"', () => {
        beforeEach(() => {
            component.mode = 'row-alt';
            fixture.detectChanges();
        });

        it('should not emit when clicking on a selected item', fakeAsync(() => {
            getListItem(1).click();
            fixture.detectChanges();
            tick();

            expect(onSelectedChangeSpy).not.toHaveBeenCalled();
            expect(onSelectedItemChangeSpy).not.toHaveBeenCalled();
        }));

        it('should deselect and emit whenever a different item is selected', fakeAsync(() => {
            getListItem(0).click();
            fixture.detectChanges();
            tick();

            expect(onSelectedChangeSpy).toHaveBeenCalledTimes(1);
            expect(onSelectedItemChangeSpy).toHaveBeenCalledTimes(2);
        }));
    });

    function clearSelection(): void {
        component.selection = [];
        fixture.detectChanges();
        tick();
        onSelectedChangeSpy.calls.reset();
        onSelectedItemChangeSpy.calls.reset();
    }

    function getList(): HTMLElement {
        return nativeElement.querySelector('ul');
    }

    function getListItems(): HTMLElement[] {
        return Array.from(getList().querySelectorAll('li'));
    }

    function getListItem(index: number): HTMLElement {
        return getListItems()[index];
    }

    function getListItemCheckbox(index: number): HTMLElement {
        return getListItem(index).querySelector('ux-checkbox');
    }

    function toggleListItemCheckbox(index: number): void {
        getListItemCheckbox(index).click();
        fixture.detectChanges();
        tick();
    }
});
