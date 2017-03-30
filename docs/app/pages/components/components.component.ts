import { Component } from '@angular/core';

import { IDocumentationPage } from '../../interfaces/IDocumentationPage';

@Component({
    selector: 'uxd-components',
    templateUrl: './components.component.html'
})
export class ComponentsPageComponent {

    private navigation: IDocumentationPage;

    constructor() {

        // load in the navigation json for this page
        this.navigation = require('../../data/components-page.json');
    }
}