import { Component, Pipe, PipeTransform } from '@angular/core';
import 'chance';

@Component({
    selector: 'e2e-reorderable-group',
    templateUrl: './reorderable-group.testpage.component.html',
    styles: [`
        .list {
            width: 100%;
            height: 300px;
            background-color: lightpink;
        }
        .list-item {
            width: 100%;
            border: 1px solid gray;
            padding: 15px;
            background-color: white;
        }
    `]
})
export class ReorderableGroupTestPageComponent {

    data1: ReorderableGroupData[] = [];
    data2: ReorderableGroupData[] = [];

    constructor() {
        for (let idx = 0; idx < 3; idx++) {
            this.data1.push({
                document: `Document ${idx}`
            });
        }
    }
}

export interface ReorderableGroupData {
    document: string;
}
