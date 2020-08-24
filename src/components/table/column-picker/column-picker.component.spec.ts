import { Component } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { TableModule } from '../table.module';
import { ColumnPickerGroup } from './column-picker.component';
import { ColumnPickerGroupItem } from './interfaces/column-picker-group-item.interface';

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

    it('should display the correct number of deselected columns',  () => {
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

    it('should display the correct number of selected columns',  () => {
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

    sort = (a: ColumnPickerGroupItem, b: ColumnPickerGroupItem) => {
        const aCombined = a.group ? `${a.group}${a.name}` : a.name;
        const bCombined = b.group ? `${b.group}${b.name}` : b.name;
        return aCombined.localeCompare(bCombined);
    }
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
        expect(deselectedRows[0]).toBe('Flag', 'row 0');
        expect(deselectedRows[1]).toBe('Location', 'row 1');
        expect(deselectedRows[2]).toBe('Author', 'row 2');
    });

    it('should not sort the selected columns', () => {
        const selected = getRowTextContents(1);
        selected.forEach((column, i) => {
            const selectedColumn = component.selected[i];
            expect(column).toEqual(getColumnPickerGroupItemName(selectedColumn));
        });
    });

    function getRowTextContents(listIndex: number): string[] {
        return Array.from(nativeElement.querySelectorAll('.column-picker-list')[listIndex].querySelectorAll('.column-picker-list-item'))
            .map(row => row.textContent.trim());
    }

    function getColumnPickerGroupItemName(column: string | ColumnPickerGroupItem) {
        return typeof column === 'object' ? column.name : column;
    }
});
