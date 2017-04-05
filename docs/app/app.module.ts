declare var angular: angular.IAngularStatic;

let app = angular.module('app', ['ux-aspects']);

import { IDocumentationPage } from './interfaces/IDocumentationPage';

import { NgModule, forwardRef } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { UpgradeAdapter } from '@angular/upgrade';

// import bootstrap modules
import { TabsModule } from 'ng2-bootstrap/tabs';

// Import UX Aspects
import { UxAspectsModule } from '../../src/index';

// Import Child Modules
import { DOCUMENTATION_COMPONENTS } from './components/components';
import { DOCUMENTATION_DIRECTIVES } from './directives/directives';
import { DOCUMENTATION_PROVIDERS } from './services/services';

// Import Root Component
import { AppComponent } from './app.component';

// Import Pages
import { LandingPageComponent } from './pages/landing/landing.component';
import { OverviewPageComponent } from './pages/overview/overview.component';
import { FeaturesPageComponent } from './pages/features/features.component';
import { GettingStartedPageComponent } from './pages/getting-started/getting-started.component';
import { ShowcasePageComponent } from './pages/showcase/showcase.component';
import { ComponentsPageComponent } from './pages/components/components.component';
import { CssPageComponent } from './pages/css/css.component';
import { ChartsPageComponent } from './pages/charts/charts.component';
import { CustomizePageComponent } from './pages/customize/customize.component';
import { TeamPageComponent } from './pages/team/team.component';
import { BlogPageComponent } from './pages/blog/blog.component';
import { DocumentationCategoryComponent } from './components/documentation-category/documentation-category.component';
import { LicensesPageComponent } from './pages/licenses/licenses.component';
import { ChangeLogPageComponent } from './pages/changelog/changelog.component';

import { documentationSections } from './decorators/documentation-section-component';

// Import Page Sections
import { CSS_SECTIONS } from './pages/css/css';
import { COMPONENT_SECTIONS } from './pages/components/components';

let upgradeAdapter = new UpgradeAdapter(forwardRef(() => AppModule));

/*
  Configure Component Page Routes
*/
const componentRoutes = loadRoutes(require('./data/components-page.json'));

/*
  Configure CSS Page Routes
*/
const cssRoutes = loadRoutes(require('./data/css-page.json'));

/*
  Configure Application Routes
*/
const appRoutes: Routes = [
  { path: 'landing', component: LandingPageComponent },
  { path: 'overview', component: OverviewPageComponent },
  { path: 'features', component: FeaturesPageComponent },
  { path: 'gettingstarted', component: GettingStartedPageComponent },
  { path: 'showcase', component: ShowcasePageComponent },
  { path: 'components', component: ComponentsPageComponent, children: componentRoutes },
  { path: 'css', component: CssPageComponent, children: cssRoutes },
  { path: 'charts', component: ChartsPageComponent },
  { path: 'customize', component: CustomizePageComponent },
  { path: 'team', component: TeamPageComponent },
  { path: 'blog', component: BlogPageComponent },
  { path: 'licenses', component: LicensesPageComponent },
  { path: 'changelog', component: ChangeLogPageComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: '**', component: LandingPageComponent }
];

const DECLARATIONS = [
  AppComponent,

  // Page Components
  LandingPageComponent,
  OverviewPageComponent,
  FeaturesPageComponent,
  GettingStartedPageComponent,
  ShowcasePageComponent,
  ComponentsPageComponent,
  CssPageComponent,
  ChartsPageComponent,
  CustomizePageComponent,
  TeamPageComponent,
  BlogPageComponent,
  DocumentationCategoryComponent,
  LicensesPageComponent,
  ChangeLogPageComponent,

  // Angular 1 Documentation Wrapper Directives
  upgradeAdapter.upgradeNg1Component('uxdGroupedButtonsWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdToggleButtonsWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdFloatingActionButtonWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdPaginationWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdSingleToggleButtonWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdCheckboxButtonsWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdRadioButtonsWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdDropdownWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdThumbnailWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdComponentListWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdContactsWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdContactsOverflowWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdDraggableCardsWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdDraggableCardsListViewWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdDraggablePanelsWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdDraggablePanelsViewsWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdFormValidationFieldByFieldWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdFormValidationOnSubmitWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdFloatLabelsWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdNavigationWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdAppNavigatorWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdDetailRowHeaderWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdDetailRowResponsiveWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdFixedHeaderTableWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdHoverActionsWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdReorderableTableWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdSortToggleWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdSingleColumnSortingWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdMultiColumnSortingWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdPreviewPaneWindowWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdDetailRowHeaderWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdPreviewPaneWindowWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdFacetLineChartWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdFileUploadWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdFlippableCardsWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdGridWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdHierarchyBarWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdTabsWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdDetailedTabWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdStackedTabsWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdCardTabsWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdTimelineWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdTooltipsWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdOverflowTooltipWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdSingleLineOverflowTooltipWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdStaticTooltipWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdTreeViewWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdTreeViewCompanionViewWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdTreeGridWrapper'),
   upgradeAdapter.upgradeNg1Component('uxdTreeGridAsynchronousLoadingWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdWizardWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdWizardValidationWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdVerticalWizardWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdExpandingContentWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdPdfServiceWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdTimeAgoServiceWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdListItemFilterWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdMarqueeWizardWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdCustomResponsiveTableWrapper'),

  // Angular 1 Wrapper Directives
  upgradeAdapter.upgradeNg1Component('uxContactGroupNg1'),
  upgradeAdapter.upgradeNg1Component('uxScrollPaneNg1'),
]
.concat(DOCUMENTATION_COMPONENTS)
.concat(DOCUMENTATION_DIRECTIVES)
.concat(CSS_SECTIONS)
.concat(COMPONENT_SECTIONS);

@NgModule({
  imports: [
    // Angular Modules
    BrowserModule,
    HttpModule,
    FormsModule,

    // Bootstrap Modules
    TabsModule.forRoot(),

    // Library Module
    UxAspectsModule,

    // Routing Module
    RouterModule.forRoot(appRoutes, { useHash: true, initialNavigation: false })
  ],
  declarations: DECLARATIONS,
  providers: DOCUMENTATION_PROVIDERS,
  entryComponents: documentationSections
})
export class AppModule {
  ngDoBootstrap() { }
}

/*
  Upgrade Some Angular 1 services
*/
upgradeAdapter.upgradeNg1Provider('$rootScope');
upgradeAdapter.upgradeNg1Provider('$state');

/*
  Register Angular 1 module
*/
app.directive('uxdApp', upgradeAdapter.downgradeNg2Component(AppComponent) as angular.IDirectiveFactory);

/*
  Configure Angular 1
*/
app.config(['$anchorScrollProvider', function ($anchorScrollProvider: angular.IAnchorScrollProvider)  {
  // Disabling AngularJS autoscroll since it conflicts with the new router behaviour
    $anchorScrollProvider.disableAutoScrolling();
}]);

// bootstrap the Angular 1 application here
upgradeAdapter.bootstrap(document.documentElement, ['app']);


// Function to load routes from JSON data
function loadRoutes(data: IDocumentationPage): Routes {
  let routes: Routes = [];
  for (let i = 0; i < data.categories.length; i += 1) {
    let category = data.categories[i];
    if (routes.length === 0) {
      routes.push({ path: '', redirectTo: category.link, pathMatch: 'full' });
    }
    routes.push({ path: category.link, component: DocumentationCategoryComponent, data: { category: category } });
  }
  return routes;
}
