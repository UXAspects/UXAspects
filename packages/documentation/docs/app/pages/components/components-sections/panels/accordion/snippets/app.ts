import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {

    groups: AccordionGroup[] = [
        {
            heading: 'Accordion 1',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
            open: true
        },
        {
            heading: 'Accordion 2',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
            open: false
        },
        {
            heading: 'Accordion 3',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
            open: false
        }
    ];

}

interface AccordionGroup {
    heading: string;
    content: string;
    open: boolean;
}