import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'ux-timeline',
    templateUrl: './timeline.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent { }