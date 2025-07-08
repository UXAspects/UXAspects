import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AccessibilityModule, IconModule } from '@ux-aspects/ux-aspects';
import { ILink } from '../../interfaces/ILink';
import { SiteTheme } from '../../interfaces/SiteTheme';
import { AppConfiguration } from '../../services/app-configuration/app-configuration.service';
import { NavigationBarSearchComponent } from '../navigation-bar-search/navigation-bar-search.component';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';

@Component({
  selector: 'uxd-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.less'],
  imports: [
    RouterLink,
    NgFor,
    RouterLinkActive,
    NgIf,
    ThemeSelectorComponent,
    AccessibilityModule,
    NavigationBarSearchComponent,
    IconModule,
  ],
})
export class NavigationBarComponent {
  navigation = this._appConfig.getConfigurationData('top-navigation');
  brand: ILink = this.navigation.brand;
  links: ILink[] = this.navigation.links;
  social: ILink[] = this.navigation.social;
  themes: SiteTheme[] = this.navigation.themes;
  expanded: boolean = false;

  constructor(private readonly _appConfig: AppConfiguration) {}
}
