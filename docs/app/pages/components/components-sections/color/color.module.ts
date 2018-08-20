import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorPickerModule } from '../../../../../../src/components/color-picker';
import { ColorServiceModule } from '../../../../../../src/services/color';
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
        CommonModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES),
        ColorPickerModule,
        ColorServiceModule
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
