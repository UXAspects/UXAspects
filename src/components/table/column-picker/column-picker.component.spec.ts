import { Component } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { TableModule } from '../table.module';

@Component({
    selector: 'app-select-test',
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
        { group: 'Metadata', name: 'Author' },
        { group: 'Metadata', name: 'Category' },
        { group: 'Metadata', name: 'Date Created' },
        { group: 'Metadata', name: 'Date Modified' },
        { group: 'Metadata', name: 'Department' },
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
});

export interface ColumnPickerGroupItem {
    group?: string;
    name: string;
}

export interface ColumnPickerGroup {
    name: string;
    expanded?: boolean;
}
