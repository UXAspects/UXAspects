import { Component } from '@angular/core';
import { ILink } from '../../interfaces/ILink';
import { AppConfiguration } from '../../services/app-configuration/app-configuration.service';

@Component({
    selector: 'uxd-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.less']
})
export class NavigationBarComponent {

    brand: ILink;
    links: ILink[];
    social: ILink[];
    expanded: boolean = false;

    constructor(private _appConfig: AppConfiguration) {

        // load the data from the json file
        let navigation = this._appConfig.getConfigurationData('top-navigation');

        // store the relevant parts of the navigation file
        this.brand = navigation.brand;
        this.links = navigation.links;
        this.social = navigation.social;
    }
}