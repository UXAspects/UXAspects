import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { PageHeaderModule, PersistentDataService } from '@ux-aspects/ux-aspects';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgxMaskModule } from 'ngx-mask';
import { AppComponent } from './app.component';
import { DocumentationComponentsModule } from './components/components.module';
import { DocumentationType, DOCUMENTATION_TOKEN } from './services/playground/tokens/documentation.token';

/*
  Configure Application Routes
*/
const appRoutes: Routes = [
    { path: 'landing', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingPageModule) },
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
        BrowserAnimationsModule,
        BrowserModule,
        BsDropdownModule.forRoot(),
        ButtonsModule.forRoot(),
        DocumentationComponentsModule,
        ModalModule.forRoot(),
        NgxMaskModule.forRoot(),
        RouterModule.forRoot(appRoutes, { useHash: true }),
        TypeaheadModule.forRoot(),
        PageHeaderModule,
    ],
    providers: [
        PersistentDataService,
        { provide: DOCUMENTATION_TOKEN, useValue: DocumentationType.Keppel }
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

}