import { Component } from '@angular/core';

import { IDocumentationPage } from '../../interfaces/IDocumentationPage';

@Component({
    selector: 'uxd-components',
    templateUrl: './components.component.html'
})
export class ComponentsPageComponent {

    navigation: IDocumentationPage;

    versionRadioValue: string = 'Angular';

    version: string;

    constructor() {

        // load in the navigation json for this page
        this.navigation = require('../../data/components-page.json');
    }

    radioToggled(version: string) {

        if (this.version !== version) {
            console.log(version);
            this.version = version;
        }
    }
}