import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'timeline-heading',
    templateUrl: './timeline-heading.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TimelineEventHeadingComponent {
    @Input() title: string;
    @Input() timestamp: Date;

    constructor() {}
}
