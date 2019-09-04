import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    tabs: Tab[] = [
        {
            icon: 'schedule',
            title: 'Schedule',
            content: chance.paragraph()
        },
        {
            icon: 'shield',
            title: 'Protection',
            content: chance.paragraph()
        },
        {
            icon: 'information',
            title: 'Solution',
            content: chance.paragraph()
        },
        {
            icon: 'analytics',
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