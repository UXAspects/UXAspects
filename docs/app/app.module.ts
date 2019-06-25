import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { PersistentDataService } from '@ux-aspects/ux-aspects';
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
        BrowserAnimationsModule,
        BrowserModule,
        BsDropdownModule.forRoot(),
        ButtonsModule.forRoot(),
        DocumentationComponentsModule,
        ModalModule.forRoot(),
        NgxMaskModule.forRoot(),
        RouterModule.forRoot(appRoutes, { useHash: true }),
        TypeaheadModule.forRoot(),
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