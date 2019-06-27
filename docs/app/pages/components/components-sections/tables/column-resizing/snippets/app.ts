import { Component, ViewChild } from '@angular/core';
import { ResizableTableDirective } from '@ux-aspects/ux-aspects';
import 'chance';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    type: string = 'table';
    documents: TableDocument[] = [];
    selection: TableDocument[] = [];

    titleWidth: number = 260;
    authorWidth: number = 300;
    dateWidth: number;

    @ViewChild(ResizableTableDirective, { static: false }) resizableTable: ResizableTableDirective;

    constructor() {
        // generate some dummy data
        for (let idx = 0; idx < 15; idx++) {
            this.documents.push({
                selected: false,
                title: `Document ${idx + 1}`,
                author: chance.name(),
                date: chance.date({ year: new Date().getFullYear() }) as Date
            });
        }
    }

    setToUniform(): void {
        this.resizableTable.setUniformWidths();
    }
}

interface TableDocument {
    selected: boolean;
    title: string;
    author: string;
    date: Date;
}