import { Component } from '@angular/core';
import * as chartsPage from '../../data/charts-page.json';
import { IDocumentationPage } from '../../interfaces/IDocumentationPage';

@Component({
    selector: 'uxd-charts',
    templateUrl: './charts.component.html'
})
export class ChartsPageComponent {
    navigation = chartsPage as IDocumentationPage;
}
