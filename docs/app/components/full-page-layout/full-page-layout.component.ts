import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'uxd-full-page-layout',
    templateUrl: './full-page-layout.component.html',
    styleUrls: ['./full-page-layout.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullPageLayoutComponent { }