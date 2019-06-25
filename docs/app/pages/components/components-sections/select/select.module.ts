import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule, CheckboxModule, NumberPickerModule, RadioButtonModule, SelectListModule, SelectModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsSelectListComponent } from './select-list/select-list.component';
import { ComponentsSelectComponent } from './select/select.component';

const SECTIONS = [
    ComponentsSelectComponent,
    ComponentsSelectListComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Select')
        }
    }
];

@NgModule({
    imports: [
        AccordionModule,
        CheckboxModule,
        CommonModule,
        DocumentationComponentsModule,
        FormsModule,
        NumberPickerModule,
        RadioButtonModule,
        RouterModule.forChild(ROUTES),
        SelectListModule,
        SelectModule,
        TabsetModule,
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsSelectModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}