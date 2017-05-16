import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsCheckboxComponent } from './checkbox/checkbox.component';
import { ComponentsCheckboxNg1Component } from './checkbox-ng1/checkbox-ng1.component';
import { ComponentsCustomDropdownNg1Component } from './custom-dropdown-ng1/custom-dropdown-ng1.component';
import { ComponentsExpandingTextAreaNg1Component } from './expanding-text-area-ng1/expanding-text-area-ng1.component';
import { ComponentsToggleSwitchComponent } from './toggleswitch/toggleswitch.component';
import { ComponentsToggleSwitchNg1Component } from './toggle-switch-ng1/toggle-switch-ng1.component';
import { ComponentsNumberPickerNg1Component } from './number-picker-ng1/number-picker-ng1.component';
import { ComponentsInlineDropdownNg1Component } from './inline-dropdown-ng1/inline-dropdown-ng1.component';
import { ComponentsInputExpandNg1Component } from './input-expand-ng1/input-expand-ng1.component';
import { ComponentsInputMaskNg1Component } from './input-mask-ng1/input-mask-ng1.component';
import { ComponentsRadioButtonNg1Component } from './radio-button-ng1/radio-button-ng1.component';
import { ComponentsTagsNg1Component } from './tags-ng1/tags-ng1.component';
import { WrappersModule } from '../../../../wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CheckboxModule, ToggleSwitchModule, ColorServiceModule, SliderModule } from '../../../../../../src/index';
import { ComponentsSlidersComponent } from './sliders/sliders.component';
import { ComponentsSliderChartsNg1Component } from './slider-charts-ng1/slider-charts-ng1.component';
import { ComponentsSlidersNg1Component } from './sliders-ng1/sliders-ng1.component';

const SECTIONS = [
    ComponentsCheckboxComponent,
    ComponentsCheckboxNg1Component,
    ComponentsCustomDropdownNg1Component,
    ComponentsExpandingTextAreaNg1Component,
    ComponentsToggleSwitchComponent,
    ComponentsToggleSwitchNg1Component,
    ComponentsNumberPickerNg1Component,
    ComponentsInlineDropdownNg1Component,
    ComponentsInputExpandNg1Component,
    ComponentsInputMaskNg1Component,
    ComponentsRadioButtonNg1Component,
    ComponentsTagsNg1Component,
    ComponentsSlidersNg1Component,
    ComponentsSliderChartsNg1Component,
    ComponentsSlidersComponent
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
        TabsModule,
        CheckboxModule,
        ToggleSwitchModule,
        CommonModule,
        WrappersModule,
        TabsModule,
        SliderModule,
        FormsModule,
        ColorServiceModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsInputControlsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}