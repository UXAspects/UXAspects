import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccessibilityModule } from '@ux-aspects/ux-aspects';
import { IFooter } from '../../interfaces/IFooter';
import { IFooterColumn } from '../../interfaces/IFooterColumn';
import { ILink } from '../../interfaces/ILink';
import { ILogo } from '../../interfaces/ILogo';
import { AppConfiguration } from '../../services/app-configuration/app-configuration.service';

@Component({
  selector: 'uxd-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, RouterLink, AccessibilityModule],
})
export class PageFooterComponent {
  footerData: IFooter = this._appConfig.getConfigurationData('footer-navigation');
  copyright: string = this.footerData.copyright;
  logo: ILogo = this.footerData.logo;
  columns: IFooterColumn[] = this.footerData.columns;
  feedback: ILink = this.footerData.feedback;
  year: number = new Date().getFullYear();

  constructor(private readonly _appConfig: AppConfiguration) {}
}
