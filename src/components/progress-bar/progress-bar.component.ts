import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'ux-progress-bar',
    templateUrl: './progress-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        role: 'progressbar'
    }
})
export class ProgressBarComponent {
    @Input() value: number = 0;
    @Input() @HostBinding('attr.aria-valuemin') min: number = 0;
    @Input() @HostBinding('attr.aria-valuemax') max: number = 100;
    @Input() indeterminate: boolean = false;
    @Input() trackColor: string;
    @Input() barColor: string;

    /** When indeteminate we should omit the valuenow label */
    @HostBinding('attr.aria-valuenow') get valueNow() {
        return this.indeterminate ? null : this.value;
    }
}
