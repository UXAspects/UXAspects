import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, IconModule, ProgressBarModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { FileUploadModule } from 'ng2-file-upload';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsFileUploadNg1Component } from './file-upload-ng1/file-upload-ng1.component';
import { ComponentsFileUploadComponent } from './file-upload/file-upload.component';



const SECTIONS = [
    ComponentsFileUploadNg1Component,
    ComponentsFileUploadComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'File Upload')
        }
    }
];

@NgModule({
    imports: [
        A11yModule,
        AccessibilityModule,
        CommonModule,
        DocumentationComponentsModule,
        FileUploadModule,
        IconModule,
        ProgressBarModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
        WrappersModule,
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsFileUploadModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}