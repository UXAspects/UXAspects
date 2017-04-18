import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { CssNavigationHeaderComponent } from './navigation-header/navigation-header.component';
import { CssMenuButtonComponent } from './menu-button/menu-button.component';
import { CssBreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CssBreadcrumbFromStatesComponent } from './breadcrumb-from-states/breadcrumb-from-states.component';
import { CssBreadcrumbWithTabStateComponent } from './breadcrumb-with-tab-state/breadcrumb-with-tab-state.component';
import { CssCondensedHeaderComponent } from './condensed-header/condensed-header.component';
import { CssStandardHeaderComponent } from './standard-header/standard-header.component';
import { CssProductNameLogoComponent } from './product-name-logo/product-name-logo.component';
import { CssHeaderContentPanelComponent } from './header-content-panel/header-content-panel.component';
import { CssBackButtonComponent } from './back-button/back-button.component';
import { CssDynamicNameCalloutComponent } from './dynamic-name-callout/dynamic-name-callout.component';
import { CssStandardHeaderToolbarComponent } from './standard-header-toolbar/standard-header-toolbar.component';
import { CssHeaderNavTabToolbarComponent } from './header-nav-tab-toolbar/header-nav-tab-toolbar.component';
import { CssPageHeaderExampleComponent } from './page-header-example/page-header-example.component';
import { CssCondensedHeaderToolbarComponent } from './condensed-header-toolbar/condensed-header-toolbar.component';

const SECTIONS = [
    CssNavigationHeaderComponent,
    CssMenuButtonComponent,
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
            category: {
                title: 'Page Header',
                link: 'page-header',
                sections: [
                    {
                        title: 'Navigation Header',
                        component: 'CssNavigationHeaderComponent'
                    },
                    {
                        title: 'Menu Button',
                        component: 'CssMenuButtonComponent'
                    },
                    {
                        title: 'Breadcrumb',
                        component: 'CssBreadcrumbComponent'
                    },
                    {
                        title: 'Breadcrumb from States',
                        component: 'CssBreadcrumbFromStatesComponent'
                    },
                    {
                        title: 'Breadcrumb with Tab State',
                        component: 'CssBreadcrumbWithTabStateComponent'
                    },
                    {
                        title: 'Condensed Header',
                        component: 'CssCondensedHeaderComponent'
                    },
                    {
                        title: 'Condensed Header & Toolbar',
                        component: 'CssCondensedHeaderToolbarComponent'
                    },
                    {
                        title: 'Standard Header',
                        component: 'CssStandardHeaderComponent'
                    },
                    {
                        title: 'Product Name and Logo',
                        component: 'CssProductNameLogoComponent'
                    },
                    {
                        title: 'Header Content Panel',
                        component: 'CssHeaderContentPanelComponent'
                    },
                    {
                        title: 'Back Button',
                        component: 'CssBackButtonComponent'
                    },
                    {
                        title: 'Dynamic Name Callout',
                        component: 'CssDynamicNameCalloutComponent'
                    },
                    {
                        title: 'Standard Header & Toolbar',
                        component: 'CssStandardHeaderToolbarComponent'
                    },
                    {
                        title: 'Header with Navigation Tab & Toolbar',
                        component: 'CssHeaderNavTabToolbarComponent'
                    },
                    {
                        title: 'Page Header Example',
                        component: 'CssPageHeaderExampleComponent'
                    }
                ]
            }
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