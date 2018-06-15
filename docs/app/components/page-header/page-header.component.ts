import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'uxd-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHeaderComponent {
    @Input() header: string;
    @Input() description: string;
}