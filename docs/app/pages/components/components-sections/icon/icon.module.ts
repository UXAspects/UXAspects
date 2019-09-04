import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { AccessibilityModule, IconModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { ComponentsIconComponent } from './icon/icon.component';

const SECTIONS = [
    ComponentsIconComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Icons')
        }
    }
];

@NgModule({
    imports: [
        DocumentationComponentsModule,
        CommonModule,
        AccessibilityModule,
        FormsModule,
        IconModule,
        TabsetModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsIconModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}