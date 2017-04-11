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
import { 
  CheckboxModule, 
  ColorServiceModule, 
  EboxModule, 
  FlippableCardModule, 
  ProgressBarModule, 
  RadioButtonModule, 
  SparkModule, 
  ToggleSwitchModule 
} from '../../src/index';

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
import { CHART_SECTIONS } from './pages/charts/charts';

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
  Configure Charts Page Routes
*/
const chartRoutes = loadRoutes(require('./data/charts-page.json'));

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
  { path: 'charts', component: ChartsPageComponent, children: chartRoutes },
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
  upgradeAdapter.upgradeNg1Component('uxdHotkeysWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdKeyboardServiceWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdModalWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdSquareModalWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdMarqueeModalWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdSideModalWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdNotificationsWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdNotificationListWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdNotificationDropdownWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdAlertStylesWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdDismissableStylesWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdCollapsiblePanelsWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdItemDisplayPanelWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdModalInsetPanelWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdPopoverWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdProgressBarWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdCustomScrollbarWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdInfiniteScrollWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdInfiniteScrollLoadMoreWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdSearchBuilderWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdSearchBuilderCodeWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdSearchHistoryWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdSearchToolbarWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdSplitterWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdNestedSplitterWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdLayoutSwitchingSplitterWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdSideInsetPanelSplitterWrapper'),
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
  upgradeAdapter.upgradeNg1Component('uxdCheckboxWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdCustomDropdownWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdExpandingTextAreaWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdToggleSwitchWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdCustomToggleSwitchWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdDatePickerWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdIntegratedDatePickerWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdDateRangePickerWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdTimePickerWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdNumberPickerWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdInlineDropdownWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdInputExpandWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdInputMaskWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdRadioButtonWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdSelectWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdSingleSelectTableWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdMultipleSelectTableWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdTagsWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdTagsCustomWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdTagsAutocompleteWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdSlidersWrapper'),
  upgradeAdapter.upgradeNg1Component('uxdSliderChartsWrapper'),

  // Angular 1 Wrapper Directives
  upgradeAdapter.upgradeNg1Component('uxContactGroupNg1'),
  upgradeAdapter.upgradeNg1Component('uxScrollPaneNg1'),
  upgradeAdapter.upgradeNg1Component('uxFlotNg1'),
  upgradeAdapter.upgradeNg1Component('uxPeityLineChartNg1'),
  upgradeAdapter.upgradeNg1Component('uxPeityBarChartNg1'),
  upgradeAdapter.upgradeNg1Component('uxPeityPieChartNg1'),
  upgradeAdapter.upgradeNg1Component('uxPeityUpdatingLineChartNg1'),
  upgradeAdapter.upgradeNg1Component('uxNestedDonutNg1'),
  upgradeAdapter.upgradeNg1Component('uxOrganizationChartNg1'),
  upgradeAdapter.upgradeNg1Component('uxSparkNg1'),
  upgradeAdapter.upgradeNg1Component('uxPartitionMapNg1'),
  upgradeAdapter.upgradeNg1Component('uxSankeyNg1'),
  upgradeAdapter.upgradeNg1Component('uxSocialChartNg1')
]
.concat(DOCUMENTATION_COMPONENTS)
.concat(DOCUMENTATION_DIRECTIVES)
.concat(CSS_SECTIONS)
.concat(COMPONENT_SECTIONS)
.concat(CHART_SECTIONS);

@NgModule({
  imports: [
    // Angular Modules
    BrowserModule,
    HttpModule,
    FormsModule,

    // Bootstrap Modules
    TabsModule.forRoot(),

    // Library Module
    CheckboxModule, 
    ColorServiceModule, 
    EboxModule, 
    FlippableCardModule, 
    ProgressBarModule, 
    RadioButtonModule, 
    SparkModule, 
    ToggleSwitchModule,

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
upgradeAdapter.upgradeNg1Provider('flotDataService');
upgradeAdapter.upgradeNg1Provider('lineDataService');

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
