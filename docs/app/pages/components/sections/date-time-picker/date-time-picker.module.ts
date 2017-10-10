import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsDatePickerNg1Component } from './date-picker-ng1/date-picker-ng1.component';
import { ComponentsIntegratedDatePickerNg1Component } from './integrated-date-picker-ng1/integrated-date-picker-ng1.component';
import { ComponentsDateRangePickerNg1Component } from './date-range-picker-ng1/date-range-picker-ng1.component';
import { ComponentsTimePickerComponent } from './time-picker/time-picker.component';
import { ComponentsTimePickerNg1Component } from './time-picker-ng1/time-picker-ng1.component';
import { WrappersModule } from '../../../../wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CheckboxModule, NumberPickerModule} from '../../../../../../src/index';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

const SECTIONS = [
    ComponentsDatePickerNg1Component,
    ComponentsIntegratedDatePickerNg1Component,
    ComponentsDateRangePickerNg1Component,
    ComponentsTimePickerComponent,
    ComponentsTimePickerNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Date & Time Pickers')
        }
    }
];

@NgModule({
    imports: [
        FormsModule,
        WrappersModule,
        TabsModule,
        CheckboxModule,
        NumberPickerModule,
        AccordionModule.forRoot(),
        TimepickerModule.forRoot(),
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsDateTimePickerModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}