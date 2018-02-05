import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'timeline-panel',
    templateUrl: './timeline-panel.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TimelineEventPanelComponent {
    @Input() title: string;
    @Input() timestamp: Date;

    constructor() {}
}
