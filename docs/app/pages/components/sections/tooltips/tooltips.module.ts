import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsTooltipsNg1Component } from './tooltips-ng1/tooltips-ng1.component';
import { ComponentsOverflowTooltipNg1Component } from './overflow-tooltip-ng1/overflow-tooltip-ng1.component';
import { ComponentsSingleLineOverflowTooltipNg1Component } from './single-line-overflow-tooltip-ng1/single-line-overflow-tooltip-ng1.component';
import { ComponentsStaticTooltipNg1Component } from './static-tooltip-ng1/static-tooltip-ng1.component';
import { WrappersModule } from '../../../../wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

const SECTIONS = [
    ComponentsTooltipsNg1Component,
    ComponentsOverflowTooltipNg1Component,
    ComponentsSingleLineOverflowTooltipNg1Component,
    ComponentsStaticTooltipNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                'title': 'Tooltips',
                'link': 'tooltips',
                'sections': [
                    {
                        'title': 'Tooltips',
                        'component': 'ComponentsTooltipsNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Overflow Tooltip',
                        'component': 'ComponentsOverflowTooltipNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Single Line Overflow Tooltip',
                        'component': 'ComponentsSingleLineOverflowTooltipNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Static Tooltips',
                        'component': 'ComponentsStaticTooltipNg1Component',
                        'version': 'AngularJS'
                    }
                ]
            }
        }
    }
];

@NgModule({
    imports: [
        WrappersModule,
        TabsModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsTooltipsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}