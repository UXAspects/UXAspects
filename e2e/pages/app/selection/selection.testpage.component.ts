import { Component } from '@angular/core';

@Component({
    selector: 'app-selection',
    templateUrl: './selection.testpage.component.html'
})
export class SelectionTestPageComponent {

    data: ReadonlyArray<TableData> = [
        {
            name: 'Document 1',
            author: 'John Smith',
            selected: false
        },
        {
            name: 'Document 2',
            author: 'John Smith',
            selected: false
        },
        {
            name: 'Document 3',
            author: 'John Smith',
            selected: false
        },
        {
            name: 'Document 4',
            author: 'John Smith',
            selected: false
        }
    ];

    selection: TableData[] = [];
    mode: string = 'simple';

    setDisabled(): void {
        this.data = [...this.data, {
            name: 'Document 5',
            author: 'John Smith',
            selected: false,
            disabled: true
        }];
    }
}

export interface TableData {
    name: string;
    author: string;
    selected: boolean;
    disabled?: boolean;
}