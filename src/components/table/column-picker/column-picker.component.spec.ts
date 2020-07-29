import { Component } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { TableModule } from '../table.module';

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
        'Date',
        'Requested by',
        'Status',
        'Completion'
    ];

    locked: ReadonlyArray<string> = ['ID'];

    deselected: Array<string | ColumnPickerGroupItem> = [
        { group: 'Metadata', name: 'Department' },
        { group: 'Metadata', name: 'Author' },
        { group: 'Metadata', name: 'Category' },
        { group: 'Metadata', name: 'Date Created' },
        { group: 'Metadata', name: 'Date Modified' },
        'Document ID',
        'Flag',
        'From',
        'Icon',
        'Importance',
        'Location',
        'Location ID',
        'Message',
        { group: 'Metadata', name: 'Organization' },
        'Time',
        'Time Created',
        'Time Modified',
        'Work Completed'
    ];

    groups: ColumnPickerGroup[] = [
        { name: 'Metadata', expanded: true }
    ];
}

fdescribe('Column Picker Component', () => {
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
        expect(component.deselected.length).toEqual(18);
        let deselected = nativeElement.querySelector('.column-picker-list').querySelectorAll('.column-picker-list-item').length;
        expect(deselected).toEqual(18);

        component.deselected = ['Document ID', 'Flag', 'From', 'Icon'];

        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.deselected.length).toEqual(4);
        deselected = nativeElement.querySelector('.column-picker-list').querySelectorAll('.column-picker-list-item').length;
        expect(deselected).toEqual(4);
    });

    it('should not sort the deselected columns when the sort input is undefined', () => {
        expect(component.deselected[0]).toEqual({ group: 'Metadata', name: 'Department' });
    });

    it('should update the number of deselected columns available to select', async () => {
        let numberOfDeselectedColumns = nativeElement.querySelector('.column-picker-stats');
        expect(numberOfDeselectedColumns.textContent.trim()).toEqual('0 of 18 selected');

        component.deselected = ['Document ID', 'Flag', 'From', 'Icon'];

        fixture.detectChanges();
        await fixture.whenStable();

        numberOfDeselectedColumns = nativeElement.querySelector('.column-picker-stats');
        expect(numberOfDeselectedColumns.textContent.trim()).toEqual('0 of 4 selected');
    });

    it('should update the number of select columns added', async () => {
        let numberOfSelectedColumns = nativeElement.querySelectorAll('.column-picker-stats')[1];
        expect(numberOfSelectedColumns.textContent.trim()).toEqual('6 columns added');

        component.selected = [];

        fixture.detectChanges();
        await fixture.whenStable();

        numberOfSelectedColumns = nativeElement.querySelectorAll('.column-picker-stats')[1];
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
        'Date',
        'Requested by',
        'Status',
        'Completion'
    ];

    deselected: Array<string | ColumnPickerGroupItem> = [
        { group: 'Metadata', name: 'Department' },
        { group: 'Metadata', name: 'Author' },
        { group: 'Metadata', name: 'Category' },
        { group: 'Metadata', name: 'Date Created' },
        { group: 'Metadata', name: 'Date Modified' },
        'Document ID',
        'Flag',
        'From',
        'Icon',
        'Importance',
        'Location',
        'Location ID',
        'Message',
        { group: 'Metadata', name: 'Organization' },
        'Time',
        'Time Created',
        'Time Modified',
        'Work Completed'
    ];

    groups: ColumnPickerGroup[] = [
        { name: 'Metadata', expanded: true }
    ];

    sort = (a: string | ColumnPickerGroupItem, b: string | ColumnPickerGroupItem) =>
        (a['name'] ?? a).localeCompare(b['name'] ?? b);
}

fdescribe('Column Picker Component - Sort Input', () => {
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

    it('should sort grouped columns when the sort input is provided', () => {
        let names = [];
        nativeElement.querySelectorAll('.column-picker-tree-node-level-1')
            .forEach(element => names = [...names, element.textContent]);
        expect(names).toEqual(names.slice().sort());
    });

    it('should sort ungrouped columns when the sort input is provided', () => {
        let names = [];
        nativeElement.querySelectorAll('.column-picker-tree-node-level-0')
            .forEach(element => names = [...names, element.textContent]);
        expect(names).toEqual(names.slice().sort());
    });

    it('should not sort the selected columns', () => {
        const selected = nativeElement.querySelectorAll('.column-picker-list')[1].querySelectorAll('.column-picker-list-item');
        selected.forEach((column, i) => {
            expect(column.textContent.trim()).toEqual(component.selected[i]['name'] || component.selected[i]);
        });
    });
});

export interface ColumnPickerGroupItem {
    group?: string;
    name: string;
}

export interface ColumnPickerGroup {
    name: string;
    expanded?: boolean;
}
