import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SelectListModule } from '../../../../../../src/components/select-list/index';
import { CheckboxModule, NumberPickerModule, RadioButtonModule, SelectModule, TabsetModule } from '../../../../../../src/index';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsMultipleSelectTableNg1Component } from './multiple-select-table-ng1/multiple-select-table-ng1.component';
import { ComponentsSelectListComponent } from './select-list/select-list.component';
import { ComponentsSelectNg1Component } from './select-ng1/select-ng1.component';
import { ComponentsSelectComponent } from './select/select.component';
import { ComponentsSingleSelectTableNg1Component } from './single-select-table-ng1/single-select-table-ng1.component';

const SECTIONS = [
    ComponentsSelectComponent,
    ComponentsSelectNg1Component,
    ComponentsSingleSelectTableNg1Component,
    ComponentsMultipleSelectTableNg1Component,
    ComponentsSelectListComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Select')
        }
    }
];

@NgModule({
    imports: [
        AccordionModule.forRoot(),
        CheckboxModule,
        CommonModule,
        DocumentationComponentsModule,
        FormsModule,
        RadioButtonModule,
        RouterModule.forChild(ROUTES),
        SelectModule,
        TabsModule.forRoot(),
        WrappersModule,
        NumberPickerModule,
        SelectListModule,
        TabsetModule
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsSelectModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}