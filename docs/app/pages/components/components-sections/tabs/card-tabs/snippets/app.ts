import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    position: string = 'top';

    tabs = [{
        title: 'Archive Totals',
        image: 'card-image-1',
        value: 637,
        unit: 'GB',
        subtitle: '63% licensed storage used',
        content: 'Lorem ipsum dolor sit amet...'
    }, {
        title: 'Data Processed',
        image: 'card-image-2',
        value: 1.3,
        unit: 'GB',
        subtitle: 'processed this month',
        content: 'Vestibulum faucibus porttitor...'
    }, {
        title: 'Data Retention',
        image: 'card-image-3',
        value: 242,
        unit: 'GB',
        subtitle: '39% data on hold',
        content: 'Mauris sit amet condimentum lorem...'
    }, {
        title: 'Users',
        image: 'card-image-4',
        value: 195,
        unit: null,
        subtitle: '76 logged in',
        content: 'In hac habitasse platea dictumst...'
    }, {
        title: 'Audit Trail',
        image: 'card-image-5',
        value: null,
        unit: null,
        subtitle: 'activity (last 7 days)',
        content: 'Fusce tempus aliquet tristique...'
    }];

}