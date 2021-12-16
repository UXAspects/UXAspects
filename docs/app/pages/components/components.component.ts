import { IDocumentationPage } from '../../interfaces/IDocumentationPage';
import { Component } from '@angular/core';
import * as componentsPage from '../../data/components-page.json';

@Component({
    selector: 'uxd-components',
    templateUrl: './components.component.html'
})
export class ComponentsPageComponent {
    navigation = componentsPage as IDocumentationPage;
}
