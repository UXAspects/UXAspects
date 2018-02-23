import * as angular from 'angular';

let app = angular.module('app');

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UpgradeModule, downgradeComponent, downgradeInjectable } from '@angular/upgrade/static';
import { TabsModule } from 'ngx-bootstrap/tabs';

// Import UX Aspects
import { CheckboxModule, ColorServiceModule, EboxModule, FlippableCardModule, ProgressBarModule, RadioButtonModule, SparkModule, ToggleSwitchModule, PersistentDataService } from '@ux-aspects/ux-aspects';

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
import { TeamPageComponent } from './pages/team/team.component';
import { BlogPageComponent } from './pages/blog/blog.component';
import { LicensesPageComponent } from './pages/licenses/licenses.component';
import { ChangeLogPageComponent } from './pages/changelog/changelog.component';

import { WrappersModule } from './wrappers/wrappers.module';
import { HybridModule } from '../../src/hybrid/hybrid.module';

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
  { path: 'team', component: TeamPageComponent },
  { path: 'blog', component: BlogPageComponent },
  { path: 'licenses', component: LicensesPageComponent },
  { path: 'changelog', component: ChangeLogPageComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: '**', component: LandingPageComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    DocumentationComponentsModule,
    DocumentationDirectivesModule,
    DocumentationProvidersModule,
    TabsModule.forRoot(),
    CheckboxModule,
    ColorServiceModule,
    EboxModule,
    FlippableCardModule,
    ProgressBarModule,
    RadioButtonModule,
    SparkModule,
    ToggleSwitchModule,
    WrappersModule,
    HybridModule,
    UpgradeModule,
    RouterModule.forRoot(appRoutes, { useHash: true, initialNavigation: false })
  ],
  providers: [
    PersistentDataService,
    {
      provide: '$rootScope',
      useFactory: (injector: Injector) => injector.get('$rootScope'),
      deps: ['$injector']
    },
    {
      provide: '$state',
      useFactory: (injector: Injector) => injector.get('$state'),
      deps: ['$injector']
    }
  ],
  declarations: [
    AppComponent,
    LandingPageComponent,
    OverviewPageComponent,
    FeaturesPageComponent,
    GettingStartedPageComponent,
    ShowcasePageComponent,
    TeamPageComponent,
    BlogPageComponent,
    LicensesPageComponent,
    ChangeLogPageComponent
  ],
  entryComponents: [
    AppComponent
  ]
})
export class AppModule {

  constructor(private _upgrade: UpgradeModule) { }

  ngDoBootstrap() {
    this._upgrade.bootstrap(document.body, ['app'], { strictDi: true });
  }
}


/*
  Configure Angular 1
*/
app.service('$persistentDataService', downgradeInjectable(PersistentDataService));
app.directive('uxdApp', downgradeComponent({ component: AppComponent }) as angular.IDirectiveFactory);

app.config([
  '$anchorScrollProvider',
  '$locationProvider',
  function ($anchorScrollProvider: angular.IAnchorScrollProvider,
    $locationProvider: angular.ILocationProvider) {

    // Disabling AngularJS autoscroll since it conflicts with the new router behaviour
    $anchorScrollProvider.disableAutoScrolling();

    // Removing new prefix
    $locationProvider.hashPrefix('');
  }]); 