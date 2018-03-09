import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsFileUploadNg1Component } from './file-upload-ng1/file-upload-ng1.component';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsFileUploadComponent } from './file-upload/file-upload.component';
import { ProgressBarModule } from '../../../../../../src/index';

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
        CommonModule,
        WrappersModule,
        TabsModule,
        FileUploadModule,
        ProgressBarModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
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