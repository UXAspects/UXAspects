import { Component } from '@angular/core';

@Component({
  selector: 'app-card-tabs',
  templateUrl: './card-tabs.testpage.component.html',
  styleUrls: ['./card-tabs.testpage.component.less'],
})
export class CardTabsTestPageComponent {

    position: string = 'top';

    tabs = [{
        title: 'Tab Title 1',
        content: 'Tab 1 Content'
    }, {
        title: 'Tab Title 2',
        content: 'Tab 2 Content'
    }, {
        title: 'Tab Title 3',
        content: 'Tab 3 Content'
    }, {
        title: 'Tab Title 4',
        content: 'Tab 4 Content'
    }, {
        title: 'Tab Title 5',
        content: 'Tab 5 Content'
    }];
}