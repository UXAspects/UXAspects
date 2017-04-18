import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { CssResponsiveDesignComponent } from './responsive-design/responsive-design.component';
import { CssStackedToHorizontalComponent } from './stacked-to-horizontal/stacked-to-horizontal.component';
import { CssMobileDesktopComponent } from './mobile-desktop/mobile-desktop.component';
import { CssMobileTabletDesktopComponent } from './mobile-tablet-desktop/mobile-tablet-desktop.component';
import { CssResponsiveColumnResetsComponent } from './responsive-column-resets/responsive-column-resets.component';
import { CssOffsettingColumnsComponent } from './offsetting-columns/offsetting-columns.component';
import { CssNestingColumnsComponent } from './nesting-columns/nesting-columns.component';
import { CssColumnOrderingComponent } from './column-ordering/column-ordering.component';

const SECTIONS = [
    CssResponsiveDesignComponent,
    CssStackedToHorizontalComponent,
    CssMobileDesktopComponent,
    CssMobileTabletDesktopComponent,
    CssResponsiveColumnResetsComponent,
    CssOffsettingColumnsComponent,
    CssNestingColumnsComponent,
    CssColumnOrderingComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Css, 'Responsive Design')
        }
    }
];

@NgModule({
    imports: [
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class CssResponsiveDesignModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}