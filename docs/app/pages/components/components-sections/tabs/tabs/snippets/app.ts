import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    tabs: Tab[] = [
        {
            icon: 'hpe-schedule',
            title: 'Schedule',
            content: chance.paragraph()
        },
        {
            icon: 'hpe-shield',
            title: 'Protection',
            content: chance.paragraph()
        },
        {
            icon: 'hpe-information',
            title: 'Solution',
            content: chance.paragraph()
        },
        {
            icon: 'hpe-analytics',
            title: 'Analytics',
            content: chance.paragraph()
        }
    ];
}

export interface Tab {
    icon: string;
    title: string;
    content: string;
}