import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { ComponentsMediaPlayerComponent } from './media-player/media-player.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MediaPlayerModule, RadioButtonModule } from '@ux-aspects/ux-aspects';
import { AccordionModule } from 'ngx-bootstrap/accordion';

const SECTIONS = [
    ComponentsMediaPlayerComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Media Player')
        }
    }
];

@NgModule({
    imports: [
        TabsModule.forRoot(),
        MediaPlayerModule,
        RadioButtonModule,
        AccordionModule.forRoot(),
        DocumentationComponentsModule,
        CommonModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsMediaPlayerModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}