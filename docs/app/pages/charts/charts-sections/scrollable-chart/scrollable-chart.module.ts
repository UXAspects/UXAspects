import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HybridModule } from '../../../../../../src/hybrid/hybrid.module';
import { ColorServiceModule } from '../../../../../../src/services/color/index';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ChartsScrollableChartNg1Component } from './scrollable-chart-ng1/scrollable-chart-ng1.component';
import { ChartsScrollableChartComponent } from './scrollable-chart/scrollable-chart.component';


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
        RouterModule.forChild(ROUTES),
        ColorServiceModule
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
