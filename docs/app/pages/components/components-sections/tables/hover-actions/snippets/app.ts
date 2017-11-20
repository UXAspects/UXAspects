import { Component } from '@angular/core';
import 'chance';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html',
    styleUrls: ['./src/app.component.css']
})
export class AppComponent {

    documents: HoverActionDocument[] = [];

    constructor() {

        for (let idx = 1; idx < 6; idx++) {
            this.documents.push({
                name: `Document ${idx}`,
                author: chance.name(),
                date: chance.date({ year: 2017 }) as Date,
                complete: chance.floating({ min: 0, max: 100, fixed: 2 })
            });
        }
    }
}

interface HoverActionDocument {
    name: string;
    author: string;
    date: Date;
    complete: number;
}