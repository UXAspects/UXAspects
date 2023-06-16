import { Component } from '@angular/core';

import { ILandingPage } from '../../interfaces/ILandingPage';
import { AppConfiguration } from '../../services/app-configuration/app-configuration.service';

@Component({
    selector: 'uxd-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.less']
})
export class LandingPageComponent {

    landingPage: ILandingPage;

    constructor(private readonly _appConfig: AppConfiguration) {

        // load the landing page data file
        this.landingPage = this._appConfig.getConfigurationData('landing-page');
    }

}