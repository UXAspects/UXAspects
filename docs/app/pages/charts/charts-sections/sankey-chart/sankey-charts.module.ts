import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FileSizePipeModule, SankeyChartModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ChartsSankeyChartComponent } from './sankey-chart/sankey-chart.component';


const SECTIONS = [
    ChartsSankeyChartComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Charts, 'Sankey Chart')
        }
    }
];

@NgModule({
    imports: [
        DocumentationComponentsModule,
        FileSizePipeModule,
        RouterModule.forChild(ROUTES),
        SankeyChartModule,
        TabsetModule,
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
})
export class ChartsSankeyChartModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver, SECTIONS);
    }
}
