import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AccessibilityModule } from '@ux-aspects/ux-aspects';

@Component({
  selector: 'uxd-showcase-card',
  templateUrl: './showcase-card.component.html',
  styleUrls: ['./showcase-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AccessibilityModule],
})
export class ShowcaseCardComponent {
  @Input() image: string;
  @Input() link: string;
}
