import { Component } from '@angular/core';

@Component({
    selector: 'app-column-resizing-expand',
    templateUrl: './column-resizing-expand.testpage.component.html',
})
export class ColumnResizingExpandTestpageComponent {

    documents: TableDocument[] = [];
    selection: TableDocument[] = [];

    titleWidth: number = 260;
    authorWidth: number = 300;
    dateWidth: number = 400;

    constructor() {
        // generate some dummy data
        this.getPage();
    }

    getPage(): void {
        for (let idx = 0; idx < 15; idx++) {
            this.documents.push({
                selected: false,
                title: `Document ${idx + 1}`,
                author: `Author ${idx + 1}`,
                date: new Date(2019, 8, 12)
            });
        }
    }
}

interface TableDocument {
    selected: boolean;
    title: string;
    author: string;
    date: Date;
}
