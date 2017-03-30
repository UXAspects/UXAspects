import { Component } from '@angular/core';

import { IDocumentationPage } from '../../interfaces/IDocumentationPage';

@Component({
    selector: 'uxd-css',
    templateUrl: './css.component.html'
})
export class CssPageComponent {

private navigation: IDocumentationPage;

    constructor() {

        // load in the navigation json for this page
        this.navigation = require('../../data/css-page.json');
    }
}