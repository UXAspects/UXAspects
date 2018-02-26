import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { HybridModule } from '@ux-aspects/ux-aspects';

import { DocumentationComponentsModule } from '../../../../components/components.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ChartsBarChartNg1Component } from './bar-chart-ng1/bar-chart-ng1.component';
import { ChartsHorizontalBarChartNg1Component } from './horizontal-bar-chart-ng1/horizontal-bar-chart-ng1.component';
import { ChartsStackedBarChartNg1Component } from './stacked-bar-chart-ng1/stacked-bar-chart-ng1.component';
import { ChartsBarChartComponent } from './bar-chart/bar-chart.component';
import { ChartsHorizontalBarChartComponent } from './horizontal-bar-chart/horizontal-bar-chart.component';
import { ChartsStackedBarChartComponent } from './stacked-bar-chart/stacked-bar-chart.component';

const SECTIONS = [
    ChartsBarChartComponent,
    ChartsBarChartNg1Component,
    ChartsHorizontalBarChartNg1Component,
    ChartsStackedBarChartNg1Component,
    ChartsHorizontalBarChartComponent,
    ChartsStackedBarChartComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Charts, 'Bar Charts')
        }
    }
];

@NgModule({
    imports: [
        DocumentationComponentsModule,
        TabsModule,
        WrappersModule,
        HybridModule,
        ChartsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ChartsBarChartsModule { 
    
    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}
