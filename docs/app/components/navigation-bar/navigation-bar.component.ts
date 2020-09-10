import { Component } from '@angular/core';
import { ILink } from '../../interfaces/ILink';
import { AppConfiguration } from '../../services/app-configuration/app-configuration.service';
import { SiteTheme } from '../../interfaces/SiteTheme';

@Component({
    selector: 'uxd-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.less']
})
export class NavigationBarComponent {

    navigation = this._appConfig.getConfigurationData('top-navigation');
    brand: ILink = this.navigation.brand;
    links: ILink[] = this.navigation.links;
    social: ILink[] = this.navigation.social;
    themes: SiteTheme[] = this.navigation.themes;
    expanded: boolean = false;

    constructor(private _appConfig: AppConfiguration) { }
}
