declare const angular: ng.IAngularStatic;

const app = angular.module('app');

import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { downgradeComponent, downgradeInjectable, UpgradeModule } from '@angular/upgrade/static';
import { PersistentDataService } from '@ux-aspects/ux-aspects';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgxMaskModule } from 'ngx-mask';
import { AppComponent } from './app.component';
import { DocumentationComponentsModule } from './components/components.module';
import { DocumentationType, DOCUMENTATION_TOKEN } from './services/playground/tokens/documentation.token';
import { WrappersModule } from './wrappers/wrappers.module';

/*
  Configure Application Routes
*/
const appRoutes: Routes = [
    { path: 'landing', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingPageModule) },
    { path: 'overview', loadChildren: () => import('./pages/overview/overview.module').then(m => m.OverviewPageModule) },
    { path: 'features', loadChildren: () => import('./pages/features/features.module').then(m => m.FeaturesPageModule) },
    { path: 'gettingstarted', loadChildren: () => import('./pages/getting-started/getting-started.module').then(m => m.GettingStartedPageModule) },
    { path: 'showcase', loadChildren: () => import('./pages/showcase/showcase.module').then(m => m.ShowcasePageModule) },
    { path: 'components', loadChildren: () => import('./pages/components/components.module').then(m => m.ComponentsPageModule) },
    { path: 'css', loadChildren: () => import('./pages/css/css.module').then(m => m.CssPageModule) },
    { path: 'charts', loadChildren: () => import('./pages/charts/charts.module').then(m => m.ChartsPageModule) },
    { path: 'team', loadChildren: () => import('./pages/team/team.module').then(m => m.TeamPageModule) },
    { path: 'blog', loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogPageModule) },
    { path: 'licenses', loadChildren: () => import('./pages/licenses/licenses.module').then(m => m.LicensesPageModule) },
    { path: 'changelog', loadChildren: () => import('./pages/changelog/changelog.module').then(m => m.ChangeLogPageModule) },
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    { path: '**', redirectTo: '/landing' }
];

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DocumentationComponentsModule,
        WrappersModule,
        UpgradeModule,
        BsDropdownModule.forRoot(),
        ButtonsModule.forRoot(),
        TypeaheadModule.forRoot(),
        NgxMaskModule.forRoot(),
        ModalModule.forRoot(),
        RouterModule.forRoot(appRoutes, { useHash: true, initialNavigation: false })
    ],
    providers: [
        PersistentDataService,
        { provide: DOCUMENTATION_TOKEN, useValue: DocumentationType.Keppel },
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

app.config(['$anchorScrollProvider', '$locationProvider', ($anchorScrollProvider: angular.IAnchorScrollProvider, $locationProvider: angular.ILocationProvider) => {

    // Disabling AngularJS autoscroll since it conflicts with the new router behaviour
    $anchorScrollProvider.disableAutoScrolling();

    // Removing new prefix
    $locationProvider.hashPrefix('');
}]);