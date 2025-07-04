import { Component } from '@angular/core';
import * as componentsPage from '../../data/components-page.json';
import { IDocumentationPage } from '../../interfaces/IDocumentationPage';

@Component({
  selector: 'uxd-components',
  templateUrl: './components.component.html',
  standalone: false,
})
export class ComponentsPageComponent {
  navigation = componentsPage as IDocumentationPage;
}
