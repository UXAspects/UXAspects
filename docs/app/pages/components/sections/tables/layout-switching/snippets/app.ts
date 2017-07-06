import { Component } from '@angular/core';
import { SliderOptions, SliderType } from 'ux-aspects';
import 'chance';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html',
    styleUrls: ['./src/app.component.css']
})
export class AppComponent {

    width: number = 100;
    group: string = 'table';
    documents: LayoutSwitchingData[] = [];

    options: SliderOptions = {
        type: SliderType.Value,
        track: {
            min: 40,
            max: 100,
            ticks: {
                major: {
                    show: true,
                    steps: 60,
                    labels: true,
                    formatter: (value: number) => value === 40 ? 'Narrow' : 'Wide'
                },
                minor: {
                    show: false
                }
            }
        }
    };

    layouts = {
        table: {
            group: 'table'
        },
        card: {
            group: 'card',
            minWidth: 620
        },
        cardstack: {
            group: 'card',
            maxWidth: 620
        }
    };

    constructor() {
        // create some sample data
        for (let idx = 1; idx < 10; idx++) {
            this.documents.push({ name: `Document ${idx}`, author: chance.name(), date: chance.date({ year: 2017 }) as Date });
        }
    }
}

interface LayoutSwitchingData {
    name: string;
    author: string;
    date: Date;
}