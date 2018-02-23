import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { TimelineEventComponent } from './timeline-event/timeline-event.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        TimelineComponent,
        TimelineEventComponent
    ],
    declarations: [
        TimelineComponent,
        TimelineEventComponent
    ]
})
export class TimelineModule { }
