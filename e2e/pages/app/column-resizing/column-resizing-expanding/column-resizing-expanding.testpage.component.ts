import { Component } from '@angular/core';

@Component({
    selector: 'app-column-resizing-expanding',
    templateUrl: './column-resizing-expanding.testpage.component.html',
    styleUrls: ['./column-resizing-expanding.testpage.component.less']
})
export class ColumnResizingExpandingTestpageComponent {

    documents: TableDocument[] = [];
    selection: TableDocument[] = [];

    titleWidth: number = 470;
    authorWidth: number = 470;
    thirdColumn: number = 50;
    forthColumn: number = 50;
    fithColumn: number = 50;

    addAdditionalColumns: boolean = false;

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
            });
        }
    }
}

interface TableDocument {
    selected: boolean;
    title: string;
    author: string;
}
