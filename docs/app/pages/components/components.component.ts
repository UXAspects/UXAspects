import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { SectionSelectComponent } from '../../components/section-select/section-select.component';
import { SideNavigationComponent } from '../../components/side-navigation/side-navigation.component';
import * as componentsPage from '../../data/components-page.json';
import { IDocumentationPage } from '../../interfaces/IDocumentationPage';

@Component({
  selector: 'uxd-components',
  templateUrl: './components.component.html',
  imports: [PageHeaderComponent, SectionSelectComponent, RouterOutlet, SideNavigationComponent],
})
export class ComponentsPageComponent {
  navigation = componentsPage as IDocumentationPage;
}
