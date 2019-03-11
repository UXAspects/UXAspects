import { Component } from '@angular/core';
import 'chance';

@Component({
    selector: 'app-virtual-for',
    templateUrl: './virtual-for.testpage.component.html',
    styleUrls: ['./virtual-for.testpage.component.css']
})
export class VirtualForTestPageComponent {

    list: number[] = [];

    constructor() {
        for (let idx = 0; idx < 10000; idx++) {
            this.list.push(idx);
        }
    }
}