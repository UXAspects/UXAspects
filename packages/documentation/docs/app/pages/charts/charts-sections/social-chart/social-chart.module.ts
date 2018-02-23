import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsSocialChartNg1Component } from './social-chart-ng1/social-chart-ng1.component';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { HybridModule } from '../../../../../../src/hybrid/hybrid.module';

const SECTIONS = [
    ChartsSocialChartNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Charts, 'Social Chart')
        }
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TabsModule,
        WrappersModule,
        HybridModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ChartsSocialChartModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}
