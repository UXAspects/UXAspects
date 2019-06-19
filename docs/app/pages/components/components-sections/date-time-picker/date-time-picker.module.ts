import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, AccordionModule, CheckboxModule, DateRangePickerModule, DateTimePickerModule, NumberPickerModule, PopoverModule, TabsetModule, TimePickerModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsDateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { ComponentsDateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { ComponentsTimePickerComponent } from './time-picker/time-picker.component';

const SECTIONS = [
    ComponentsDateTimePickerComponent,
    ComponentsTimePickerComponent,
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