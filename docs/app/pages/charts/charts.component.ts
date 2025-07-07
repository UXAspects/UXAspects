import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { SectionSelectComponent } from '../../components/section-select/section-select.component';
import { SideNavigationComponent } from '../../components/side-navigation/side-navigation.component';
import * as chartsPage from '../../data/charts-page.json';
import { IDocumentationPage } from '../../interfaces/IDocumentationPage';

@Component({
  selector: 'uxd-charts',
  templateUrl: './charts.component.html',
  imports: [PageHeaderComponent, SectionSelectComponent, RouterOutlet, SideNavigationComponent],
})
export class ChartsPageComponent {
  navigation = chartsPage as IDocumentationPage;
}
