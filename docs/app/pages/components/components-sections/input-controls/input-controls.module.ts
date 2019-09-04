import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule, AutoGrowModule, CheckboxModule, ColorServiceModule, FloatLabelModule, IconModule, NumberPickerModule, RadioButtonModule, SliderModule, TabsetModule, TagInputModule, ToggleSwitchModule, TypeaheadModule } from '@ux-aspects/ux-aspects';
import { NgxMaskModule } from 'ngx-mask';
import { InputDropdownModule } from 'src/components/input-dropdown/input-dropdown.module';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsCheckboxComponent } from './checkbox/checkbox.component';
import { ComponentsExpandingTextAreaComponent } from './expanding-text-area/expanding-text-area.component';
import { ComponentsFloatLabelComponent } from './float-label/float-label.component';
import { ComponentsInputDropdownComponent, HighlightSearch } from './input-dropdown/input-dropdown.component';
import { ComponentsInputMaskComponent } from './input-mask/input-mask.component';
import { ComponentsNumberPickerComponent } from './number-picker/number-picker.component';
import { ComponentsRadioButtonComponent } from './radio-button/radio-button.component';
import { ComponentsSlidersComponent } from './sliders/sliders.component';
import { ComponentsTagsComponent } from './tags/tags.component';
import { ComponentsToggleSwitchComponent } from './toggleswitch/toggleswitch.component';
import { ComponentsTypeaheadComponent } from './typeahead/typeahead.component';

const SECTIONS = [
    ComponentsCheckboxComponent,
    ComponentsExpandingTextAreaComponent,
    ComponentsFloatLabelComponent,
    ComponentsInputDropdownComponent,
    ComponentsInputMaskComponent,
    ComponentsNumberPickerComponent,
    ComponentsRadioButtonComponent,
    ComponentsSlidersComponent,
    ComponentsTagsComponent,
    ComponentsToggleSwitchComponent,
    ComponentsTypeaheadComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Input Controls')
        }
    }
];

@NgModule({
    imports: [
        AccordionModule,
        AutoGrowModule,
        CheckboxModule,
        ColorServiceModule,
        CommonModule,
        DocumentationComponentsModule,
        FloatLabelModule,
        FormsModule,
        IconModule,
        InputDropdownModule,
        NgxMaskModule,
        NumberPickerModule,
        RadioButtonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SliderModule,
        TabsetModule,
        TagInputModule,
        ToggleSwitchModule,
        TypeaheadModule,
    ],
    exports: SECTIONS,
    declarations: [...SECTIONS, HighlightSearch],
    entryComponents: SECTIONS
})
export class ComponentsInputControlsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}