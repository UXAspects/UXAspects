import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorServiceModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { ChartsModule } from 'ng2-charts';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ChartsLineChartComponent } from './line-chart/line-chart.component';
import { ChartsMultipleAxisLineChartComponent } from './multiple-axis-line-chart/multiple-axis-line-chart.component';
import { ChartsStackedLineChartComponent } from './stacked-line-chart/stacked-line-chart.component';

const SECTIONS = [
    ChartsLineChartComponent,
    ChartsStackedLineChartComponent,
    ChartsMultipleAxisLineChartComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Charts, 'Line Charts')
        }
    }
];

@NgModule({
    imports: [
        ChartsModule,
        ColorServiceModule,
        CommonModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ChartsLineChartsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}
