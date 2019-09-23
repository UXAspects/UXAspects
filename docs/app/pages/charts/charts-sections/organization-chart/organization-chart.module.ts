import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule, HierarchyBarModule, HybridModule, IconModule, OrganizationChartModule, RadioButtonModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ChartsOrganizationChartNg1Component } from './organization-chart-ng1/organization-chart-ng1.component';
import { ChartsOrganizationChartComponent } from './organization-chart/organization-chart.component';


const SECTIONS = [
    ChartsOrganizationChartNg1Component,
    ChartsOrganizationChartComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Charts, 'Organization Chart')
        }
    }
];

@NgModule({
    imports: [
        AccordionModule,
        CommonModule,
        DocumentationComponentsModule,
        FormsModule,
        HierarchyBarModule,
        HybridModule,
        IconModule,
        OrganizationChartModule,
        RadioButtonModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
        WrappersModule,
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ChartsOrganizationChartModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}
