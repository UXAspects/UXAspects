import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'uxd-showcase-card',
    templateUrl: './showcase-card.component.html',
    styleUrls: ['./showcase-card.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowcaseCardComponent {
    @Input() image: string;
    @Input() link: string;
}