import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ItemDisplayPanelModule } from '../../../../../../src/components/item-display-panel/index';
import { AccordionModule, CheckboxModule, EboxModule, RadioButtonModule, SidePanelModule } from '../../../../../../src/index';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { SparkModule } from './../../../../../../src/components/spark/spark.module';
import { ComponentsAccordionNg1Component } from './accordion-ng1/accordion-ng1.component';
import { ComponentsAccordionComponent } from './accordion/accordion.component';
import { ComponentsEboxComponent } from './ebox/ebox.component';
import { ComponentsItemDisplayPanelInlineComponent } from './item-display-panel-inline/item-display-panel-inline.component';
import { ComponentsItemDisplayPanelNg1Component } from './item-display-panel-ng1/item-display-panel-ng1.component';
import { ComponentsItemDisplayPanelServiceNg1Component } from './item-display-panel-service-ng1/item-display-panel-service-ng1.component';
import { ComponentsItemDisplayPanelComponent } from './item-display-panel/item-display-panel.component';
import { ComponentsModalInsetPanelNg1Component } from './modal-inset-panel-ng1/item-display-panel-ng1.component';
import { ComponentsSideInsetPanelNg1Component } from './side-inset-panel-ng1/side-inset-panel-ng1.component';
import { ComponentsSidePanelComponent } from './side-panel/side-panel.component';



const SECTIONS = [
    ComponentsAccordionComponent,
    ComponentsAccordionNg1Component,
    ComponentsItemDisplayPanelComponent,
    ComponentsItemDisplayPanelNg1Component,
    ComponentsItemDisplayPanelServiceNg1Component,
    ComponentsItemDisplayPanelInlineComponent,
    ComponentsModalInsetPanelNg1Component,
    ComponentsSideInsetPanelNg1Component,
    ComponentsSidePanelComponent,
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
        AccordionModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild(ROUTES),
        DocumentationComponentsModule,
        CheckboxModule,
        EboxModule,
        ItemDisplayPanelModule,
        RadioButtonModule,
        SidePanelModule,
        SparkModule,
        TabsModule.forRoot(),
        WrappersModule,
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