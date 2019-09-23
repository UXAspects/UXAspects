import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import 'chance';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    data: ReorderableTableData[] = [];

    @ViewChildren('row') rows: QueryList<ElementRef>;

    constructor() {

        for (let idx = 0; idx < 10; idx++) {
            this.data.push({
                document: `Document ${idx}`,
                author: chance.name(),
                date: chance.date({ year: 2018 }) as Date,
                completed: chance.integer({ min: 10, max: 100 }),
                active: chance.bool()
            });
        }
    }

    movedown(data: ReorderableTableData, index: number, event: KeyboardEvent): void {
        const target = Math.min(index + 1, this.data.length - 1);
        this.data[index] = { ...this.data[target] };
        this.data[target] = { ...data };
        event.preventDefault();

        // ngFor blurs the element when shifting - we want to retain focus
        requestAnimationFrame(() => {
            // get the row we want to focus
            const targetElement = this.rows.toArray()[target];

            // if there is a target element then focus it
            if (targetElement) {
                targetElement.nativeElement.focus();
            }
        });
    }

    moveup(data: ReorderableTableData, index: number, event: KeyboardEvent): void {
        const target = Math.max(index - 1, 0);
        this.data[index] = { ...this.data[target] };
        this.data[target] = { ...data };
        event.preventDefault();

        // ngFor blurs the element when shifting - we want to retain focus
        requestAnimationFrame(() => {
            // get the row we want to focus
            const targetElement = this.rows.toArray()[target];

            // if there is a target element then focus it
            if (targetElement) {
                targetElement.nativeElement.focus();
            }
        });
    }
}

export interface ReorderableTableData {
    document: string;
    author: string;
    date: Date;
    completed: number;
    active: boolean;
}
