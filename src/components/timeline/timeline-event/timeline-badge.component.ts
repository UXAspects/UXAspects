import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'timeline-badge',
    templateUrl: './timeline-badge.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TimelineEventBadgeComponent {
    @Input() badgeColor: string;
    @Input() badgeTitle: string;
    
    constructor() {}
}
