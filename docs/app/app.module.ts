import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import {
    ColorServiceModule,
    colorSets,
    PageHeaderModule,
    PersistentDataService
} from '@ux-aspects/ux-aspects';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgxMaskModule } from 'ngx-mask';
import { AppComponent } from './app.component';
import { DocumentationComponentsModule } from './components/components.module';
import {
    AngularFilesPlaygroundTransformer,
    AppModulePlaygroundTransformer,
    CssFilesPlaygroundTransformer,
    FontPlaygroundTransformer,
    IconSetPlaygroundTransformer,
    PackageJsonPlaygroundTransformer,
    PLAYGROUND_TRANSFORMER,
    RenameAngularJsonPlaygroundTransformer,
    StylesheetPlaygroundTransformer
} from './services/playground/index';
import {
    DocumentationType,
    DOCUMENTATION_TOKEN
} from './tokens/documentation.token';

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
    { path: 'licenses', loadChildren: () => import('./pages/licenses/licenses.module').then(m => m.LicensesPageModule) },
    { path: 'changelog', loadChildren: () => import('./pages/changelog/changelog.module').then(m => m.ChangeLogPageModule) },
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    { path: '**', redirectTo: '/landing' },
];

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        BsDropdownModule.forRoot(),
        ButtonsModule.forRoot(),
        ColorServiceModule.forRoot(colorSets.keppel),
        DocumentationComponentsModule,
        ModalModule.forRoot(),
        NgxMaskModule.forRoot(),
        PageHeaderModule,
        RouterModule.forRoot(appRoutes, { useHash: true }),
        TypeaheadModule.forRoot(),
    ],
    providers: [
        PersistentDataService,
        { provide: DOCUMENTATION_TOKEN, useValue: DocumentationType.Keppel },
        { provide: PLAYGROUND_TRANSFORMER, useClass: AngularFilesPlaygroundTransformer, multi: true },
        { provide: PLAYGROUND_TRANSFORMER, useClass: CssFilesPlaygroundTransformer, multi: true },
        { provide: PLAYGROUND_TRANSFORMER, useClass: AppModulePlaygroundTransformer, multi: true },
        { provide: PLAYGROUND_TRANSFORMER, useClass: FontPlaygroundTransformer, multi: true },
        { provide: PLAYGROUND_TRANSFORMER, useClass: IconSetPlaygroundTransformer, multi: true },
        { provide: PLAYGROUND_TRANSFORMER, useClass: PackageJsonPlaygroundTransformer, multi: true, },
        { provide: PLAYGROUND_TRANSFORMER, useClass: StylesheetPlaygroundTransformer, multi: true },
        { provide: PLAYGROUND_TRANSFORMER, useClass: RenameAngularJsonPlaygroundTransformer, multi: true },
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
