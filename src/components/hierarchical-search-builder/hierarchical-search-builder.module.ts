import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextInputComponent } from './input-components/text-input/text-input.component';
import { HierarchicalSearchBuilderComponent } from './hierarchical-search-builder.component';
import { HierarchicalSearchBuilderGroupComponent } from './hierarchical-search-builder-group/hierarchical-search-builder-group.component';
import { HierarchicalSearchBuilderConditionComponent } from './hierarchical-search-builder-condition/hierarchical-search-builder-condition.component';
import { HierarchicalSearchBuilderService } from './hierarchical-search-builder.service';
import { SelectModule } from '../select';
import { NumberPickerModule } from '../number-picker';
import { NumberInputComponent } from './input-components/number-input/number-input.component';
import { SelectInputComponent } from './input-components/select-input/select-input.component';

const EXPORTS = [
    TextInputComponent,
    NumberInputComponent,
    SelectInputComponent,
    HierarchicalSearchBuilderComponent,
];

const DECLARATIONS = [
    ...EXPORTS,
    HierarchicalSearchBuilderGroupComponent,
    HierarchicalSearchBuilderConditionComponent,
];

@NgModule({
    imports: [
        CommonModule,
        SelectModule,
        NumberPickerModule
    ],
    exports: EXPORTS,
    declarations: DECLARATIONS,
    providers: [HierarchicalSearchBuilderService]
})
export class HierarchicalSearchBuilderModule {
}
