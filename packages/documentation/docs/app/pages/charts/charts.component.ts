import { Component } from '@angular/core';

import { IDocumentationPage } from '../../interfaces/IDocumentationPage';

@Component({
    selector: 'uxd-charts',
    templateUrl: './charts.component.html'
})
export class ChartsPageComponent {

    navigation: IDocumentationPage;

    constructor() {
        // load in the navigation json for this page
        this.navigation = require('../../data/charts-page.json');
    }
}