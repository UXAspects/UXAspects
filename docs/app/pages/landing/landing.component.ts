import { Component } from '@angular/core';

import { ILandingPage } from '../../interfaces/ILandingPage';

@Component({
    selector: 'uxd-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.less']
})
export class LandingPageComponent {

    landingPage: ILandingPage;

    constructor() {

        // load the landing page data file
        this.landingPage = require('../../data/landing-page.json');
    }

}