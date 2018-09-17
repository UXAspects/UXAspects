import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HybridModule } from '../../../../../../src/hybrid/hybrid.module';
import { RadioButtonModule, TabsetModule } from '../../../../../../src/index';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ChartsOrganizationChartNg1Component } from './organization-chart-ng1/organization-chart-ng1.component';


const SECTIONS = [
    ChartsOrganizationChartNg1Component
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
        TabsetModule,
        FormsModule,
        RadioButtonModule,
        WrappersModule,
        HybridModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
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
