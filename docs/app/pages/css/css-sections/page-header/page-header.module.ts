import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { CssBackButtonComponent } from './back-button/back-button.component';
import { CssBreadcrumbFromStatesComponent } from './breadcrumb-from-states/breadcrumb-from-states.component';
import { CssBreadcrumbWithTabStateComponent } from './breadcrumb-with-tab-state/breadcrumb-with-tab-state.component';
import { CssBreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CssCondensedHeaderToolbarComponent } from './condensed-header-toolbar/condensed-header-toolbar.component';
import { CssCondensedHeaderComponent } from './condensed-header/condensed-header.component';
import { CssDynamicNameCalloutComponent } from './dynamic-name-callout/dynamic-name-callout.component';
import { CssHeaderContentPanelComponent } from './header-content-panel/header-content-panel.component';
import { CssHeaderNavTabToolbarComponent } from './header-nav-tab-toolbar/header-nav-tab-toolbar.component';
import { CssNavigationHeaderComponent } from './navigation-header/navigation-header.component';
import { CssPageHeaderExampleComponent } from './page-header-example/page-header-example.component';
import { CssProductNameLogoComponent } from './product-name-logo/product-name-logo.component';
import { CssStandardHeaderToolbarComponent } from './standard-header-toolbar/standard-header-toolbar.component';
import { CssStandardHeaderComponent } from './standard-header/standard-header.component';


const SECTIONS = [
    CssNavigationHeaderComponent,
    CssBreadcrumbComponent,
    CssBreadcrumbFromStatesComponent,
    CssBreadcrumbWithTabStateComponent,
    CssCondensedHeaderComponent,
    CssStandardHeaderComponent,
    CssCondensedHeaderToolbarComponent,
    CssProductNameLogoComponent,
    CssHeaderContentPanelComponent,
    CssBackButtonComponent,
    CssDynamicNameCalloutComponent,
    CssStandardHeaderToolbarComponent,
    CssHeaderNavTabToolbarComponent,
    CssPageHeaderExampleComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Css, 'Page Header')
        }
    }
];

@NgModule({
    imports: [
        DocumentationComponentsModule,
        TabsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class CssPageHeaderModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}