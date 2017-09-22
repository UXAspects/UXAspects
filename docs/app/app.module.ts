declare var angular: angular.IAngularStatic;

let app = angular.module('app', ['ux-aspects', 'ui.bootstrap']);

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
// import { CustomizePageComponent } from './pages/customize/customize.component';
import { TeamPageComponent } from './pages/team/team.component';
import { BlogPageComponent } from './pages/blog/blog.component';
import { LicensesPageComponent } from './pages/licenses/licenses.component';
import { ChangeLogPageComponent } from './pages/changelog/changelog.component';

export const upgradeAdapter = new UpgradeAdapter(forwardRef(() => AppModule));

import { WrappersModule } from './wrappers.module';

/*
  Configure Application Routes
*/
const appRoutes: Routes = [
  { path: 'landing', component: LandingPageComponent },
  { path: 'overview', component: OverviewPageComponent },
  { path: 'features', component: FeaturesPageComponent },
  { path: 'gettingstarted', component: GettingStartedPageComponent },
  { path: 'showcase', component: ShowcasePageComponent },
  { path: 'components', loadChildren: './pages/components/components.module#ComponentsPageModule' },
  { path: 'css', loadChildren: './pages/css/css.module#CssPageModule' },
  { path: 'charts', loadChildren: './pages/charts/charts.module#ChartsPageModule' },
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
  // CustomizePageComponent,
  TeamPageComponent,
  BlogPageComponent,
  LicensesPageComponent,
  ChangeLogPageComponent,

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
    WrappersModule,

    // Routing Module
    RouterModule.forRoot(appRoutes, { useHash: true, initialNavigation: false })
  ],
  declarations: DECLARATIONS
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
app.config(['$anchorScrollProvider', '$locationProvider', function ($anchorScrollProvider: angular.IAnchorScrollProvider, $locationProvider: angular.ILocationProvider) {
  // Disabling AngularJS autoscroll since it conflicts with the new router behaviour
  $anchorScrollProvider.disableAutoScrolling();

  // Removing new prefix
  $locationProvider.hashPrefix('');
}]);

// bootstrap the Angular 1 application here
upgradeAdapter.bootstrap(document.documentElement, ['app']);
