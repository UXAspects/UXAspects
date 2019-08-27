import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '../icon/index';
import { TimelineEventComponent } from './timeline-event/timeline-event.component';
import { TimelineComponent } from './timeline.component';

@NgModule({
    imports: [
        CommonModule,
        IconModule
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
