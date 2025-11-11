import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

let uniqueId: number = 0;

@Component({
  selector: 'ux-timeline-event',
  templateUrl: './timeline-event.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
})
export class TimelineEventComponent {
  /** Define the id for the event */
  @Input() id: string = `ux-timeline-event-${uniqueId++}`;

  /** Define the badge color */
  @Input() badgeColor: string;

  /** Define the title to display in the badge */
  @Input() badgeTitle: string;
}
