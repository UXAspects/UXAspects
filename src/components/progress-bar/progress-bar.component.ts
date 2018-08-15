import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'ux-progress-bar',
    templateUrl: './progress-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
    @Input() value: number = 0;
    @Input() max: number = 100;
    @Input() indeterminate: boolean = false;
    @Input() trackColor: string;
    @Input() barColor: string;
}
