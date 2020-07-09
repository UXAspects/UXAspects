import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextInputComponent } from './input-components/text-input/text-input.component';
import { HierarchicalSearchBuilderComponent } from './hierarchical-search-builder.component';
import { HierarchicalSearchBuilderGroupComponent } from './hierarchical-search-builder-group/hierarchical-search-builder-group.component';
import { HierarchicalSearchBuilderConditionComponent } from './hierarchical-search-builder-condition/hierarchical-search-builder-condition.component';
import { HierarchicalSearchBuilderService } from './hierarchical-search-builder.service';
import { SelectModule } from '../select';

const DECLARATIONS = [
    TextInputComponent,
    HierarchicalSearchBuilderComponent,
    HierarchicalSearchBuilderGroupComponent,
    HierarchicalSearchBuilderConditionComponent,
];

@NgModule({
    imports: [
        CommonModule,
        SelectModule
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS,
    providers: [HierarchicalSearchBuilderService]
})
export class HierarchicalSearchBuilderModule {
}
