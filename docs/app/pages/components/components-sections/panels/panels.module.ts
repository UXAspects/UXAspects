import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, AccordionModule, CheckboxModule, EboxModule, IconModule, ItemDisplayPanelModule, RadioButtonModule, SidePanelModule, SparkModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsAccordionComponent } from './accordion/accordion.component';
import { ComponentsEboxComponent } from './ebox/ebox.component';
import { ComponentsItemDisplayPanelInlineComponent } from './item-display-panel-inline/item-display-panel-inline.component';
import { ComponentsItemDisplayPanelComponent } from './item-display-panel/item-display-panel.component';
import { ComponentsSidePanelComponent } from './side-panel/side-panel.component';


const SECTIONS = [
    ComponentsAccordionComponent,
    ComponentsItemDisplayPanelComponent,
    ComponentsItemDisplayPanelInlineComponent,
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
        AccessibilityModule,
        AccordionModule,
        CheckboxModule,
        CommonModule,
        DocumentationComponentsModule,
        EboxModule,
        FormsModule,
        IconModule,
        ItemDisplayPanelModule,
        RadioButtonModule,
        RouterModule.forChild(ROUTES),
        SidePanelModule,
        SparkModule,
        TabsetModule,
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