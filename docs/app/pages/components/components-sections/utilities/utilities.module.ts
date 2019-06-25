import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, AccordionModule, CheckboxModule, FocusIfModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsColorServiceComponent } from './color-service/color-service.component';
import { ComponentsFocusIfComponent } from './focus-if/focus-if.component';
import { ComponentsFocusIndicatorComponent } from './focus-indicator/focus-indicator.component';
import { ComponentsFocusComponent } from './focus/focus.component';
import { ComponentsPersistentDataServiceComponent } from './persistent-data-service/persistent-data-service.component';
import { ComponentsTabbableListComponent } from './tabbable-list/tabbable-list.component';


const SECTIONS = [
    ComponentsFocusIfComponent,
    ComponentsColorServiceComponent,
    ComponentsPersistentDataServiceComponent,
    ComponentsTabbableListComponent,
    ComponentsFocusComponent,
    ComponentsFocusIndicatorComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Utilities')
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
        FocusIfModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsUtilitiesModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}