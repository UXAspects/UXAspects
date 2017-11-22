import { Component, OnInit } from '@angular/core';
import { BaseSearchComponent } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'my-number-search',
    templateUrl: './my-number-search.component.html'
})
export class MyNumberSearchComponent extends BaseSearchComponent implements OnInit {

    type: string = 'number';
    value: number;

    ngOnInit(): void {
        // get the initial value from the context object
        this.value = this.context.value;
    }
}