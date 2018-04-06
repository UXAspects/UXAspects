import { Component } from '@angular/core';

@Component({
    selector: 'app-selection',
    templateUrl: './selection.testpage.component.html'
})
export class SelectionTestPageComponent {
    
    data: TableData[] = [
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
}

export interface TableData {
    name: string;
    author: string;
    selected: boolean;
}