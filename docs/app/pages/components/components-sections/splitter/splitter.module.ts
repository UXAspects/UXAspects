import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { AngularSplitModule } from 'angular-split';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsSideInsetPanelSplitterComponent } from './side-inset-panel-splitter/side-inset-panel-splitter.component';
import { ComponentsSplitterComponent } from './splitter/splitter.component';

const SECTIONS = [
    ComponentsSplitterComponent,
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
        AccessibilityModule,
        AngularSplitModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
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