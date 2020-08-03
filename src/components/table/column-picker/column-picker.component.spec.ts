import { Component } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { TableModule } from '../table.module';
import { ColumnPickerGroupItem, ColumnPickerGroup } from './column-picker.component';

@Component({
    selector: 'app-column-picker',
    template: `
        <ux-column-picker
            [(selected)]="selected"
            [(deselected)]="deselected"
            [locked]="locked"
            [groups]="groups">
        </ux-column-picker>
    `
})
export class ColumnPickerTestComponent {
    selected: ReadonlyArray<string> = [
        'Type',
        'Date'
    ];

    locked: ReadonlyArray<string> = ['ID'];

    deselected: Array<string | ColumnPickerGroupItem> = [
        { group: 'Metadata', name: 'Department' },
        { group: 'Metadata', name: 'Author' },
        'Document ID',
        'Flag'
    ];

    groups: ColumnPickerGroup[] = [
        { name: 'Metadata', expanded: true }
    ];
}

describe('Column Picker Component', () => {
    let component: ColumnPickerTestComponent;
    let fixture: ComponentFixture<ColumnPickerTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TableModule],
            declarations: [ColumnPickerTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ColumnPickerTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should display the correct number of deselected columns', async () => {
        expect(component.deselected.length).toEqual(4);
        const deselected = nativeElement.querySelector('.column-picker-list').querySelectorAll('.column-picker-list-item').length;
        expect(deselected).toEqual(4);
    });

    it('should display the correct number of deselected columns after modification', async () => {
        component.deselected = ['Document ID', 'Flag'];

        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.deselected.length).toEqual(2);
        const deselected = nativeElement.querySelector('.column-picker-list').querySelectorAll('.column-picker-list-item').length;
        expect(deselected).toEqual(2);

        const numberOfDeselectedColumns = nativeElement.querySelector('.column-picker-stats');
        expect(numberOfDeselectedColumns.textContent.trim()).toEqual('0 of 2 selected');
    });

    it('should not sort the deselected columns when the sort input is undefined', () => {
        expect(component.deselected[0]).toEqual({ group: 'Metadata', name: 'Department' });
    });

    it('should display the correct number of selected columns', async () => {
        const numberOfSelectedColumns = nativeElement.querySelectorAll('.column-picker-stats')[1];
        expect(numberOfSelectedColumns.textContent.trim()).toEqual('3 columns added');
    });

    it('should display the correct number of selected columns after modification', async () => {
        component.selected = [];

        fixture.detectChanges();
        await fixture.whenStable();

        const numberOfSelectedColumns = nativeElement.querySelectorAll('.column-picker-stats')[1];
        expect(numberOfSelectedColumns.textContent.trim()).toEqual('1 columns added');
    });
});

@Component({
    selector: 'app-column-picker-sort',
    template: `
        <ux-column-picker
            [(selected)]="selected"
            [(deselected)]="deselected"
            [groups]="groups"
            [sort]="sort">
        </ux-column-picker>
    `
})
export class ColumnPickerSortTestComponent {
    selected: ReadonlyArray<string | ColumnPickerGroupItem> = [
        'Type',
        'Date'
    ];

    deselected: Array<string | ColumnPickerGroupItem> = [
        { group: 'Metadata', name: 'Author' },
        'Location',
        'Flag'
    ];

    groups: ColumnPickerGroup[] = [
        { name: 'Metadata', expanded: true }
    ];

    sort = (a: string | ColumnPickerGroupItem, b: string | ColumnPickerGroupItem) =>
        (a['name'] ?? a).localeCompare(b['name'] ?? b)
}

describe('Column Picker Component - Sort Input', () => {
    let component: ColumnPickerSortTestComponent;
    let fixture: ComponentFixture<ColumnPickerSortTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TableModule],
            declarations: [ColumnPickerSortTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ColumnPickerSortTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should sort deselected columns when the sort input is provided', () => {
        const deselectedRows = getRowTextContents(0);
        expect(deselectedRows[0]).toBe('Author', 'row 0');
        expect(deselectedRows[1]).toBe('Flag', 'row 1');
        expect(deselectedRows[2]).toBe('Location', 'row 2');
    });

    it('should not sort the selected columns', () => {
        const selected = getRowTextContents(1);
        selected.forEach((column, i) => {
            expect(column).toEqual(component.selected[i]['name'] || component.selected[i]);
        });
    });

    function getRowTextContents(listIndex: number): string[] {
        return Array.from(nativeElement.querySelectorAll('.column-picker-list')[listIndex].querySelectorAll('.column-picker-list-item'))
            .map(row => row.textContent.trim());
    }
});