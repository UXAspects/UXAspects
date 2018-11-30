import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopoverModule, TabsetModule, TooltipModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsOverflowTooltipNg1Component } from './overflow-tooltip-ng1/overflow-tooltip-ng1.component';
import { ComponentsSingleLineOverflowTooltipNg1Component } from './single-line-overflow-tooltip-ng1/single-line-overflow-tooltip-ng1.component';
import { ComponentsStaticTooltipNg1Component } from './static-tooltip-ng1/static-tooltip-ng1.component';
import { ComponentsStaticTooltipComponent } from './static-tooltip/static-tooltip.component';
import { ComponentsTooltipsNg1Component } from './tooltips-ng1/tooltips-ng1.component';
import { ComponentsTooltipsComponent } from './tooltips/tooltips.component';


const SECTIONS = [
    ComponentsTooltipsNg1Component,
    ComponentsOverflowTooltipNg1Component,
    ComponentsSingleLineOverflowTooltipNg1Component,
    ComponentsStaticTooltipNg1Component,
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
        WrappersModule,
        TabsetModule,
        TooltipModule,
        PopoverModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
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