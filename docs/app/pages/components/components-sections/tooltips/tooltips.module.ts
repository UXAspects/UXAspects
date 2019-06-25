import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopoverModule, TabsetModule, TooltipModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsStaticTooltipComponent } from './static-tooltip/static-tooltip.component';
import { ComponentsTooltipsComponent } from './tooltips/tooltips.component';


const SECTIONS = [
    ComponentsStaticTooltipComponent,
    ComponentsTooltipsComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Tooltips')
        }
    }
];

@NgModule({
    imports: [
        DocumentationComponentsModule,
        PopoverModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
        TooltipModule,
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsTooltipsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}