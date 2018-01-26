import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChartsScrollableChartNg1Component } from './scrollable-chart-ng1/scrollable-chart-ng1.component';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ChartsScrollableChartComponent } from './scrollable-chart/scrollable-chart.component';
import { ChartsModule } from 'ng2-charts';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HybridModule } from '../../../../../../src/hybrid/hybrid.module';

const SECTIONS = [
    ChartsScrollableChartNg1Component,
    ChartsScrollableChartComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Charts, 'Scrollable Chart')
        }
    }
];

@NgModule({
    imports: [
        WrappersModule,
        HybridModule,
        ChartsModule,
        CommonModule,
        TabsModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ChartsScrollableChartModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}
