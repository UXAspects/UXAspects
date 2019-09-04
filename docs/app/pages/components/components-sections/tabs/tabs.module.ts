import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccordionModule, CardTabsModule, CheckboxModule, IconModule, RadioButtonModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsCardTabsComponent } from './card-tabs/card-tabs.component';
import { ComponentsTabsComponent } from './tabs/tabs.component';


const SECTIONS = [
    ComponentsCardTabsComponent,
    ComponentsTabsComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Tabs')
        }
    }
];

@NgModule({
    imports: [
        AccordionModule,
        CardTabsModule,
        CheckboxModule,
        CommonModule,
        DocumentationComponentsModule,
        IconModule,
        RadioButtonModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsTabsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}