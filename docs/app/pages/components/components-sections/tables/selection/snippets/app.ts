import { Component } from '@angular/core';
import 'chance';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    data: TableData[] = [];
    selection: TableData[] = [];
    mode: string = 'simple';

    constructor() {
        for (let idx = 0; idx < 8; idx++) {
            this.data.push({
                name: `Document ${idx + 1}`,
                author: chance.name(),
                date: chance.date(),
                selected: false
            });
        }
    }
}

export interface TableData {
    name: string;
    author: string;
    date: Date;
    selected: boolean;
}
