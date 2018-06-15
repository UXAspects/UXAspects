import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CardTabsModule, RadioButtonModule, TabsetModule, CheckboxModule } from '../../../../../../src';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsCardTabsNg1Component } from './card-tabs-ng1/card-tabs-ng1.component';
import { ComponentsCardTabsComponent } from './card-tabs/card-tabs.component';
import { ComponentsDetailedTabExampleNg1Component } from './detailed-tab-example-ng1/detailed-tab-example-ng1.component';
import { ComponentsStackedTabsNg1Component } from './stacked-tabs-ng1/stacked-tabs-ng1-component';
import { ComponentsTabsNg1Component } from './tabs-ng1/tabs-ng1.component';
import { ComponentsTabsComponent } from './tabs/tabs.component';


const SECTIONS = [
    ComponentsTabsNg1Component,
    ComponentsDetailedTabExampleNg1Component,
    ComponentsStackedTabsNg1Component,
    ComponentsCardTabsNg1Component,
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
        CommonModule,
        WrappersModule,
        TabsModule,
        TabsetModule,
        CheckboxModule,
        CardTabsModule,
        RadioButtonModule,
        AccordionModule.forRoot(),
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
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