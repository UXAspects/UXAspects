import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsLayoutSwitchingSplitterNg1Component } from './layout-switching-splitter-ng1/layout-switching-splitter-ng1.component';
import { ComponentsNestedSplitterNg1Component } from './nested-splitter-ng1/nested-splitter-ng1.component';
import { ComponentsSideInsetPanelSplitterNg1Component } from './side-inset-panel-splitter-ng1/side-inset-panel-splitter-ng1.component';
import { ComponentsSideInsetPanelSplitterComponent } from './side-inset-panel-splitter/side-inset-panel-splitter.component';
import { ComponentsSplitterNg1Component } from './splitter-ng1/splitter-ng1.component';
import { ComponentsSplitterComponent } from './splitter/splitter.component';

const SECTIONS = [
    ComponentsSplitterComponent,
    ComponentsSplitterNg1Component,
    ComponentsNestedSplitterNg1Component,
    ComponentsLayoutSwitchingSplitterNg1Component,
    ComponentsSideInsetPanelSplitterNg1Component,
    ComponentsSideInsetPanelSplitterComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Splitter')
        }
    }
];

@NgModule({
    imports: [
        WrappersModule,
        TabsModule.forRoot(),
        AngularSplitModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsSplitterModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}