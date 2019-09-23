import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule, CheckboxModule, ColorPickerModule, ColorServiceModule, IconModule, NumberPickerModule, RadioButtonModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsColorPickerComponent } from './color-picker/color-picker.component';

const SECTIONS = [
    ComponentsColorPickerComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Color')
        }
    }
];

@NgModule({
    imports: [
        AccordionModule,
        BsDropdownModule,
        CheckboxModule,
        ColorPickerModule,
        ColorServiceModule,
        CommonModule,
        DocumentationComponentsModule,
        FormsModule,
        IconModule,
        NumberPickerModule,
        RadioButtonModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
    ],
    exports: [SECTIONS],
    declarations: [SECTIONS],
    entryComponents: [SECTIONS]
})
export class ComponentsColorModule {
    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}
