import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PartitionMapModule, TabsetModule, TooltipModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ChartsPartitionMapComponent } from './partition-map/partition-map.component';


const SECTIONS = [
    ChartsPartitionMapComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Charts, 'Partition Map')
        }
    }
];

@NgModule({
    imports: [
        DocumentationComponentsModule,
        PartitionMapModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
        TooltipModule,
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ChartsPartitionMapModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}
