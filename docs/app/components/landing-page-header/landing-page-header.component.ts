import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccessibilityModule } from '@ux-aspects/ux-aspects';
import { ILink } from '../../interfaces/ILink';

@Component({
  selector: 'uxd-landing-page-header',
  templateUrl: './landing-page-header.component.html',
  styleUrls: ['./landing-page-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AccessibilityModule, NgIf, RouterLink],
})
export class LandingPageHeaderComponent {
  @Input() brand: string;
  @Input() slogan: string;
  @Input() action: ILink;
  @Input() version: string;
  @Input() changelog: ILink;
}
