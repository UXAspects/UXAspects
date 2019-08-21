import { Component } from '@angular/core';

@Component({
    selector: 'app-virtual-for',
    templateUrl: './virtual-for.testpage.component.html',
    styleUrls: ['./virtual-for.testpage.component.css']
})
export class VirtualForTestPageComponent {

    list: ReadonlyArray<number> = [];

    constructor() {
        for (let idx = 0; idx < 10000; idx++) {
            this.list = [...this.list, idx];
        }
    }

    reorder(): void {
        this.list = [...this.list].reverse();
    }
}