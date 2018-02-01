import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ux-timeline-event',
    templateUrl: './timeline-event.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TimelineEventComponent {
    @Input() event: any;

    constructor() {}
}
