import { Component, Input } from '@angular/core';

@Component({
    selector: 'ux-progressbar',
    templateUrl: './progressbar.component.html'
})
export class ProgressBarComponent {

    @Input() value: number;
    @Input() max: number = 100;
    @Input() trackColor: string = '#f5f5f5';
    @Input() barColor: string = '#60798d';

    constructor() { }
}
