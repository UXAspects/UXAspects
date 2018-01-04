import { IDocumentationPage } from './../../interfaces/IDocumentationPage';
import { Component } from '@angular/core';

@Component({
    selector: 'uxd-components',
    templateUrl: './components.component.html'
})
export class ComponentsPageComponent {

    navigation: IDocumentationPage;

    constructor() {
        // load in the navigation json for this page
        this.navigation = require('../../data/components-page.json');
    }

}