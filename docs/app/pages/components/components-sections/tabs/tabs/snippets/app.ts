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

    minimal: boolean = true;
    
    set stacked(stacked: TabStackType) {
        this._stacked = stacked;

        // if the option is left or right we can not have minimal option disabled
        if (stacked === 'left' || stacked === 'right') {
            this.minimal = true;
        }
    }

    get stacked(): TabStackType {
        return this._stacked;
    }

    private _stacked: TabStackType = 'none';

}

export type TabStackType = 'left' | 'right' | 'none';

export interface Tab {
    icon: string;
    title: string;
    content: string;
}