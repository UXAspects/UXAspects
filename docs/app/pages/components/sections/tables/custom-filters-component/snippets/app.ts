import { Component } from '@angular/core';
import { Filter } from 'ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html'
})
export class AppComponent {

    statusFilters: Filter[] = [{
        group: 'custom',
        title: 'Status',
        name: 'Status (All)',
        initial: true
    }, {
        group: 'custom',
        title: 'Active',
        name: 'Active'
    }, {
        group: 'custom',
        title: 'Inactive',
        name: 'Inactive'
    }];

}