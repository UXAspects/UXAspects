import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccessibilityModule } from '@ux-aspects/ux-aspects';
import { ILink } from '../../interfaces/ILink';

@Component({
  selector: 'uxd-landing-page-feature',
  templateUrl: './landing-page-feature.component.html',
  styleUrls: ['./landing-page-feature.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.col-md-12.col-sm-12]': 'columns === 1',
    '[class.col-md-6.col-sm-6]': 'columns === 2',
    '[class.col-md-3.col-sm-6]': 'columns === 4',
  },
  imports: [AccessibilityModule, RouterLink],
})
export class LandingPageFeatureComponent {
  @Input() header: string;
  @Input() description: string;
  @Input() image: string;
  @Input() link: ILink;
  @Input() columns: number = 4;
}
