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
import { TabsModule } from 'ngx-bootstrap/tabs';

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
import { DocumentationComponentsModule } from './components/components.module';
import { DocumentationDirectivesModule } from './directives/directives.module';
import { DocumentationProvidersModule } from './services/services.module';

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
// import { CustomizePageComponent } from './pages/customize/customize.component';
import { TeamPageComponent } from './pages/team/team.component';
import { BlogPageComponent } from './pages/blog/blog.component';
// import { DocumentationCategoryComponent } from './components/documentation-category/documentation-category.component';
import { LicensesPageComponent } from './pages/licenses/licenses.component';
import { ChangeLogPageComponent } from './pages/changelog/changelog.component';

import { documentationSections } from './decorators/documentation-section-component';


export const upgradeAdapter = new UpgradeAdapter(forwardRef(() => AppModule));

// Import Page Sections
// import { CssPageModule } from './pages/css/css.module';
// import { ComponentsPageModule } from './pages/components/components.module';
// import { ChartsPageModule } from './pages/charts/charts.module';

/*
  Configure Component Page Routes
*/
// const componentRoutes = loadRoutes(require('./data/components-page.json'));

/*
  Configure CSS Page Routes
*/
// const cssRoutes = loadRoutes(require('./data/css-page.json'));

/*
  Configure Charts Page Routes
*/
// const chartRoutes = loadRoutes(require('./data/charts-page.json'));

/*
  Configure Application Routes
*/
const appRoutes: Routes = [
  { path: 'landing', component: LandingPageComponent },
  { path: 'overview', component: OverviewPageComponent },
  { path: 'features', component: FeaturesPageComponent },
  { path: 'gettingstarted', component: GettingStartedPageComponent },
  { path: 'showcase', component: ShowcasePageComponent },
  { path: 'components', component: ComponentsPageComponent, loadChildren: './pages/components/components.module#ComponentsPageModule' },
  { path: 'css', component: CssPageComponent, loadChildren: './pages/css/css.module#CssPageModule' },
  { path: 'charts', component: ChartsPageComponent, loadChildren: './pages/charts/charts.module#ChartsPageModule' },
  // { path: 'customize', component: CustomizePageComponent },
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
  // CustomizePageComponent,
  TeamPageComponent,
  BlogPageComponent,
  // DocumentationCategoryComponent,
  LicensesPageComponent,
  ChangeLogPageComponent,

  // Angular 1 Documentation Wrapper Directives
  
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
  upgradeAdapter.upgradeNg1Component('uxScrollPaneNg1')
];

@NgModule({
  imports: [
    // Angular Modules
    BrowserModule,
    HttpModule,
    FormsModule,
    DocumentationComponentsModule,
    DocumentationDirectivesModule,
    DocumentationProvidersModule,
    // CssPageModule,
    // ChartsPageModule,
    // ComponentsPageModule,

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
  providers: [],
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


// // Function to load routes from JSON data
// function loadRoutes(data: IDocumentationPage): Routes {
//   let routes: Routes = [];
//   for (let i = 0; i < data.categories.length; i += 1) {
//     let category = data.categories[i];
//     if (routes.length === 0) {
//       routes.push({ path: '', redirectTo: category.link, pathMatch: 'full' });
//     }
//     routes.push({ path: category.link, component: DocumentationCategoryComponent, data: { category: category } });
//   }
//   return routes;
// }
