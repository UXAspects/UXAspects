import { Component } from '@angular/core';
import { BaseSearchComponent } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'my-number-search',
    templateUrl: './my-number-search.component.html'
})
export class MyNumberSearchComponent extends BaseSearchComponent {
    type: string = 'number';
}