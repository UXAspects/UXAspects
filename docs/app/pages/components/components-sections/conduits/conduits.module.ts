import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckboxModule, IconModule, PopoverModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsConduitComponent } from './conduit/conduit.component';
import { ConduitComponentSearchComponent } from './conduit/example/component-search/component-search.component';
import { ConduitComponentZoneComponent } from './conduit/example/component-zone/component-zone.component';
import { ConduitZoneExampleComponent } from './multiple-zones/example/example.component';
import { ComponentsConduitFilterComponent } from './multiple-zones/example/filter/filter.component';
import { ConduitZoneInspectorComponent } from './multiple-zones/example/inspector/inspector.component';
import { ComponentsConduitListViewComponent } from './multiple-zones/example/list-view/list-view.component';
import { ComponentsConduitToolbarComponent } from './multiple-zones/example/toolbar/toolbar.component';
import { ComponentsMultipleZonesComponent } from './multiple-zones/multiple-zones.component';

const SECTIONS = [
    ComponentsConduitComponent,
    ConduitComponentSearchComponent,
    ConduitComponentZoneComponent,
    ComponentsMultipleZonesComponent,
    ComponentsConduitToolbarComponent,
    ComponentsConduitListViewComponent,
    ComponentsConduitFilterComponent,
    ConduitZoneExampleComponent,
    ConduitZoneInspectorComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Conduits')
        }
    }
];

@NgModule({
    imports: [
        CheckboxModule,
        CommonModule,
        DocumentationComponentsModule,
        FormsModule,
        IconModule,
        PopoverModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsConduitsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}