import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { TimelineEventComponent } from './timeline-event/timeline-event.component';
import { TimelineEventBadgeComponent } from './timeline-event/timeline-badge.component';
import { TimelineEventHeadingComponent } from './timeline-event/timeline-heading.component';
import { TimelineEventPanelComponent } from './timeline-event/timeline-panel.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        TimelineComponent,
        TimelineEventComponent,
        TimelineEventBadgeComponent,
        TimelineEventHeadingComponent,
        TimelineEventPanelComponent    
    ],
    declarations: [
        TimelineComponent,
        TimelineEventComponent,
        TimelineEventBadgeComponent,
        TimelineEventHeadingComponent,
        TimelineEventPanelComponent
    ]
})
export class TimelineModule { }
