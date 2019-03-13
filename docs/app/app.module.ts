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
    { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
    { path: 'overview', loadChildren: './pages/overview/overview.module#OverviewPageModule' },
    { path: 'features', loadChildren: './pages/features/features.module#FeaturesPageModule' },
    { path: 'gettingstarted', loadChildren: './pages/getting-started/getting-started.module#GettingStartedPageModule' },
    { path: 'showcase', loadChildren: './pages/showcase/showcase.module#ShowcasePageModule' },
    { path: 'components', loadChildren: './pages/components/components.module#ComponentsPageModule' },
    { path: 'css', loadChildren: './pages/css/css.module#CssPageModule' },
    { path: 'charts', loadChildren: './pages/charts/charts.module#ChartsPageModule' },
    { path: 'team', loadChildren: './pages/team/team.module#TeamPageModule' },
    { path: 'blog', loadChildren: './pages/blog/blog.module#BlogPageModule' },
    { path: 'licenses', loadChildren: './pages/licenses/licenses.module#LicensesPageModule' },
    { path: 'changelog', loadChildren: './pages/changelog/changelog.module#ChangeLogPageModule' },
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