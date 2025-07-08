import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { SectionSelectComponent } from '../../components/section-select/section-select.component';
import { SideNavigationComponent } from '../../components/side-navigation/side-navigation.component';
import * as cssPage from '../../data/css-page.json';
import { IDocumentationPage } from '../../interfaces/IDocumentationPage';

@Component({
  selector: 'uxd-css',
  templateUrl: './css.component.html',
  imports: [PageHeaderComponent, SectionSelectComponent, RouterOutlet, SideNavigationComponent],
})
export class CssPageComponent {
  navigation = cssPage as IDocumentationPage;
}
