import { Component, Input } from '@angular/core';

@Component({
    selector: 'ux-timeline-event',
    templateUrl: './timeline-event.component.html'
})
export class TimelineEventComponent {

    @Input() badgeColor: string;
    @Input() badgeTitle: string;
    
    constructor () {}
}