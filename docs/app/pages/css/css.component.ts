import { Component } from '@angular/core';
import * as cssPage from '../../data/css-page.json';
import { IDocumentationPage } from '../../interfaces/IDocumentationPage';

@Component({
    selector: 'uxd-css',
    templateUrl: './css.component.html'
})
export class CssPageComponent {
    navigation = cssPage as IDocumentationPage;
}
