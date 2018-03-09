import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ComponentsItemDisplayPanelInlineComponent } from './item-display-panel-inline/item-display-panel-inline.component';
import { SparkModule } from './../../../../../../src/components/spark/spark.module';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsAccordionNg1Component } from './accordion-ng1/accordion-ng1.component';
import { ComponentsItemDisplayPanelNg1Component } from './item-display-panel-ng1/item-display-panel-ng1.component';
import { ComponentsItemDisplayPanelServiceNg1Component } from './item-display-panel-service-ng1/item-display-panel-service-ng1.component';
import { ComponentsModalInsetPanelNg1Component } from './modal-inset-panel-ng1/item-display-panel-ng1.component';
import { ComponentsSideInsetPanelNg1Component } from './side-inset-panel-ng1/side-inset-panel-ng1.component';
import { ComponentsItemDisplayPanelComponent } from './item-display-panel/item-display-panel.component';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ComponentsEboxComponent } from './ebox/ebox.component';
import { EboxModule } from '../../../../../../src/index';
import { ItemDisplayPanelModule } from '../../../../../../src/components/item-display-panel/index';
import { ComponentsAccordionComponent } from './accordion/accordion.component';

const SECTIONS = [
    ComponentsAccordionComponent,
    ComponentsAccordionNg1Component,
    ComponentsItemDisplayPanelComponent,
    ComponentsItemDisplayPanelNg1Component,
    ComponentsItemDisplayPanelServiceNg1Component,
    ComponentsItemDisplayPanelInlineComponent,
    ComponentsModalInsetPanelNg1Component,
    ComponentsSideInsetPanelNg1Component,
    ComponentsEboxComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Panels')
        }
    }
];

@NgModule({
    imports: [
        WrappersModule,
        TabsModule,
        EboxModule,
        DocumentationComponentsModule,
        CommonModule,
        ItemDisplayPanelModule,
        ModalModule.forRoot(),
        RouterModule.forChild(ROUTES),
        SparkModule,
        AccordionModule.forRoot()
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsPanelsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}