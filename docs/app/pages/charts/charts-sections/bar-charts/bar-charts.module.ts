import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorServiceModule, HybridModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { ChartsModule } from 'ng2-charts';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ChartsBarChartComponent } from './bar-chart/bar-chart.component';
import { ChartsHorizontalBarChartComponent } from './horizontal-bar-chart/horizontal-bar-chart.component';
import { ChartsStackedBarChartComponent } from './stacked-bar-chart/stacked-bar-chart.component';

const SECTIONS = [
    ChartsBarChartComponent,
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
        ChartsModule,
        ColorServiceModule,
        CommonModule,
        DocumentationComponentsModule,
        HybridModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
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
