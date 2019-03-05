import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, AccordionModule, CheckboxModule, DateRangePickerModule, DateTimePickerModule, NumberPickerModule, PopoverModule, TabsetModule, TimePickerModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsDatePickerNg1Component } from './date-picker-ng1/date-picker-ng1.component';
import { ComponentsDateRangePickerNg1Component } from './date-range-picker-ng1/date-range-picker-ng1.component';
import { ComponentsDateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { ComponentsDateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { ComponentsIntegratedDatePickerNg1Component } from './integrated-date-picker-ng1/integrated-date-picker-ng1.component';
import { ComponentsTimePickerNg1Component } from './time-picker-ng1/time-picker-ng1.component';
import { ComponentsTimePickerComponent } from './time-picker/time-picker.component';

const SECTIONS = [
    ComponentsDatePickerNg1Component,
    ComponentsDateRangePickerNg1Component,
    ComponentsDateTimePickerComponent,
    ComponentsIntegratedDatePickerNg1Component,
    ComponentsTimePickerComponent,
    ComponentsTimePickerNg1Component,
    ComponentsDateRangePickerComponent
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
        AccessibilityModule,
        AccordionModule,
        CheckboxModule,
        CommonModule,
        DateTimePickerModule,
        DateRangePickerModule,
        DocumentationComponentsModule,
        FormsModule,
        NumberPickerModule,
        PopoverModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
        TimePickerModule,
        WrappersModule,
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