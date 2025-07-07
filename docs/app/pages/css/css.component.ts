import { Component } from '@angular/core';
import * as cssPage from '../../data/css-page.json';
import { IDocumentationPage } from '../../interfaces/IDocumentationPage';

@Component({
  selector: 'uxd-css',
  templateUrl: './css.component.html',
  standalone: false,
})
export class CssPageComponent {
  navigation = cssPage as IDocumentationPage;
}
