import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule, AutoGrowModule, CheckboxModule, ColorServiceModule, FloatLabelModule, InputDropdownModule, NumberPickerModule, RadioButtonModule, SliderModule, TabsetModule, TagInputModule, ToggleSwitchModule, TypeaheadModule } from '@ux-aspects/ux-aspects';
import { NgxMaskModule } from 'ngx-mask';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsCheckboxNg1Component } from './checkbox-ng1/checkbox-ng1.component';
import { ComponentsCheckboxComponent } from './checkbox/checkbox.component';
import { ComponentsCustomDropdownNg1Component } from './custom-dropdown-ng1/custom-dropdown-ng1.component';
import { ComponentsExpandingTextAreaNg1Component } from './expanding-text-area-ng1/expanding-text-area-ng1.component';
import { ComponentsExpandingTextAreaComponent } from './expanding-text-area/expanding-text-area.component';
import { ComponentsFloatLabelComponent } from './float-label/float-label.component';
import { ComponentsInlineDropdownNg1Component } from './inline-dropdown-ng1/inline-dropdown-ng1.component';
import { ComponentsInputExpandNg1Component } from './input-expand-ng1/input-expand-ng1.component';
import { ComponentsInputMaskNg1Component } from './input-mask-ng1/input-mask-ng1.component';
import { ComponentsInputMaskComponent } from './input-mask/input-mask.component';
import { ComponentsNumberPickerNg1Component } from './number-picker-ng1/number-picker-ng1.component';
import { ComponentsNumberPickerComponent } from './number-picker/number-picker.component';
import { ComponentsRadioButtonNg1Component } from './radio-button-ng1/radio-button-ng1.component';
import { ComponentsRadioButtonComponent } from './radio-button/radio-button.component';
import { ComponentsSliderChartsNg1Component } from './slider-charts-ng1/slider-charts-ng1.component';
import { ComponentsSlidersNg1Component } from './sliders-ng1/sliders-ng1.component';
import { ComponentsSlidersComponent } from './sliders/sliders.component';
import { ComponentsTagsNg1Component } from './tags-ng1/tags-ng1.component';
import { ComponentsTagsComponent } from './tags/tags.component';
import { ComponentsToggleSwitchNg1Component } from './toggle-switch-ng1/toggle-switch-ng1.component';
import { ComponentsToggleSwitchComponent } from './toggleswitch/toggleswitch.component';
import { ComponentsInputDropdownComponent, HighlightSearch } from './input-dropdown/input-dropdown.component';


const SECTIONS = [
    ComponentsCheckboxComponent,
    ComponentsCheckboxNg1Component,
    ComponentsCustomDropdownNg1Component,
    ComponentsExpandingTextAreaComponent,
    ComponentsExpandingTextAreaNg1Component,
    ComponentsFloatLabelComponent,
    ComponentsInlineDropdownNg1Component,
    ComponentsInputDropdownComponent,
    ComponentsInputExpandNg1Component,
    ComponentsInputMaskComponent,
    ComponentsInputMaskNg1Component,
    ComponentsNumberPickerComponent,
    ComponentsNumberPickerNg1Component,
    ComponentsRadioButtonComponent,
    ComponentsRadioButtonNg1Component,
    ComponentsSliderChartsNg1Component,
    ComponentsSlidersComponent,
    ComponentsSlidersNg1Component,
    ComponentsTagsComponent,
    ComponentsTagsNg1Component,
    ComponentsToggleSwitchComponent,
    ComponentsToggleSwitchNg1Component,
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
        WrappersModule,
        CheckboxModule,
        ToggleSwitchModule,
        RadioButtonModule,
        CommonModule,
        WrappersModule,
        TabsetModule,
        TagInputModule,
        TypeaheadModule,
        SliderModule,
        FormsModule,
        NumberPickerModule,
        InputDropdownModule,
        ColorServiceModule,
        AutoGrowModule,
        FloatLabelModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES),
        ReactiveFormsModule,
        AccordionModule,
        NgxMaskModule
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