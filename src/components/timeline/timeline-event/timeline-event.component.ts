import { Component, Input } from '@angular/core';

let uniqueId: number = 0;

@Component({
    selector: 'ux-timeline-event',
    templateUrl: './timeline-event.component.html'
})
export class TimelineEventComponent {

    @Input() id: string = `ux-timeline-event-${uniqueId++}`;
    @Input() badgeColor: string;
    @Input() badgeTitle: string;
}