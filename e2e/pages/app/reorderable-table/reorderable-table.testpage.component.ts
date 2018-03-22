import { Component, Pipe, PipeTransform } from '@angular/core';
import 'chance';

@Component({
    selector: 'e2e-reorderable-table',
    templateUrl: './reorderable-table.testpage.component.html'
})
export class ReorderableTableTestPageComponent {

    data: ReorderableTableData[] = [];

    constructor() {
        for (let idx = 0; idx < 3; idx++) {
            this.data.push({
                document: `Document ${idx}`,
                author: chance.name(),
                date: chance.date({ year: 2018 }) as Date,
                completed: chance.integer({ min: 10, max: 100 }),
                active: chance.bool()
            });
        }
    }
}

@Pipe({
    name: 'map',
    pure: true
})
export class MapPipe implements PipeTransform {
    transform(value: ReorderableTableData[], ...args: any[]) {
        return value.map(_value => _value.document);
    }
}

export interface ReorderableTableData {
    document: string;
    author: string;
    date: Date;
    completed: number;
    active: boolean;
}
