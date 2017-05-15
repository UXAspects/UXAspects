import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { WrappersModule } from '../../../../wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ColorServiceModule, SliderModule } from '../../../../../../src/index';
import { ComponentsSlidersNg1Component } from './sliders-ng1/sliders-ng1.component';
import { ComponentsSlidersComponent } from './sliders/sliders.component';
import { ComponentsSliderChartsNg1Component } from './slider-charts-ng1/slider-charts-ng1.component';

const SECTIONS = [
    ComponentsSlidersNg1Component,
    ComponentsSliderChartsNg1Component,
    ComponentsSlidersComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Sliders')
        }
    }
];

@NgModule({
    imports: [
        CommonModule,
        WrappersModule,
        TabsModule,
        SliderModule,
        ColorServiceModule,
        FormsModule,
        ColorServiceModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsSliderModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}